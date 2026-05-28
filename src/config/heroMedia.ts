export type HeroProductImage = {
  id: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const HERO_PRODUCT_IMAGES = [
  {
    id: "hero-product-01",
    label: "38-57 Dikey",
    src: "/images/urunler/hero-product-01.png",
    alt: "Vakitmatik 38-57 dikey ürün görseli",
    width: 1122,
    height: 1402,
  },
  {
    id: "hero-product-02",
    label: "38-57 Dikey geniş",
    src: "/images/urunler/hero-product-02.png",
    alt: "Vakitmatik 38-57 geniş ürün görseli",
    width: 1751,
    height: 898,
  },
  {
    id: "hero-product-03",
    label: "38-57 Yatay",
    src: "/images/urunler/hero-product-03.png",
    alt: "Vakitmatik 38-57 yatay ürün görseli",
    width: 1448,
    height: 1086,
  },
  {
    id: "hero-product-04",
    label: "57-38D Mavi",
    src: "/images/urunler/hero-product-04.png",
    alt: "Vakitmatik 57-38D mavi ürün görseli",
    width: 1122,
    height: 1402,
  },
  {
    id: "hero-product-05",
    label: "57-38D Mavi alternatif",
    src: "/images/urunler/hero-product-05.png",
    alt: "Vakitmatik 57-38D mavi alternatif ürün görseli",
    width: 1122,
    height: 1402,
  },
  {
    id: "hero-product-06",
    label: "57-38D Siyah",
    src: "/images/urunler/hero-product-06.png",
    alt: "Vakitmatik 57-38D siyah ürün görseli",
    width: 1086,
    height: 1448,
  },
  {
    id: "hero-product-07",
    label: "57 Resimli",
    src: "/images/urunler/hero-product-07.png",
    alt: "Vakitmatik 57 resimli ürün görseli",
    width: 1122,
    height: 1402,
  },
  {
    id: "hero-product-08",
    label: "57 Resimli dikey",
    src: "/images/urunler/hero-product-08.png",
    alt: "Vakitmatik 57 resimli dikey ürün görseli",
    width: 1024,
    height: 1536,
  },
  {
    id: "hero-product-09",
    label: "Mesaj Vakit",
    src: "/images/urunler/hero-product-09.png",
    alt: "Vakitmatik mesaj vakit ürün görseli",
    width: 1448,
    height: 1086,
  },
  {
    id: "hero-product-10",
    label: "Mesaj Vakit alternatif",
    src: "/images/urunler/hero-product-10.png",
    alt: "Vakitmatik mesaj vakit alternatif ürün görseli",
    width: 1448,
    height: 1086,
  },
  {
    id: "hero-product-11",
    label: "Özel üretim",
    src: "/images/urunler/hero-product-11.png",
    alt: "Vakitmatik özel üretim ürün görseli",
    width: 1448,
    height: 1086,
  },
  {
    id: "hero-product-12",
    label: "V100",
    src: "/images/urunler/hero-product-12.png",
    alt: "Vakitmatik V100 ürün görseli",
    width: 1448,
    height: 1086,
  },
] as const satisfies readonly HeroProductImage[];

export type HeroProductImageId = (typeof HERO_PRODUCT_IMAGES)[number]["id"];

export const DEFAULT_HERO_PRODUCT_IMAGE_ID: HeroProductImageId = "hero-product-03";

export const HERO_PRODUCT_MODES = [
  { id: "none", label: "Kapalı" },
  { id: "mini", label: "Alt mini ürün" },
  { id: "watermark", label: "Arka watermark" },
  { id: "cta-side", label: "CTA yanı ürün" },
] as const;

export type HeroProductMode = (typeof HERO_PRODUCT_MODES)[number]["id"];

export const DEFAULT_HERO_PRODUCT_MODE: HeroProductMode = "none";
