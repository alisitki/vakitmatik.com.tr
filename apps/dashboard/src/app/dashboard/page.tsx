import { getAdsDashboardData } from "@/lib/google-ads";
import { getSearchConsoleDashboardData } from "@/lib/search-console";
import { getAnalyticsDashboardData } from "@/lib/vercel-analytics";
import { toDataState } from "@/lib/safe-data";
import { formatInteger, formatNumber, formatPercent } from "@/lib/format";
import {
  AdsSummaryGrid,
  AnalyticsSummaryGrid,
  DataStateView,
  EmptyState,
  MetricCard,
  Panel,
  TextLink,
} from "@/components/ui";

export default async function DashboardPage() {
  const [adsState, seoState, analyticsState] = await Promise.all([
    toDataState(getAdsDashboardData),
    toDataState(() =>
      getSearchConsoleDashboardData({
        includeInspection: false,
      }),
    ),
    toDataState(getAnalyticsDashboardData),
  ]);

  return (
    <div className="pageStack">
      <div className="pageHeader">
        <div>
          <h1>Özet</h1>
          <p>Bugün, dün ve son 7 gün için reklam harcaması, lead üretimi ve organik görünürlük.</p>
        </div>
      </div>

      <DataStateView state={adsState} title="Google Ads verisi alınamadı">
        {(ads) => (
          <>
            <Panel
              action={<span className="metaLine">{ads.account.timeZone} / {ads.account.currencyCode}</span>}
              title="Bugün"
            >
              <AdsSummaryGrid summary={ads.today} />
            </Panel>
            <div className="splitGrid">
              <Panel title="Dün">
                <AdsSummaryGrid summary={ads.yesterday} />
              </Panel>
              <Panel title="Son 7 gün">
                <AdsSummaryGrid summary={ads.last7Days} />
              </Panel>
            </div>
          </>
        )}
      </DataStateView>

      <DataStateView state={analyticsState} title="Vercel Analytics verisi alınamadı">
        {(analytics) => (
          <Panel
            action={<span className="metaLine">Vercel Web Analytics</span>}
            title={`Site trafiği - ${analytics.last7Days.dateRange.startDate} / ${analytics.last7Days.dateRange.endDate}`}
          >
            <AnalyticsSummaryGrid summary={analytics.last7Days} />
            {analytics.last7Days.topReferrers.length === 0 ? (
              <EmptyState body="Vercel Analytics henüz trafik kaynağı döndürmedi." title="Kaynak verisi yok" />
            ) : (
              <div className="stackList">
                {analytics.last7Days.topReferrers.map((referrer) => (
                  <div className="listRow" key={referrer.referrerHostname}>
                    <div>
                      <strong>{referrer.referrerHostname}</strong>
                      <span className="metaLine">Trafik kaynağı</span>
                    </div>
                    <span className="mono">{formatInteger(referrer.pageviews)}</span>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        )}
      </DataStateView>

      <DataStateView state={seoState} title="Search Console verisi alınamadı">
        {(seo) => (
          <Panel
            action={<TextLink href="/dashboard/seo">SEO detayları</TextLink>}
            title={`Search Console - ${seo.dateRange.startDate} / ${seo.dateRange.endDate}`}
          >
            <div className="metricGrid">
              <MetricCard detail="Organik trafik" label="SEO tıklama" value={formatInteger(seo.summary.clicks)} />
              <MetricCard detail="Google görünürlüğü" label="SEO gösterim" value={formatInteger(seo.summary.impressions)} />
              <MetricCard detail="Tıklama oranı" label="SEO CTR" value={formatPercent(seo.summary.ctr)} />
              <MetricCard
                detail={`Son mevcut tarih: ${seo.availableDataThrough ?? "-"}`}
                label="Ort. pozisyon"
                value={seo.summary.position ? formatNumber(seo.summary.position, 1) : "-"}
              />
            </div>
          </Panel>
        )}
      </DataStateView>
    </div>
  );
}
