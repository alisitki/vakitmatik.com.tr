import type { Metadata } from "next";
import { AdLandingShell } from "@/components/ad-landing/AdLandingShell";
import { adLandingPreview } from "@/data/adLandingPreview";

export const metadata: Metadata = {
  title: "Landing Görsel Sistem Önizlemesi",
  description: "Vakitmatik reklam landing sayfaları için ortak görsel sistem önizlemesi.",
  alternates: {
    canonical: "/landing-preview/",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
};

export default function LandingPreviewPage() {
  return <AdLandingShell config={adLandingPreview} />;
}
