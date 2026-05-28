import { Reveal } from "@/components/motion/Reveal";
import { ENTRANCE_CONFIG } from "@/config/heroMotion";
import type { MobileAppStepItem } from "@/types/landing";

type MobileAppSectionProps = {
  steps: MobileAppStepItem[];
};

export function MobileAppSection({ steps }: MobileAppSectionProps) {
  const revealDuration = ENTRANCE_CONFIG.duration;

  return (
    <section id="mobil-uygulama" className="section-space mobile-app-section">
      <div className="container-shell mobile-app-section-shell">
        <Reveal className="mobile-app-preview" distance={ENTRANCE_CONFIG.distance} duration={revealDuration}>
          <div className="mobile-app-device" aria-label="Vakitmatik mobil uygulama önizlemesi">
            <span className="mobile-app-device-shadow" aria-hidden="true" />
            <span className="mobile-app-device-side mobile-app-device-side--left" aria-hidden="true" />
            <span className="mobile-app-device-side mobile-app-device-side--right" aria-hidden="true" />
            <div className="mobile-app-device-bezel">
              <div className="mobile-app-device-screen">
                <video
                  aria-label="Vakitmatik mobil uygulama ekran kaydı"
                  autoPlay
                  className="mobile-app-device-video"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src="/videos/vakitmatik-mobil.mp4"
                />
                <span className="mobile-app-device-glare" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mobile-app-flow">
          <Reveal
            className="section-intro mobile-app-intro"
            delay={0.05}
            distance={ENTRANCE_CONFIG.distance}
            duration={revealDuration}
          >
            <h2>Mobil Uygulama</h2>
          </Reveal>

          <Reveal
            className="mobile-app-platform-row"
            aria-label="Mobil uygulama platformları"
            delay={0.12}
            distance={ENTRANCE_CONFIG.distance}
            duration={revealDuration}
          >
            <span>
              <AndroidIcon />
              Android
            </span>
            <span>
              <IosIcon />
              iOS
            </span>
          </Reveal>

          <div className="mobile-app-step-list" aria-label="Mobil uygulama kullanım adımları">
            {steps.map((step, index) => (
              <Reveal
                className="mobile-app-step"
                delay={0.08 + index * 0.05}
                distance={ENTRANCE_CONFIG.distance}
                duration={revealDuration}
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
    </section>
  );
}

function AndroidIcon() {
  return (
    <svg aria-hidden="true" className="mobile-app-platform-icon" viewBox="0 0 24 24">
      <path
        d="M7.2 9.5h9.6v6.7c0 .7-.6 1.3-1.3 1.3H15v2.1c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-2.1h-2.4v2.1c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-2.1h-.5c-.7 0-1.3-.6-1.3-1.3V9.5Zm-2.5.2c.5 0 .9.4.9.9v4.3c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-4.3c0-.5.4-.9.9-.9Zm14.6 0c.5 0 .9.4.9.9v4.3c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-4.3c0-.5.4-.9.9-.9ZM8.5 7.9a4.2 4.2 0 0 1 7 0h-7Zm1-4 1.1 1.9m3.9-1.9-1.1 1.9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M10 7.2h.1M13.9 7.2h.1" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function IosIcon() {
  return (
    <svg aria-hidden="true" className="mobile-app-platform-icon" viewBox="0 0 24 24">
      <path
        d="M15.4 3.2c-.2 1.2-.8 2.2-1.7 2.9-.8.7-1.8 1.1-2.8 1 .1-1.1.7-2.1 1.6-2.8.8-.7 1.9-1.1 2.9-1.1Zm3.2 13.7c-.5 1.1-.8 1.6-1.5 2.6-1 1.4-2.3 3-4 3-1 0-1.3-.6-2.8-.6s-1.8.6-2.8.6c-1.7 0-3-1.5-4-2.9-2.7-3.9-3-8.4-1.3-10.8 1.2-1.7 3-2.7 4.7-2.7 1.2 0 2.3.7 3.4.7 1.1 0 2-.7 3.5-.7 1.4 0 3 .8 4.1 2.1-3.6 2-3 7.2.7 8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
