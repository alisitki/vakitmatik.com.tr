import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { buildSearchConsoleDateRange, isSameOrAfter } from "./dates";
import { getRequiredEnv } from "./env";
import { getGoogleAccessToken } from "./google-auth";
import type { RuntimeCacheResult } from "./runtime-cache";
import type {
  DateRange,
  SearchConsoleDashboardData,
  SearchConsoleMetricRow,
  SearchConsoleOverviewData,
  SeoUrlStatus,
} from "./types";

const SEARCH_CONSOLE_OVERVIEW_CACHE_MS = 6 * 60 * 60 * 1000;

const SEO_URLS = [
  {
    title: "Cami saati",
    url: "https://www.vakitmatik.com.tr/cami-saati/",
  },
  {
    title: "Vakitmatik cami saati",
    url: "https://www.vakitmatik.com.tr/urunler/vakitmatik-cami-saati/",
  },
  {
    title: "Dijital cami saati",
    url: "https://www.vakitmatik.com.tr/urunler/dijital-cami-saati/",
  },
  {
    title: "Cami saati fiyatları",
    url: "https://www.vakitmatik.com.tr/cami-saati-fiyatlari/",
  },
  {
    title: "Vakitmatik ayarlama",
    url: "https://www.vakitmatik.com.tr/destek/vakitmatik-ayarlama/",
  },
] as const;

type SearchAnalyticsResponse = {
  rows?: {
    keys?: string[];
    clicks?: number;
    impressions?: number;
    ctr?: number;
    position?: number;
  }[];
  responseAggregationType?: string;
  metadata?: {
    firstIncompleteDate?: string;
    firstIncompleteHour?: string;
  };
  error?: {
    message?: string;
  };
};

type InspectionCacheValue = SeoUrlStatus["inspection"];

const inspectionCache = new Map<string, InspectionCacheValue>();
const INSPECTION_CACHE_MS = 7 * 24 * 60 * 60 * 1000;

function getConfig() {
  return {
    clientId: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"),
    clientSecret: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET"),
    refreshToken: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN"),
    siteUrl: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_SITE_URL"),
  };
}

async function accessToken() {
  const config = getConfig();

  return getGoogleAccessToken({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken,
  });
}

function searchAnalyticsEndpoint(siteUrl: string) {
  return `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    siteUrl,
  )}/searchAnalytics/query`;
}

function toMetricRow(row: NonNullable<SearchAnalyticsResponse["rows"]>[number]): SearchConsoleMetricRow {
  return {
    keys: row.keys ?? [],
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  };
}

async function querySearchAnalytics({
  range,
  dimensions,
  rowLimit,
  filters,
}: {
  range: DateRange;
  dimensions: string[];
  rowLimit: number;
  filters?: {
    dimension: string;
    expression: string;
    operator?: string;
  }[];
}) {
  const config = getConfig();
  const token = await accessToken();
  const response = await fetch(searchAnalyticsEndpoint(config.siteUrl), {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      startDate: range.startDate,
      endDate: range.endDate,
      dimensions,
      rowLimit,
      ...(filters
        ? {
            dimensionFilterGroups: [
              {
                filters,
              },
            ],
          }
        : {}),
    }),
  });
  const payload = (await response.json()) as SearchAnalyticsResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message || "Search Console query failed");
  }

  return payload;
}

function summarize(rows: SearchConsoleMetricRow[]) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.clicks += row.clicks;
      acc.impressions += row.impressions;
      acc.positionNumerator += row.position * row.impressions;
      return acc;
    },
    {
      clicks: 0,
      impressions: 0,
      positionNumerator: 0,
    },
  );

  return {
    clicks: totals.clicks,
    impressions: totals.impressions,
    ctr: totals.impressions > 0 ? totals.clicks / totals.impressions : 0,
    position: totals.impressions > 0 ? totals.positionNumerator / totals.impressions : 0,
  };
}

async function inspectUrl(url: string) {
  const cached = inspectionCache.get(url);
  const now = Date.now();

  if (cached?.cachedAt && now - new Date(cached.cachedAt).getTime() < INSPECTION_CACHE_MS) {
    return cached;
  }

  const config = getConfig();
  const token = await accessToken();
  const response = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      inspectionUrl: url,
      siteUrl: config.siteUrl,
      languageCode: "tr-TR",
    }),
  });
  const payload = (await response.json()) as {
    inspectionResult?: {
      indexStatusResult?: {
        verdict?: string;
        coverageState?: string;
        indexingState?: string;
        lastCrawlTime?: string;
        googleCanonical?: string;
        userCanonical?: string;
        pageFetchState?: string;
      };
    };
    error?: {
      message?: string;
    };
  };

  if (!response.ok) {
    const failed = {
      verdict: null,
      coverageState: null,
      indexingState: null,
      lastCrawlTime: null,
      googleCanonical: null,
      userCanonical: null,
      pageFetchState: null,
      cachedAt: new Date().toISOString(),
      error: payload.error?.message || "URL Inspection failed",
    };
    inspectionCache.set(url, failed);
    return failed;
  }

  const result = payload.inspectionResult?.indexStatusResult ?? {};
  const inspection = {
    verdict: result.verdict ?? null,
    coverageState: result.coverageState ?? null,
    indexingState: result.indexingState ?? null,
    lastCrawlTime: result.lastCrawlTime ?? null,
    googleCanonical: result.googleCanonical ?? null,
    userCanonical: result.userCanonical ?? null,
    pageFetchState: result.pageFetchState ?? null,
    cachedAt: new Date().toISOString(),
    error: null,
  };

  inspectionCache.set(url, inspection);
  return inspection;
}

async function urlMetrics(range: DateRange, url: string) {
  const response = await querySearchAnalytics({
    range,
    dimensions: ["page"],
    rowLimit: 1,
    filters: [
      {
        dimension: "page",
        operator: "equals",
        expression: url,
      },
    ],
  });
  const rows = (response.rows ?? []).map(toMetricRow);

  return summarize(rows);
}

async function buildSearchConsoleOverviewData(): Promise<SearchConsoleOverviewData> {
  const config = getConfig();
  const range = buildSearchConsoleDateRange();
  const [daily, queries, pages] = await Promise.all([
    querySearchAnalytics({
      range,
      dimensions: ["date"],
      rowLimit: 25,
    }),
    querySearchAnalytics({
      range,
      dimensions: ["query"],
      rowLimit: 50,
    }),
    querySearchAnalytics({
      range,
      dimensions: ["page"],
      rowLimit: 25,
    }),
  ]);
  const dailyRows = (daily.rows ?? []).map(toMetricRow);
  const queryRows = (queries.rows ?? []).map(toMetricRow);
  const pageRows = (pages.rows ?? []).map(toMetricRow);
  const availableDataThrough =
    dailyRows
      .map((row) => row.keys[0])
      .filter(Boolean)
      .filter((date) => isSameOrAfter(date, range.startDate))
      .sort()
      .at(-1) ?? null;
  const topQueriesByClicks = [...queryRows].sort((a, b) => b.clicks - a.clicks).slice(0, 10);
  const topQueriesByImpressions = [...queryRows].sort((a, b) => b.impressions - a.impressions).slice(0, 10);

  return {
    siteUrl: config.siteUrl,
    dateRange: range,
    availableDataThrough,
    summary: summarize(dailyRows),
    topQueriesByClicks,
    topQueriesByImpressions,
    topPages: [...pageRows].sort((a, b) => b.impressions - a.impressions).slice(0, 10),
  };
}

async function buildSearchConsoleDashboardData({
  includeInspection = true,
}: {
  includeInspection?: boolean;
} = {}): Promise<SearchConsoleDashboardData> {
  const overview = (await getCachedSearchConsoleOverviewData()).data;
  const seoUrls = await Promise.all(
    SEO_URLS.map(async (item) => {
      const metrics = await urlMetrics(overview.dateRange, item.url);
      const inspection = includeInspection
        ? await inspectUrl(item.url)
        : {
            verdict: null,
            coverageState: null,
            indexingState: null,
            lastCrawlTime: null,
            googleCanonical: null,
            userCanonical: null,
            pageFetchState: null,
            cachedAt: null,
            error: null,
          };

      return {
        ...item,
        ...metrics,
        inspection,
      } satisfies SeoUrlStatus;
    }),
  );

  return {
    ...overview,
    seoUrls,
  };
}

async function getCachedSearchConsoleOverviewData(): Promise<RuntimeCacheResult<SearchConsoleOverviewData>> {
  "use cache: remote";
  cacheTag("search-console");
  cacheLife({ stale: 300, revalidate: 21600, expire: 604800 });

  return {
    data: await buildSearchConsoleOverviewData(),
    cachedAt: new Date().toISOString(),
    stale: false,
    error: null,
    ttlMs: SEARCH_CONSOLE_OVERVIEW_CACHE_MS,
  };
}

async function getCachedSearchConsoleDashboardData(includeInspection: boolean) {
  "use cache: remote";
  cacheTag("search-console");
  cacheLife({ stale: 300, revalidate: 21600, expire: 604800 });
  return buildSearchConsoleDashboardData({ includeInspection });
}

export async function getSearchConsoleOverviewData(_options: {
  refresh?: boolean;
} = {}): Promise<RuntimeCacheResult<SearchConsoleOverviewData>> {
  void _options.refresh;
  return getCachedSearchConsoleOverviewData();
}

export async function getSearchConsoleDashboardData({
  includeInspection = true,
  refresh: _refresh = false,
}: {
  includeInspection?: boolean;
  refresh?: boolean;
} = {}): Promise<SearchConsoleDashboardData> {
  void _refresh;
  return getCachedSearchConsoleDashboardData(includeInspection);
}
