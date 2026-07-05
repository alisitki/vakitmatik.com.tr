import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Script from "next/script";
import { GoogleTag } from "@/components/GoogleTag";
import { TrafficSourceTracker } from "@/components/TrafficSourceTracker";
import {
  defaultOpenGraphImage,
  defaultTitle,
  siteDescription,
  siteName,
  siteUrl,
  seoKeywords,
  socialDescription,
  socialImage,
} from "@/config/seo";
import "./globals.css";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const themeInitScript = `
try {
  var themeMode = window.localStorage.getItem("vakitmatik-theme-mode");
  if (!themeMode) {
    var savedControls = window.localStorage.getItem("vakitmatik-landing-controls-v6");
    var parsedControls = savedControls ? JSON.parse(savedControls) : null;
    themeMode = parsedControls && parsedControls.themeMode;
  }
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (themeMode === "dark" || (themeMode !== "light" && prefersDark)) {
    document.documentElement.dataset.theme = "dark";
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
} catch (error) {
  document.documentElement.removeAttribute("data-theme");
}
`;

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
const googleAdsPhoneSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO;
const googleAdsEmailSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_EMAIL_SEND_TO;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vakitmatik",
    url: siteUrl,
    logo: `${siteUrl}/images/vakitmatik-logo2.png`,
    email: "bilgi@vakitmatik.com.tr",
    telephone: "+905333827533",
    areaServed: "TR",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kocaeli",
      addressCountry: "TR",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "tr-TR",
    description: siteDescription,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: seoKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: socialDescription,
    url: siteUrl,
    siteName,
    locale: "tr_TR",
    type: "website",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: socialDescription,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/mavitek-mobile.webp"
          media="(max-width: 560px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/mavitek-tablet.webp"
          media="(min-width: 561px) and (max-width: 900px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/mavitek.webp"
          media="(min-width: 901px)"
          fetchPriority="high"
        />
        <Script id="vakitmatik-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${sora.variable} ${jakarta.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <TrafficSourceTracker />
        {googleTagId ? (
          <GoogleTag
            emailSendTo={googleAdsEmailSendTo}
            phoneSendTo={googleAdsPhoneSendTo}
            tagId={googleTagId}
          />
        ) : null}
      </body>
    </html>
  );
}
