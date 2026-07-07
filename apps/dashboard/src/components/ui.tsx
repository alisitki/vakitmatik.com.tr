import Link from "next/link";
import type { ReactNode } from "react";
import { formatInteger, formatMoneyMicros, formatPercent } from "@/lib/format";
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
