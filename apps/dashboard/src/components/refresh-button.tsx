"use client";

import { useTransition } from "react";
import { refreshDashboardData } from "@/app/dashboard/actions";

export function RefreshButton() {
  const [pending, startTransition] = useTransition();

  function refresh() {
    startTransition(() => {
      void refreshDashboardData();
    });
  }

  return (
    <button className="refreshButton" disabled={pending} onClick={refresh} type="button">
      <span aria-hidden="true" className={pending ? "spin" : ""}>↻</span>
      <span>{pending ? "Yenileniyor" : "Yenile"}</span>
    </button>
  );
}
