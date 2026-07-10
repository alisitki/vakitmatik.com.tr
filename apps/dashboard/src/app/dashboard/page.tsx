import Link from "next/link";
import type { ReactNode } from "react";
import { RefreshButton } from "@/components/refresh-button";
import {
  AdsIcon,
  CalendarIcon,
  EyeIcon,
  PhoneIcon,
  PointerIcon,
  TargetIcon,
  WalletIcon,
} from "@/components/icons";
import {
  compactUrl,
  formatDateTimeTr,
  formatInteger,
  formatMoneyMicros,
  formatNumber,
  formatPercent,
} from "@/lib/format";
import { getAdsOverviewData } from "@/lib/google-ads";
import type { RuntimeCacheResult } from "@/lib/runtime-cache";
import { toDataState } from "@/lib/safe-data";
import { getSearchConsoleOverviewData } from "@/lib/search-console";
import type { DataState } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<{
    refresh?: string;
  }>;
};

function dataOrNull<T>(state: DataState<RuntimeCacheResult<T>>) {
  return state.ok ? state.data : null;
}

function todayLabel() {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    timeZone: "Europe/Istanbul",
  }).format(new Date());
}

function trendValue(current: number | null, previous: number | null) {
  if (current === null || previous === null || !Number.isFinite(current) || !Number.isFinite(previous) || previous <= 0) {
    return null;
  }

  return (current - previous) / previous;
}

function Trend({ value, inverse = false }: { value: number | null; inverse?: boolean }) {
  if (value === null) {
    return <span className="deltaPill muted">Kıyas yok</span>;
  }

  const favorable = inverse ? value <= 0 : value >= 0;

  return (
    <span className={`deltaPill ${favorable ? "positive" : "negative"}`}>
      <span aria-hidden="true">{value >= 0 ? "↑" : "↓"}</span>
      {formatPercent(Math.abs(value))}
    </span>
  );
}

function ComparisonIndicator({ current, previous }: { current: number | null; previous: number | null }) {
  const ceiling = Math.max(current ?? 0, previous ?? 0, 1);
  const currentWidth = current === null ? 0 : Math.max(4, (current / ceiling) * 100);
  const previousWidth = previous === null ? 0 : Math.max(4, (previous / ceiling) * 100);

  return (
    <div aria-hidden="true" className="comparisonIndicator">
      <span style={{ width: `${previousWidth}%` }} />
      <span style={{ width: `${currentWidth}%` }} />
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  previousLabel,
  currentRaw,
  previousRaw,
  inverse,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  previousLabel: string;
  currentRaw: number | null;
  previousRaw: number | null;
  inverse?: boolean;
}) {
  return (
    <article className="kpiCard">
      <div className="kpiCardTop">
        <div className="kpiIcon">{icon}</div>
        <Trend inverse={inverse} value={trendValue(currentRaw, previousRaw)} />
      </div>
      <div className="kpiValue">{value}</div>
      <div className="kpiLabel">{label}</div>
      <ComparisonIndicator current={currentRaw} previous={previousRaw} />
      <div className="kpiComparison">
        <span><i className="legendDot current" />Bugün</span>
        <span><i className="legendDot previous" />{previousLabel}</span>
      </div>
    </article>
  );
}

function Funnel({ impressions, clicks, leads }: { impressions: number; clicks: number; leads: number }) {
  const stages = [
    { label: "Gösterim", value: impressions, rate: null },
    { label: "Tıklama", value: clicks, rate: impressions > 0 ? clicks / impressions : 0 },
    { label: "Lead", value: leads, rate: clicks > 0 ? leads / clicks : 0 },
  ];
  const maximum = Math.max(impressions, 1);

  return (
    <div className="funnel" aria-label="Bugünkü dönüşüm hunisi">
      {stages.map((stage, index) => (
        <div className="funnelRow" key={stage.label}>
          <div className="funnelLabel">
            <span>{stage.label}</span>
            <strong>{formatInteger(stage.value)}</strong>
          </div>
          <div className="funnelTrack">
            <span
              style={{
                width: `${Math.max(stage.value > 0 ? 8 : 0, Math.min(100, (stage.value / maximum) * 100))}%`,
              }}
            />
          </div>
          <small>{index === 0 ? "Başlangıç" : formatPercent(stage.rate ?? 0)}</small>
        </div>
      ))}
    </div>
  );
}

function SourceState({
  label,
  result,
  error,
}: {
  label: string;
  result: RuntimeCacheResult<unknown> | null;
  error: string | null;
}) {
  const state = error ? "error" : result?.stale ? "stale" : "ready";
  const text = error ? "Bağlantı yok" : result?.stale ? "Eski veri" : "Güncel";

  return (
    <span className={`sourceState ${state}`} title={error ?? undefined}>
      <i />
      {label}: {text}
    </span>
  );
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const refresh = Boolean(params?.refresh);
  const [adsState, seoState] = await Promise.all([
    toDataState(() => getAdsOverviewData({ refresh })),
    toDataState(() => getSearchConsoleOverviewData({ refresh })),
  ]);
  const adsResult = dataOrNull(adsState);
  const seoResult = dataOrNull(seoState);
  const ads = adsResult?.data ?? null;
  const seo = seoResult?.data ?? null;
  const currencyCode = ads?.account.currencyCode ?? "TRY";
  const campaignRows = ads?.campaigns.slice(0, 5) ?? [];
  const updatedAt = adsResult?.cachedAt ?? seoResult?.cachedAt ?? null;
  const todayLeads = ads?.today.totalLeads ?? null;
  const yesterdayLeads = ads?.yesterday.totalLeads ?? null;
  const todayConversion = ads ? (ads.today.clicks > 0 ? ads.today.totalLeads / ads.today.clicks : 0) : null;
  const yesterdayConversion = ads ? (ads.yesterday.clicks > 0 ? ads.yesterday.totalLeads / ads.yesterday.clicks : 0) : null;
  const adsError = adsState.ok ? null : adsState.error;
  const seoError = seoState.ok ? null : seoState.error;

  return (
    <div className="dashboardHome">
      <header className="dashboardHeader">
        <div>
          <span className="pageEyebrow">GENEL BAKIŞ</span>
          <h1>Performans</h1>
          <p>{todayLabel()}</p>
        </div>
        <div className="headerControls">
          <div className="dateControl" aria-label="Seçili dönem bugün">
            <CalendarIcon />
            <span>Bugün</span>
          </div>
          <RefreshButton />
        </div>
      </header>

      <div className="sourceBar" aria-label="Veri kaynaklarının durumu">
        <div>
          <span className="sourceBarLabel">Veri durumu</span>
          <SourceState error={adsError} label="Google Ads" result={adsResult} />
          <SourceState error={seoError} label="Search Console" result={seoResult} />
        </div>
        <span>{updatedAt ? `${formatDateTimeTr(updatedAt)} tarihinde yenilendi` : "Henüz veri alınamadı"}</span>
      </div>

      <section className="kpiGrid" aria-label="Bugünkü temel performans göstergeleri">
        <KpiCard
          currentRaw={ads?.today.costMicros ?? null}
          icon={<WalletIcon />}
          label="Harcama"
          previousLabel={`Dün ${formatMoneyMicros(ads?.yesterday.costMicros ?? null, currencyCode)}`}
          previousRaw={ads?.yesterday.costMicros ?? null}
          value={formatMoneyMicros(ads?.today.costMicros ?? null, currencyCode)}
        />
        <KpiCard
          currentRaw={todayLeads}
          icon={<PhoneIcon />}
          label="Toplam lead"
          previousLabel={`Dün ${yesterdayLeads === null ? "-" : formatInteger(yesterdayLeads)}`}
          previousRaw={yesterdayLeads}
          value={todayLeads === null ? "-" : formatInteger(todayLeads)}
        />
        <KpiCard
          currentRaw={ads?.today.costPerLeadMicros ?? null}
          icon={<TargetIcon />}
          inverse
          label="Lead maliyeti"
          previousLabel={`Dün ${formatMoneyMicros(ads?.yesterday.costPerLeadMicros ?? null, currencyCode)}`}
          previousRaw={ads?.yesterday.costPerLeadMicros ?? null}
          value={formatMoneyMicros(ads?.today.costPerLeadMicros ?? null, currencyCode)}
        />
        <KpiCard
          currentRaw={todayConversion}
          icon={<PointerIcon />}
          label="Lead dönüşümü"
          previousLabel={`Dün ${yesterdayConversion === null ? "-" : formatPercent(yesterdayConversion)}`}
          previousRaw={yesterdayConversion}
          value={todayConversion === null ? "-" : formatPercent(todayConversion)}
        />
      </section>

      <div className="insightGrid">
        <section className="dashboardPanel funnelPanel">
          <div className="dashboardPanelHeader">
            <div>
              <span className="panelKicker">BUGÜN</span>
              <h2>Dönüşüm hunisi</h2>
            </div>
            <span className="panelMeta">Gösterimden lead’e</span>
          </div>
          {ads ? (
            <Funnel impressions={ads.today.impressions} clicks={ads.today.clicks} leads={ads.today.totalLeads} />
          ) : (
            <div className="compactEmpty">Google Ads verisi geldiğinde dönüşüm akışı burada görünecek.</div>
          )}
        </section>

        <section className="dashboardPanel organicPanel">
          <div className="dashboardPanelHeader">
            <div>
              <span className="panelKicker">ORGANİK</span>
              <h2>Arama görünürlüğü</h2>
            </div>
            <Link href="/dashboard/seo">Detay</Link>
          </div>
          {seo ? (
            <>
              <div className="organicMetrics">
                <div>
                  <EyeIcon />
                  <span>Gösterim</span>
                  <strong>{formatInteger(seo.summary.impressions)}</strong>
                </div>
                <div>
                  <PointerIcon />
                  <span>Tıklama</span>
                  <strong>{formatInteger(seo.summary.clicks)}</strong>
                </div>
                <div>
                  <TargetIcon />
                  <span>CTR</span>
                  <strong>{formatPercent(seo.summary.ctr)}</strong>
                </div>
              </div>
              <div className="topOrganicPage">
                <span>En görünür sayfa</span>
                <strong>{compactUrl(seo.topPages[0]?.keys[0] ?? "-")}</strong>
                <small>Son veri: {seo.availableDataThrough ?? "-"}</small>
              </div>
            </>
          ) : (
            <div className="compactEmpty">Search Console verisi şu anda kullanılamıyor.</div>
          )}
        </section>
      </div>

      <section className="dashboardPanel campaignPanel">
        <div className="dashboardPanelHeader">
          <div>
            <span className="panelKicker">GOOGLE ADS</span>
            <h2>Kampanya performansı</h2>
          </div>
          <Link href="/dashboard/google-ads">Tüm kampanyalar</Link>
        </div>
        {campaignRows.length > 0 ? (
          <div className="tableWrap">
            <table className="performanceTable">
              <thead>
                <tr>
                  <th>Kampanya</th>
                  <th>Harcama</th>
                  <th>Tıklama</th>
                  <th>Lead</th>
                  <th>Lead maliyeti</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {campaignRows.map((campaign) => (
                  <tr key={campaign.id || campaign.name}>
                    <td>
                      <span className="campaignName"><AdsIcon />{campaign.name}</span>
                    </td>
                    <td>{formatMoneyMicros(campaign.costMicros, currencyCode)}</td>
                    <td>{formatInteger(campaign.clicks)}</td>
                    <td>{formatNumber(campaign.conversions, 0)}</td>
                    <td>{formatMoneyMicros(campaign.costPerLeadMicros, currencyCode)}</td>
                    <td><span className={`statusPill ${campaign.status === "ENABLED" ? "good" : ""}`}>{campaign.status === "ENABLED" ? "Aktif" : campaign.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="compactEmpty">Bugün gösterilecek kampanya performansı yok.</div>
        )}
      </section>
    </div>
  );
}
