import { camiSaatiLanding } from "@/data/adLandingCamiSaati";
import type { LandingConfig } from "@/types/adLanding";

export const adLandingPreview: LandingConfig = {
  ...camiSaatiLanding,
  previewNote: "Ortak görsel sistem önizlemesi — butonlar bu sayfada iletişim başlatmaz.",
  contact: {
    ...camiSaatiLanding.contact,
    whatsappHref: "#design-notes",
    phoneHref: "#design-notes",
    note: "Bu sayfadaki iletişim butonları yalnızca tasarım önizlemesidir.",
  },
  footerNote: "Landing görsel sistem önizlemesi · Production değildir",
};
