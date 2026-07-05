import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { createPageMetadata } from "@/config/seo";
import { seoLandingPages } from "@/data/seoLandingPages";

const page = seoLandingPages.vakitmatikCamiSaati;

export const metadata: Metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
});

export default function VakitmatikCamiSaatiPage() {
  return <SeoLandingPage page={page} />;
}
