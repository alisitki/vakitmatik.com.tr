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
  hero: {
    eyebrow: "Vakitmatik / Profesyonel Cami Saati",
    title: "Cami saatiniz hep güncel kalsın.",
    lead:
      "Vakitmatik cami saati; namaz vakitlerini Diyanet verilerine göre gösteren, mobil uygulama ile kolayca güncellenen ve 3 yıl garantiyle sunulan yerli üretim bir cami saatidir.",
    microCopy: "Diyanet verileri · Mobil uygulama · Yerli üretim",
    primaryCta: "WhatsApp’tan yazın",
    secondaryCta: "Hemen arayın",
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
    ctaLabel: "Modeller için WhatsApp’tan yazın",
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
  selection: {
    eyebrow: "Birlikte bakalım",
    title: "Üç kısa adımda tamamlayalım.",
    lead:
      "Caminizin bir fotoğrafını veya yaklaşık ölçüsünü WhatsApp’tan göndermeniz yeterli.",
    steps: [
      {
        index: "01",
        title: "Fotoğrafı gönderin",
        description: "Caminizi ve saatin yerleşeceği alanı kısaca görelim.",
      },
      {
        index: "02",
        title: "Birlikte bakalım",
        description: "Görünüş ve kullanımınıza uygun modeli konuşalım.",
      },
      {
        index: "03",
        title: "Adresinize gönderelim",
        description: "Vakitmatik’inizi Türkiye’nin her yerine kargo ile ulaştıralım.",
      },
    ],
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
      question: "Hangi cami saati modelinin uygun olduğunu nasıl belirleriz?",
      answer:
        "Caminin ölçüsü, izleme mesafesi, montaj noktası ve ayet, hadis veya görsel içerik ihtiyacı birlikte değerlendirilir.",
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
    title: "WhatsApp’tan yazın, birlikte bakalım.",
    lead:
      "Cami saati modelleri, ölçüler ve gönderim hakkında bize yazabilir veya doğrudan arayabilirsiniz.",
    whatsappLabel: "WhatsApp’tan yazın",
    whatsappHref: `https://wa.me/905333827533?text=${whatsappMessage}`,
    phoneLabel: "+90 533 382 75 33",
    phoneHref: "tel:+905333827533",
    note: "Hafta içi 08:30–18:30 · Cumartesi 08:30–12:00",
  },
  footerNote: "Vakitmatik · Cami saatleri ve namaz vakti panoları · Kocaeli / Türkiye",
};
