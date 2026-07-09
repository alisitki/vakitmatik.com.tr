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

function buildActions(report: Omit<DailyReport, "actions">) {
  const actions: string[] = [];

  if (report.ads.clicks === 0 && report.ads.impressions === 0) {
    actions.push("Google Ads tarafında dün veri yok; kampanya yayında değilse harcama başlatılmadan önce conversion ölçümünü tekrar kontrol et.");
  }

  if (report.ads.clicks > 0 && report.ads.totalLeads === 0) {
    actions.push("Tıklama var ama lead yok; search terms ve landing sayfa eşleşmesini kontrol et.");
  }

  if (report.negativeSuggestions.length > 0) {
    actions.push(`${report.negativeSuggestions.length} search term negatif kelime adayı olarak incelenmeli.`);
  }

  if (report.seo.summary.impressions === 0) {
    actions.push("Search Console tarafında yeni gösterim yok; yeni SEO URL'lerin index durumunu dashboard SEO ekranından kontrol et.");
  } else if (report.seo.summary.clicks === 0) {
    actions.push("SEO gösterim var ama tıklama yok; en çok gösterim alan sorgularda title/description niyetini kontrol et.");
  }

  if (report.analytics.yesterday.oldSitePageviews > 0) {
    actions.push(
      `Eski siteden dün referrer ile doğrulanan ${report.analytics.yesterday.oldSitePageviews} ziyaret geldi; bu trafiğin telefon/e-posta lead'e dönüp dönmediğini izleyin.`,
    );
  }

  if (report.analytics.yesterday.oldSiteTrackingUnavailableReason) {
    actions.push("Eski site UTM/custom event kırılımı mevcut Vercel planında okunamıyor; direkt/bilinmeyen trafik eski site olarak yorumlanmamalı.");
  }

  if (actions.length === 0) {
    actions.push("Kritik aksiyon görünmüyor; günlük search terms ve SEO sorgu trendini rutin kontrol et.");
  }

  return actions;
}

export async function buildDailyReport({
  refresh = false,
}: {
  refresh?: boolean;
} = {}): Promise<DailyReport> {
  const [adsPayload, analytics] = await Promise.all([getAdsDailyReportData(), getAnalyticsDashboardData({ refresh })]);
  const reportDate = adsPayload.ads.dateRange.startDate || addDays(dateInTimeZone(new Date(), adsPayload.account.timeZone), -1);
  const seo = await getSearchConsoleDashboardData({
    includeInspection: false,
    refresh,
  });
  const negativeSuggestions = adsPayload.searchTerms.filter((row) => row.recommendation).slice(0, 5);
  const reportWithoutActions = {
    reportDate,
    generatedAt: new Date().toISOString(),
    ads: adsPayload.ads,
    analytics,
    topKeyword: bestKeyword(adsPayload.keywords),
    weakKeyword: weakKeyword(adsPayload.keywords),
    topSearchTerm: topSearchTerm(adsPayload.searchTerms),
    negativeSuggestions,
    seo,
  };

  return {
    ...reportWithoutActions,
    actions: buildActions(reportWithoutActions),
  };
}
