import { productItems } from "@/data/landing";
import type { LandingConfig } from "@/types/adLanding";

const modelIds = [
  "vakitmatik-modul",
  "vakitmatik-mesaj",
  "vakitmatik-kayan",
  "vakitmatik-lcd",
] as const;

const modelDescriptions: Record<string, string> = {
  "vakitmatik-mesaj":
    "Namaz vakitleriyle birlikte ayet, hadis ve duyuruları üç satırlık alanda sayfa sayfa gösterir.",
  "vakitmatik-kayan":
    "Namaz vakitleriyle birlikte ayet, hadis ve duyuruları kayan yazı alanında gösterir.",
  "vakitmatik-modul":
    "Hazır ayet, hadis ve Esmaül Hüsna içeriklerini gösterir; istenen ölçülere göre projelendirilebilir.",
  "vakitmatik-lcd":
    "Namaz vakitlerini fotoğraf ve grafiklerle birlikte yüksek çözünürlüklü 4K ekranda gösterir.",
};

const models = modelIds.flatMap((modelId) => {
  const product = productItems.find((item) => item.id === modelId);

  if (!product) {
    return [];
  }

  const primaryImage = product.media[0];

  return [
    {
      id: product.id,
      title: product.shortName,
      description: modelDescriptions[product.id] ?? product.summary,
      dimensions: product.dimensions,
      image: {
        src: `/images/landing/ayet-hadis/${product.id}-480.webp`,
        alt: primaryImage.alt,
        width: 480,
        height: 600,
      },
    },
  ];
});

const whatsappMessage = encodeURIComponent(
  "Merhaba, ayet hadis ve cami mesaj panosu modelleriniz hakkında bilgi almak istiyorum.",
);

export const ayetHadisLanding: LandingConfig = {
  variant: "ayet-hadis",
  navigation: {
    modelsLabel: "Modeller",
    detailsLabel: "Ekran seçenekleri",
    faqLabel: "Sık sorulanlar",
    contactLabel: "İletişim",
  },
  hero: {
    eyebrow: "Vakitmatik / Ayet Hadis Panosu",
    title: "Ayet, Hadis, Esmaül Hüsna ve Duyurularınız.",
    lead:
      "Namaz vakitleriyle birlikte hazır Ayet, Hadis ve Esmaül Hüsna içeriklerini; ölüm ilanı, duyuru ve istediğiniz mesajları gösterebilir, tümünü cep telefonunuzdan ayarlayabilirsiniz.",
    microCopy: "Ayet · Hadis · Esmaül Hüsna · Duyuru",
    primaryCta: "WhatsApp’tan yazın",
    mobilePrimaryCta: "WhatsApp",
    secondaryCta: "Ürünleri incele",
    secondaryHref: "/",
    productImage: {
      src: "/images/landing/ayet-hadis/vakitmatik-modul-480.webp",
      mobileSrc: "/images/landing/ayet-hadis/vakitmatik-modul-320.webp",
      alt: "Ayet, hadis, duyuru ve namaz vakti gösterebilen Vakitmatik modül pano",
      width: 480,
      height: 600,
    },
    secondaryProductImage: {
      src: "/images/landing/ayet-hadis/vakitmatik-modul-yesil-480.webp",
      mobileSrc: "/images/landing/ayet-hadis/vakitmatik-modul-yesil-320.webp",
      alt: "Yeşil LED Vakitmatik modül ayet hadis ve cami mesaj panosu",
      width: 480,
      height: 600,
    },
  },
  proofs: [
    {
      index: "01",
      title: "Hazır dini içerikler",
      description:
        "Ayet, Hadis ve Esmaül Hüsna içeriklerini namaz vakitleriyle birlikte gösterin.",
    },
    {
      index: "02",
      title: "Telefondan içerik yönetimi",
      description:
        "Duyuru, ölüm ilanı ve istediğiniz mesajları cep telefonunuzdan ayarlayın.",
    },
    {
      index: "03",
      title: "Türkiye’nin her yerine kargo",
      description: "Ürünlerinizi Türkiye genelinde adresinize gönderiyoruz.",
    },
  ],
  models: {
    eyebrow: "Vakitmatik ürün ailesi",
    title: "Cami Mesaj Panosu Modelleri",
    lead:
      "Namaz vakitlerini ayet, hadis, Esmaül Hüsna ve duyurularınızla birlikte gösterin. Caminize uygun ekran modelini seçin.",
    railLabel: "Cami mesaj panosu modelleri",
    items: models,
  },
  engineering: {
    eyebrow: "Ekran seçenekleri",
    title: "Paylaşacağınız içeriğe uygun ekranı seçin.",
    lead:
      "Kısa duyurular, kayan metinler, hazır içerikler ve görseller için farklı Vakitmatik ekran seçenekleri bulunur.",
    image: {
      src: "/images/landing/ayet-hadis/vakitmatik-modul-480.webp",
      alt: "Kırmızı LED Vakitmatik modül ayet hadis ve cami mesaj panosu",
      width: 480,
      height: 600,
    },
    insightStrip: ["Ayet ve hadis", "Esmaül Hüsna", "Cami duyuruları"],
    details: [
      {
        title: "Sayfalı mesaj alanı",
        description:
          "Mesaj modelinde namaz vakitlerinin altında üç satır ve 16 karakterlik içerikler sayfa sayfa gösterilebilir.",
      },
      {
        title: "Kayan yazı alanı",
        description:
          "Kayan Yazı modelinde ayet, hadis ve cami duyuruları namaz vakitlerinin altındaki alanda hareketli olarak gösterilebilir.",
      },
      {
        title: "Hazır ayet ve hadis içerikleri",
        description:
          "Modül modelinde hazır ayet, hadis ve Esmaül Hüsna sayfaları ile ayrıca yazılabilen mesaj alanı bulunur.",
      },
      {
        title: "LCD ekranda görsel içerik",
        description:
          "LCD modelinde namaz vakitleri fotoğraf ve grafiklerle birlikte yüksek çözünürlüklü ekranda gösterilebilir.",
      },
    ],
  },
  faqHeading: {
    eyebrow: "Sık sorulanlar",
    title: "Kısa, doğrudan cevaplar.",
  },
  faqs: [
    {
      question: "Ayet ve hadis metinleri nasıl gösteriliyor?",
      answer:
        "Gösterim biçimi modele göre değişir. Mesaj modelinde içerikler sayfa sayfa, Kayan Yazı modelinde hareketli, Modül modelinde ise hazır içerik sayfalarıyla gösterilebilir.",
    },
    {
      question: "Ayet hadis panosu namaz vakitlerini de gösterir mi?",
      answer:
        "Evet. Bu sayfadaki Mesaj, Kayan Yazı, Modül ve LCD Vakitmatik seçenekleri namaz vakti bilgilerini de ekranda gösterir.",
    },
    {
      question: "Sabit mesaj ile kayan yazı arasındaki fark nedir?",
      answer:
        "Mesaj modelinde üç satır ve 16 karakterlik içerikler sayfa sayfa gösterilir. Kayan Yazı modelinde metin, ekran üzerinde hareket ederek ilerler.",
    },
    {
      question: "İçerikleri cep telefonundan ayarlayabilir miyiz?",
      answer:
        "Evet. Namaz vakitlerini, hazır dini içerikleri ve kendi mesajlarınızı cep telefonunuzdan ayarlayabilirsiniz.",
    },
    {
      question: "Türkiye’nin her yerine gönderim yapıyor musunuz?",
      answer:
        "Evet. Vakitmatik cami mesaj panolarını Türkiye’nin her yerine kargo ile gönderiyoruz.",
    },
  ],
  contact: {
    eyebrow: "Sorunuz mu var?",
    title: "Beğendiğiniz modeli bize yazın.",
    lead:
      "Ürün özellikleri, ölçüler, sipariş ve kargo hakkında soru sormak için bize yazabilir veya bizi arayabilirsiniz.",
    whatsappLabel: "WhatsApp",
    whatsappHref: `https://wa.me/905333827533?text=${whatsappMessage}`,
    phoneLabel: "+90 533 382 75 33",
    phoneHref: "tel:+905333827533",
    note: "Hafta içi 08:30–18:30 · Cumartesi 08:30–12:00",
  },
  footerNote:
    "Vakitmatik · Ayet hadis ve cami mesaj panosu modelleri · Kocaeli / Türkiye",
};
