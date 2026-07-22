import type { Metadata } from "next";
import { AdLandingShell } from "@/components/ad-landing/AdLandingShell";
import { absoluteUrl, createPageMetadata } from "@/config/seo";
import { fiyatModelLanding } from "@/data/adLandingFiyatModel";

const path = "/cami-saati-fiyatlari/";
const metaTitle = "Cami Saati Fiyatları ve Modelleri";
const metaDescription =
  "Vakitmatik cami saati fiyatları ve modelleri: klasik, mesajlı, LED, modül ve LCD seçeneklerini ölçüleriyle inceleyin; güncel fiyatı öğrenin.";

export const metadata: Metadata = createPageMetadata({
  title: metaTitle,
  description: metaDescription,
  path,
});

const brandId = `${absoluteUrl("/")}#brand`;
const pageUrl = absoluteUrl(path);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Brand",
      "@id": brandId,
      name: "Vakitmatik",
      logo: absoluteUrl("/images/vakitmatik-logo2.png"),
      url: absoluteUrl("/"),
    },
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#page`,
      name: metaTitle,
      description: metaDescription,
      url: pageUrl,
      inLanguage: "tr-TR",
      primaryImageOfPage: absoluteUrl(fiyatModelLanding.hero.productImage.src),
      about: {
        "@type": "Thing",
        name: "Cami saati fiyatları ve modelleri",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#models`,
      name: "Vakitmatik Cami Saati Modelleri",
      numberOfItems: fiyatModelLanding.models.items.length,
      itemListElement: fiyatModelLanding.models.items.map((model, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${pageUrl}#model-${model.id}`,
        item: {
          "@type": "Product",
          name: `Vakitmatik ${model.title} Cami Saati`,
          description: model.description,
          category: "Cami saati ve namaz vakti panosu",
          image: absoluteUrl(model.image.src),
          url: `${pageUrl}#model-${model.id}`,
          brand: { "@id": brandId },
        },
      })),
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
          name: "Cami Saati Fiyatları",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: fiyatModelLanding.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function CamiSaatiFiyatlariPage() {
  return (
    <>
      <AdLandingShell config={fiyatModelLanding} />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}
