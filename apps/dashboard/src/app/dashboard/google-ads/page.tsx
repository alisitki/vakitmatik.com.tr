import { RefreshButton } from "@/components/refresh-button";
import { getAdsDashboardData } from "@/lib/google-ads";
import { toDataState } from "@/lib/safe-data";
import { formatInteger, formatMoneyMicros, formatPercent } from "@/lib/format";
import { AdsSummaryGrid, DataStateView, EmptyState, Panel } from "@/components/ui";

type PageProps = {
  searchParams?: Promise<{
    refresh?: string;
  }>;
};

function statusTone(status: string) {
  if (status === "ENABLED") {
    return "good";
  }

  if (status === "PAUSED") {
    return "warn";
  }

  return "";
}

export default async function GoogleAdsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const refresh = Boolean(params?.refresh);
  const state = await toDataState(() => getAdsDashboardData({ refresh }));

  return (
    <div className="pageStack">
      <div className="pageHeader">
        <div>
          <h1>Reklam</h1>
          <p>Kampanya, keyword ve search terms performansı. Bu ekran sadece okuma amaçlıdır.</p>
        </div>
        <RefreshButton />
      </div>

      <DataStateView state={state} title="Google Ads verisi alınamadı">
        {(ads) => (
          <>
            <Panel
              action={<span className="metaLine">Customer {ads.account.customerId}</span>}
              title={`Son 7 gün - ${ads.account.name}`}
            >
              <AdsSummaryGrid summary={ads.last7Days} />
            </Panel>

            <Panel title="Kampanyalar">
              {ads.campaigns.length === 0 ? (
                <EmptyState body="Kampanya başlamadıysa Google Ads API sıfır satır döndürebilir." title="Kampanya verisi yok" />
              ) : (
                <div className="tableWrap">
                  <table className="dataTable">
                    <thead>
                      <tr>
                        <th>Kampanya</th>
                        <th>Durum</th>
                        <th className="metric">Günlük bütçe</th>
                        <th className="metric">Harcama</th>
                        <th className="metric">Tıklama</th>
                        <th className="metric">Gösterim</th>
                        <th className="metric">CTR</th>
                        <th className="metric">Conv.</th>
                        <th className="metric">CPL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ads.campaigns.map((row) => (
                        <tr key={row.id || row.name}>
                          <td>
                            <strong>{row.name}</strong>
                            <br />
                            <small>{row.id}</small>
                          </td>
                          <td>
                            <span className={`statusPill ${statusTone(row.status)}`}>{row.status}</span>
                          </td>
                          <td className="metric">{formatMoneyMicros(row.dailyBudgetMicros, ads.account.currencyCode)}</td>
                          <td className="metric">{formatMoneyMicros(row.costMicros, ads.account.currencyCode)}</td>
                          <td className="metric">{formatInteger(row.clicks)}</td>
                          <td className="metric">{formatInteger(row.impressions)}</td>
                          <td className="metric">{formatPercent(row.ctr)}</td>
                          <td className="metric">{formatInteger(row.conversions)}</td>
                          <td className="metric">{formatMoneyMicros(row.costPerLeadMicros, ads.account.currencyCode)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>

            <Panel title="Keyword performansı">
              {ads.keywords.length === 0 ? (
                <EmptyState body="Keyword tarafında henüz impression veya click görünmüyor." title="Keyword verisi yok" />
              ) : (
                <div className="tableWrap">
                  <table className="dataTable">
                    <thead>
                      <tr>
                        <th>Keyword</th>
                        <th>Kampanya</th>
                        <th>Match</th>
                        <th className="metric">Harcama</th>
                        <th className="metric">Tıklama</th>
                        <th className="metric">Gösterim</th>
                        <th className="metric">CTR</th>
                        <th className="metric">Conv.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ads.keywords.map((row) => (
                        <tr key={`${row.campaignName}:${row.adGroupName}:${row.text}`}>
                          <td>
                            <strong>{row.text}</strong>
                            <br />
                            <small>{row.status}</small>
                          </td>
                          <td>
                            {row.campaignName}
                            <br />
                            <small>{row.adGroupName}</small>
                          </td>
                          <td>{row.matchType}</td>
                          <td className="metric">{formatMoneyMicros(row.costMicros, ads.account.currencyCode)}</td>
                          <td className="metric">{formatInteger(row.clicks)}</td>
                          <td className="metric">{formatInteger(row.impressions)}</td>
                          <td className="metric">{formatPercent(row.ctr)}</td>
                          <td className="metric">{formatInteger(row.conversions)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>

            <Panel title="Search terms ve negatif kelime önerileri">
              {ads.searchTerms.length === 0 ? (
                <EmptyState body="Search terms raporu kampanya trafik aldıkça dolacak." title="Search terms verisi yok" />
              ) : (
                <div className="tableWrap">
                  <table className="dataTable">
                    <thead>
                      <tr>
                        <th>Search term</th>
                        <th>Kampanya</th>
                        <th>Match</th>
                        <th className="metric">Harcama</th>
                        <th className="metric">Tıklama</th>
                        <th className="metric">Gösterim</th>
                        <th>Öneri</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ads.searchTerms.map((row) => (
                        <tr key={`${row.campaignName}:${row.adGroupName}:${row.term}`}>
                          <td>
                            <strong>{row.term}</strong>
                            <br />
                            <small>{row.status}</small>
                          </td>
                          <td>
                            {row.campaignName}
                            <br />
                            <small>{row.adGroupName}</small>
                          </td>
                          <td>{row.matchType}</td>
                          <td className="metric">{formatMoneyMicros(row.costMicros, ads.account.currencyCode)}</td>
                          <td className="metric">{formatInteger(row.clicks)}</td>
                          <td className="metric">{formatInteger(row.impressions)}</td>
                          <td>
                            {row.recommendation ? (
                              <span className="statusPill warn">{row.recommendation}</span>
                            ) : (
                              <span className="statusPill">Yok</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          </>
        )}
      </DataStateView>
    </div>
  );
}
