import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import { FooterSection } from "@/components/FooterSection";
import { HeroSection } from "@/components/HeroSection";
import { LandingControlsProvider } from "@/components/LandingControls";
import { MobileAppSection } from "@/components/MobileAppSection";
import { Navbar } from "@/components/Navbar";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import {
  contactItems,
  faqItems,
  heroHighlights,
  mobileAppSteps,
  navItems,
  productItems,
} from "@/data/landing";

export default function Home() {
  return (
    <LandingControlsProvider>
      <Navbar items={navItems} />
      <main>
        <HeroSection highlights={heroHighlights} />
        <ProductShowcaseSection items={productItems} />
        <MobileAppSection steps={mobileAppSteps} />
        <UseCasesSection />
        <FaqSection items={faqItems} />
        <ContactSection items={contactItems} />
      </main>
      <FooterSection items={navItems} />
    </LandingControlsProvider>
  );
}
