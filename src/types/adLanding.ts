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
  label: string;
  title: string;
  description: string;
  image: AdLandingImage;
};

export type AdLandingDetail = {
  title: string;
  benefit: string;
  technical: string;
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
    items: AdLandingModel[];
  };
  engineering: {
    eyebrow: string;
    title: string;
    lead: string;
    image: AdLandingImage;
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
