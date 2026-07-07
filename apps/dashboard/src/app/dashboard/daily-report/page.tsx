import { buildDailyReport } from "@/lib/report";
import { toDataState } from "@/lib/safe-data";
import {
  compactUrl,
  formatDateTimeTr,
  formatInteger,
  formatMoneyMicros,
  formatPercent,
} from "@/lib/format";
import { AdsSummaryGrid, DataStateView, EmptyState, Panel } from "@/components/ui";

export default async function DailyReportPage() {
  const state = await toDataState(buildDailyReport);

  return (
    <div className="pageStack">
      <div className="pageHeader">
        <div>
          <h1>Günlük Rapor</h1>
          <p>Bu ekran storage kullanmaz; e-posta raporu için üretilecek özet canlı API verisinden yeniden hesaplanır.</p>
        </div>
      </div>

      <DataStateView state={state} title="Günlük rapor hesaplanamadı">
        {(report) => (
          <>
            <Panel
              action={<span className="metaLine">Üretim: {formatDateTimeTr(report.generatedAt)}</span>}
              title={`Rapor tarihi: ${report.reportDate}`}
            >
              <AdsSummaryGrid summary={report.ads} />
            </Panel>

            <div className="splitGrid">
              <Panel title="Keyword ve search term notları">
                <div className="reportBody">
                  <div className="listRow">
                    <div>
                      <strong>En iyi keyword</strong>
                      <span className="metaLine">{report.topKeyword?.text ?? "-"}</span>
                    </div>
                    <span className="mono">{formatInteger(report.topKeyword?.conversions ?? 0)} conv.</span>
                  </div>
                  <div className="listRow">
                    <div>
                      <strong>Zayıf keyword</strong>
                      <span className="metaLine">{report.weakKeyword?.text ?? "-"}</span>
                    </div>
                    <span className="mono">
                      {formatMoneyMicros(report.weakKeyword?.costMicros ?? null, report.ads.currencyCode)}
                    </span>
                  </div>
                  <div className="listRow">
                    <div>
                      <strong>En çok tıklanan search term</strong>
                      <span className="metaLine">{report.topSearchTerm?.term ?? "-"}</span>
                    </div>
                    <span className="mono">{formatInteger(report.topSearchTerm?.clicks ?? 0)} click</span>
                  </div>
                </div>
              </Panel>

              <Panel title="SEO özeti">
                <div className="reportBody">
                  <div className="listRow">
                    <div>
                      <strong>Organik tıklama</strong>
                      <span className="metaLine">{report.seo.dateRange.startDate} / {report.seo.dateRange.endDate}</span>
                    </div>
                    <span className="mono">{formatInteger(report.seo.summary.clicks)}</span>
                  </div>
                  <div className="listRow">
                    <div>
                      <strong>Organik gösterim</strong>
                      <span className="metaLine">CTR {formatPercent(report.seo.summary.ctr)}</span>
                    </div>
                    <span className="mono">{formatInteger(report.seo.summary.impressions)}</span>
                  </div>
                  <div className="listRow">
                    <div>
                      <strong>En iyi sayfa</strong>
                      <span className="metaLine">{compactUrl(report.seo.topPages[0]?.keys[0] ?? "-")}</span>
                    </div>
                    <span className="mono">{formatInteger(report.seo.topPages[0]?.clicks ?? 0)}</span>
                  </div>
                </div>
              </Panel>
            </div>

            <Panel title="Site trafiği">
              <div className="reportBody">
                <div className="listRow">
                  <div>
                    <strong>Dünkü ziyaret</strong>
                    <span className="metaLine">
                      {report.analytics.yesterday.dateRange.startDate} / {report.analytics.yesterday.dateRange.endDate}
                    </span>
                  </div>
                  <span className="mono">{formatInteger(report.analytics.yesterday.totalPageviews)}</span>
                </div>
                <div className="listRow">
                  <div>
                    <strong>Eski siteden gelen referrer</strong>
                    <span className="metaLine">Kesin referrer: vakitmatik.org</span>
                  </div>
                  <span className="mono">{formatInteger(report.analytics.yesterday.oldSitePageviews)}</span>
                </div>
                <div className="listRow">
                  <div>
                    <strong>Eski site takip eventi</strong>
                    <span className="metaLine">
                      {report.analytics.yesterday.oldSiteTrackingUnavailableReason ?? "old_site_visit custom event"}
                    </span>
                  </div>
                  <span className="mono">
                    {report.analytics.yesterday.oldSiteTrackedVisits === null
                      ? "-"
                      : formatInteger(report.analytics.yesterday.oldSiteTrackedVisits)}
                  </span>
                </div>
                <div className="listRow">
                  <div>
                    <strong>Son 7 gün eski site referrer</strong>
                    <span className="metaLine">
                      {report.analytics.last7Days.dateRange.startDate} / {report.analytics.last7Days.dateRange.endDate}
                    </span>
                  </div>
                  <span className="mono">{formatInteger(report.analytics.last7Days.oldSitePageviews)}</span>
                </div>
              </div>
            </Panel>

            <Panel title="Negatif kelime önerileri">
              {report.negativeSuggestions.length === 0 ? (
                <EmptyState body="Dünkü search terms içinde otomatik öneri kuralına takılan satır yok." title="Öneri yok" />
              ) : (
                <div className="stackList">
                  {report.negativeSuggestions.map((row) => (
                    <div className="listRow" key={`${row.campaignName}:${row.term}`}>
                      <div>
                        <strong>{row.term}</strong>
                        <span className="metaLine">{row.campaignName} / {row.recommendation}</span>
                      </div>
                      <span className="mono">{formatInteger(row.clicks)} click</span>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            <Panel title="Bugünkü manuel aksiyonlar">
              <ul className="actionList">
                {report.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </Panel>
          </>
        )}
      </DataStateView>
    </div>
  );
}
