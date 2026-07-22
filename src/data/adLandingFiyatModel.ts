import { camiSaatiLanding } from "@/data/adLandingCamiSaati";
import type { LandingConfig } from "@/types/adLanding";

const whatsappMessage = encodeURIComponent(
  "Merhaba, cami saati modellerinizin güncel fiyatlarını öğrenmek istiyorum.",
);

export const fiyatModelLanding: LandingConfig = {
  variant: "fiyat-model",
  navigation: {
    modelsLabel: "Modeller",
    detailsLabel: "Fiyatı ne belirler?",
    faqLabel: "Sık sorulanlar",
    contactLabel: "İletişim",
  },
  hero: {
    eyebrow: "Vakitmatik / Cami Saati Fiyatları",
    title: "Cami saati fiyatı modele göre değişir.",
    lead:
      "Klasik, mesajlı, LED, modül ve LCD Vakitmatik cami saatlerinin ölçüleri ve özellikleri farklıdır. Modelleri inceleyin; beğendiğiniz ürünün güncel fiyatını WhatsApp’tan veya telefonla öğrenin.",
    microCopy: "10 model · 3 yıl garanti · Türkiye geneli kargo",
    primaryCta: "WhatsApp’tan fiyat sorun",
    mobilePrimaryCta: "WhatsApp",
    secondaryCta: "Hemen arayın",
    productImage: camiSaatiLanding.hero.productImage,
    appImage: camiSaatiLanding.hero.appImage,
  },
  proofs: [
    {
      index: "01",
      title: "10 farklı model",
      description: "Klasik, mesajlı, kayan yazı, LED, modül ve LCD seçenekleri.",
    },
    {
      index: "02",
      title: "3 yıl garanti",
      description: "Üretim kaynaklı hata ve arızalara karşı 3 yıl güvence.",
    },
    {
      index: "03",
      title: "Türkiye’nin her yerine kargo",
      description: "Ürünlerinizi Türkiye genelinde adresinize gönderiyoruz.",
    },
  ],
  models: {
    eyebrow: "Modeli seçin",
    title: "Vakitmatik Cami Saati Modelleri",
    lead:
      "Fiyat, seçtiğiniz modelin yapısına, ölçüsüne ve ekran türüne göre değişir. Kartlardan modeli belirleyip adını bize yazmanız yeterli.",
    items: camiSaatiLanding.models.items,
  },
  engineering: {
    eyebrow: "Cami saati fiyatları",
    title: "Fiyatı belirleyen dört temel fark.",
    lead:
      "Ürünlerin gövdesi, ekranı ve ölçüsü değiştikçe kullanılan malzeme ve üretim yapısı da değişir.",
    image: {
      src: "/images/landing/cami-saati/vakitmatik-led-640.webp",
      alt: "Büyük camiler için yüksek görünürlüklü Vakitmatik LED cami saati",
      width: 640,
      height: 800,
    },
    insightStrip: ["Model türü", "Ölçü", "Ekran yapısı"],
    details: [
      {
        title: "Model türü",
        description:
          "Klasik display, mesajlı, kayan yazı, LED, modül ve LCD ürünler farklı gövde ve ekran yapılarına sahiptir.",
      },
      {
        title: "Pano ölçüsü ve rakam yüksekliği",
        description:
          "Pano ölçüsü ve kullanılan rakam yüksekliği modele göre değişir. Aynı model ailesinde farklı ebat seçenekleri bulunabilir.",
      },
      {
        title: "Gösterilen içerik",
        description:
          "Yalnızca namaz vakitlerini gösteren modeller ile mesaj, ayet, hadis veya görsel alanı bulunan modeller aynı yapıda değildir.",
      },
      {
        title: "Standart veya projelendirilmiş ürün",
        description:
          "Standart ölçülü modeller ile isteğe göre ölçülendirilebilen LED ve modül ürünlerin fiyatları farklı şekilde belirlenir.",
      },
    ],
  },
  faqHeading: {
    eyebrow: "Cami saati fiyatları",
    title: "Fiyatla ilgili kısa cevaplar.",
  },
  faqs: [
    {
      question: "Cami saati fiyatları neden tek değil?",
      answer:
        "Klasik, mesajlı, LED, modül ve LCD modellerin ölçüleri, ekran yapıları ve gösterdikleri içerikler farklıdır. Bu nedenle fiyat seçilen modele göre değişir.",
    },
    {
      question: "Güncel fiyatı en hızlı nasıl öğrenebilirim?",
      answer:
        "Beğendiğiniz modelin adını veya ekran görüntüsünü WhatsApp’tan gönderebilirsiniz. İsterseniz bizi doğrudan arayarak da güncel fiyatı öğrenebilirsiniz.",
    },
    {
      question: "LED ve LCD cami saati fiyatları farklı mı?",
      answer:
        "Evet. LED ve LCD ürünler farklı ekran teknolojileri ve ölçü seçenekleri kullandığı için fiyatları klasik modellerden ve birbirlerinden farklıdır.",
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
    eyebrow: "Güncel fiyat",
    title: "Modelin adını yazın, fiyatını söyleyelim.",
    lead:
      "Beğendiğiniz modelin adını veya ekran görüntüsünü WhatsApp’tan gönderebilir, isterseniz doğrudan arayabilirsiniz.",
    whatsappLabel: "WhatsApp",
    whatsappHref: `https://wa.me/905333827533?text=${whatsappMessage}`,
    phoneLabel: "+90 533 382 75 33",
    phoneHref: "tel:+905333827533",
    note: "Hafta içi 08:30–18:30 · Cumartesi 08:30–12:00",
  },
  footerNote: "Vakitmatik · Cami saati modelleri ve güncel fiyat bilgisi · Kocaeli / Türkiye",
};
