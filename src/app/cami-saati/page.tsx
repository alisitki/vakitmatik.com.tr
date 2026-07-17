import type { Metadata } from "next";
import { AdLandingShell } from "@/components/ad-landing/AdLandingShell";
import { absoluteUrl, createPageMetadata } from "@/config/seo";
import { camiSaatiLanding } from "@/data/adLandingCamiSaati";

const path = "/cami-saati/";
const metaTitle = "Vakitmatik Cami Saati ve Namaz Vakti Panosu";
const metaDescription =
  "Vakitmatik cami saati ve namaz vakti panosu: mobil uygulama ile güncelleme, 3 yıl garanti, hassas zaman takibi ve ihtiyaca uygun modeller.";

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
          name: "Zaman devresi",
          value: "Üretimde kalibre edilmiş düşük sapmalı RTC",
        },
        {
          "@type": "PropertyValue",
          name: "Yedekleme",
          value: "Duracell pil destekli zaman yedekleme",
        },
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
