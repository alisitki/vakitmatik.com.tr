import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Script from "next/script";
import { productItems } from "@/data/landing";
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

const siteUrl = "https://www.vakitmatik.com.tr";
const siteDescription =
  "Vakitmatik namaz vakti panoları, mobil uygulama desteği, akıllı cami projeleri ve iletişim bilgileri.";
const socialDescription =
  "Vakitmatik namaz vakti panolarını, mobil uygulama desteğini ve akıllı cami çözümlerini keşfedin.";

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
    name: "Vakitmatik",
    url: siteUrl,
    inLanguage: "tr-TR",
    description: siteDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vakitmatik ürünleri",
    itemListElement: productItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/#${item.id}`,
      name: item.title,
      description: item.summary,
      item: {
        "@type": "Thing",
        name: item.title,
        description: item.summary,
        url: `${siteUrl}/#${item.id}`,
        image: item.media.map((media) => `${siteUrl}${media.src}`),
      },
    })),
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vakitmatik | Cami Saatleri",
    template: "%s | Vakitmatik",
  },
  description: siteDescription,
  keywords: [
    "vakitmatik",
    "namaz vakti paneli",
    "cami vakit ekranı",
    "mescit vakit sistemi",
    "vakitmatik.com.tr",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vakitmatik | Cami Saatleri",
    description: socialDescription,
    url: siteUrl,
    siteName: "Vakitmatik",
    locale: "tr_TR",
    type: "website",
    images: ["/images/og-vakitmatik.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakitmatik | Cami Saatleri",
    description: socialDescription,
    images: ["/images/og-vakitmatik.svg"],
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
    <html lang="tr" suppressHydrationWarning>
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
      <body className={`${sora.variable} ${jakarta.variable}`}>{children}</body>
    </html>
  );
}
