import "server-only";

import { addDays, dateInTimeZone } from "./dates";
import { getRequiredEnv } from "./env";
import type { AnalyticsDashboardData, AnalyticsSummary, DateRange } from "./types";

const METRIC = "vercel.analytics_pageview.count";
const ROLLUP = "vercel_analytics_pageview_count_sum";
const OLD_SITE_HOST = "vakitmatik.org";
const TIME_ZONE = "Europe/Istanbul";

type MetricsRow = {
  timestamp?: string;
  referrer_hostname?: string;
  request_path?: string;
  [ROLLUP]?: number;
};

type MetricsResponse = {
  summary?: MetricsRow[];
  data?: MetricsRow[];
};

type WebAnalyticsError = Error & {
  status?: number;
};

type WebAnalyticsEventCountResponse = {
  data?: {
    count?: number;
    visitors?: number;
  };
  error?: {
    message?: string;
  };
  message?: string;
};

function startOfIstanbulDayUtc(date: string) {
  return `${addDays(date, -1)}T21:00:00.000Z`;
}

function endExclusiveIstanbulDayUtc(date: string) {
  return `${date}T21:00:00.000Z`;
}

function normalizeReferrer(value: string | null | undefined) {
  return (value ?? "").replace(/^www\./, "");
}

function pageviewCount(row: MetricsRow | undefined) {
  const value = row?.[ROLLUP];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

async function queryAnalytics({
  dateRange,
  groupBy,
  filter,
  limit = 10,
}: {
  dateRange: DateRange;
  groupBy?: string[];
  filter?: string;
  limit?: number;
}) {
  const token = getRequiredEnv("VERCEL_API_TOKEN");
  const teamId = getRequiredEnv("VERCEL_TEAM_ID");
  const projectId = getRequiredEnv("VERCEL_ANALYTICS_PROJECT_ID");
  const filters = ["environment eq 'production'", filter].filter(Boolean);
  const response = await fetch("https://api.vercel.com/v2/observability/query", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      scope: {
        type: "project",
        ownerId: teamId,
        projectIds: [projectId],
      },
      metric: METRIC,
      aggregation: "sum",
      startTime: startOfIstanbulDayUtc(dateRange.startDate),
      endTime: endExclusiveIstanbulDayUtc(dateRange.endDate),
      granularity: { days: 1 },
      bucketTimezone: TIME_ZONE,
      ...(groupBy && groupBy.length > 0 ? { groupBy } : {}),
      ...(filters.length > 0 ? { filter: filters.map((item) => `(${item})`).join(" and ") } : {}),
      limit,
    }),
  });

  const payload = (await response.json()) as MetricsResponse & {
    error?: { message?: string };
    message?: string;
  };

  if (!response.ok) {
    throw new Error(payload.error?.message || payload.message || "Vercel Analytics verisi alınamadı");
  }

  return payload;
}

async function pageviewsFor(dateRange: DateRange, filter?: string) {
  const payload = await queryAnalytics({
    dateRange,
    filter,
    limit: 1,
  });

  return pageviewCount(payload.summary?.[0]);
}

async function queryWebAnalyticsEventsCount(dateRange: DateRange) {
  const token = getRequiredEnv("VERCEL_API_TOKEN");
  const teamId = getRequiredEnv("VERCEL_TEAM_ID");
  const projectId = getRequiredEnv("VERCEL_ANALYTICS_PROJECT_ID");
  const url = new URL("https://api.vercel.com/v1/query/web-analytics/events/count");

  url.searchParams.set("teamId", teamId);
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("since", startOfIstanbulDayUtc(dateRange.startDate));
  url.searchParams.set("until", endExclusiveIstanbulDayUtc(dateRange.endDate));
  url.searchParams.set("filter", "eventName eq 'old_site_visit'");

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const payload = (await response.json()) as WebAnalyticsEventCountResponse;

  if (!response.ok) {
    const error = new Error(payload.error?.message || payload.message || "Vercel custom event verisi alınamadı") as WebAnalyticsError;
    error.status = response.status;
    throw error;
  }

  return {
    count: typeof payload.data?.count === "number" ? payload.data.count : 0,
    visitors: typeof payload.data?.visitors === "number" ? payload.data.visitors : 0,
  };
}

async function oldSiteTrackedVisitsFor(dateRange: DateRange) {
  try {
    const data = await queryWebAnalyticsEventsCount(dateRange);

    return {
      count: data.count,
      visitors: data.visitors,
      unavailableReason: null,
    };
  } catch (error) {
    const status = (error as WebAnalyticsError).status;

    if (status === 402 || status === 403) {
      return {
        count: null,
        visitors: null,
        unavailableReason: "Vercel Web Analytics custom event/UTM sorgusu mevcut planda kapalı.",
      };
    }

    return {
      count: null,
      visitors: null,
      unavailableReason: error instanceof Error ? error.message : "Vercel custom event verisi alınamadı.",
    };
  }
}

async function topReferrersFor(dateRange: DateRange) {
  const payload = await queryAnalytics({
    dateRange,
    groupBy: ["referrer_hostname"],
    limit: 8,
  });
  const totals = new Map<string, number>();

  for (const row of payload.summary ?? []) {
    const referrerHostname = normalizeReferrer(row.referrer_hostname) || "direct";
    const current = totals.get(referrerHostname) ?? 0;
    totals.set(referrerHostname, current + pageviewCount(row));
  }

  return [...totals.entries()]
    .map(([referrerHostname, pageviews]) => ({
      referrerHostname,
      pageviews,
    }))
    .filter((row) => row.pageviews > 0)
    .sort((a, b) => b.pageviews - a.pageviews);
}

async function summaryFor(dateRange: DateRange): Promise<AnalyticsSummary> {
  const [totalPageviews, oldSitePageviews, topReferrers, oldSiteTracked] = await Promise.all([
    pageviewsFor(dateRange),
    pageviewsFor(dateRange, `(referrer_hostname eq '${OLD_SITE_HOST}' or referrer_hostname eq 'www.${OLD_SITE_HOST}')`),
    topReferrersFor(dateRange),
    oldSiteTrackedVisitsFor(dateRange),
  ]);

  return {
    dateRange,
    totalPageviews,
    oldSitePageviews,
    oldSiteTrackedVisits: oldSiteTracked.count,
    oldSiteTrackedVisitors: oldSiteTracked.visitors,
    oldSiteTrackingUnavailableReason: oldSiteTracked.unavailableReason,
    directPageviews: topReferrers.find((row) => row.referrerHostname === "direct")?.pageviews ?? 0,
    topReferrers,
  };
}

function buildAnalyticsDateRanges(now = new Date()) {
  const today = dateInTimeZone(now, TIME_ZONE);
  const yesterday = addDays(today, -1);

  return {
    today: {
      label: "Bugün",
      startDate: today,
      endDate: today,
    },
    yesterday: {
      label: "Dün",
      startDate: yesterday,
      endDate: yesterday,
    },
    last7Days: {
      label: "Son 7 gün",
      startDate: addDays(today, -6),
      endDate: today,
    },
  } satisfies Record<string, DateRange>;
}

export async function getAnalyticsDashboardData(): Promise<AnalyticsDashboardData> {
  const ranges = buildAnalyticsDateRanges();
  const [today, yesterday, last7Days] = await Promise.all([
    summaryFor(ranges.today),
    summaryFor(ranges.yesterday),
    summaryFor(ranges.last7Days),
  ]);

  return {
    today,
    yesterday,
    last7Days,
  };
}
