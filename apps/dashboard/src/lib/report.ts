import "server-only";

import { addDays, dateInTimeZone } from "./dates";
import { getAdsDailyReportData } from "./google-ads";
import { getSearchConsoleDashboardData } from "./search-console";
import { getAnalyticsDashboardData } from "./vercel-analytics";
import type { DailyReport, KeywordRow, SearchTermRow } from "./types";

function bestKeyword(rows: KeywordRow[]) {
  return [...rows]
    .filter((row) => row.clicks > 0 || row.conversions > 0)
    .sort((a, b) => b.conversions - a.conversions || b.clicks - a.clicks || b.impressions - a.impressions)[0] ?? null;
}

function weakKeyword(rows: KeywordRow[]) {
  return [...rows]
    .filter((row) => row.clicks >= 2 && row.conversions === 0)
    .sort((a, b) => b.costMicros - a.costMicros || b.clicks - a.clicks)[0] ?? null;
}

function topSearchTerm(rows: SearchTermRow[]) {
  return [...rows].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)[0] ?? null;
}

export async function buildDailyReport({
  refresh = false,
}: {
  refresh?: boolean;
} = {}): Promise<DailyReport> {
  const [adsPayload, analytics, seo] = await Promise.all([
    getAdsDailyReportData(),
    getAnalyticsDashboardData({ refresh }),
    getSearchConsoleDashboardData({ includeInspection: false, refresh }),
  ]);
  const reportDate = adsPayload.ads.dateRange.startDate || addDays(dateInTimeZone(new Date(), adsPayload.account.timeZone), -1);
  return {
    reportDate,
    generatedAt: new Date().toISOString(),
    ads: adsPayload.ads,
    analytics,
    topKeyword: bestKeyword(adsPayload.keywords),
    weakKeyword: weakKeyword(adsPayload.keywords),
    topSearchTerm: topSearchTerm(adsPayload.searchTerms),
    seo,
  };
}
