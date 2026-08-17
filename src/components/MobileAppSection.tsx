import { Reveal } from "@/components/motion/Reveal";
import { LazyMobileAppVideo } from "@/components/LazyMobileAppVideo";
import type { MobileAppStepItem } from "@/types/landing";

type MobileAppSectionProps = {
  steps: MobileAppStepItem[];
};

export function MobileAppSection({ steps }: MobileAppSectionProps) {
  return (
    <section id="mobil-uygulama" className="section-space mobile-app-section">
      <div className="mobile-app-scroll-panel">
        <div className="container-shell mobile-app-section-shell">
          <Reveal className="mobile-app-preview">
            <div className="mobile-app-device" aria-label="Vakitmatik mobil uygulama önizlemesi">
              <span className="mobile-app-device-shadow" aria-hidden="true" />
              <span className="mobile-app-device-side mobile-app-device-side--left" aria-hidden="true" />
              <span className="mobile-app-device-side mobile-app-device-side--right" aria-hidden="true" />
              <div className="mobile-app-device-bezel">
                <div className="mobile-app-device-screen">
                  <LazyMobileAppVideo />
                  <span className="mobile-app-device-glare" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mobile-app-flow">
            <Reveal
              className="section-intro mobile-app-intro"
              delay={0.05}
            >
              <h2>Mobil Uygulama</h2>
            </Reveal>

            <div className="mobile-app-download">
              <div className="mobile-app-store-row" aria-label="Uygulama mağazaları">
                <a
                  aria-label="Vakitmatik iOS uygulamasını App Store’da açın"
                  className="mobile-app-store-link"
                  href="https://apps.apple.com/tr/app/vakitmatik/id6784723241?l=tr"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="mobile-app-store-icon mobile-app-store-icon--apple" aria-hidden="true">
                    <AppleStoreIcon />
                  </span>
                  <span className="mobile-app-store-name">App Store</span>
                </a>

                <a
                  aria-label="Vakitmatik Android uygulamasını Google Play’de açın"
                  className="mobile-app-store-link"
                  href="https://play.google.com/store/apps/details?id=com.vakitmatik.vakitmatik"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="mobile-app-store-icon mobile-app-store-icon--google" aria-hidden="true">
                    <GooglePlayIcon />
                  </span>
                  <span className="mobile-app-store-name">Google Play</span>
                </a>
              </div>
            </div>

            <div className="mobile-app-step-list" aria-label="Mobil uygulama kullanım adımları">
              {steps.map((step, index) => (
                <Reveal
                  className="mobile-app-step"
                  delay={0.08 + index * 0.05}
                  key={step.title}
                >
                  <span className="mobile-app-step-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppleStoreIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M15.4 3.2c-.2 1.2-.8 2.2-1.7 2.9-.8.7-1.8 1.1-2.8 1 .1-1.1.7-2.1 1.6-2.8.8-.7 1.9-1.1 2.9-1.1Zm3.2 13.7c-.5 1.1-.8 1.6-1.5 2.6-1 1.4-2.3 3-4 3-1 0-1.3-.6-2.8-.6s-1.8.6-2.8.6c-1.7 0-3-1.5-4-2.9-2.7-3.9-3-8.4-1.3-10.8 1.2-1.7 3-2.7 4.7-2.7 1.2 0 2.3.7 3.4.7 1.1 0 2-.7 3.5-.7 1.4 0 3 .8 4.1 2.1-3.6 2-3 7.2.7 8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 30 32">
      <path d="M2.3 1.5 17 16 2.3 30.5c-.5-.6-.8-1.4-.8-2.4V3.9c0-1 .3-1.8.8-2.4Z" fill="#34a853" />
      <path d="m17 16 4.4-4.3 5.4 3.1c1.5.8 1.5 1.6 0 2.4l-5.4 3.1L17 16Z" fill="#4285f4" />
      <path d="M2.3 1.5c.8-.8 2-.7 3.3 0l15.8 9L17 16 2.3 1.5Z" fill="#fbbc04" />
      <path d="M17 16 21.4 20.3l-15.8 9c-1.3.7-2.5.8-3.3 0L17 16Z" fill="#ea4335" />
    </svg>
  );
}
