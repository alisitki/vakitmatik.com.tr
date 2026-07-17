#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_API_VERSION = "v24";

function parseEnv(source) {
  const values = {};

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separator = line.indexOf("=");
    if (separator < 1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }

  return values;
}

async function loadLocalEnv() {
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "apps/dashboard/.env.local"),
  ];
  const merged = {};

  for (const filename of candidates) {
    try {
      const values = parseEnv(await readFile(filename, "utf8"));
      for (const [key, value] of Object.entries(values)) {
        if (value) merged[key] = value;
      }
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (value) merged[key] = value;
  }

  return merged;
}

function required(env, key) {
  const value = env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

function normalizeCustomerId(value) {
  return value.replace(/\D/g, "");
}

function assertApiVersion(value) {
  const match = /^v(\d+)$/.exec(value);
  if (!match || Number(match[1]) < 24) {
    throw new Error(`Google Ads snapshot requires v24 or newer; received ${value}`);
  }
  return value;
}

async function getAccessToken(env) {
  const body = new URLSearchParams({
    client_id: required(env, "GOOGLE_ADS_CLIENT_ID"),
    client_secret: required(env, "GOOGLE_ADS_CLIENT_SECRET"),
    refresh_token: required(env, "GOOGLE_ADS_REFRESH_TOKEN"),
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const payload = await response.json();

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "OAuth token request failed");
  }

  return payload.access_token;
}

function errorMessage(payload, fallback) {
  const detail = payload?.error?.details
    ?.flatMap((item) => item.errors ?? [])
    .map((item) => item.message)
    .filter(Boolean)
    .join("; ");
  return detail || payload?.error?.message || fallback;
}

async function search({ apiVersion, customerId, developerToken, loginCustomerId, accessToken }, query) {
  const rows = [];
  let pageToken;

  do {
    const response = await fetch(
      `https://googleads.googleapis.com/${apiVersion}/customers/${customerId}/googleAds:search`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
          "developer-token": developerToken,
          ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {}),
        },
        body: JSON.stringify({ query, ...(pageToken ? { pageToken } : {}) }),
      },
    );
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(errorMessage(payload, `Google Ads query failed (${response.status})`));
    }

    rows.push(...(payload.results ?? []));
    pageToken = payload.nextPageToken;
  } while (pageToken);

  return rows;
}

function flatten(value, prefix = "", output = {}) {
  if (Array.isArray(value)) {
    output[prefix] = JSON.stringify(value);
    return output;
  }

  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      flatten(nested, prefix ? `${prefix}.${key}` : key, output);
    }
    return output;
  }

  output[prefix] = value ?? "";
  return output;
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows) {
  const flattened = rows.map((row) => flatten(row));
  const headers = [...new Set(flattened.flatMap((row) => Object.keys(row)))].sort();
  return [
    headers.map(csvEscape).join(","),
    ...flattened.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
}

const queries = {
  account: `
    SELECT
      customer.id,
      customer.descriptive_name,
      customer.currency_code,
      customer.time_zone,
      customer.manager,
      customer.test_account,
      customer.status,
      customer.auto_tagging_enabled,
      customer.tracking_url_template,
      customer.final_url_suffix
    FROM customer
    LIMIT 1
  `,
  campaigns: `
    SELECT
      campaign.resource_name,
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.serving_status,
      campaign.advertising_channel_type,
      campaign.advertising_channel_sub_type,
      campaign.bidding_strategy_type,
      campaign.tracking_url_template,
      campaign.final_url_suffix,
      campaign.network_settings.target_google_search,
      campaign.network_settings.target_search_network,
      campaign.network_settings.target_content_network,
      campaign_budget.resource_name,
      campaign_budget.id,
      campaign_budget.name,
      campaign_budget.status,
      campaign_budget.amount_micros,
      campaign_budget.delivery_method,
      campaign_budget.explicitly_shared
    FROM campaign
    WHERE campaign.status != 'REMOVED'
  `,
  adGroups: `
    SELECT
      campaign.resource_name,
      campaign.id,
      campaign.name,
      ad_group.resource_name,
      ad_group.id,
      ad_group.name,
      ad_group.status,
      ad_group.type,
      ad_group.cpc_bid_micros,
      ad_group.target_cpa_micros
    FROM ad_group
    WHERE ad_group.status != 'REMOVED'
  `,
  ads: `
    SELECT
      campaign.resource_name,
      campaign.id,
      campaign.name,
      ad_group.resource_name,
      ad_group.id,
      ad_group.name,
      ad_group_ad.resource_name,
      ad_group_ad.status,
      ad_group_ad.ad.id,
      ad_group_ad.ad.name,
      ad_group_ad.ad.type,
      ad_group_ad.ad.final_urls,
      ad_group_ad.ad.final_mobile_urls,
      ad_group_ad.ad.tracking_url_template,
      ad_group_ad.ad.final_url_suffix,
      ad_group_ad.ad.url_custom_parameters,
      ad_group_ad.ad.responsive_search_ad.headlines,
      ad_group_ad.ad.responsive_search_ad.descriptions,
      ad_group_ad.ad.responsive_search_ad.path1,
      ad_group_ad.ad.responsive_search_ad.path2
    FROM ad_group_ad
    WHERE ad_group_ad.status != 'REMOVED'
  `,
  keywords: `
    SELECT
      campaign.resource_name,
      campaign.id,
      campaign.name,
      ad_group.resource_name,
      ad_group.id,
      ad_group.name,
      ad_group_criterion.resource_name,
      ad_group_criterion.status,
      ad_group_criterion.negative,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.final_urls,
      ad_group_criterion.final_mobile_urls,
      ad_group_criterion.tracking_url_template,
      ad_group_criterion.final_url_suffix,
      ad_group_criterion.cpc_bid_micros,
      ad_group_criterion.quality_info.quality_score,
      ad_group_criterion.quality_info.creative_quality_score,
      ad_group_criterion.quality_info.post_click_quality_score,
      ad_group_criterion.quality_info.search_predicted_ctr
    FROM keyword_view
    WHERE ad_group_criterion.status != 'REMOVED'
  `,
  conversionActions: `
    SELECT
      conversion_action.resource_name,
      conversion_action.id,
      conversion_action.name,
      conversion_action.status,
      conversion_action.type,
      conversion_action.category,
      conversion_action.owner_customer,
      conversion_action.primary_for_goal,
      conversion_action.include_in_conversions_metric,
      conversion_action.counting_type,
      conversion_action.click_through_lookback_window_days,
      conversion_action.view_through_lookback_window_days,
      conversion_action.attribution_model_settings.attribution_model,
      conversion_action.tag_snippets
    FROM conversion_action
  `,
  assets: `
    SELECT
      asset.resource_name,
      asset.id,
      asset.name,
      asset.type,
      asset.source,
      asset.final_urls,
      asset.final_mobile_urls,
      asset.tracking_url_template,
      asset.text_asset.text,
      asset.sitelink_asset.link_text,
      asset.sitelink_asset.description1,
      asset.sitelink_asset.description2,
      asset.image_asset.file_size,
      asset.image_asset.full_size.width_pixels,
      asset.image_asset.full_size.height_pixels
    FROM asset
  `,
  customerAssets: `
    SELECT
      customer_asset.resource_name,
      customer_asset.status,
      customer_asset.field_type,
      customer_asset.source,
      asset.resource_name,
      asset.id,
      asset.name,
      asset.type
    FROM customer_asset
    WHERE customer_asset.status != 'REMOVED'
  `,
  campaignAssets: `
    SELECT
      campaign.resource_name,
      campaign.id,
      campaign.name,
      campaign_asset.resource_name,
      campaign_asset.status,
      campaign_asset.field_type,
      campaign_asset.source,
      asset.resource_name,
      asset.id,
      asset.name,
      asset.type
    FROM campaign_asset
    WHERE campaign_asset.status != 'REMOVED'
  `,
  adGroupAssets: `
    SELECT
      campaign.resource_name,
      campaign.id,
      campaign.name,
      ad_group.resource_name,
      ad_group.id,
      ad_group.name,
      ad_group_asset.resource_name,
      ad_group_asset.status,
      ad_group_asset.field_type,
      ad_group_asset.source,
      asset.resource_name,
      asset.id,
      asset.name,
      asset.type
    FROM ad_group_asset
    WHERE ad_group_asset.status != 'REMOVED'
  `,
  recommendations: `
    SELECT
      recommendation.resource_name,
      recommendation.type,
      recommendation.dismissed,
      recommendation.campaign,
      recommendation.ad_group
    FROM recommendation
  `,
};

async function main() {
  const env = await loadLocalEnv();
  const outputArg = process.argv.find((value) => value.startsWith("--out="));
  if (!outputArg) throw new Error("Usage: node scripts/export-google-ads-snapshot.mjs --out=/absolute/path");

  const outputDirectory = path.resolve(outputArg.slice("--out=".length));
  const apiVersion = assertApiVersion(env.GOOGLE_ADS_API_VERSION || DEFAULT_API_VERSION);
  const customerId = normalizeCustomerId(required(env, "GOOGLE_ADS_CUSTOMER_ID"));
  const loginCustomerId = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
    ? normalizeCustomerId(env.GOOGLE_ADS_LOGIN_CUSTOMER_ID)
    : "";
  const context = {
    apiVersion,
    customerId,
    loginCustomerId,
    developerToken: required(env, "GOOGLE_ADS_DEVELOPER_TOKEN"),
    accessToken: await getAccessToken(env),
  };
  const data = {};
  const errors = {};

  await mkdir(outputDirectory, { recursive: true });

  for (const [name, query] of Object.entries(queries)) {
    try {
      data[name] = await search(context, query);
    } catch (error) {
      data[name] = [];
      errors[name] = error instanceof Error ? error.message : String(error);
    }
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    apiVersion,
    customerId,
    loginCustomerId: loginCustomerId || null,
    errors,
    data,
  };

  await writeFile(
    path.join(outputDirectory, "google-ads-snapshot.json"),
    `${JSON.stringify(snapshot, null, 2)}\n`,
    "utf8",
  );

  for (const [name, rows] of Object.entries(data)) {
    await writeFile(path.join(outputDirectory, `${name}.csv`), `${toCsv(rows)}\n`, "utf8");
  }

  const counts = Object.fromEntries(Object.entries(data).map(([name, rows]) => [name, rows.length]));
  process.stdout.write(`${JSON.stringify({ apiVersion, customerId, counts, errors }, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
