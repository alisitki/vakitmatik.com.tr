import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Script from "next/script";
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
  var savedControls = window.localStorage.getItem("vakitmatik-landing-controls-v6");
  var parsedControls = savedControls ? JSON.parse(savedControls) : null;
  var themeMode = parsedControls && parsedControls.themeMode;
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

export const metadata: Metadata = {
  metadataBase: new URL("https://vakitmatik.com.tr"),
  title: {
    default: "Vakitmatik | Cami Saatleri",
    template: "%s | Vakitmatik",
  },
  description:
    "Vakitmatik ürün özellikleri, akıllı cami projeleri ve iletişim bilgileri tek sayfada.",
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
    description:
      "Vakitmatik ürününü antigravity tarzı modern bir tek sayfa deneyimde keşfedin.",
    url: "https://vakitmatik.com.tr",
    siteName: "Vakitmatik",
    locale: "tr_TR",
    type: "website",
    images: ["/images/og-vakitmatik.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakitmatik | Cami Saatleri",
    description:
      "Vakitmatik ürün özellikleri, akıllı cami projeleri ve iletişim bilgileri tek sayfada.",
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
        <Script id="vakitmatik-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className={`${sora.variable} ${jakarta.variable}`}>{children}</body>
    </html>
  );
}
