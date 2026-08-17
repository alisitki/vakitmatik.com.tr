#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";

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
  return { ...merged, ...process.env };
}

function required(value, name) {
  if (!value) throw new Error(`Missing required value: ${name}`);
  return value;
}

function arg(name) {
  return process.argv.find((value) => value.startsWith(`--${name}=`))?.split("=")[1];
}

async function getAccessToken(env) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: required(env.GOOGLE_ADS_CLIENT_ID, "GOOGLE_ADS_CLIENT_ID"),
      client_secret: required(env.GOOGLE_ADS_CLIENT_SECRET, "GOOGLE_ADS_CLIENT_SECRET"),
      refresh_token: required(env.GOOGLE_ADS_REFRESH_TOKEN, "GOOGLE_ADS_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "OAuth token request failed");
  }
  return payload.access_token;
}

function errorMessage(payload, fallback) {
  const details = payload?.error?.details
    ?.flatMap((detail) => detail.errors ?? [])
    .map((error) => error.message)
    .filter(Boolean);
  return details?.join("; ") || payload?.error?.message || fallback;
}

async function request(context, suffix, body) {
  const response = await fetch(
    `https://googleads.googleapis.com/${context.apiVersion}/customers/${context.customerId}/${suffix}`,
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
      body: JSON.stringify(body),
    },
  );
  const payload = await response.json();
  if (!response.ok) throw new Error(errorMessage(payload, `Google Ads request failed (${response.status})`));
  return payload;
}

async function getCampaignBudget(context, campaignId) {
  const campaignFilter = campaignId ? ` AND campaign.id = ${campaignId}` : "";
  const payload = await request(context, "googleAds:search", {
    query: `
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign_budget.resource_name,
        campaign_budget.id,
        campaign_budget.name,
        campaign_budget.amount_micros
      FROM campaign
      WHERE campaign.status != 'REMOVED'${campaignFilter}
      LIMIT 2
    `,
  });
  const rows = payload.results ?? [];
  if (rows.length !== 1) {
    throw new Error(`Expected exactly one campaign, received ${rows.length}`);
  }
  return rows[0];
}

async function main() {
  const amount = Number(required(arg("amount"), "--amount"));
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("--amount must be a positive number");

  const env = await loadEnv();
  const customerId = required(env.GOOGLE_ADS_CUSTOMER_ID, "GOOGLE_ADS_CUSTOMER_ID").replace(/\D/g, "");
  const context = {
    apiVersion: env.GOOGLE_ADS_API_VERSION || "v24",
    customerId,
    loginCustomerId: (env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/\D/g, ""),
    developerToken: required(env.GOOGLE_ADS_DEVELOPER_TOKEN, "GOOGLE_ADS_DEVELOPER_TOKEN"),
    accessToken: await getAccessToken(env),
  };
  const before = await getCampaignBudget(context, arg("campaign"));
  const resourceName = before.campaignBudget.resourceName;
  const previousAmount = Number(before.campaignBudget.amountMicros) / 1_000_000;

  await request(context, "campaignBudgets:mutate", {
    operations: [
      {
        update: {
          resourceName,
          amountMicros: String(Math.round(amount * 1_000_000)),
        },
        updateMask: "amount_micros",
      },
    ],
    partialFailure: false,
    validateOnly: false,
  });

  const after = await getCampaignBudget(context, String(before.campaign.id));
  const verifiedAmount = Number(after.campaignBudget.amountMicros) / 1_000_000;
  if (verifiedAmount !== amount) {
    throw new Error(`Budget verification failed: expected ${amount}, received ${verifiedAmount}`);
  }

  process.stdout.write(`${JSON.stringify({
    campaignId: String(after.campaign.id),
    campaignName: after.campaign.name,
    previousAmount,
    verifiedAmount,
    currency: "TRY",
  }, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
