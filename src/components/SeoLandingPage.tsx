import Image from "next/image";
import Link from "next/link";
import { HeroExactNav } from "@/components/HeroExactNav";
import { LandingControlsProvider } from "@/components/LandingControls";
import { siteUrl } from "@/config/seo";
import { navItems } from "@/data/landing";
import type { NavItem } from "@/types/landing";
import type { SeoImage, SeoLandingPageContent } from "@/types/seoLanding";

type SeoLandingPageProps = {
  page: SeoLandingPageContent;
};

const subpageNavItems: NavItem[] = navItems.map((item) => ({
  ...item,
  href: `/${item.href}`,
}));

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

const compactFallbackImages: SeoImage[] = [
  {
    src: "/images/seo/dijital-cami-saati-led-yesil.webp",
    alt: "Yeşil LED Vakitmatik cami saati modeli",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/seo/vakitmatik-cami-saati-desen-siyah.webp",
    alt: "Siyah desenli Vakitmatik cami saati modeli",
    width: 1122,
    height: 1402,
  },
  {
    src: "/images/seo/vakitmatik-lcd-cami-saati.webp",
    alt: "LCD Vakitmatik namaz vakti ekranı",
    width: 1448,
    height: 1086,
  },
];

function getSeoImages(page: SeoLandingPageContent) {
  const images = [...page.images, ...compactFallbackImages];
  const seen = new Set<string>();

  return images.filter((image) => {
    if (seen.has(image.src)) {
      return false;
    }

    seen.add(image.src);
    return true;
  }).slice(0, 3);
}

export function SeoLandingPage({ page }: SeoLandingPageProps) {
  const seoImages = getSeoImages(page);
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.label,
      item: absoluteUrl(breadcrumb.href),
    })),
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.metaDescription,
    url: absoluteUrl(page.path),
    inLanguage: "tr-TR",
    primaryImageOfPage: absoluteUrl(seoImages[0]?.src ?? "/images/seo/vakitmatik-cami-saati.webp"),
    image: seoImages.map((image) => absoluteUrl(image.src)),
  };

  return (
    <>
      <LandingControlsProvider>
        <HeroExactNav className="seo-hero-nav" items={subpageNavItems} />
        <main className="seo-page seo-page--strong">
          <section className="seo-strong-hero-section">
            <div className="container-shell seo-strong-shell">
              <nav aria-label="Sayfa yolu" className="seo-breadcrumb">
                {page.breadcrumbs.map((breadcrumb, index) => (
                  <span key={breadcrumb.href}>
                    {index > 0 ? <span aria-hidden="true">/</span> : null}
                    <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                  </span>
                ))}
              </nav>

              <div className="seo-strong-hero-grid">
                <div className="seo-hero-copy">
                  <p className="eyebrow">{page.eyebrow}</p>
                  <h1>{page.title}</h1>
                  <p className="seo-hero-lead">{page.lead}</p>

                  <div className="seo-cta-row">
                    <Link className="seo-primary-cta" href="/">
                      Daha fazla bilgi alın
                    </Link>
                  </div>
                </div>

                <div className="seo-strong-gallery" aria-label="Ürün görselleri">
                  {seoImages.map((image, index) => (
                    <figure className="seo-strong-photo" key={image.src}>
                      <Image
                        alt={image.alt}
                        className="seo-strong-image"
                        height={image.height}
                        priority={index === 0}
                        sizes={index === 0 ? "(max-width: 768px) 84vw, 360px" : "160px"}
                        src={image.src}
                        width={image.width}
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="seo-strong-content-section">
            <div className="container-shell">
              <div className="seo-strong-content-grid">
                {page.sections.map((section) => (
                  <article className="seo-strong-info" key={section.title}>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="seo-strong-faq-section">
            <div className="container-shell">
              <div className="seo-strong-faq-head">
                <p className="eyebrow">Sık Sorulanlar</p>
                <h2>Kısa cevaplar</h2>
              </div>

              <div className="seo-strong-faq-grid">
                {page.faqs.map((faq) => (
                  <article className="seo-strong-faq" key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      </LandingControlsProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
