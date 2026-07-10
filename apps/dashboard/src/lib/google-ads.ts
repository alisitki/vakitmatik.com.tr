import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { addDays, buildAdsDateRanges, dateInTimeZone } from "./dates";
import { getOptionalEnv, getRequiredEnv } from "./env";
import { getGoogleAccessToken } from "./google-auth";
import type { RuntimeCacheResult } from "./runtime-cache";
import type {
  AdsDashboardData,
  AdsOverviewData,
  AdsSummary,
  CampaignRow,
  DateRange,
  KeywordRow,
  SearchTermRow,
} from "./types";

const ADS_OVERVIEW_CACHE_MS = 5 * 60 * 1000;

type GoogleAdsConfig = {
  apiVersion: string;
  developerToken: string;
  loginCustomerId: string | null;
  customerId: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

type GoogleAdsSearchResponse = {
  results?: Record<string, unknown>[];
  nextPageToken?: string;
  error?: {
    message?: string;
    status?: string;
    details?: {
      errors?: {
        errorCode?: Record<string, string>;
        message?: string;
      }[];
    }[];
  };
};

type ConversionAction = AdsDashboardData["conversionActions"][number];

function googleAdsErrorCodes(payload: GoogleAdsSearchResponse) {
  return (
    payload.error?.details
      ?.flatMap((detail) => detail.errors ?? [])
      .flatMap((error) => Object.values(error.errorCode ?? {})) ?? []
  );
}

function isManagerMetricsError(error: unknown) {
  return error instanceof Error && error.message.includes("REQUESTED_METRICS_FOR_MANAGER");
}

function getConfig(): GoogleAdsConfig {
  return {
    apiVersion: getOptionalEnv("GOOGLE_ADS_API_VERSION") || "v22",
    developerToken: getRequiredEnv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    loginCustomerId: getOptionalEnv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    customerId: getRequiredEnv("GOOGLE_ADS_CUSTOMER_ID"),
    clientId: getRequiredEnv("GOOGLE_ADS_CLIENT_ID"),
    clientSecret: getRequiredEnv("GOOGLE_ADS_CLIENT_SECRET"),
    refreshToken: getRequiredEnv("GOOGLE_ADS_REFRESH_TOKEN"),
  };
}

function normalizeCustomerId(value: string) {
  return value.replace(/\D/g, "");
}

async function googleAdsSearch<T extends Record<string, unknown>>(query: string) {
  const config = getConfig();
  const token = await getGoogleAccessToken({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken,
  });
  const endpoint = `https://googleads.googleapis.com/${config.apiVersion}/customers/${normalizeCustomerId(
    config.customerId,
  )}/googleAds:search`;
  const rows: T[] = [];
  let pageToken: string | undefined;

  do {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "developer-token": config.developerToken,
        ...(config.loginCustomerId
          ? {
              "login-customer-id": normalizeCustomerId(config.loginCustomerId),
            }
          : {}),
      },
      body: JSON.stringify({
        query,
        ...(pageToken ? { pageToken } : {}),
      }),
    });

    const payload = (await response.json()) as GoogleAdsSearchResponse;

    if (!response.ok) {
      const codes = googleAdsErrorCodes(payload);
      const codeSuffix = codes.length > 0 ? ` (${codes.join(", ")})` : "";
      throw new Error(`${payload.error?.message || payload.error?.status || "Google Ads search request failed"}${codeSuffix}`);
    }

    rows.push(...((payload.results ?? []) as T[]));
    pageToken = payload.nextPageToken;
  } while (pageToken);

  return rows;
}

async function googleAdsMetricsSearch<T extends Record<string, unknown>>(query: string) {
  try {
    return await googleAdsSearch<T>(query);
  } catch (error) {
    if (isManagerMetricsError(error)) {
      return [];
    }

    throw error;
  }
}

function numberValue(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    return Number(value) || 0;
  }

  return 0;
}

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function metrics(row: Record<string, unknown>) {
  return (row.metrics ?? {}) as Record<string, unknown>;
}

function campaign(row: Record<string, unknown>) {
  return (row.campaign ?? {}) as Record<string, unknown>;
}

function adGroup(row: Record<string, unknown>) {
  return (row.adGroup ?? {}) as Record<string, unknown>;
}

function criterion(row: Record<string, unknown>) {
  return (row.adGroupCriterion ?? {}) as Record<string, unknown>;
}

function campaignBudget(row: Record<string, unknown>) {
  return (row.campaignBudget ?? {}) as Record<string, unknown>;
}

function searchTermView(row: Record<string, unknown>) {
  return (row.searchTermView ?? {}) as Record<string, unknown>;
}

function segments(row: Record<string, unknown>) {
  return (row.segments ?? {}) as Record<string, unknown>;
}

function costPerLead(costMicros: number, leads: number) {
  return leads > 0 ? costMicros / leads : null;
}

function emptySummary(dateRange: DateRange, currencyCode: string): AdsSummary {
  return {
    dateRange,
    currencyCode,
    costMicros: 0,
    clicks: 0,
    impressions: 0,
    ctr: 0,
    averageCpcMicros: 0,
    phoneLeads: 0,
    emailLeads: 0,
    totalLeads: 0,
    costPerLeadMicros: null,
  };
}

function classifyConversionAction(name: string): ConversionAction["kind"] {
  const normalized = name.toLocaleLowerCase("tr-TR");

  if (normalized.includes("telefon") || normalized.includes("phone") || normalized.includes("arama")) {
    return "phone";
  }

  if (
    normalized.includes("e-posta") ||
    normalized.includes("eposta") ||
    normalized.includes("email") ||
    normalized.includes("mail")
  ) {
    return "email";
  }

  return "other";
}

async function getAccount() {
  const rows = await googleAdsSearch<{
    customer?: {
      descriptiveName?: string;
      timeZone?: string;
      currencyCode?: string;
    };
  }>(`
    SELECT
      customer.descriptive_name,
      customer.time_zone,
      customer.currency_code
    FROM customer
    LIMIT 1
  `);
  const config = getConfig();
  const customer = rows[0]?.customer ?? {};

  return {
    name: customer.descriptiveName || "Google Ads hesabı",
    customerId: normalizeCustomerId(config.customerId),
    loginCustomerId: config.loginCustomerId ? normalizeCustomerId(config.loginCustomerId) : null,
    timeZone: customer.timeZone || "Europe/Istanbul",
    currencyCode: customer.currencyCode || "TRY",
  };
}

async function getConversionActions() {
  const rows = await googleAdsSearch<{
    conversionAction?: {
      resourceName?: string;
      id?: string;
      name?: string;
      status?: string;
    };
  }>(`
    SELECT
      conversion_action.resource_name,
      conversion_action.id,
      conversion_action.name,
      conversion_action.status
    FROM conversion_action
  `);

  return rows.map((row) => {
    const action = row.conversionAction ?? {};
    const name = action.name || "Conversion action";

    return {
      resourceName: action.resourceName || "",
      id: String(action.id ?? ""),
      name,
      status: action.status || "UNKNOWN",
      kind: classifyConversionAction(name),
    } satisfies ConversionAction;
  });
}

async function getSummary(range: DateRange, currencyCode: string, conversionActions: ConversionAction[]) {
  const campaignRows = await googleAdsMetricsSearch<Record<string, unknown>>(`
    SELECT
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros
    FROM campaign
    WHERE segments.date BETWEEN '${range.startDate}' AND '${range.endDate}'
      AND campaign.status != 'REMOVED'
  `);
  const conversionRows = await googleAdsMetricsSearch<Record<string, unknown>>(`
    SELECT
      segments.conversion_action,
      metrics.conversions
    FROM campaign
    WHERE segments.date BETWEEN '${range.startDate}' AND '${range.endDate}'
      AND campaign.status != 'REMOVED'
  `);
  const summary = campaignRows.reduce<AdsSummary>(
    (acc, row) => {
      const rowMetrics = metrics(row);
      acc.costMicros += numberValue(rowMetrics.costMicros);
      acc.clicks += numberValue(rowMetrics.clicks);
      acc.impressions += numberValue(rowMetrics.impressions);
      return acc;
    },
    emptySummary(range, currencyCode),
  );

  for (const row of conversionRows) {
    const actionResource = stringValue(segments(row).conversionAction);
    const action = conversionActions.find((item) => item.resourceName === actionResource);
    const conversions = numberValue(metrics(row).conversions);

    if (action?.kind === "phone") {
      summary.phoneLeads += conversions;
    } else if (action?.kind === "email") {
      summary.emailLeads += conversions;
    }
  }

  summary.totalLeads = summary.phoneLeads + summary.emailLeads;
  summary.ctr = summary.impressions > 0 ? summary.clicks / summary.impressions : 0;
  summary.averageCpcMicros = summary.clicks > 0 ? summary.costMicros / summary.clicks : 0;
  summary.costPerLeadMicros = costPerLead(summary.costMicros, summary.totalLeads);

  return summary;
}

async function getCampaignRows(range: DateRange) {
  const rows = await googleAdsMetricsSearch<Record<string, unknown>>(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign_budget.amount_micros,
      metrics.clicks,
      metrics.impressions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE segments.date BETWEEN '${range.startDate}' AND '${range.endDate}'
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
    LIMIT 50
  `);

  return rows.map((row) => {
    const rowCampaign = campaign(row);
    const rowBudget = campaignBudget(row);
    const rowMetrics = metrics(row);
    const conversions = numberValue(rowMetrics.conversions);
    const costMicros = numberValue(rowMetrics.costMicros);

    return {
      id: stringValue(rowCampaign.id),
      name: stringValue(rowCampaign.name, "Kampanya"),
      status: stringValue(rowCampaign.status, "UNKNOWN"),
      dailyBudgetMicros: numberValue(rowBudget.amountMicros),
      costMicros,
      clicks: numberValue(rowMetrics.clicks),
      impressions: numberValue(rowMetrics.impressions),
      ctr: numberValue(rowMetrics.ctr),
      averageCpcMicros: numberValue(rowMetrics.averageCpc),
      conversions,
      costPerLeadMicros: costPerLead(costMicros, conversions),
    } satisfies CampaignRow;
  });
}

async function getKeywordRows(range: DateRange) {
  const rows = await googleAdsMetricsSearch<Record<string, unknown>>(`
    SELECT
      ad_group_criterion.keyword.text,
      campaign.name,
      ad_group.name,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.status,
      metrics.clicks,
      metrics.impressions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM keyword_view
    WHERE segments.date BETWEEN '${range.startDate}' AND '${range.endDate}'
      AND ad_group_criterion.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
    LIMIT 50
  `);

  return rows.map((row) => {
    const keyword = (criterion(row).keyword ?? {}) as Record<string, unknown>;
    const rowMetrics = metrics(row);

    return {
      text: stringValue(keyword.text, "-"),
      campaignName: stringValue(campaign(row).name, "-"),
      adGroupName: stringValue(adGroup(row).name, "-"),
      matchType: stringValue(keyword.matchType, "-"),
      status: stringValue(criterion(row).status, "UNKNOWN"),
      costMicros: numberValue(rowMetrics.costMicros),
      clicks: numberValue(rowMetrics.clicks),
      impressions: numberValue(rowMetrics.impressions),
      ctr: numberValue(rowMetrics.ctr),
      averageCpcMicros: numberValue(rowMetrics.averageCpc),
      conversions: numberValue(rowMetrics.conversions),
    } satisfies KeywordRow;
  });
}

async function getSearchTermRows(range: DateRange) {
  const rows = await googleAdsMetricsSearch<Record<string, unknown>>(`
    SELECT
      search_term_view.search_term,
      search_term_view.status,
      segments.keyword.info.match_type,
      campaign.name,
      ad_group.name,
      metrics.clicks,
      metrics.impressions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE segments.date BETWEEN '${range.startDate}' AND '${range.endDate}'
    ORDER BY metrics.clicks DESC
    LIMIT 50
  `);

  return rows.map((row) => {
    const keyword = ((segments(row).keyword as Record<string, unknown> | undefined)?.info ??
      {}) as Record<string, unknown>;
    const rowMetrics = metrics(row);
    return {
      term: stringValue(searchTermView(row).searchTerm, "-"),
      campaignName: stringValue(campaign(row).name, "-"),
      adGroupName: stringValue(adGroup(row).name, "-"),
      matchType: stringValue(keyword.matchType, "-"),
      status: stringValue(searchTermView(row).status, "UNKNOWN"),
      costMicros: numberValue(rowMetrics.costMicros),
      clicks: numberValue(rowMetrics.clicks),
      impressions: numberValue(rowMetrics.impressions),
      ctr: numberValue(rowMetrics.ctr),
      averageCpcMicros: numberValue(rowMetrics.averageCpc),
      conversions: numberValue(rowMetrics.conversions),
    } satisfies SearchTermRow;
  });
}

async function buildAdsOverviewData(): Promise<AdsOverviewData> {
  const account = await getAccount();
  const ranges = buildAdsDateRanges(account.timeZone);
  const conversionActions = await getConversionActions();
  const [today, yesterday, last7Days, campaigns] = await Promise.all([
    getSummary(ranges.today, account.currencyCode, conversionActions),
    getSummary(ranges.yesterday, account.currencyCode, conversionActions),
    getSummary(ranges.last7Days, account.currencyCode, conversionActions),
    getCampaignRows(ranges.today),
  ]);

  return {
    account,
    today,
    yesterday,
    last7Days,
    conversionActions,
    campaigns,
  };
}

async function buildAdsDashboardData(): Promise<AdsDashboardData> {
  const overview = (await getCachedAdsOverviewData()).data;
  const ranges = buildAdsDateRanges(overview.account.timeZone);
  const [campaigns, keywords, searchTerms] = await Promise.all([
    getCampaignRows(ranges.last7Days),
    getKeywordRows(ranges.last7Days),
    getSearchTermRows(ranges.last7Days),
  ]);

  return {
    ...overview,
    campaigns,
    keywords,
    searchTerms,
  };
}

async function getCachedAdsOverviewData(): Promise<RuntimeCacheResult<AdsOverviewData>> {
  "use cache: remote";
  cacheTag("google-ads");
  cacheLife({ stale: 30, revalidate: 300, expire: 3600 });

  return {
    data: await buildAdsOverviewData(),
    cachedAt: new Date().toISOString(),
    stale: false,
    error: null,
    ttlMs: ADS_OVERVIEW_CACHE_MS,
  };
}

async function getCachedAdsDashboardData() {
  "use cache: remote";
  cacheTag("google-ads");
  cacheLife({ stale: 30, revalidate: 300, expire: 3600 });
  return buildAdsDashboardData();
}

export async function getAdsOverviewData(_options: {
  refresh?: boolean;
} = {}): Promise<RuntimeCacheResult<AdsOverviewData>> {
  void _options.refresh;
  return getCachedAdsOverviewData();
}

export async function getAdsDashboardData(_options: {
  refresh?: boolean;
} = {}): Promise<AdsDashboardData> {
  void _options.refresh;
  return getCachedAdsDashboardData();
}

export async function getAdsDailyReportData(accountTimeZone?: string) {
  const account = await getAccount();
  const yesterday = addDays(dateInTimeZone(new Date(), accountTimeZone || account.timeZone), -1);
  const range = {
    label: "Dün",
    startDate: yesterday,
    endDate: yesterday,
  };
  const conversionActions = await getConversionActions();
  const [ads, keywords, searchTerms] = await Promise.all([
    getSummary(range, account.currencyCode, conversionActions),
    getKeywordRows(range),
    getSearchTermRows(range),
  ]);

  return {
    account,
    ads,
    keywords,
    searchTerms,
  };
}
