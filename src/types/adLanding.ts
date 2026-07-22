export type LandingVariant = "cami-saati" | "fiyat-model" | "ayet-hadis";

export type AdLandingImage = {
  src: string;
  mobileSrc?: string;
  tabletSrc?: string;
  alt: string;
  width: number;
  height: number;
};

export type AdLandingProof = {
  index: string;
  title: string;
  description: string;
};

export type AdLandingModel = {
  id: string;
  title: string;
  description: string;
  dimensions: string;
  image: AdLandingImage;
};

export type AdLandingDetail = {
  title: string;
  description: string;
};

export type AdLandingFaq = {
  question: string;
  answer: string;
};

export type LandingConfig = {
  variant: LandingVariant;
  previewNote?: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    microCopy: string;
    primaryCta: string;
    secondaryCta: string;
    productImage: AdLandingImage;
    appImage: AdLandingImage;
  };
  proofs: AdLandingProof[];
  models: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaLabel: string;
    items: AdLandingModel[];
  };
  engineering: {
    eyebrow: string;
    title: string;
    lead: string;
    image: AdLandingImage;
    insightStrip: string[];
    details: AdLandingDetail[];
  };
  selection: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: AdLandingProof[];
  };
  faqs: AdLandingFaq[];
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    whatsappLabel: string;
    whatsappHref: string;
    phoneLabel: string;
    phoneHref: string;
    note: string;
  };
  footerNote: string;
};
