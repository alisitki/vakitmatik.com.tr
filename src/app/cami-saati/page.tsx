import type { Metadata } from "next";
import { AdLandingShell } from "@/components/ad-landing/AdLandingShell";
import { absoluteUrl, createPageMetadata } from "@/config/seo";
import { camiSaatiLanding } from "@/data/adLandingCamiSaati";

const path = "/cami-saati/";
const metaTitle = "Vakitmatik Cami Saati ve Namaz Vakti Panosu";
const metaDescription =
  "Vakitmatik cami saati modelleri: Diyanet verilerine göre namaz vakitleri, mobil uygulamayla kolay güncelleme, 3 yıl garanti ve Türkiye geneline kargo.";

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
      "@type": "Product",
      "@id": `${pageUrl}#product`,
      name: "Vakitmatik Cami Saati",
      description: metaDescription,
      category: "Cami saati ve namaz vakti panosu",
      url: pageUrl,
      image: [
        absoluteUrl(camiSaatiLanding.hero.productImage.src),
        ...camiSaatiLanding.models.items.map((model) => absoluteUrl(model.image.src)),
      ],
      brand: { "@id": brandId },
      manufacturer: { "@id": brandId },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Garanti süresi",
          value: "3 yıl",
        },
        {
          "@type": "PropertyValue",
          name: "Güncelleme yöntemi",
          value: "Vakitmatik mobil uygulaması",
        },
        {
          "@type": "PropertyValue",
          name: "Namaz vakti verisi",
          value: "T.C. Diyanet İşleri Başkanlığı verileri",
        },
        {
          "@type": "PropertyValue",
          name: "Yedekleme",
          value: "Duracell pil kullanılan zaman yedekleme devresi",
        },
        {
          "@type": "PropertyValue",
          name: "Üretim",
          value: "Yerli üretim",
        },
        {
          "@type": "PropertyValue",
          name: "Gönderim",
          value: "Türkiye’nin her yerine kargo",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#models`,
      name: "Vakitmatik Cami Saati Modelleri",
      numberOfItems: camiSaatiLanding.models.items.length,
      itemListElement: camiSaatiLanding.models.items.map((model, index) => ({
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
          name: "Cami Saati",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: camiSaatiLanding.faqs.map((faq) => ({
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

export default function CamiSaatiPage() {
  return (
    <>
      <AdLandingShell config={camiSaatiLanding} />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}
