import type { LandingConfig } from "@/types/adLanding";

const whatsappMessage = encodeURIComponent(
  "Merhaba, cami saati modelleriniz hakkında bilgi almak istiyorum.",
);

export const camiSaatiLanding: LandingConfig = {
  variant: "cami-saati",
  hero: {
    eyebrow: "Vakitmatik / Profesyonel Cami Saati",
    title: "Caminizin vaktini güvenle yönetin.",
    lead:
      "Vakitmatik cami saati; namaz vakitlerini net gösteren, mobil uygulama ile kolay güncellenen ve üç yıl garantiyle sunulan profesyonel bir namaz vakti panosudur.",
    microCopy: "Cami saati · Namaz vakti panosu · Mobil uygulama ile güncelleme",
    primaryCta: "WhatsApp’tan bilgi alın",
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
      description: "Üretim kalitesine dayanan uzun süreli güvence.",
    },
    {
      index: "02",
      title: "Telefondan güncelleme",
      description: "Güncel vakitleri bilgisayara ihtiyaç duymadan aktarın.",
    },
    {
      index: "03",
      title: "Hassas zaman takibi",
      description: "Üretimde kalibre edilen saat devresiyle güvenilir kullanım.",
    },
  ],
  models: {
    eyebrow: "Cami saati çözümleri",
    title: "Caminize uygun üç güçlü yaklaşım.",
    lead:
      "Mimari görünüm, izleme mesafesi ve göstermek istediğiniz içerik belirlenir; ihtiyacınıza uyan ürün ailesi birlikte seçilir.",
    items: [
      {
        label: "Klasik seri",
        title: "Caminin mimarisiyle bütünleşir.",
        description: "Dekoratif çerçeve ve yüksek kontrastlı namaz vakti görünümü.",
        image: {
          src: "/images/seo/vakitmatik-yatay-cami-saati.webp",
          alt: "Cami içerisinde klasik yatay Vakitmatik namaz vakti panosu",
          width: 1122,
          height: 1402,
        },
      },
      {
        label: "Mesaj serisi",
        title: "Vakitlerle birlikte mesajınız da görünür.",
        description: "Namaz vakitleriyle ayet, hadis ve duyuru alanını birleştiren yapı.",
        image: {
          src: "/images/seo/vakitmatik-mesajli-namaz-vakti-panosu.webp",
          alt: "Ayet, hadis ve duyuru gösterebilen Vakitmatik cami saati",
          width: 1122,
          height: 1402,
        },
      },
      {
        label: "LCD seri",
        title: "Yeni nesil camiler için dijital yüzey.",
        description: "Namaz vakitlerini ve görsel içerikleri aynı ekranda buluşturur.",
        image: {
          src: "/images/seo/vakitmatik-lcd-cami-saati.webp",
          alt: "Cami içerisinde Vakitmatik LCD namaz vakti ekranı",
          width: 1122,
          height: 1402,
        },
      },
    ],
  },
  engineering: {
    eyebrow: "Neden Vakitmatik?",
    title: "İyi görünen ürünün arkasında iyi mühendislik var.",
    lead:
      "Kullanırken yalnızca sadeliği görürsünüz. Uzun süre güvenilir çalışmasını sağlayan teknik ayrıntılar ise üretim sürecinde çözülür.",
    image: {
      src: "/images/seo/vakitmatik-cami-saati-desen-mavi.webp",
      alt: "Cami içinde kullanılan mavi desenli Vakitmatik cami saati",
      width: 1122,
      height: 1402,
    },
    details: [
      {
        title: "Uzun süre doğru kalan saat",
        benefit: "Vakit bilgisini güvenle takip edin.",
        technical:
          "Düşük sapmalı RTC zaman devresi üretim sırasında kalibre edilir ve teslimat öncesinde doğrulanır.",
      },
      {
        title: "Elektrik kesintisine karşı yedekleme",
        benefit: "Saat ve ayarlarınız korunsun.",
        technical:
          "Duracell yedekleme pili ve ilgili devre bileşenleri üretim testinden geçirilir.",
      },
      {
        title: "Telefondan kolay güncelleme",
        benefit: "Bilgisayar olmadan birkaç adımda vakit aktarın.",
        technical:
          "Vakitmatik mobil uygulaması güncel namaz vakti verilerini cihazla doğrudan bağlantı kurarak aktarır.",
      },
      {
        title: "Teslimat öncesi tam kontrol",
        benefit: "Kurulduğu günden itibaren tutarlı çalışsın.",
        technical:
          "Her ürünün zaman sapması, ekran fonksiyonları, bağlantısı ve yedekleme devresi teslimat öncesinde kontrol edilir.",
      },
    ],
  },
  selection: {
    eyebrow: "Doğru model seçimi",
    title: "Caminize göre netleştirelim.",
    lead:
      "Tek bir fiyat listesi yerine alanı, izleme mesafesini ve içerik ihtiyacını anlayarak doğru cami saatini seçiyoruz.",
    steps: [
      {
        index: "01",
        title: "Alanı anlayalım",
        description: "Caminin ölçüsü, montaj noktası ve izleme mesafesi değerlendirilir.",
      },
      {
        index: "02",
        title: "Ürün ailesini seçelim",
        description: "Klasik, mesajlı veya LCD seçenekleri ihtiyaca göre sadeleştirilir.",
      },
      {
        index: "03",
        title: "Teklifi netleştirelim",
        description: "Seçilen model ve ölçü için açık, anlaşılır teklif paylaşılır.",
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
      question: "Cami saati fiyatı nasıl belirlenir?",
      answer:
        "Fiyat; seçilen ürün ailesine, ölçüye, ekran tipine ve kullanım ihtiyacına göre netleşir. Kısa bir görüşmeyle doğru model üzerinden teklif hazırlanır.",
    },
  ],
  contact: {
    eyebrow: "Doğru modeli birlikte seçelim",
    title: "Caminize uygun Vakitmatik’i konuşalım.",
    lead:
      "Kullanım alanınızı ve görünürlük ihtiyacınızı paylaşın; seçenekleri sadeleştirip doğru model üzerinden ilerleyelim.",
    whatsappLabel: "WhatsApp’tan bilgi alın",
    whatsappHref: `https://wa.me/905333827533?text=${whatsappMessage}`,
    phoneLabel: "+90 533 382 75 33",
    phoneHref: "tel:+905333827533",
    note: "Hafta içi 08:30–18:30 · Cumartesi 08:30–12:00",
  },
  footerNote: "Vakitmatik · Cami saatleri ve namaz vakti panoları · Kocaeli / Türkiye",
};
