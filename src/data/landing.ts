import type {
  ContactItem,
  FaqItem,
  HeroHighlightItem,
  HeroTypedLine,
  MobileAppStepItem,
  NavItem,
  ProductItem,
  UseCaseItem,
} from "@/types/landing";

export const navItems: NavItem[] = [
  { href: "#urun", label: "Giriş" },
  { href: "#urun-deneyimi", label: "Ürünler" },
  { href: "#mobil-uygulama", label: "Mobil Uygulama" },
  { href: "#akilli-camiler", label: "Akıllı Camiler" },
  { href: "#sss", label: "SSS" },
  { href: "#iletisim", label: "İletişim" },
];

export const heroTypedLines: HeroTypedLine[] = [
  { text: "Vakitmatik ile", className: "line-strong" },
  { text: "vakit bilgisini", className: "line-accent" },
  { text: "tek bakışta yönetin." },
];

export const heroHighlights: HeroHighlightItem[] = [
  {
    title: "3 Yıl Garanti",
    description:
      "Tüm ürünlerimiz, üretim kaynaklı hata ve arızalara karşı 3 yıl garanti kapsamındadır.",
  },
  {
    title: "Mobil Uygulama",
    description:
      "Android ve iOS desteğiyle cihaz ayarlarını telefonunuzdan hızlı ve pratik şekilde yönetin.",
  },
  {
    title: "Namaz Vakitleri",
    description:
      "T.C. Diyanet İşleri Başkanlığı tarafından yayımlanan güncel namaz vakitleri esas alınır.",
  },
];

export const mobileAppSteps: MobileAppStepItem[] = [
  {
    title: "Uygulamayı açın",
    description:
      "Vakitmatik uygulamasında kurumunuzu seçin ve güncellenecek cihazı hazırlayın.",
  },
  {
    title: "Cihaza bağlanın",
    description:
      "Telefonunuzdan yakındaki Vakitmatik cihazına bağlanarak aktarım ekranına geçin.",
  },
  {
    title: "Vakitleri güncelleyin",
    description:
      "Güncel namaz vakitlerini uygulama üzerinden kontrol edin ve aktarım için onaylayın.",
  },
  {
    title: "Cihaza aktarın",
    description:
      "Yeni vakit bilgileri cihaza gönderilir; aktarım tamamlandığında pano kullanıma hazırdır.",
  },
];

export const productItems: ProductItem[] = [
  {
    id: "vakitmatik-desen-mavi",
    title: "Vakitmatik Desen Mavi",
    shortName: "Desen Mavi",
    summary:
      "Klasik cami mimarisiyle uyumlu mavi desenli yüzey ve yüksek kontrastlı kırmızı LED vakit alanları.",
    dimensions: "57 x 38 cm sınıfı",
    specs: [
      { label: "Gövde", value: "Dekoratif çerçeve" },
      { label: "Ekran", value: "Kırmızı LED" },
      { label: "Kullanım", value: "Cami ve mescit" },
    ],
    features: [
      "Mavi desenli arka yüzey",
      "Türkçe ve Arapça vakit etiketleri",
      "Uzaktan okunabilir LED rakamlar",
      "Duvara montaj için hazır gövde",
    ],
    media: [
      {
        src: "/images/vakitmatik-desen-mavi/vakitmatik-desen-mavi-1.png",
        alt: "Mavi desenli Vakitmatik namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#1a73e8",
  },
  {
    id: "vakitmatik-desen-siyah",
    title: "Vakitmatik Desen Siyah",
    shortName: "Desen Siyah",
    summary:
      "Siyah zeminli, sade ve güçlü kontrast veren dekoratif pano yapısı; yoğun ışıklı mekanlarda net okuma sağlar.",
    dimensions: "57 x 38 cm sınıfı",
    specs: [
      { label: "Gövde", value: "Siyah dekor yüzey" },
      { label: "Ekran", value: "Kırmızı LED" },
      { label: "Kullanım", value: "Ana namaz vakti panosu" },
    ],
    features: [
      "Koyu yüzey üzerinde güçlü LED kontrastı",
      "Geniş görüş açısına uygun rakam dizilimi",
      "Günlük vakit akışını tek panelde toplar",
      "Klasik ve modern iç mekanlara uyum sağlar",
    ],
    media: [
      {
        src: "/images/vakitmatik-desen-siyah/vakitmatik-desen-siyah-1.png",
        alt: "Siyah desenli Vakitmatik namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#111827",
  },
  {
    id: "vakitmatik-mesaj",
    title: "Vakitmatik Mesaj",
    shortName: "Mesaj",
    summary:
      "Vakit bilgisinin yanında duyuru ve yönlendirme mesajlarını da göstermek için tasarlanmış LED mesaj alanı.",
    dimensions: "57 x 38 cm sınıfı",
    specs: [
      { label: "Gövde", value: "Kompakt pano" },
      { label: "Ekran", value: "Vakit + mesaj LED" },
      { label: "Kullanım", value: "Duyuru destekli alanlar" },
    ],
    features: [
      "Vakit ve bilgilendirme alanlarını birlikte sunar",
      "Kısa duyuru akışları için okunaklı yapı",
      "Görevli kullanımına uygun sade içerik düzeni",
      "Toplu kullanım alanlarında görünür mesaj yüzeyi",
    ],
    media: [
      {
        src: "/images/vakitmatik-mesaj/vakitmatik-mesaj-1.png",
        alt: "Mesaj alanlı Vakitmatik namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#ea4335",
  },
  {
    id: "vakitmatik-modul",
    title: "Vakitmatik Modül",
    shortName: "Modül",
    summary:
      "Kayan yazı, saat, tarih ve vakit bilgisini modüler LED yüzeyde bir araya getiren geniş pano çözümü.",
    dimensions: "Proje ölçüsüne göre modüler gövde",
    specs: [
      { label: "Gövde", value: "Yatay modüler panel" },
      { label: "Ekran", value: "Yeşil veya kırmızı LED" },
      { label: "Kullanım", value: "Büyük hacimli mekanlar" },
    ],
    features: [
      "Geniş metin alanı ile duyuru akışı",
      "Farklı LED renk seçenekleri",
      "Uzaktan fark edilen büyük yüzey",
      "Cami adı ve günlük bilgi düzeni için uygun",
    ],
    media: [
      {
        src: "/images/vakitmatik-modül/vakitmatik-modül-yesil-1.png",
        alt: "Yeşil LED modüler Vakitmatik mesaj panosu",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-modül/vakitmatik-modül-kırmızı-2.png",
        alt: "Kırmızı LED modüler Vakitmatik mesaj panosu",
        width: 1448,
        height: 1086,
      },
      {
        src: "/images/vakitmatik-modül/vakitmatik-modül-kırmızı-1.png",
        alt: "Dikey kadrajlı kırmızı LED Vakitmatik modül panosu",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#34a853",
  },
  {
    id: "vakitmatik-dikey",
    title: "Vakitmatik Dikey",
    shortName: "Dikey",
    summary:
      "Dar duvar yüzeylerinde vakitleri dikey hiyerarşiyle gösteren, kompakt ve kolay konumlanan pano ailesi.",
    dimensions: "38 x 57 cm dikey sınıf",
    specs: [
      { label: "Gövde", value: "Dikey pano" },
      { label: "Ekran", value: "Kırmızı LED" },
      { label: "Kullanım", value: "Dar kolon ve duvarlar" },
    ],
    features: [
      "Dikey yüzeylerde güçlü okunurluk",
      "Siyah ve altın görünüm seçenekleri",
      "Günlük vakitleri tek kolonda toplar",
      "Kısıtlı montaj alanları için uygun",
    ],
    media: [
      {
        src: "/images/vakitmatik-dikey/vakitmatik-dikey-siyah-1.png",
        alt: "Siyah Vakitmatik dikey namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-dikey/vakitmatik-dikey-altın-1.png",
        alt: "Altın çerçeveli Vakitmatik dikey namaz vakti panosu",
        width: 1448,
        height: 1086,
      },
    ],
    accent: "#fbbc04",
  },
  {
    id: "vakitmatik-resimli",
    title: "Vakitmatik Resimli",
    shortName: "Resimli",
    summary:
      "Üst görsel alanı ile dini veya kurumsal görseli vakit bilgileriyle birleştiren zengin pano tasarımı.",
    dimensions: "57 x 80 cm sınıfı",
    specs: [
      { label: "Gövde", value: "Görsel alanlı dikey panel" },
      { label: "Ekran", value: "Resim + LED vakit" },
      { label: "Kullanım", value: "Temsil gücü yüksek mekanlar" },
    ],
    features: [
      "Üst bölümde geniş görsel alan",
      "Vakit bilgisini güçlü LED rakamlarla sunar",
      "Kurumsal veya dini görsel kimliğe uyarlanabilir",
      "Büyük duvar yüzeylerinde etkili görünüm",
    ],
    media: [
      {
        src: "/images/vakitmatik-resimli/vakitmatik-resimli-1.png",
        alt: "Görsel alanlı Vakitmatik resimli namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-resimli/vakitmatik-resimli-2.png",
        alt: "Vakitmatik resimli pano alternatif görseli",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-resimli/vakitmatik-resimli-3.png",
        alt: "Vakitmatik resimli pano üçüncü alternatif görseli",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#0f766e",
  },
  {
    id: "vakitmatik-kayan",
    title: "Vakitmatik Kayan",
    shortName: "Kayan",
    summary:
      "Kayan yazı alanı ile vakit duyurularını ve kısa bilgilendirmeleri tek gövdede gösteren pratik çözüm.",
    dimensions: "57 x 38 cm sınıfı",
    specs: [
      { label: "Gövde", value: "Kayan yazı destekli pano" },
      { label: "Ekran", value: "LED vakit + mesaj" },
      { label: "Kullanım", value: "Duyuru ihtiyacı olan mekanlar" },
    ],
    features: [
      "Kısa metinleri kayan LED alanda gösterir",
      "Vakit ve mesaj bilgisini aynı yüzeyde toplar",
      "Görevli duyuruları için kolay takip sağlar",
      "Kompakt alanlarda görünür bilgilendirme sunar",
    ],
    media: [
      {
        src: "/images/vakitmatik-kayan/vakitmatik-kayan-1.png",
        alt: "Kayan yazı alanlı Vakitmatik namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#2563eb",
  },
  {
    id: "vakitmatik-yatay",
    title: "Vakitmatik Yatay",
    shortName: "Yatay",
    summary:
      "Geniş duvarlarda vakitleri yatay kompozisyonla gösteren, klasik LED pano formu.",
    dimensions: "57 x 38 cm yatay sınıf",
    specs: [
      { label: "Gövde", value: "Yatay çerçeveli pano" },
      { label: "Ekran", value: "Kırmızı LED" },
      { label: "Kullanım", value: "Geniş iç mekan duvarları" },
    ],
    features: [
      "Geniş yüzeyde dengeli vakit yerleşimi",
      "Tarih, saat ve günlük vakitleri birlikte gösterir",
      "Klasik çerçeve diliyle mekana uyum sağlar",
      "Uzaktan hızlı okuma için büyük rakam alanları",
    ],
    media: [
      {
        src: "/images/vakitmatik-yatay/vakitmatik-yatay-1.png",
        alt: "Yatay Vakitmatik namaz vakti panosu",
        width: 1448,
        height: 1086,
      },
    ],
    accent: "#b45309",
  },
  {
    id: "vakitmatik-lcd",
    title: "Vakitmatik LCD",
    shortName: "LCD",
    summary:
      "Fotoğraf, grafik ve vakit bilgisini yüksek çözünürlüklü LCD yüzeyde birleştiren modern ekran ailesi.",
    dimensions: "100 cm ve üzeri ekran sınıfı",
    specs: [
      { label: "Gövde", value: "LCD ekran paneli" },
      { label: "Ekran", value: "Görsel + dijital vakit" },
      { label: "Kullanım", value: "Modern cami ve kurumlar" },
    ],
    features: [
      "Yüksek çözünürlüklü görsel anlatım",
      "Vakitleri modern arayüzle gösterir",
      "Fotoğraf ve arka plan seçeneklerine uygundur",
      "Geniş formatlı dijital bilgilendirme sağlar",
    ],
    media: [
      {
        src: "/images/vakitmatik-lcd/vakitmatik-lcd-1.png",
        alt: "Vakitmatik LCD namaz vakti ekranı",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-lcd/vakitmatik-lcd-2.png",
        alt: "Vakitmatik LCD ekran ikinci alternatif",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-lcd/vakitmatik-lcd-3.png",
        alt: "Vakitmatik LCD ekran üçüncü alternatif",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-lcd/vakitmatik-lcd-4.png",
        alt: "Vakitmatik LCD ekran dördüncü alternatif",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-lcd/vakitmatik-lcd-5.png",
        alt: "Vakitmatik LCD ekran beşinci alternatif",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#0369a1",
  },
  {
    id: "vakitmatik-led",
    title: "Vakitmatik LED",
    shortName: "LED",
    summary:
      "Farklı renk ve yön seçenekleriyle yüksek görünürlük sağlayan LED pano ailesi.",
    dimensions: "Modüler LED panel ölçüsü",
    specs: [
      { label: "Gövde", value: "Dikey veya yatay LED panel" },
      { label: "Ekran", value: "Kırmızı veya yeşil LED" },
      { label: "Kullanım", value: "Uzak mesafe görünürlük" },
    ],
    features: [
      "Kırmızı ve yeşil LED seçenekleri",
      "Dikey ve yatay kurulum senaryoları",
      "Parlak ortamda güçlü görünürlük",
      "Farklı mekan ölçeklerine uyarlanabilir yapı",
    ],
    media: [
      {
        src: "/images/vakitmatik-led/vakitmatik-led-yesil-1.png",
        alt: "Yeşil LED Vakitmatik namaz vakti panosu",
        width: 1448,
        height: 1086,
      },
      {
        src: "/images/vakitmatik-led/vakitmatik-led-kırmızı-1.png",
        alt: "Kırmızı LED Vakitmatik namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/vakitmatik-led/vakitmatik-led-yatay-kırmızı-1.png",
        alt: "Yatay kırmızı LED Vakitmatik namaz vakti panosu",
        width: 1448,
        height: 1086,
      },
    ],
    accent: "#16a34a",
  },
];

export const useCaseItems: UseCaseItem[] = [
  {
    tag: "EZAN SİSTEMİ",
    title: "Vakitlere uygun otomatik ezan",
    description:
      "Ezan ve anons sistemleri caminizin kullanımına göre ayarlanabilir.",
  },
  {
    tag: "IŞIKLANDIRMA",
    title: "Daha kolay aydınlatma kontrolü",
    description:
      "Cami içi ve dışı ışıklar belirlenen saatlere göre çalıştırılabilir.",
  },
  {
    tag: "ISITMA KONTROLÜ",
    title: "Halı ısıtma için pratik yönetim",
    description:
      "Isıtma sistemi ihtiyaç olan zamanlarda otomatik olarak devreye alınabilir.",
  },
  {
    tag: "TEK MERKEZDEN YÖNETİM",
    title: "Tüm sistemler birlikte çalışır",
    description:
      "Vakitmatik, ezan, ışık ve ısıtma sistemleri tek yapı altında planlanabilir.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Vakitmatik kurulum sonrası sürekli internet ister mi?",
    answer:
      "Hayır. Temel çalışma akışı için sürekli internet bağlantısı zorunlu değildir.",
  },
  {
    question: "Kurulum süreci uzun sürer mi?",
    answer:
      "Montaj alanı hazır olduğunda kurulum kısa sürede tamamlanabilecek şekilde planlanır.",
  },
  {
    question: "Günlük kullanım teknik uzmanlık gerektirir mi?",
    answer:
      "Hayır. Menü akışı görevli kullanımına uygun biçimde sadeleştirilmiştir.",
  },
  {
    question: "Mekan ışığı değiştiğinde okunabilirlik etkilenir mi?",
    answer:
      "Parlaklık ve tipografi yaklaşımı farklı iç mekan koşullarına uyum sağlayacak şekilde tasarlanır.",
  },
];

export const contactItems: ContactItem[] = [
  {
    label: "Telefon",
    value: "+90 533 382 75 33",
    href: "tel:+905333827533",
    note: "Hafta içi 09:00 - 18:00",
  },
  {
    label: "E-posta",
    value: "bilgi@vakitmatik.com.tr",
    href: "mailto:bilgi@vakitmatik.com.tr",
    note: "Ürün ve teklif talepleri",
  },
  {
    label: "Adres",
    value: "Kocaeli / Türkiye",
    note: "Satış ve teknik destek noktası",
  },
];
