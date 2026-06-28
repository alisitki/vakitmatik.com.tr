import type { Metadata } from "next";

export const siteUrl = "https://www.vakitmatik.com.tr";
export const siteName = "Vakitmatik";
export const defaultTitle = "Vakitmatik | Cami Saatleri";
export const siteDescription =
  "Vakitmatik namaz vakti panoları, mobil uygulama desteği, akıllı cami projeleri ve iletişim bilgileri.";
export const socialDescription =
  "Vakitmatik namaz vakti panolarını, mobil uygulama desteğini ve akıllı cami çözümlerini keşfedin.";
export const socialImage = "/images/og-vakitmatik.png";

export const seoKeywords = [
  "vakitmatik",
  "namaz vakti paneli",
  "cami vakit ekranı",
  "mescit vakit sistemi",
  "vakitmatik.com.tr",
];

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export const defaultOpenGraphImage = {
  url: socialImage,
  width: 1200,
  height: 630,
  alt: "Vakitmatik cami saatleri ve namaz vakti panoları",
  type: "image/png",
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName,
      locale: "tr_TR",
      type: "website",
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(socialImage)],
    },
  };
}
