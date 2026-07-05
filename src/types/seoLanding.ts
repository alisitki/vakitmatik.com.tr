export type SeoImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SeoSection = {
  title: string;
  body: string;
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoBreadcrumb = {
  label: string;
  href: string;
};

export type SeoLandingPageContent = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  images: SeoImage[];
  sections: SeoSection[];
  faqs: SeoFaq[];
  breadcrumbs: SeoBreadcrumb[];
};
