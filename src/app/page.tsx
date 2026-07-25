import "./site.css";

import { ContactSection } from "@/components/ContactSection";
import { FooterSection } from "@/components/FooterSection";
import { HeroSection } from "@/components/HeroSection";
import { LandingControlsProvider } from "@/components/LandingControls";
import { MobileAppSection } from "@/components/MobileAppSection";
import { Navbar } from "@/components/Navbar";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { absoluteUrl, defaultTitle, siteUrl } from "@/config/seo";
import {
  contactItems,
  heroHighlights,
  mobileAppSteps,
  navItems,
  productItems,
} from "@/data/landing";

const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vakitmatik ürünleri",
  itemListElement: productItems.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteUrl}/#${item.id}`,
    name: item.title,
    description: item.summary,
    item: {
      "@type": "Thing",
      name: item.title,
      description: item.summary,
      url: `${siteUrl}/#${item.id}`,
      image: item.media.map((media) => absoluteUrl(media.src)),
    },
  })),
};

const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: defaultTitle,
  url: siteUrl,
  inLanguage: "tr-TR",
  primaryImageOfPage: absoluteUrl("/images/seo/vakitmatik-cami-saati.webp"),
  image: productItems.flatMap((item) => item.media.map((media) => absoluteUrl(media.src))),
};

export default function Home() {
  return (
    <>
      <LandingControlsProvider>
        <Navbar items={navItems} />
        <main>
          <HeroSection highlights={heroHighlights} />
          <ProductShowcaseSection items={productItems} />
          <MobileAppSection steps={mobileAppSteps} />
          <UseCasesSection />
          <ContactSection items={contactItems} />
        </main>
        <FooterSection />
      </LandingControlsProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
