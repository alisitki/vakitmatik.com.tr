import { productItems } from "@/data/landing";
import type { LandingConfig } from "@/types/adLanding";

const modelIds = new Set([
  "vakitmatik-mesaj",
  "vakitmatik-kayan",
  "vakitmatik-modul",
  "vakitmatik-lcd",
]);

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

const models = productItems
  .filter((product) => modelIds.has(product.id))
  .map((product) => {
    const primaryImage = product.media[0];

    return {
      id: product.id,
      title: product.shortName,
      description: modelDescriptions[product.id] ?? product.summary,
      dimensions: product.dimensions,
      image: {
        src: `/images/landing/cami-saati/${product.id}-640.webp`,
        alt: primaryImage.alt,
        width: 640,
        height: 800,
      },
    };
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
    title: "Mesajınız her zaman görünür.",
    lead:
      "Vakitmatik ayet hadis ve cami mesaj panosu seçenekleri; ayet, hadis, duyuru ve namaz vakti bilgilerini caminizde düzenli ve okunaklı biçimde göstermenizi sağlar.",
    microCopy: "Ayet · Hadis · Cami duyuruları",
    primaryCta: "WhatsApp’tan yazın",
    mobilePrimaryCta: "WhatsApp",
    secondaryCta: "Ürünleri incele",
    secondaryHref: "/",
    productImage: {
      src: "/images/landing/ayet-hadis/vakitmatik-modul-480.webp",
      alt: "Ayet, hadis, duyuru ve namaz vakti gösterebilen Vakitmatik modül pano",
      width: 480,
      height: 600,
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
      title: "Ayet, hadis ve duyuru alanı",
      description:
        "İçeriğinizi seçtiğiniz modele göre sayfalı veya kayan yazı biçiminde gösterin.",
    },
    {
      index: "02",
      title: "Namaz vakitleri aynı ekranda",
      description:
        "Cami mesajlarınızla namaz vakti bilgilerini tek panoda bir araya getirin.",
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
      "Sayfalı mesaj alanı, kayan yazı, modül ve LCD ekran seçeneklerini inceleyin. Beğendiğiniz ürünün kartına tıklayarak ana sayfadaki tüm görsellerine ve özelliklerine ulaşabilirsiniz.",
    railLabel: "Cami mesaj panosu modelleri",
    items: models,
  },
  engineering: {
    eyebrow: "Ekran seçenekleri",
    title: "Paylaşacağınız içeriğe uygun ekranı seçin.",
    lead:
      "Kısa duyurular, kayan metinler, hazır içerikler ve görseller için farklı Vakitmatik ekran seçenekleri bulunur.",
    image: {
      src: "/images/landing/cami-saati/vakitmatik-mesaj-640.webp",
      alt: "Ayet, hadis ve duyuru alanlı Vakitmatik mesaj panosu",
      width: 640,
      height: 800,
    },
    insightStrip: ["Ayet ve hadis", "Cami duyuruları", "Namaz vakitleri"],
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
      question: "Namaz vakitleri telefondan güncellenebilir mi?",
      answer:
        "Evet. Uyumlu Vakitmatik modellerinde güncel namaz vakitleri mobil uygulama üzerinden cihaza aktarılabilir.",
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
