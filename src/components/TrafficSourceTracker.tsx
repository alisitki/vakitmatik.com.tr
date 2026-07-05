"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

const OLD_SITE_HOST = "vakitmatik.org";
const OLD_SITE_CAMPAIGN = "old_site_migration";
const SESSION_KEY = "vakitmatik-old-site-visit-tracked";

function safeHostname(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function TrafficSourceTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source")?.replace(/^www\./, "") ?? "";
    const utmCampaign = params.get("utm_campaign") ?? "";
    const utmMedium = params.get("utm_medium") ?? "";
    const referrerHost = safeHostname(document.referrer);
    const isOldSiteTraffic =
      utmSource === OLD_SITE_HOST ||
      utmCampaign === OLD_SITE_CAMPAIGN ||
      referrerHost === OLD_SITE_HOST;

    if (!isOldSiteTraffic) {
      return;
    }

    document.documentElement.dataset.oldSiteVisitTracked = "true";

    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) {
        return;
      }

      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // If sessionStorage is blocked, still send the event for this page view.
    }

    track("old_site_visit", {
      source: utmSource || referrerHost || OLD_SITE_HOST,
      medium: utmMedium || "referral",
      campaign: utmCampaign || OLD_SITE_CAMPAIGN,
      entry_path: window.location.pathname || "/",
      referrer_host: referrerHost || "none",
    });
  }, []);

  return null;
}
