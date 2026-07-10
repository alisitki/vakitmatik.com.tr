import type { ReactNode } from "react";
import { Suspense } from "react";
import { DashboardShell } from "@/components/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="shellLoading">Dashboard hazırlanıyor…</div>}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
