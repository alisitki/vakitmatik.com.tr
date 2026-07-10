"use server";

import { refresh, updateTag } from "next/cache";
import { requirePageSession } from "@/lib/auth";

export async function refreshDashboardData() {
  await requirePageSession();

  updateTag("google-ads");
  updateTag("search-console");
  updateTag("vercel-analytics");
  refresh();
}
