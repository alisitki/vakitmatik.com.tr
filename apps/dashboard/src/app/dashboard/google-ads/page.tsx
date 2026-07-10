import { RefreshButton } from "@/components/refresh-button";
import { DataStateView, EmptyState, MetricCard, Panel } from "@/components/ui";
import { formatInteger, formatMoneyMicros, formatPercent } from "@/lib/format";
import { getAdsDashboardData } from "@/lib/google-ads";
import { toDataState } from "@/lib/safe-data";

type PageProps = {
  searchParams?: Promise<{
    refresh?: string;
  }>;
};

function statusLabel(status: string) {
  if (status === "ENABLED") return "Aktif";
  if (status === "PAUSED") return "Duraklatıldı";
  return status;
}

export default async function GoogleAdsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const refresh = Boolean(params?.refresh);
  const state = await toDataState(() => getAdsDashboardData({ refresh }));

  return (
    <div className="pageStack">
      <div className="pageHeader">
        <div>
          <span className="pageEyebrow">KANAL PERFORMANSI</span>
          <h1>Google Ads</h1>
          <p>Harcama, lead ve maliyetin kampanya bazlı net görünümü.</p>
        </div>
        <RefreshButton />
      </div>

      <DataStateView state={state} title="Google Ads verisi alınamadı">
        {(ads) => {
          const conversionRate = ads.last7Days.clicks > 0 ? ads.last7Days.totalLeads / ads.last7Days.clicks : 0;
          const campaigns = ads.campaigns.slice(0, 15);
          const keywords = ads.keywords.slice(0, 15);
          const searchTerms = ads.searchTerms.slice(0, 15);

          return (
            <>
              <Panel
                action={<span className="metaLine">{ads.last7Days.dateRange.startDate} — {ads.last7Days.dateRange.endDate}</span>}
                title="Son 7 gün"
              >
                <div className="metricGrid primaryMetrics">
                  <MetricCard detail="Toplam medya maliyeti" label="Harcama" value={formatMoneyMicros(ads.last7Days.costMicros, ads.account.currencyCode)} />
                  <MetricCard detail="Telefon + e-posta" label="Lead" tone="good" value={formatInteger(ads.last7Days.totalLeads)} />
                  <MetricCard detail="Harcama / lead" label="Lead maliyeti" value={formatMoneyMicros(ads.last7Days.costPerLeadMicros, ads.account.currencyCode)} />
                  <MetricCard detail="Lead / tıklama" label="Dönüşüm" value={formatPercent(conversionRate)} />
                </div>
              </Panel>

              <Panel action={<span className="metaLine">En yüksek harcamalı 15 satır</span>} title="Kampanyalar">
                {campaigns.length === 0 ? (
                  <EmptyState body="Bu tarih aralığında kampanya performansı oluşmadı." title="Kampanya verisi yok" />
                ) : (
                  <div className="tableWrap">
                    <table className="dataTable">
                      <thead>
                        <tr>
                          <th>Kampanya</th>
                          <th>Durum</th>
                          <th className="metric">Harcama</th>
                          <th className="metric">Tıklama</th>
                          <th className="metric">Lead</th>
                          <th className="metric">Lead maliyeti</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((row) => (
                          <tr key={row.id || row.name}>
                            <td><strong>{row.name}</strong></td>
                            <td><span className={`statusPill ${row.status === "ENABLED" ? "good" : ""}`}>{statusLabel(row.status)}</span></td>
                            <td className="metric">{formatMoneyMicros(row.costMicros, ads.account.currencyCode)}</td>
                            <td className="metric">{formatInteger(row.clicks)}</td>
                            <td className="metric">{formatInteger(row.conversions)}</td>
                            <td className="metric">{formatMoneyMicros(row.costPerLeadMicros, ads.account.currencyCode)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Panel>

              <div className="splitGrid detailSplit">
                <Panel action={<span className="metaLine">İlk 15</span>} title="Anahtar kelimeler">
                  {keywords.length === 0 ? (
                    <EmptyState body="Bu dönemde anahtar kelime trafiği yok." title="Veri yok" />
                  ) : (
                    <div className="tableWrap">
                      <table className="dataTable compactTable">
                        <thead><tr><th>Kelime</th><th className="metric">Harcama</th><th className="metric">Lead</th></tr></thead>
                        <tbody>
                          {keywords.map((row) => (
                            <tr key={`${row.campaignName}:${row.adGroupName}:${row.text}`}>
                              <td><strong>{row.text}</strong><small>{row.campaignName}</small></td>
                              <td className="metric">{formatMoneyMicros(row.costMicros, ads.account.currencyCode)}</td>
                              <td className="metric">{formatInteger(row.conversions)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Panel>

                <Panel action={<span className="metaLine">İlk 15</span>} title="Arama terimleri">
                  {searchTerms.length === 0 ? (
                    <EmptyState body="Bu dönemde arama terimi oluşmadı." title="Veri yok" />
                  ) : (
                    <div className="tableWrap">
                      <table className="dataTable compactTable">
                        <thead><tr><th>Arama</th><th className="metric">Tıklama</th><th className="metric">Harcama</th></tr></thead>
                        <tbody>
                          {searchTerms.map((row) => (
                            <tr key={`${row.campaignName}:${row.adGroupName}:${row.term}`}>
                              <td><strong>{row.term}</strong><small>{row.campaignName}</small></td>
                              <td className="metric">{formatInteger(row.clicks)}</td>
                              <td className="metric">{formatMoneyMicros(row.costMicros, ads.account.currencyCode)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Panel>
              </div>
            </>
          );
        }}
      </DataStateView>
    </div>
  );
}
