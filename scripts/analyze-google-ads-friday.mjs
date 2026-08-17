#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API_VERSION = "v24";

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

async function loadEnv() {
  const merged = {};
  for (const filename of [".env", "apps/dashboard/.env.local"]) {
    try {
      const parsed = parseEnv(await readFile(path.resolve(filename), "utf8"));
      for (const [key, value] of Object.entries(parsed)) {
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
  if (!env[key]) throw new Error(`Missing required environment variable: ${key}`);
  return env[key];
}

async function accessToken(env) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: required(env, "GOOGLE_ADS_CLIENT_ID"),
      client_secret: required(env, "GOOGLE_ADS_CLIENT_SECRET"),
      refresh_token: required(env, "GOOGLE_ADS_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "OAuth token request failed");
  }
  return payload.access_token;
}

function googleAdsError(payload, fallback) {
  const messages = payload?.error?.details
    ?.flatMap((detail) => detail.errors ?? [])
    .map((error) => error.message)
    .filter(Boolean);
  return messages?.join("; ") || payload?.error?.message || fallback;
}

async function search(context, query) {
  const rows = [];
  let pageToken;
  do {
    const response = await fetch(
      `https://googleads.googleapis.com/${context.apiVersion}/customers/${context.customerId}/googleAds:search`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${context.accessToken}`,
          "content-type": "application/json",
          "developer-token": context.developerToken,
          ...(context.loginCustomerId
            ? { "login-customer-id": context.loginCustomerId }
            : {}),
        },
        body: JSON.stringify({ query, ...(pageToken ? { pageToken } : {}) }),
      },
    );
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(googleAdsError(payload, `Google Ads query failed (${response.status})`));
    }
    rows.push(...(payload.results ?? []));
    pageToken = payload.nextPageToken;
  } while (pageToken);
  return rows;
}

function dateArg(name, fallback) {
  return process.argv.find((value) => value.startsWith(`--${name}=`))?.split("=")[1] || fallback;
}

function shiftDate(date, days) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

const today = dateArg("date", new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Istanbul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date()));
const previousFriday = dateArg("compare", shiftDate(today, -7));
const rangeStart = dateArg("range-start", shiftDate(today, -6));
const output = dateArg("out", "/tmp/vakitmatik-google-ads-friday-analysis.json");

const queryBuilders = {
  campaignConfig: () => `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.serving_status,
      campaign.bidding_strategy_type,
      campaign.network_settings.target_google_search,
      campaign.network_settings.target_search_network,
      campaign.network_settings.target_content_network,
      campaign_budget.id,
      campaign_budget.name,
      campaign_budget.amount_micros,
      campaign_budget.delivery_method,
      campaign_budget.explicitly_shared
    FROM campaign
    WHERE campaign.status != 'REMOVED'
  `,
  campaignHourly: (date) => `
    SELECT
      segments.date,
      segments.hour,
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.interactions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.all_conversions
    FROM campaign
    WHERE segments.date = '${date}'
      AND campaign.status != 'REMOVED'
    ORDER BY segments.hour
  `,
  campaignNetworkHourly: (date) => `
    SELECT
      segments.date,
      segments.hour,
      segments.ad_network_type,
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE segments.date = '${date}'
      AND campaign.status != 'REMOVED'
    ORDER BY segments.hour, metrics.cost_micros DESC
  `,
  campaignSearchShare: (date) => `
    SELECT
      segments.date,
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.search_impression_share,
      metrics.search_top_impression_share,
      metrics.search_absolute_top_impression_share,
      metrics.search_budget_lost_impression_share,
      metrics.search_rank_lost_impression_share
    FROM campaign
    WHERE segments.date = '${date}'
      AND campaign.status != 'REMOVED'
  `,
  campaignDailyRange: (startDate, endDate) => `
    SELECT
      segments.date,
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.search_impression_share,
      metrics.search_top_impression_share,
      metrics.search_absolute_top_impression_share,
      metrics.search_budget_lost_impression_share,
      metrics.search_rank_lost_impression_share
    FROM campaign
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      AND campaign.status != 'REMOVED'
    ORDER BY segments.date
  `,
  adGroupHourly: (date) => `
    SELECT
      segments.date,
      segments.hour,
      campaign.name,
      ad_group.id,
      ad_group.name,
      ad_group.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM ad_group
    WHERE segments.date = '${date}'
      AND ad_group.status != 'REMOVED'
    ORDER BY segments.hour, metrics.cost_micros DESC
  `,
  adGroupRange: (startDate, endDate) => `
    SELECT
      campaign.name,
      ad_group.id,
      ad_group.name,
      ad_group.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM ad_group
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      AND ad_group.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
  `,
  searchTermsHourly: (date) => `
    SELECT
      segments.date,
      segments.hour,
      search_term_view.search_term,
      search_term_view.status,
      segments.keyword.info.text,
      segments.keyword.info.match_type,
      segments.search_term_match_type,
      campaign.name,
      ad_group.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE segments.date = '${date}'
    ORDER BY segments.hour, metrics.cost_micros DESC
  `,
  searchTermsDaily: (date) => `
    SELECT
      segments.date,
      search_term_view.search_term,
      search_term_view.status,
      segments.keyword.info.text,
      segments.keyword.info.match_type,
      segments.search_term_match_type,
      campaign.name,
      ad_group.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE segments.date = '${date}'
    ORDER BY metrics.cost_micros DESC
  `,
  keywordsHourly: (date) => `
    SELECT
      segments.date,
      segments.hour,
      campaign.name,
      ad_group.name,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM keyword_view
    WHERE segments.date = '${date}'
      AND ad_group_criterion.status != 'REMOVED'
    ORDER BY segments.hour, metrics.cost_micros DESC
  `,
  keywordsDaily: (date) => `
    SELECT
      segments.date,
      campaign.name,
      ad_group.name,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM keyword_view
    WHERE segments.date = '${date}'
      AND ad_group_criterion.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
  `,
  searchTermsRange: (startDate, endDate) => `
    SELECT
      search_term_view.search_term,
      search_term_view.status,
      segments.keyword.info.text,
      segments.keyword.info.match_type,
      segments.search_term_match_type,
      campaign.name,
      ad_group.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    ORDER BY metrics.cost_micros DESC
  `,
  deviceRange: (startDate, endDate) => `
    SELECT
      segments.device,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
  `,
};

async function main() {
  const env = await loadEnv();
  const customerId = required(env, "GOOGLE_ADS_CUSTOMER_ID").replace(/\D/g, "");
  const loginCustomerId = (env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/\D/g, "");
  const context = {
    apiVersion: env.GOOGLE_ADS_API_VERSION || API_VERSION,
    customerId,
    loginCustomerId,
    developerToken: required(env, "GOOGLE_ADS_DEVELOPER_TOKEN"),
    accessToken: await accessToken(env),
  };

  const jobs = {
    campaignConfig: queryBuilders.campaignConfig(),
    campaignHourlyToday: queryBuilders.campaignHourly(today),
    campaignHourlyPreviousFriday: queryBuilders.campaignHourly(previousFriday),
    campaignNetworkHourlyToday: queryBuilders.campaignNetworkHourly(today),
    campaignNetworkHourlyPreviousFriday: queryBuilders.campaignNetworkHourly(previousFriday),
    campaignSearchShareToday: queryBuilders.campaignSearchShare(today),
    campaignSearchSharePreviousFriday: queryBuilders.campaignSearchShare(previousFriday),
    campaignDailyRange: queryBuilders.campaignDailyRange(rangeStart, today),
    adGroupHourlyToday: queryBuilders.adGroupHourly(today),
    adGroupRange: queryBuilders.adGroupRange(rangeStart, today),
    searchTermsDailyToday: queryBuilders.searchTermsDaily(today),
    searchTermsDailyPreviousFriday: queryBuilders.searchTermsDaily(previousFriday),
    keywordsDailyToday: queryBuilders.keywordsDaily(today),
    searchTermsRange: queryBuilders.searchTermsRange(rangeStart, today),
    deviceRange: queryBuilders.deviceRange(rangeStart, today),
  };
  const data = {};
  const errors = {};

  for (const [name, query] of Object.entries(jobs)) {
    try {
      data[name] = await search(context, query);
    } catch (error) {
      data[name] = [];
      errors[name] = error instanceof Error ? error.message : String(error);
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    customerId,
    accountTimeZone: "Europe/Istanbul",
    today,
    previousFriday,
    rangeStart,
    errors,
    data,
  };
  await writeFile(path.resolve(output), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({
    output: path.resolve(output),
    today,
    previousFriday,
    counts: Object.fromEntries(Object.entries(data).map(([name, rows]) => [name, rows.length])),
    errors,
  }, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
