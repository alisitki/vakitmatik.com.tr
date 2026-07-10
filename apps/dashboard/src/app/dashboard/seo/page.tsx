import { RefreshButton } from "@/components/refresh-button";
import { DataStateView, EmptyState, MetricCard, Panel } from "@/components/ui";
import { compactUrl, formatDateTimeTr, formatInteger, formatNumber, formatPercent } from "@/lib/format";
import { getSearchConsoleDashboardData } from "@/lib/search-console";
import { toDataState } from "@/lib/safe-data";

type PageProps = {
  searchParams?: Promise<{
    refresh?: string;
  }>;
};

function verdictTone(verdict: string | null) {
  if (verdict === "PASS") return "good";
  if (verdict) return "warn";
  return "";
}

export default async function SeoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const refresh = Boolean(params?.refresh);
  const state = await toDataState(() => getSearchConsoleDashboardData({ includeInspection: true, refresh }));

  return (
    <div className="pageStack">
      <div className="pageHeader">
        <div>
          <span className="pageEyebrow">ORGANİK ARAMA</span>
          <h1>SEO görünürlüğü</h1>
          <p>Google aramalarında hangi sorgu ve sayfaların trafik getirdiği.</p>
        </div>
        <RefreshButton />
      </div>

      <DataStateView state={state} title="Search Console verisi alınamadı">
        {(seo) => (
          <>
            <Panel
              action={<span className="metaLine">Son veri: {seo.availableDataThrough ?? "-"}</span>}
              title="Son 7 gün"
            >
              <div className="metricGrid primaryMetrics">
                <MetricCard detail="Google Search" label="Tıklama" value={formatInteger(seo.summary.clicks)} />
                <MetricCard detail="Arama sonuçlarında görünüm" label="Gösterim" value={formatInteger(seo.summary.impressions)} />
                <MetricCard detail="Tıklama / gösterim" label="CTR" value={formatPercent(seo.summary.ctr)} />
                <MetricCard detail="Ağırlıklı ortalama" label="Pozisyon" value={seo.summary.position ? formatNumber(seo.summary.position, 1) : "-"} />
              </div>
            </Panel>

            <div className="splitGrid detailSplit">
              <Panel action={<span className="metaLine">En çok tıklanan 10 sorgu</span>} title="Arama sorguları">
                {seo.topQueriesByClicks.length === 0 ? (
                  <EmptyState body="Seçili dönem için sorgu verisi oluşmadı." title="Sorgu verisi yok" />
                ) : (
                  <div className="rankingList">
                    {seo.topQueriesByClicks.slice(0, 10).map((row, index) => (
                      <div className="rankingRow" key={row.keys[0]}>
                        <span className="rankNumber">{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{row.keys[0]}</strong>
                          <small>{formatInteger(row.impressions)} gösterim · {formatPercent(row.ctr)} CTR</small>
                        </div>
                        <b>{formatInteger(row.clicks)}</b>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel action={<span className="metaLine">En görünür 10 sayfa</span>} title="Sayfalar">
                {seo.topPages.length === 0 ? (
                  <EmptyState body="Seçili dönem için sayfa verisi oluşmadı." title="Sayfa verisi yok" />
                ) : (
                  <div className="rankingList">
                    {seo.topPages.slice(0, 10).map((row, index) => (
                      <div className="rankingRow" key={row.keys[0]}>
                        <span className="rankNumber">{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{compactUrl(row.keys[0])}</strong>
                          <small>{formatInteger(row.clicks)} tıklama · pozisyon {formatNumber(row.position, 1)}</small>
                        </div>
                        <b>{formatInteger(row.impressions)}</b>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>

            <Panel action={<span className="metaLine">Google indeks durumu</span>} title="Önemli sayfalar">
              <div className="tableWrap">
                <table className="dataTable">
                  <thead>
                    <tr><th>Sayfa</th><th>Durum</th><th>Son tarama</th><th className="metric">Tıklama</th><th className="metric">Gösterim</th></tr>
                  </thead>
                  <tbody>
                    {seo.seoUrls.map((row) => (
                      <tr key={row.url}>
                        <td><strong>{row.title}</strong><small>{compactUrl(row.url)}</small></td>
                        <td><span className={`statusPill ${verdictTone(row.inspection.verdict)}`}>{row.inspection.coverageState || row.inspection.verdict || "Bekliyor"}</span></td>
                        <td>{formatDateTimeTr(row.inspection.lastCrawlTime)}</td>
                        <td className="metric">{formatInteger(row.clicks)}</td>
                        <td className="metric">{formatInteger(row.impressions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </>
        )}
      </DataStateView>
    </div>
  );
}
