import Link from "next/link";
import type { ReactNode } from "react";
import { formatDateTimeTr, formatInteger, formatMoneyMicros, formatPercent } from "@/lib/format";
import type { RuntimeCacheResult } from "@/lib/runtime-cache";
import type { AdsSummary, AnalyticsSummary, DataState } from "@/lib/types";
import { AlertIcon } from "./icons";

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="panelHeader">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function ErrorPanel({ title, error }: { title: string; error: string }) {
  return (
    <section className="panel errorPanel">
      <div className="errorIcon">
        <AlertIcon />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{error}</p>
      </div>
    </section>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="emptyState">
      <strong>{title}</strong>
      <span>{body}</span>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "neutral",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "neutral" | "good" | "warn";
}) {
  return (
    <div className={`metricCard ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

export function StatTile({
  label,
  value,
  detail,
  tone = "neutral",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "neutral" | "good" | "warn";
}) {
  return (
    <div className={`statTile ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

export function FreshnessBar({
  items,
}: {
  items: {
    label: string;
    result?: RuntimeCacheResult<unknown> | null;
  }[];
}) {
  return (
    <div className="freshnessBar">
      <div>
        <strong>Veri durumu</strong>
        <span>Son bilinen değerler hızlı açılış için kısa süre saklanır.</span>
      </div>
      <div className="freshnessItems">
        {items.map((item) => (
          <span className={item.result?.stale ? "warn" : ""} key={item.label}>
            {item.label}: {item.result ? formatDateTimeTr(item.result.cachedAt) : "-"}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ActionPanel({ actions }: { actions: string[] }) {
  return (
    <section className="actionPanel">
      <div>
        <h2>Bugün ne yapalım?</h2>
        <p>Dashboard’un gördüğü veriye göre kısa aksiyon listesi.</p>
      </div>
      <ol>
        {actions.map((action) => (
          <li key={action}>{action}</li>
        ))}
      </ol>
    </section>
  );
}

export function SummaryRows({
  rows,
}: {
  rows: {
    label: string;
    value: string;
    detail: string;
    tone?: "neutral" | "good" | "warn";
  }[];
}) {
  return (
    <div className="summaryRows">
      {rows.map((row) => (
        <div className={`summaryRow ${row.tone ?? "neutral"}`} key={row.label}>
          <div>
            <strong>{row.label}</strong>
            <span>{row.detail}</span>
          </div>
          <b>{row.value}</b>
        </div>
      ))}
    </div>
  );
}

export function AdsSummaryGrid({ summary }: { summary: AdsSummary }) {
  return (
    <div className="metricGrid">
      <MetricCard
        detail={summary.dateRange.label}
        label="Harcama"
        value={formatMoneyMicros(summary.costMicros, summary.currencyCode)}
      />
      <MetricCard detail={summary.dateRange.label} label="Tıklama" value={formatInteger(summary.clicks)} />
      <MetricCard detail={summary.dateRange.label} label="Gösterim" value={formatInteger(summary.impressions)} />
      <MetricCard detail="Tıklama / gösterim" label="CTR" value={formatPercent(summary.ctr)} />
      <MetricCard
        detail="Tıklama maliyeti"
        label="Ort. CPC"
        value={formatMoneyMicros(summary.averageCpcMicros, summary.currencyCode)}
      />
      <MetricCard detail="Telefon tıklaması" label="Telefon lead" tone="good" value={formatInteger(summary.phoneLeads)} />
      <MetricCard detail="E-posta tıklaması" label="E-posta lead" tone="good" value={formatInteger(summary.emailLeads)} />
      <MetricCard
        detail={`${formatInteger(summary.totalLeads)} toplam lead`}
        label="Lead başı maliyet"
        tone={summary.totalLeads > 0 ? "good" : "warn"}
        value={formatMoneyMicros(summary.costPerLeadMicros, summary.currencyCode)}
      />
    </div>
  );
}

export function AnalyticsSummaryGrid({ summary }: { summary: AnalyticsSummary }) {
  const oldSiteTrackingDetail = summary.oldSiteTrackingUnavailableReason
    ? "Plan kısıtı / custom event yok"
    : `${formatInteger(summary.oldSiteTrackedVisitors ?? 0)} ziyaretçi`;

  return (
    <div className="metricGrid">
      <MetricCard detail={summary.dateRange.label} label="Ziyaret" value={formatInteger(summary.totalPageviews)} />
      <MetricCard
        detail="Kesin referrer: vakitmatik.org"
        label="Eski site referrer"
        tone={summary.oldSitePageviews > 0 ? "good" : "neutral"}
        value={formatInteger(summary.oldSitePageviews)}
      />
      <MetricCard detail="Referrer/UTM yok" label="Direkt / bilinmeyen" value={formatInteger(summary.directPageviews)} />
      <MetricCard
        detail={oldSiteTrackingDetail}
        label="Eski site takip"
        tone={summary.oldSiteTrackedVisits && summary.oldSiteTrackedVisits > 0 ? "good" : "warn"}
        value={summary.oldSiteTrackedVisits === null ? "-" : formatInteger(summary.oldSiteTrackedVisits)}
      />
      <MetricCard
        detail="Referrer eski site / toplam"
        label="Referrer oranı"
        value={formatPercent(summary.totalPageviews > 0 ? summary.oldSitePageviews / summary.totalPageviews : 0)}
      />
    </div>
  );
}

export function DataStateView<T>({
  state,
  title,
  children,
}: {
  state: DataState<T>;
  title: string;
  children: (data: T) => ReactNode;
}) {
  if (!state.ok) {
    return <ErrorPanel error={state.error} title={title} />;
  }

  return children(state.data);
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="textLink" href={href}>
      {children}
    </Link>
  );
}
