import Link from "next/link";
import type { ReactNode } from "react";
import { RefreshButton } from "@/components/refresh-button";
import {
  AdsIcon,
  BarChartIcon,
  CalendarIcon,
  EyeIcon,
  MegaphoneIcon,
  MobileIcon,
  PhoneIcon,
  PointerIcon,
  SearchIcon,
  ShieldIcon,
  TargetIcon,
  WalletIcon,
} from "@/components/icons";
import { compactUrl, formatDateTimeTr, formatInteger, formatMoneyMicros, formatNumber, formatPercent } from "@/lib/format";
import { getAdsOverviewData } from "@/lib/google-ads";
import type { RuntimeCacheResult } from "@/lib/runtime-cache";
import { toDataState } from "@/lib/safe-data";
import { getSearchConsoleOverviewData } from "@/lib/search-console";
import type { AdsOverviewData, DataState, SearchConsoleOverviewData } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<{
    refresh?: string;
  }>;
};

type MetricProps = {
  icon: ReactNode;
  label: string;
  value: string;
  previous: string;
  delta: number | null;
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

function trendValue(current: number, previous: number) {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous <= 0) {
    return null;
  }

  return (current - previous) / previous;
}

function Trend({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="metricTrend muted">-</span>;
  }

  return <span className={value >= 0 ? "metricTrend positive" : "metricTrend negative"}>{formatPercent(value)}</span>;
}

function MetricBlock({ icon, label, value, previous, delta }: MetricProps) {
  return (
    <div className="dashboardMetric">
      <div className="metricIcon">{icon}</div>
      <div className="metricBody">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>
          {previous}
          <Trend value={delta} />
        </small>
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="actionCard">
      <div className="actionIcon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      <span aria-hidden="true" className="actionArrow">
        →
      </span>
    </div>
  );
}

function adsStatusLabel(status: string) {
  if (status === "ENABLED") {
    return "Aktif";
  }

  if (status === "PAUSED") {
    return "Duraklatıldı";
  }

  return status || "-";
}

function buildActionCards(ads: AdsOverviewData | null, seo: SearchConsoleOverviewData | null) {
  const topPage = seo?.topPages[0]?.keys[0] ? compactUrl(seo.topPages[0].keys[0]) : "/cami-saati/";
  const hasClicksWithoutLead = (ads?.today.clicks ?? 0) > 0 && (ads?.today.totalLeads ?? 0) === 0;

  return [
    {
      icon: <SearchIcon />,
      title: "Fiyat odaklı kelimeleri genişlet",
      body: hasClicksWithoutLead
        ? "Tıklama var, lead yok. Fiyat ve teklif niyetli arama terimlerini ayrıca kontrol et."
        : "\"cami saati fiyatları\" ve benzer kelimelerde fırsat var. Bütçe payını takip et.",
    },
    {
      icon: <MobileIcon />,
      title: "Mobil aramalara odaklan",
      body: "Telefon lead'lerini artıracak reklam metni ve açılış sayfası çağrılarını kontrol et.",
    },
    {
      icon: <BarChartIcon />,
      title: "En çok gösterim alan sayfayı güçlendir",
      body: `${topPage} daha fazla gösterim alıyor. İçeriği ve görselleri güncel tut.`,
    },
  ];
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
  const actionCards = buildActionCards(ads, seo);
  const campaignRows = ads?.campaigns.slice(0, 3) ?? [];
  const seoRows = seo?.topPages.slice(0, 3) ?? [];
  const updatedAt = adsResult?.cachedAt ?? seoResult?.cachedAt ?? null;

  return (
    <div className="dashboardHome">
      <header className="dashboardHeader">
        <div>
          <h1>Bugünkü durum</h1>
          <p>{todayLabel()}</p>
        </div>
        <div className="headerControls">
          <div className="dateControl">
            <CalendarIcon />
            <span>Bugün</span>
            <span aria-hidden="true">⌄</span>
          </div>
          <RefreshButton />
        </div>
      </header>

      <section className="metricsStrip" aria-label="Bugünkü ana metrikler">
        <MetricBlock
          delta={trendValue(ads?.today.costMicros ?? 0, ads?.yesterday.costMicros ?? 0)}
          icon={<WalletIcon />}
          label="Harcama"
          previous={`Dün: ${formatMoneyMicros(ads?.yesterday.costMicros ?? null, currencyCode)}`}
          value={formatMoneyMicros(ads?.today.costMicros ?? null, currencyCode)}
        />
        <MetricBlock
          delta={trendValue(ads?.today.clicks ?? 0, ads?.yesterday.clicks ?? 0)}
          icon={<PointerIcon />}
          label="Tıklama"
          previous={`Dün: ${formatInteger(ads?.yesterday.clicks ?? 0)}`}
          value={formatInteger(ads?.today.clicks ?? 0)}
        />
        <MetricBlock
          delta={trendValue(ads?.today.totalLeads ?? 0, ads?.yesterday.totalLeads ?? 0)}
          icon={<PhoneIcon />}
          label="Lead"
          previous={`Dün: ${formatInteger(ads?.yesterday.totalLeads ?? 0)}`}
          value={formatInteger(ads?.today.totalLeads ?? 0)}
        />
        <MetricBlock
          delta={null}
          icon={<EyeIcon />}
          label="SEO Gösterim"
          previous={seo?.availableDataThrough ? `Son veri: ${seo.availableDataThrough}` : "Search Console"}
          value={formatInteger(seo?.summary.impressions ?? 0)}
        />
      </section>

      <section className="actionBand">
        <div className="actionBandHeader">
          <div className="targetBadge">
            <TargetIcon />
          </div>
          <div>
            <h2>Bugün ne yapalım?</h2>
            <p>Kısa ve etkili adımlarla sonuçları büyütelim.</p>
          </div>
        </div>
        <div className="actionCards">
          {actionCards.map((action) => (
            <ActionCard body={action.body} icon={action.icon} key={action.title} title={action.title} />
          ))}
        </div>
      </section>

      <div className="dashboardTables">
        <section className="tablePanel">
          <div className="tablePanelHeader">
            <div>
              <MegaphoneIcon />
              <h2>Reklam özeti</h2>
            </div>
            <Link href="/dashboard/google-ads">Tümünü gör →</Link>
          </div>
          <table className="overviewTable">
            <thead>
              <tr>
                <th>Kampanya</th>
                <th>Harcama</th>
                <th>Tıklama</th>
                <th>Lead</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {campaignRows.length > 0 ? (
                campaignRows.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>{campaign.name}</td>
                    <td>{formatMoneyMicros(campaign.costMicros, currencyCode)}</td>
                    <td>{formatInteger(campaign.clicks)}</td>
                    <td>{formatNumber(campaign.conversions, 0)}</td>
                    <td>
                      <span className={campaign.status === "ENABLED" ? "statusPill active" : "statusPill"}>
                        {adsStatusLabel(campaign.status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Bugün kampanya satırı yok.</td>
                </tr>
              )}
              <tr className="totalRow">
                <td>Toplam</td>
                <td>{formatMoneyMicros(ads?.today.costMicros ?? null, currencyCode)}</td>
                <td>{formatInteger(ads?.today.clicks ?? 0)}</td>
                <td>{formatInteger(ads?.today.totalLeads ?? 0)}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </section>

        <section className="tablePanel">
          <div className="tablePanelHeader">
            <div>
              <AdsIcon />
              <h2>SEO özeti</h2>
            </div>
            <Link href="/dashboard/seo">Tümünü gör →</Link>
          </div>
          <table className="overviewTable">
            <thead>
              <tr>
                <th>Sayfa</th>
                <th>Gösterim</th>
                <th>Tıklama</th>
                <th>CTR</th>
                <th>Pozisyon</th>
              </tr>
            </thead>
            <tbody>
              {seoRows.length > 0 ? (
                seoRows.map((row) => (
                  <tr key={row.keys.join(":")}>
                    <td>{compactUrl(row.keys[0] ?? "-")}</td>
                    <td>{formatInteger(row.impressions)}</td>
                    <td>{formatInteger(row.clicks)}</td>
                    <td>{formatPercent(row.ctr)}</td>
                    <td>{formatNumber(row.position, 1)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Search Console sayfa verisi yok.</td>
                </tr>
              )}
              <tr className="totalRow">
                <td>Toplam</td>
                <td>{formatInteger(seo?.summary.impressions ?? 0)}</td>
                <td>{formatInteger(seo?.summary.clicks ?? 0)}</td>
                <td>{formatPercent(seo?.summary.ctr ?? 0)}</td>
                <td>{seo?.summary.position ? formatNumber(seo.summary.position, 1) : "-"}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <footer className="dashboardFooter">
        <span>Veriler {updatedAt ? formatDateTimeTr(updatedAt) : "-"} itibarıyla güncellenmiştir.</span>
        <span>Kaynaklar: Google Ads, Search Console, Vercel Analytics</span>
        <span className="secureNote">
          <ShieldIcon />
          Veri güvenli bağlantı ile korunmaktadır.
        </span>
      </footer>
    </div>
  );
}
