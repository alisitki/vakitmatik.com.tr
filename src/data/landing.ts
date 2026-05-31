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
  { href: "#akilli-camiler", label: "Akıllı Cami Projeleri" },
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
      "Klasik cami mimarisiyle uyumlu mavi desenli yüzey ve yüksek kontrastlı kırmızı display rakamlar.",
    dimensions: "57 x 38 cm sınıfı",
    sizeOptions: [
      { label: "Büyük Boy Ebat", dimensions: "65 x 92 cm", digitHeight: "6 cm rakamlar" },
      { label: "Küçük Boy Ebat", dimensions: "50 x 71 cm", digitHeight: "4 cm rakamlar" },
    ],
    specs: [
      { label: "Gövde", value: "Dekoratif çerçeve" },
      { label: "Ekran", value: "Kırmızı DISPLAY" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "Mavi desenli arka yüzey",
      "Türkçe ve Arapça vakit yazıları",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
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
      "Klasik cami mimarisiyle uyumlu siyah desenli yüzey ve yüksek kontrastlı kırmızı display rakamlar.",
    dimensions: "57 x 38 cm sınıfı",
    sizeOptions: [
      { label: "Büyük Boy Ebat", dimensions: "65 x 92 cm", digitHeight: "6 cm rakamlar" },
      { label: "Küçük Boy Ebat", dimensions: "50 x 71 cm", digitHeight: "4 cm rakamlar" },
    ],
    specs: [
      { label: "Gövde", value: "Dekoratif çerçeve" },
      { label: "Ekran", value: "Kırmızı DISPLAY" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "Siyah desenli arka yüzey",
      "Türkçe ve Arapça vakit yazıları",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
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
    id: "vakitmatik-dikey",
    title: "Vakitmatik Dikey",
    shortName: "Dikey",
    summary:
      "Klasik cami mimarisiyle uyumlu altın veya siyah yüzey ve yüksek kontrastlı kırmızı display rakamlar.",
    dimensions: "38 x 57 cm dikey sınıf",
    sizeOptions: [
      { label: "Büyük Boy", dimensions: "49 x 75 cm", digitHeight: "6 cm Rakamlar" },
      { label: "Küçük Boy", dimensions: "40 x 60 cm", digitHeight: "4 cm Rakamlar" },
    ],
    specs: [
      { label: "Gövde", value: "Dekoratif çerçeve" },
      { label: "Ekran", value: "Kırmızı DISPLAY" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "Altın veya siyah arka yüzey",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
    ],
    media: [
      {
        src: "/images/vakitmatik-dikey/vakitmatik-dikey-altın-1.png",
        alt: "Altın çerçeveli Vakitmatik dikey namaz vakti panosu",
        width: 1448,
        height: 1086,
      },
      {
        src: "/images/vakitmatik-dikey/vakitmatik-dikey-siyah-1.png",
        alt: "Siyah Vakitmatik dikey namaz vakti panosu",
        width: 1122,
        height: 1402,
      },
    ],
    accent: "#fbbc04",
  },
  {
    id: "vakitmatik-yatay",
    title: "Vakitmatik Yatay",
    shortName: "Yatay",
    summary:
      "Klasik cami mimarisiyle uyumlu altın veya siyah yüzey ve yüksek kontrastlı kırmızı display rakamlar.",
    dimensions: "57 x 38 cm yatay sınıf",
    sizeOptions: [
      { label: "Büyük Boy", dimensions: "80 x 49 cm", digitHeight: "6 cm Rakamlar" },
      { label: "Küçük Boy", dimensions: "62 x 37 cm", digitHeight: "4 cm Rakamlar" },
    ],
    specs: [
      { label: "Gövde", value: "Dekoratif çerçeve" },
      { label: "Ekran", value: "Kırmızı DISPLAY" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "Altın veya siyah arka yüzey",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
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
    id: "vakitmatik-mesaj",
    title: "Vakitmatik Mesaj",
    shortName: "Mesaj",
    summary:
      "Namaz vakitlerinin yanı sıra alt kısımda 3 satır 16 karakter mesaj içeriğini (duyuru,ayet,hadis) sayfa sayfa gösterebilirsiniz.",
    dimensions: "77 x 67 cm",
    specs: [
      { label: "Gövde", value: "Dekoratif çerçeve" },
      { label: "Ekran", value: "Kırmızı DISPLAY" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "Altın sarı yüzey",
      "3 Satır 16 karakter Mesaj Panosu",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
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
    id: "vakitmatik-kayan",
    title: "Vakitmatik Kayan Yazı",
    shortName: "Kayan Yazı",
    summary:
      "Namaz vakitlerinin yanı sıra alt kısımda kayan yazı mesaj içeriğini (duyuru,ayet,hadis) gösterebilirsiniz.",
    dimensions: "85 x 65 cm - 6 cm Rakamlar",
    specs: [
      { label: "Gövde", value: "Dekoratif çerçeve" },
      { label: "Ekran", value: "Kırmızı DISPLAY" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "Altın sarı yüzey",
      "Kayan yazı mesaj panosu",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
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
    id: "vakitmatik-resimli",
    title: "Vakitmatik Resimli",
    shortName: "Resimli",
    summary:
      "Üst arkadan aydınlatmalı görsel alan ile namaz vakitlerini birleştiren zengin pano tasarımı.",
    dimensions: "65 x 120 cm - 6 cm Rakamlar",
    specs: [
      { label: "Gövde", value: "Aluminyum" },
      { label: "Ekran", value: "Dijital Baskı + DISPLAY" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "Üst bölümde geniş görsel alan (Kabe , Kabe Kapısı , Medine)",
      "Türkçe ve Arapça vakit yazıları",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
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
    id: "vakitmatik-led",
    title: "Vakitmatik LED",
    shortName: "LED",
    summary:
      "Büyük camiler için yüksek görünürlük sağlayan Led vakitmatik ailesi.",
    dimensions: "Modüler LED panel ölçüsü",
    sizeOptions: [
      { label: "Ebat Dikey", dimensions: "85 x 145 cm", digitHeight: "10 cm Rakamlar" },
      { label: "Ebat Yatay", dimensions: "175 x 85 cm", digitHeight: "10 cm Rakamlar" },
    ],
    specs: [
      { label: "Gövde", value: "Aluminyum" },
      { label: "Ekran", value: "Kırmızı veya yeşil LED" },
      { label: "Kullanım", value: "İç mekan / Dış mekan" },
    ],
    features: [
      "Kırmızı ve yeşil LED seçenekleri",
      "Işıklı vakit yazıları",
      "Parlak ortamda güçlü görünürlük",
      "Sıcaklık / Saat dönüşümlü gösterim.",
      "Duvara montaj için hazır gövde",
      "Hafıza pili",
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
  {
    id: "vakitmatik-modul",
    title: "Vakitmatik Modül",
    shortName: "Modül",
    summary:
      "Hazır Ayet , Hadis , Esmaül Hüsna , Duyurular , Namaz vakitlerini gösterir. İsteğe göre ölçülerde projelendirilebilir.",
    dimensions: "130 x 90 cm",
    specs: [
      { label: "Gövde", value: "Aluminyum" },
      { label: "Ekran", value: "Yeşil veya kırmızı LED" },
      { label: "Kullanım", value: "İç mekan / Dış mekan" },
    ],
    features: [
      "100'er sayfa hazır Ayet, Hadis, Esmaül Hüsna",
      "100 sayfa mesaj yazılabilir",
      "Vakitmatik Modu",
      "Hicri / Miladı takvim",
      "Kerahat vakti gösterimi",
      "Parlaklık ayarı",
      "Sıcaklık Gösterimi",
    ],
    media: [
      {
        src: "/images/vakitmatik-modül/vakitmatik-modül-kırmızı-1.png",
        alt: "Dikey kadrajlı kırmızı LED Vakitmatik modül panosu",
        width: 1122,
        height: 1402,
      },
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
    ],
    accent: "#34a853",
  },
  {
    id: "vakitmatik-lcd",
    title: "Vakitmatik LCD",
    shortName: "LCD",
    summary:
      "Fotoğraf, grafik ve vakit bilgisini yüksek çözünürlüklü 4K LCD yüzeyde birleştiren modern ekran ailesi.",
    dimensions: "100 cm ve üzeri ekran sınıfı",
    specs: [
      { label: "Gövde", value: "LCD ekran paneli" },
      { label: "Ekran", value: "4K (Ultra HD)" },
      { label: "Kullanım", value: "İç mekan" },
    ],
    features: [
      "4K UHD (Ultra HD) Yüksek çözünürlük",
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
    note: "Hafta içi : 08:30 - 18:30\nCumartesi : 08:30 - 12:00",
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
