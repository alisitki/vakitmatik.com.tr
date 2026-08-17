import "../../site.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { absoluteUrl, createPageMetadata } from "@/config/seo";
import { productItems } from "@/data/landing";
import type { ProductItem } from "@/types/landing";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return productItems.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const path = getProductPath(product);
  const metaTitle = getProductMetaTitle(product);

  return createPageMetadata({
    title: metaTitle,
    description: `${metaTitle}; ${lowercaseFirst(product.summary)}`,
    path,
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const structuredData = createProductStructuredData(product);

  return (
    <>
      <header className="product-detail-header">
        <div className="container-shell product-detail-header-shell">
          <Link
            aria-label="Vakitmatik ana sayfasına dön"
            className="product-detail-brand"
            href="/"
          >
            <Image
              alt="Vakitmatik"
              className="product-detail-brand-logo"
              height={113}
              priority
              src="/images/vakitmatik-logo2.png"
              width={810}
            />
          </Link>
        </div>
      </header>

      <main className="product-detail-page">
        <ProductShowcaseSection items={[product]} mode="detail" />

        <nav aria-label="Ürün sayfası bağlantıları" className="product-detail-footer">
          <div className="container-shell product-detail-footer-shell">
            <Link className="product-detail-all-products" href="/#urun-deneyimi">
              Tüm ürünler
              <ArrowIcon />
            </Link>
          </div>
        </nav>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}

function getProductBySlug(slug: string) {
  return productItems.find((product) => product.slug === slug);
}

function getProductPath(product: ProductItem) {
  return `/cami-saati/${product.slug}/`;
}

function getProductMetaTitle(product: ProductItem) {
  if (
    product.id === "vakitmatik-mesaj" ||
    product.id === "vakitmatik-kayan" ||
    product.id === "vakitmatik-modul"
  ) {
    return `${product.title} Cami Panosu`;
  }

  return `${product.title} Cami Saati`;
}

function lowercaseFirst(value: string) {
  return `${value.charAt(0).toLocaleLowerCase("tr-TR")}${value.slice(1)}`;
}

function createProductStructuredData(product: ProductItem) {
  const path = getProductPath(product);
  const pageUrl = absoluteUrl(path);
  const dimensionProperties = product.sizeOptions
    ? product.sizeOptions.map((sizeOption) => ({
        "@type": "PropertyValue",
        name: sizeOption.label,
        value: `${sizeOption.dimensions} - ${sizeOption.digitHeight}`,
      }))
    : [
        {
          "@type": "PropertyValue",
          name: "Ebat",
          value: product.dimensions,
        },
      ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: product.title,
        description: product.summary,
        category: "Cami saati ve namaz vakti panosu",
        url: pageUrl,
        image: product.media.map((media) => absoluteUrl(media.src)),
        brand: {
          "@type": "Brand",
          name: "Vakitmatik",
          url: absoluteUrl("/"),
        },
        additionalProperty: [
          ...dimensionProperties,
          ...product.specs.map((spec) => ({
            "@type": "PropertyValue",
            name: spec.label,
            value: spec.value,
          })),
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M5 12h13M13 7l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
