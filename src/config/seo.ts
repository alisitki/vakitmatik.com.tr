import type { Metadata } from "next";

export const siteUrl = "https://www.vakitmatik.com.tr";
export const siteName = "Vakitmatik";
export const defaultTitle = "Vakitmatik | Cami Saatleri";
export const siteDescription =
  "Vakitmatik namaz vakti panoları, mobil uygulama desteği, akıllı cami projeleri ve iletişim bilgileri.";
export const socialDescription =
  "Vakitmatik namaz vakti panolarını, mobil uygulama desteğini ve akıllı cami çözümlerini keşfedin.";
export const socialImage = "/images/og-vakitmatik-hero-2026-07-06.png";

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
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const pageImage = image
    ? {
        url: absoluteUrl(image.src),
        width: image.width,
        height: image.height,
        alt: image.alt,
      }
    : defaultOpenGraphImage;

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
      images: [pageImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [pageImage.url],
    },
  };
}
