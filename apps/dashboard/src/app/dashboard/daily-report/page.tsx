import { RefreshButton } from "@/components/refresh-button";
import { DataStateView, MetricCard, Panel } from "@/components/ui";
import { compactUrl, formatDateTimeTr, formatInteger, formatMoneyMicros, formatPercent } from "@/lib/format";
import { buildDailyReport } from "@/lib/report";
import { toDataState } from "@/lib/safe-data";

type PageProps = {
  searchParams?: Promise<{
    refresh?: string;
  }>;
};

export default async function DailyReportPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const refresh = Boolean(params?.refresh);
  const state = await toDataState(() => buildDailyReport({ refresh }));

  return (
    <div className="pageStack">
      <div className="pageHeader">
        <div>
          <span className="pageEyebrow">GÜNLÜK ÖZET</span>
          <h1>Dünün raporu</h1>
          <p>Her sabah gönderilen performans e-postasının ekran görünümü.</p>
        </div>
        <RefreshButton />
      </div>

      <DataStateView state={state} title="Günlük rapor hesaplanamadı">
        {(report) => {
          const conversionRate = report.ads.clicks > 0 ? report.ads.totalLeads / report.ads.clicks : 0;

          return (
            <>
              <Panel
                action={<span className="metaLine">{formatDateTimeTr(report.generatedAt)} tarihinde üretildi</span>}
                title={report.reportDate}
              >
                <div className="metricGrid primaryMetrics">
                  <MetricCard detail="Google Ads" label="Harcama" value={formatMoneyMicros(report.ads.costMicros, report.ads.currencyCode)} />
                  <MetricCard detail="Telefon + e-posta" label="Lead" tone="good" value={formatInteger(report.ads.totalLeads)} />
                  <MetricCard detail="Harcama / lead" label="Lead maliyeti" value={formatMoneyMicros(report.ads.costPerLeadMicros, report.ads.currencyCode)} />
                  <MetricCard detail="Lead / tıklama" label="Dönüşüm" value={formatPercent(conversionRate)} />
                </div>
              </Panel>

              <div className="splitGrid detailSplit">
                <Panel title="Reklam detayları">
                  <div className="factList">
                    <div className="factRow"><span>En çok dönüşüm alan kelime</span><strong>{report.topKeyword?.text ?? "-"}</strong><b>{formatInteger(report.topKeyword?.conversions ?? 0)} lead</b></div>
                    <div className="factRow"><span>En çok tıklanan arama</span><strong>{report.topSearchTerm?.term ?? "-"}</strong><b>{formatInteger(report.topSearchTerm?.clicks ?? 0)} tıklama</b></div>
                    <div className="factRow"><span>Dönüşümsüz en yüksek harcama</span><strong>{report.weakKeyword?.text ?? "-"}</strong><b>{formatMoneyMicros(report.weakKeyword?.costMicros ?? null, report.ads.currencyCode)}</b></div>
                  </div>
                </Panel>

                <Panel title="Organik arama">
                  <div className="factList">
                    <div className="factRow"><span>Tıklama</span><strong>Google Search</strong><b>{formatInteger(report.seo.summary.clicks)}</b></div>
                    <div className="factRow"><span>Gösterim</span><strong>CTR {formatPercent(report.seo.summary.ctr)}</strong><b>{formatInteger(report.seo.summary.impressions)}</b></div>
                    <div className="factRow"><span>En çok tıklanan sayfa</span><strong>{compactUrl(report.seo.topPages[0]?.keys[0] ?? "-")}</strong><b>{formatInteger(report.seo.topPages[0]?.clicks ?? 0)}</b></div>
                  </div>
                </Panel>
              </div>

              <Panel title="Site trafiği">
                <div className="trafficGrid">
                  <div><span>Dünkü ziyaret</span><strong>{formatInteger(report.analytics.yesterday.totalPageviews)}</strong><small>Tüm sayfa görüntülemeleri</small></div>
                  <div><span>Eski siteden gelen</span><strong>{formatInteger(report.analytics.yesterday.oldSitePageviews)}</strong><small>vakitmatik.org referrer</small></div>
                  <div><span>Son 7 gün</span><strong>{formatInteger(report.analytics.last7Days.totalPageviews)}</strong><small>Toplam sayfa görüntüleme</small></div>
                </div>
              </Panel>
            </>
          );
        }}
      </DataStateView>
    </div>
  );
}
