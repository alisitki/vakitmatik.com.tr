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
};

function trackLead(eventName: "phone_lead" | "email_lead", href: string, sendTo?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    event_category: "lead",
    event_label: href,
    link_url: href,
    transport_type: "beacon",
  });

  if (sendTo) {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      transport_type: "beacon",
    });
  }
}

export function GoogleTag({ tagId, phoneSendTo, emailSendTo }: GoogleTagProps) {
  const initScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(tagId)});
`;

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        trackLead("phone_lead", href, phoneSendTo);
      }

      if (href.startsWith("mailto:")) {
        trackLead("email_lead", href, emailSendTo);
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [emailSendTo, phoneSendTo]);

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
