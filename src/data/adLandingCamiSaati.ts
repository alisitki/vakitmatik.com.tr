import { productItems } from "@/data/landing";
import type { LandingConfig } from "@/types/adLanding";

const whatsappMessage = encodeURIComponent(
  "Merhaba, cami saati modelleriniz hakkında bilgi almak istiyorum.",
);

const models = productItems.map((product) => {
  const primaryImage = product.media[0];

  return {
    id: product.id,
    title: product.shortName,
    description: product.summary,
    dimensions: product.dimensions,
    image: {
      src: `/images/landing/cami-saati/${product.id}-640.webp`,
      alt: primaryImage.alt,
      width: 640,
      height: 800,
    },
  };
});

export const camiSaatiLanding: LandingConfig = {
  variant: "cami-saati",
  navigation: {
    modelsLabel: "Modeller",
    detailsLabel: "Neden Vakitmatik?",
    faqLabel: "Sık sorulanlar",
    contactLabel: "İletişim",
  },
  hero: {
    eyebrow: "Vakitmatik / Profesyonel Cami Saati",
    title: "Cami saatiniz hep güncel kalsın.",
    lead:
      "Vakitmatik cami saati; namaz vakitlerini Diyanet verilerine göre gösteren, mobil uygulama ile kolayca güncellenen ve 3 yıl garantiyle sunulan yerli üretim bir cami saatidir.",
    microCopy: "Diyanet verileri · Mobil uygulama · Yerli üretim",
    primaryCta: "WhatsApp’tan yazın",
    mobilePrimaryCta: "WhatsApp",
    secondaryCta: "Ürünleri incele",
    secondaryHref: "/",
    productImage: {
      src: "/images/seo/vakitmatik-cami-saati.webp",
      mobileSrc: "/images/seo/vakitmatik-cami-saati-mobile.webp",
      tabletSrc: "/images/seo/vakitmatik-cami-saati-tablet.webp",
      alt: "Mavi Vakitmatik cami saati ve namaz vakti panosu",
      width: 1122,
      height: 1402,
    },
    appImage: {
      src: "/images/seo/vakitmatik-mobil-uygulama-namaz-vakti.webp",
      alt: "Vakitmatik mobil uygulamasında namaz vakti güncelleme ekranı",
      width: 400,
      height: 836,
    },
  },
  proofs: [
    {
      index: "01",
      title: "3 yıl garanti",
      description: "Üretim kaynaklı hata ve arızalara karşı 3 yıl güvence.",
    },
    {
      index: "02",
      title: "Mobil uygulamayla güncelleme",
      description: "Namaz vakitlerini telefonunuzdan kolayca güncelleyin.",
    },
    {
      index: "03",
      title: "Türkiye’nin her yerine kargo",
      description: "Ürünlerinizi Türkiye genelinde adresinize gönderiyoruz.",
    },
  ],
  models: {
    eyebrow: "Vakitmatik ürün ailesi",
    title: "Cami Saati Modelleri",
    lead:
      "Klasik desenli modellerden mesaj, kayan yazı, LED, modül ve LCD seçeneklerine kadar tüm Vakitmatik cami saati modellerini inceleyin.",
    items: models,
  },
  engineering: {
    eyebrow: "Neden Vakitmatik?",
    title: "İyi görünen ürünün arkasında iyi mühendislik var.",
    lead:
      "Günlük kullanım sade; vakit güncelleme, zaman yedekleme ve garanti desteği işinizi kolaylaştırır.",
    image: {
      src: "/images/landing/cami-saati/vakitmatik-desen-mavi-640.webp",
      alt: "Cami içinde kullanılan mavi desenli Vakitmatik cami saati",
      width: 640,
      height: 800,
    },
    insightStrip: ["Sade kullanım", "Mobil güncelleme", "Güvenilir yedekleme"],
    details: [
      {
        title: "Diyanet verilerine göre güncel vakitler",
        description:
          "Vakitler, T.C. Diyanet İşleri Başkanlığının yayımladığı veriler esas alınarak mobil uygulama üzerinden cihaza aktarılır.",
      },
      {
        title: "Telefondan kolay güncelleme",
        description:
          "Bilgisayar kullanmadan güncel namaz vakitlerini telefonunuzdan cihaza aktarın.",
      },
      {
        title: "Elektrik kesintisine karşı yedekleme",
        description:
          "Saat bilgisinin korunmasına yardımcı olan yedekleme devresinde Duracell pil kullanılır.",
      },
      {
        title: "Yerli üretim, 3 yıl garanti",
        description:
          "Vakitmatik cami saatleri yerli olarak üretilir ve üretim kaynaklı hata ve arızalara karşı 3 yıl garanti kapsamındadır.",
      },
    ],
  },
  faqHeading: {
    eyebrow: "Sık sorulanlar",
    title: "Kısa, doğrudan cevaplar.",
  },
  faqs: [
    {
      question: "Namaz vakitleri telefondan güncellenebilir mi?",
      answer:
        "Evet. Uyumlu Vakitmatik modellerinde güncel namaz vakitleri mobil uygulama üzerinden cihaza aktarılabilir.",
    },
    {
      question: "Cami saati sürekli internet bağlantısı ister mi?",
      answer:
        "Hayır. Cihaz temel çalışması için sürekli internet istemez. Güncel veriyi almak için telefonun interneti kullanılabilir; aktarım mobil uygulama üzerinden yapılır.",
    },
    {
      question: "Cami saati modeli seçerken nelere bakılmalı?",
      answer:
        "Model karşılaştırırken pano ölçüsü, izleme mesafesi, yatay veya dikey kullanım ile mesaj, LED ya da LCD ekran ihtiyacı dikkate alınabilir. Ürünlerin ölçü ve özellikleri model kartlarında yer alır.",
    },
    {
      question: "Vakitmatik cami saatlerinin garanti süresi nedir?",
      answer:
        "Vakitmatik ürünleri üretim kaynaklı hata ve arızalara karşı üç yıl garanti kapsamındadır.",
    },
    {
      question: "Türkiye’nin her yerine gönderim yapıyor musunuz?",
      answer:
        "Evet. Vakitmatik cami saatlerini Türkiye’nin her yerine kargo ile gönderiyoruz.",
    },
  ],
  contact: {
    eyebrow: "Sorunuz mu var?",
    title: "Sorunuz varsa bize ulaşın.",
    lead:
      "Ürün özellikleri, ölçüler, sipariş ve kargo için bize yazabilir veya bizi arayabilirsiniz.",
    whatsappLabel: "WhatsApp",
    whatsappHref: `https://wa.me/905333827533?text=${whatsappMessage}`,
    phoneLabel: "+90 533 382 75 33",
    phoneHref: "tel:+905333827533",
    note: "Hafta içi 08:30–18:30 · Cumartesi 08:30–12:00",
  },
  footerNote: "Vakitmatik · Cami saatleri ve namaz vakti panoları · Kocaeli / Türkiye",
};
