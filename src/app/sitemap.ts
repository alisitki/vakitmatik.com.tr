import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/seo";
import { ayetHadisLanding } from "@/data/adLandingAyetHadis";
import { camiSaatiLanding } from "@/data/adLandingCamiSaati";
import { fiyatModelLanding } from "@/data/adLandingFiyatModel";
import { productItems } from "@/data/landing";
import { seoLandingPages } from "@/data/seoLandingPages";

export const dynamic = "force-static";

function absoluteImageUrls(paths: string[]) {
  return [...new Set(paths)].map((path) => absoluteUrl(path));
}

const homepageImages = absoluteImageUrls([
  "/images/seo/vakitmatik-cami-saati.webp",
  "/images/seo/vakitmatik-mobil-uygulama-namaz-vakti.webp",
  ...productItems.flatMap((product) => product.media.map((media) => media.src)),
]);

const camiSaatiImages = absoluteImageUrls([
  camiSaatiLanding.hero.productImage.src,
  ...camiSaatiLanding.models.items.map((model) => model.image.src),
]);

const fiyatModelImages = absoluteImageUrls([
  fiyatModelLanding.hero.productImage.src,
  ...fiyatModelLanding.models.items.map((model) => model.image.src),
]);

const ayetHadisImages = absoluteImageUrls([
  ayetHadisLanding.hero.productImage.src,
  ayetHadisLanding.hero.secondaryProductImage?.src ?? "",
  ...ayetHadisLanding.models.items.map((model) => model.image.src),
].filter(Boolean));

const dijitalCamiSaatiImages = absoluteImageUrls(
  seoLandingPages.dijitalCamiSaati.images.map((image) => image.src),
);

const vakitmatikAyarlamaImages = absoluteImageUrls(
  seoLandingPages.vakitmatikAyarlama.images.map((image) => image.src),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      images: homepageImages,
    },
    {
      url: absoluteUrl("/cami-saati/"),
      images: camiSaatiImages,
    },
    {
      url: absoluteUrl("/urunler/dijital-cami-saati/"),
      images: dijitalCamiSaatiImages,
    },
    {
      url: absoluteUrl("/cami-saati-fiyatlari/"),
      images: fiyatModelImages,
    },
    {
      url: absoluteUrl("/ayet-hadis-panosu/"),
      images: ayetHadisImages,
    },
    {
      url: absoluteUrl("/destek/vakitmatik-ayarlama/"),
      images: vakitmatikAyarlamaImages,
    },
    {
      url: absoluteUrl("/privacy/"),
    },
    {
      url: absoluteUrl("/support/"),
    },
  ];
}
