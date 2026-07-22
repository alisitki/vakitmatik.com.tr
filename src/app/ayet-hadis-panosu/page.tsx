import type { Metadata } from "next";
import { AdLandingShell } from "@/components/ad-landing/AdLandingShell";
import { absoluteUrl, createPageMetadata } from "@/config/seo";
import { ayetHadisLanding } from "@/data/adLandingAyetHadis";

const path = "/ayet-hadis-panosu/";
const metaTitle = "Ayet Hadis Panosu ve Cami Mesaj Panosu";
const metaDescription =
  "Vakitmatik ayet hadis ve cami mesaj panosu modelleri: mesaj, kayan yazı, modül ve LCD seçeneklerini ölçü ve özellikleriyle inceleyin.";

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
      primaryImageOfPage: absoluteUrl(ayetHadisLanding.hero.productImage.src),
      about: {
        "@type": "Thing",
        name: "Ayet hadis panosu ve cami mesaj panosu",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#models`,
      name: "Vakitmatik Cami Mesaj Panosu Modelleri",
      numberOfItems: ayetHadisLanding.models.items.length,
      itemListElement: ayetHadisLanding.models.items.map((model, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${pageUrl}#model-${model.id}`,
        item: {
          "@type": "Product",
          name: `Vakitmatik ${model.title}`,
          description: model.description,
          category: "Ayet hadis panosu ve cami mesaj panosu",
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
          name: "Ayet Hadis Panosu",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: ayetHadisLanding.faqs.map((faq) => ({
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

export default function AyetHadisPanosuPage() {
  return (
    <>
      <AdLandingShell config={ayetHadisLanding} />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}
