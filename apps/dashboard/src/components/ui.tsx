import type { ReactNode } from "react";
import type { DataState } from "@/lib/types";
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
      <div className="errorIcon"><AlertIcon /></div>
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
