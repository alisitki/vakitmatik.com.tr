import type { LandingConfig } from "@/types/adLanding";

export const adLandingPreview: LandingConfig = {
  variant: "cami-saati",
  previewNote: "Metinler örnektir — bu aşamada yalnızca ortak görsel sistem değerlendiriliyor.",
  hero: {
    eyebrow: "Vakitmatik / Profesyonel Cami Saati",
    title: "Caminizin vaktini güvenle yönetin.",
    lead:
      "Güncel namaz vakitlerini güçlü bir ürün tasarımı, sade kullanım ve mobil kontrol ile bir araya getiren Vakitmatik deneyimi.",
    primaryCta: "WhatsApp’tan bilgi alın",
    secondaryCta: "Hemen arayın",
    productImage: {
      src: "/images/seo/vakitmatik-cami-saati.webp",
      alt: "Mavi Vakitmatik cami saati ve namaz vakti panosu",
      width: 1122,
      height: 1402,
    },
    appImage: {
      src: "/images/seo/vakitmatik-mobil-uygulama-namaz-vakti.webp",
      alt: "Vakitmatik mobil uygulaması",
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
      title: "Mobil uygulama",
      description: "Vakitleri bilgisayara ihtiyaç duymadan güncelleyin.",
    },
    {
      index: "03",
      title: "Güncel vakitler",
      description: "Diyanet verileriyle uyumlu, sade ve güvenilir kullanım.",
    },
  ],
  models: {
    eyebrow: "Seçilmiş çözümler",
    title: "Katalog değil, doğru ürüne giden kısa yol.",
    lead:
      "Landing sayfalarında onlarca ürün sıralamak yerine, ihtiyaca göre üç güçlü çözüm gösterilecek.",
    items: [
      {
        label: "Klasik seri",
        title: "Mimarinin parçası gibi.",
        description: "Dekoratif çerçeve ve yüksek kontrastlı vakit görünümü.",
        image: {
          src: "/images/seo/vakitmatik-yatay-cami-saati.webp",
          alt: "Cami içerisinde yatay Vakitmatik namaz vakti panosu",
          width: 1122,
          height: 1402,
        },
      },
      {
        label: "Mesaj serisi",
        title: "Vakitlerle birlikte mesajınız da görünür.",
        description: "Ayet, hadis ve duyuru alanını aynı üründe birleştiren yapı.",
        image: {
          src: "/images/seo/vakitmatik-mesajli-namaz-vakti-panosu.webp",
          alt: "Mesaj alanlı Vakitmatik cami saati",
          width: 1122,
          height: 1402,
        },
      },
      {
        label: "LCD seri",
        title: "Yeni nesil camiler için dijital yüzey.",
        description: "Görsel içerik ve namaz vakitlerini tek ekranda buluşturur.",
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
      "Ana anlatım müşterinin anlayacağı kadar sade kalır. Teknik dayanaklar, isteyen kullanıcı için açılır ayrıntılarda yer alır.",
    image: {
      src: "/images/seo/vakitmatik-cami-saati-desen-mavi.webp",
      alt: "Mavi desenli Vakitmatik cami saati",
      width: 1122,
      height: 1402,
    },
    details: [
      {
        title: "Uzun süre doğru kalan saat",
        benefit: "Vakit bilgisini güvenle takip edin.",
        technical: "Kalibre edilmiş düşük sapmalı RTC zaman devresi kullanılır.",
      },
      {
        title: "Güvenilir yedekleme",
        benefit: "Elektrik kesintilerinde ayarlarınızı koruyun.",
        technical: "Seçilmiş pil ve yedekleme bileşenleri üretim testinden geçirilir.",
      },
      {
        title: "Telefondan kolay güncelleme",
        benefit: "Bilgisayar olmadan birkaç adımda vakit aktarın.",
        technical: "Mobil uygulama cihazla doğrudan bağlantı kurarak veri aktarır.",
      },
      {
        title: "Üretimde hassas kalibrasyon",
        benefit: "Kurulduğu günden itibaren tutarlı çalışır.",
        technical: "Her ürün teslimat öncesinde zaman, ekran ve bağlantı kontrolünden geçer.",
      },
    ],
  },
  selection: {
    eyebrow: "Model seçimi",
    title: "Üç adımda ihtiyaca uygun çözüm.",
    lead: "Fiyat listesi kalabalığı yerine caminin alanı, görünürlük ihtiyacı ve kullanım şekli değerlendirilir.",
    steps: [
      {
        index: "01",
        title: "Alanı anlayalım",
        description: "Caminin iç/dış mekânı ve izleme mesafesi değerlendirilir.",
      },
      {
        index: "02",
        title: "Doğru modeli seçelim",
        description: "Ebat, ekran ve mesaj ihtiyacına göre seçenek sadeleştirilir.",
      },
      {
        index: "03",
        title: "Teklifi netleştirelim",
        description: "Seçilen ürün için açık ve anlaşılır teklif paylaşılır.",
      },
    ],
  },
  faqs: [
    {
      question: "Vakitler telefondan güncellenebilir mi?",
      answer: "Evet. Uyumlu Vakitmatik modellerinde güncel vakitler mobil uygulama üzerinden cihaza aktarılabilir.",
    },
    {
      question: "Hangi modelin uygun olduğunu nasıl belirleriz?",
      answer: "İzleme mesafesi, kullanılacak alan, ölçü ve mesaj gösterimi ihtiyacı birlikte değerlendirilir.",
    },
    {
      question: "Ürünlerin garanti süresi nedir?",
      answer: "Vakitmatik ürünleri üretim kaynaklı hata ve arızalara karşı üç yıl garanti kapsamındadır.",
    },
  ],
  contact: {
    eyebrow: "Doğru modeli birlikte seçelim",
    title: "Caminize uygun Vakitmatik’i konuşalım.",
    lead: "Kısa bir görüşmeyle kullanım alanınızı anlayalım, seçenekleri sadeleştirelim.",
    whatsappLabel: "WhatsApp’tan yazın",
    phoneLabel: "Telefonla görüşün",
  },
};
