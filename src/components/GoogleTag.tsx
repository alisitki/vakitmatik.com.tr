"use client";

import { useEffect } from "react";
import Script from "next/script";

type GtagArgs =
  | ["js", Date]
  | ["config", string]
  | ["event", string, Record<string, unknown>?];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

type GoogleTagProps = {
  tagId: string;
  phoneSendTo?: string;
  emailSendTo?: string;
  whatsappSendTo?: string;
};

type LeadEventName = "lead_phone_click" | "lead_whatsapp_click" | "email_lead";

type LeadAttribution = {
  entry_landing_variant: "homepage" | "cami-saati" | "fiyat-model" | "ayet-hadis" | "other";
  entry_path: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
};

const LEAD_ATTRIBUTION_SESSION_KEY = "vakitmatik-lead-attribution-v1";
const PHONE_NAVIGATION_TIMEOUT_MS = 800;

const landingVariants: Record<string, LeadAttribution["entry_landing_variant"]> = {
  "/": "homepage",
  "/cami-saati": "cami-saati",
  "/cami-saati-fiyatlari": "fiyat-model",
  "/ayet-hadis-panosu": "ayet-hadis",
};

function normalizePathname(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "") || "/";
}

function getLandingVariant(pathname: string): LeadAttribution["entry_landing_variant"] {
  return landingVariants[normalizePathname(pathname)] ?? "other";
}

function readQueryAttribution(search: string) {
  const params = new URLSearchParams(search);
  const queryAttribution: Partial<LeadAttribution> = {};
  const mappings = [
    ["utm_source", "source"],
    ["utm_medium", "medium"],
    ["utm_campaign", "campaign"],
    ["utm_content", "content"],
  ] as const;

  for (const [queryKey, attributionKey] of mappings) {
    const value = params.get(queryKey)?.trim();

    if (value) {
      queryAttribution[attributionKey] = value;
    }
  }

  return queryAttribution;
}

function hasNewCampaignContext(search: string) {
  const params = new URLSearchParams(search);

  return [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
  ].some((key) => Boolean(params.get(key)?.trim()));
}

function readStoredAttribution() {
  try {
    const value = window.sessionStorage.getItem(LEAD_ATTRIBUTION_SESSION_KEY);

    if (!value) {
      return null;
    }

    const parsed = JSON.parse(value) as Partial<LeadAttribution>;

    if (typeof parsed.entry_path !== "string" || typeof parsed.entry_landing_variant !== "string") {
      return null;
    }

    return parsed as LeadAttribution;
  } catch {
    return null;
  }
}

function storeAttribution(attribution: LeadAttribution) {
  try {
    window.sessionStorage.setItem(LEAD_ATTRIBUTION_SESSION_KEY, JSON.stringify(attribution));
  } catch {
    // Measurement still works when sessionStorage is unavailable.
  }
}

function getLeadAttribution() {
  const currentPath = normalizePathname(window.location.pathname);
  const currentVariant = getLandingVariant(currentPath);
  const queryAttribution = readQueryAttribution(window.location.search);
  const storedAttribution = readStoredAttribution();

  if (storedAttribution && !hasNewCampaignContext(window.location.search)) {
    return storedAttribution;
  }

  const attribution: LeadAttribution = {
    entry_landing_variant: currentVariant,
    entry_path: currentPath,
    ...queryAttribution,
  };

  storeAttribution(attribution);

  return attribution;
}

function sendGtagEvent(...args: GtagArgs) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function isWhatsAppHref(href: string) {
  if (href.toLowerCase().startsWith("whatsapp:")) {
    return true;
  }

  try {
    const hostname = new URL(href, window.location.href).hostname
      .toLowerCase()
      .replace(/^www\./, "");

    return hostname === "wa.me" || hostname === "api.whatsapp.com" || hostname === "web.whatsapp.com";
  } catch {
    return false;
  }
}

function trackLead(
  eventName: LeadEventName,
  channel: "phone" | "whatsapp" | "email",
  href: string,
  sendTo?: string,
  onConversionSent?: () => void,
) {
  const attribution = getLeadAttribution();
  const pagePath = normalizePathname(window.location.pathname);
  const landingVariant = getLandingVariant(pagePath);
  const eventParameters = {
    event_category: "lead",
    event_label: href,
    lead_channel: channel,
    link_url: href,
    landing_variant: landingVariant,
    page_path: pagePath,
    ...attribution,
    transport_type: "beacon",
  };

  sendGtagEvent("event", eventName, eventParameters);

  if (sendTo) {
    sendGtagEvent("event", "conversion", {
      send_to: sendTo,
      lead_channel: channel,
      page_path: eventParameters.page_path,
      landing_variant: eventParameters.landing_variant,
      entry_landing_variant: attribution.entry_landing_variant,
      entry_path: attribution.entry_path,
      ...(onConversionSent
        ? {
            event_callback: onConversionSent,
            event_timeout: PHONE_NAVIGATION_TIMEOUT_MS,
          }
        : {}),
      transport_type: "beacon",
    });
  }
}

export function GoogleTag({
  tagId,
  phoneSendTo,
  emailSendTo,
  whatsappSendTo,
}: GoogleTagProps) {
  const initScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(tagId)});
`;

  useEffect(() => {
    getLeadAttribution();

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href") ?? "";

      if (href.toLowerCase().startsWith("tel:")) {
        const shouldWaitForConversion =
          Boolean(phoneSendTo) &&
          event.button === 0 &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey;

        if (!shouldWaitForConversion) {
          trackLead("lead_phone_click", "phone", href, phoneSendTo);
          return;
        }

        event.preventDefault();

        let navigationStarted = false;

        const continueToPhone = () => {
          if (navigationStarted) {
            return;
          }

          navigationStarted = true;

          if (navigationTimeout) {
            window.clearTimeout(navigationTimeout);
          }

          window.location.assign(href);
        };

        const navigationTimeout = window.setTimeout(
          continueToPhone,
          PHONE_NAVIGATION_TIMEOUT_MS,
        );
        trackLead("lead_phone_click", "phone", href, phoneSendTo, continueToPhone);
        return;
      }

      if (isWhatsAppHref(href)) {
        trackLead("lead_whatsapp_click", "whatsapp", href, whatsappSendTo);
        return;
      }

      if (href.toLowerCase().startsWith("mailto:")) {
        trackLead("email_lead", "email", href, emailSendTo);
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [emailSendTo, phoneSendTo, whatsappSendTo]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`}
        strategy="afterInteractive"
      />
      <Script id="vakitmatik-google-tag" strategy="afterInteractive">
        {initScript}
      </Script>
    </>
  );
}
