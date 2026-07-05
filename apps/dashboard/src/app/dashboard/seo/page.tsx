import { getSearchConsoleDashboardData } from "@/lib/search-console";
import { toDataState } from "@/lib/safe-data";
import { compactUrl, formatDateTimeTr, formatInteger, formatNumber, formatPercent } from "@/lib/format";
import { DataStateView, EmptyState, MetricCard, Panel } from "@/components/ui";

function verdictTone(verdict: string | null) {
  if (verdict === "PASS") {
    return "good";
  }

  if (verdict) {
    return "warn";
  }

  return "";
}

export default async function SeoPage() {
  const state = await toDataState(() =>
    getSearchConsoleDashboardData({
      includeInspection: true,
    }),
  );

  return (
    <div className="pageStack">
      <div className="pageHeader">
        <div>
          <h1>SEO / Search Console</h1>
          <p>Sorgu, sayfa ve yeni SEO URL performansı. URL Inspection sonuçları 7 günlük runtime cache ile gösterilir.</p>
        </div>
      </div>

      <DataStateView state={state} title="Search Console verisi alınamadı">
        {(seo) => (
          <>
            <Panel
              action={<span className="metaLine">Son mevcut tarih: {seo.availableDataThrough ?? "-"}</span>}
              title={`${seo.dateRange.startDate} / ${seo.dateRange.endDate}`}
            >
              <div className="metricGrid">
                <MetricCard detail={seo.siteUrl} label="Tıklama" value={formatInteger(seo.summary.clicks)} />
                <MetricCard detail="Google Search" label="Gösterim" value={formatInteger(seo.summary.impressions)} />
                <MetricCard detail="Organik CTR" label="CTR" value={formatPercent(seo.summary.ctr)} />
                <MetricCard
                  detail="Ağırlıklı ortalama"
                  label="Pozisyon"
                  value={seo.summary.position ? formatNumber(seo.summary.position, 1) : "-"}
                />
              </div>
            </Panel>

            <div className="splitGrid">
              <Panel title="En çok tıklama alan sorgular">
                {seo.topQueriesByClicks.length === 0 ? (
                  <EmptyState body="Search Console bu tarih aralığı için sorgu satırı döndürmedi." title="Sorgu verisi yok" />
                ) : (
                  <div className="stackList">
                    {seo.topQueriesByClicks.map((row) => (
                      <div className="listRow" key={row.keys[0]}>
                        <div>
                          <strong>{row.keys[0]}</strong>
                          <span className="metaLine">
                            {formatInteger(row.impressions)} gösterim / {formatPercent(row.ctr)} CTR
                          </span>
                        </div>
                        <span className="mono">{formatInteger(row.clicks)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel title="En çok gösterim alan sorgular">
                {seo.topQueriesByImpressions.length === 0 ? (
                  <EmptyState body="Search Console bu tarih aralığı için sorgu satırı döndürmedi." title="Sorgu verisi yok" />
                ) : (
                  <div className="stackList">
                    {seo.topQueriesByImpressions.map((row) => (
                      <div className="listRow" key={row.keys[0]}>
                        <div>
                          <strong>{row.keys[0]}</strong>
                          <span className="metaLine">
                            {formatInteger(row.clicks)} tıklama / pozisyon {row.position ? formatNumber(row.position, 1) : "-"}
                          </span>
                        </div>
                        <span className="mono">{formatInteger(row.impressions)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>

            <Panel title="Sayfa bazlı performans">
              {seo.topPages.length === 0 ? (
                <EmptyState body="Sayfa bazlı Search Console satırı yok." title="Sayfa verisi yok" />
              ) : (
                <div className="tableWrap">
                  <table className="dataTable">
                    <thead>
                      <tr>
                        <th>Sayfa</th>
                        <th className="metric">Tıklama</th>
                        <th className="metric">Gösterim</th>
                        <th className="metric">CTR</th>
                        <th className="metric">Pozisyon</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seo.topPages.map((row) => (
                        <tr key={row.keys[0]}>
                          <td>{compactUrl(row.keys[0])}</td>
                          <td className="metric">{formatInteger(row.clicks)}</td>
                          <td className="metric">{formatInteger(row.impressions)}</td>
                          <td className="metric">{formatPercent(row.ctr)}</td>
                          <td className="metric">{row.position ? formatNumber(row.position, 1) : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>

            <Panel title="Yeni SEO URL durum takibi">
              <div className="tableWrap">
                <table className="dataTable">
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th className="metric">Tıklama</th>
                      <th className="metric">Gösterim</th>
                      <th>Inspection</th>
                      <th>Son crawl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seo.seoUrls.map((row) => (
                      <tr key={row.url}>
                        <td>
                          <strong>{row.title}</strong>
                          <br />
                          <small>{compactUrl(row.url)}</small>
                        </td>
                        <td className="metric">{formatInteger(row.clicks)}</td>
                        <td className="metric">{formatInteger(row.impressions)}</td>
                        <td>
                          <span className={`statusPill ${verdictTone(row.inspection.verdict)}`}>
                            {row.inspection.error || row.inspection.coverageState || row.inspection.verdict || "Cache bekliyor"}
                          </span>
                          {row.inspection.cachedAt ? (
                            <>
                              <br />
                              <small>Cache: {formatDateTimeTr(row.inspection.cachedAt)}</small>
                            </>
                          ) : null}
                        </td>
                        <td>{formatDateTimeTr(row.inspection.lastCrawlTime)}</td>
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
