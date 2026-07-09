"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function RefreshButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function refresh() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("refresh", String(Date.now()));

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
      router.refresh();
    });
  }

  return (
    <button className="refreshButton" disabled={pending} onClick={refresh} type="button">
      <span aria-hidden="true">↻</span>
      <span>{pending ? "Yenileniyor" : "Yenile"}</span>
    </button>
  );
}
