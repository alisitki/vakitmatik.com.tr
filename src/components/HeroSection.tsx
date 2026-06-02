"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { HeroHighlightItem } from "@/types/landing";

type HeroSectionProps = {
  highlights: HeroHighlightItem[];
};

const heroNavItems = [
  { href: "#urun-deneyimi", label: "Ürünler" },
  { href: "#akilli-camiler", label: "Çözümler" },
  { href: "#mobil-uygulama", label: "Özellikler" },
  { href: "#iletisim", label: "Destek" },
  { href: "#akilli-camiler", label: "Hakkımızda" },
  { href: "#iletisim", label: "İletişim" },
] as const;

const heroHighlightMeta = {
  "3 Yıl Garanti": {
    icon: "shield",
    text: "Güvenilir üretim, uzun ömürlü kullanım.",
  },
  "Mobil Uygulama": {
    icon: "phone",
    text: "Ayarları zahmetsizce telefonunuzdan yapın.",
  },
  "Namaz Vakitleri": {
    icon: "clock",
    text: "Diyanet verileriyle güncel ve doğru vakitler.",
  },
} as const;

type HeroVisualControls = {
  phoneHeight: number;
  phoneX: number;
  phoneY: number;
  boardWidth: number;
  boardX: number;
  boardY: number;
};

type HeroVisualControlKey = keyof HeroVisualControls;

type HeroVisualStyle = CSSProperties & {
  "--hero-phone-height": string;
  "--hero-phone-x": string;
  "--hero-phone-y": string;
  "--hero-board-width": string;
  "--hero-board-x": string;
  "--hero-board-y": string;
};

const HERO_VISUAL_CONTROLS_KEY = "vakitmatik-hero-visual-controls-v2";

const defaultHeroVisualControls: HeroVisualControls = {
  phoneHeight: 405,
  phoneX: -96,
  phoneY: 0,
  boardWidth: 350,
  boardX: -16,
  boardY: 0,
};

const heroVisualSliders: Record<
  HeroVisualControlKey,
  { label: string; min: number; max: number; step: number; unit: string }
> = {
  phoneHeight: { label: "Ebat", min: 180, max: 2200, step: 1, unit: "px" },
  phoneX: { label: "X", min: -240, max: 240, step: 1, unit: "px" },
  phoneY: { label: "Y", min: -220, max: 180, step: 1, unit: "px" },
  boardWidth: { label: "Ebat", min: 220, max: 560, step: 1, unit: "px" },
  boardX: { label: "X", min: -260, max: 260, step: 1, unit: "px" },
  boardY: { label: "Y", min: -220, max: 180, step: 1, unit: "px" },
};

const heroVisualControlGroups: Array<{ title: string; controls: HeroVisualControlKey[] }> = [
  { title: "Telefon", controls: ["phoneHeight", "phoneX", "phoneY"] },
  { title: "Mavitek", controls: ["boardWidth", "boardX", "boardY"] },
];

export function HeroSection({ highlights }: HeroSectionProps) {
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isControlsLoaded, setIsControlsLoaded] = useState(false);
  const [visualControls, setVisualControls] = useState<HeroVisualControls>(defaultHeroVisualControls);

  useEffect(() => {
    try {
      const savedControls = window.localStorage.getItem(HERO_VISUAL_CONTROLS_KEY);

      if (savedControls) {
        setVisualControls(normalizeHeroVisualControls(JSON.parse(savedControls)));
      }
    } catch {
      setVisualControls(defaultHeroVisualControls);
    } finally {
      setIsControlsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isControlsLoaded) {
      return;
    }

    window.localStorage.setItem(HERO_VISUAL_CONTROLS_KEY, JSON.stringify(visualControls));
  }, [isControlsLoaded, visualControls]);

  const visualStyle = useMemo<HeroVisualStyle>(
    () => ({
      "--hero-phone-height": `${visualControls.phoneHeight}px`,
      "--hero-phone-x": `${visualControls.phoneX}px`,
      "--hero-phone-y": `${visualControls.phoneY}px`,
      "--hero-board-width": `${visualControls.boardWidth}px`,
      "--hero-board-x": `${visualControls.boardX}px`,
      "--hero-board-y": `${visualControls.boardY}px`,
    }),
    [visualControls],
  );

  const phoneVisualStyle = useMemo<CSSProperties>(
    () => ({
      height: `${visualControls.phoneHeight}px`,
      marginBottom: "clamp(0.25rem, 1.2vw, 1.1rem)",
      marginRight: "clamp(-2.6rem, -3.1vw, -1.65rem)",
      transform: `translate3d(${visualControls.phoneX}px, ${visualControls.phoneY}px, 0)`,
      width: `${Math.round(visualControls.phoneHeight * 0.48)}px`,
    }),
    [visualControls.phoneHeight, visualControls.phoneX, visualControls.phoneY],
  );

  const updateVisualControl = (key: HeroVisualControlKey, value: string) => {
    const nextValue = Number(value);

    setVisualControls((currentControls) => ({
      ...currentControls,
      [key]: clampHeroVisualControl(key, nextValue),
    }));
  };

  const resetVisualControls = () => {
    setVisualControls(defaultHeroVisualControls);
  };

  return (
    <section id="urun" className="hero-section hero-section--exact">
      <div className="hero-reference-art" aria-hidden="true" />
      <div className="hero-exact-scrim" aria-hidden="true" />

      <div className="hero-exact-shell">
        <header className="hero-exact-nav">
          <a href="#urun" className="hero-exact-brand">
            <Image
              src="/images/vakitmatik-logo2.png"
              alt="Vakitmatik"
              width={810}
              height={113}
              className="hero-exact-logo"
              priority
            />
          </a>

          <nav aria-label="Bölüm navigasyonu" className="hero-exact-menu">
            {heroNavItems.map((item) => (
              <a className="hero-exact-menu-link" href={item.href} key={`${item.href}-${item.label}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="hero-exact-content">
          <div className="hero-exact-copy">
            <h1>
              <span>Vakitmatik Ayarları</span>
              <span>Artık Cebinizde!</span>
            </h1>
            <p className="hero-exact-description">
              Güncel namaz vakitlerini bilgisayara ihtiyaç duymadan, birkaç adımda telefonunuzdan
              cihazınıza yükleyin.
            </p>

            <div className="hero-exact-actions">
              <a className="hero-exact-button hero-exact-button--primary" href="#urun-deneyimi">
                Ürünleri Keşfet
                <ArrowRightIcon className="hero-exact-button-icon" />
              </a>
              <a className="hero-exact-button hero-exact-button--secondary" href="#mobil-uygulama">
                <PhoneIcon className="hero-exact-button-icon" />
                Mobil Uygulama
              </a>
            </div>

            <div className="hero-exact-platforms" aria-label="Mobil uygulama platformları">
              <span>
                <AppleIcon className="hero-exact-platform-icon" />
                iOS
              </span>
              <span>
                <AndroidIcon className="hero-exact-platform-icon" />
                Android
              </span>
            </div>
          </div>
        </div>

        <div className="hero-exact-product-visual" style={visualStyle}>
          <div
            className="mobile-app-device hero-exact-phone-device"
            aria-label="Vakitmatik mobil uygulama telefon çerçevesi"
            style={phoneVisualStyle}
          >
            <span className="mobile-app-device-shadow hero-exact-phone-shadow" aria-hidden="true" />
            <span
              className="mobile-app-device-side mobile-app-device-side--left hero-exact-phone-side hero-exact-phone-side--left"
              aria-hidden="true"
            />
            <span
              className="mobile-app-device-side mobile-app-device-side--right hero-exact-phone-side hero-exact-phone-side--right"
              aria-hidden="true"
            />
            <div className="mobile-app-device-bezel hero-exact-phone-bezel">
              <div className="mobile-app-device-screen hero-exact-phone-screen">
                <Image
                  src="/images/ekrangor.png"
                  alt="Vakitmatik mobil uygulama ekran görüntüsü"
                  width={400}
                  height={836}
                  className="hero-exact-phone-screen-image"
                  priority
                  sizes="(max-width: 900px) 0px, (max-width: 1280px) 10vw, 165px"
                  style={{ height: "100%", objectFit: "cover", width: "100%" }}
                />
                <span className="mobile-app-device-glare hero-exact-phone-glare" aria-hidden="true" />
              </div>
            </div>
          </div>
          <Image
            src="/images/mavitek.png"
            alt="Mavi Vakitmatik ürün görseli"
            width={1122}
            height={1402}
            className="hero-exact-product-image hero-exact-product-image--board"
            priority
            sizes="(max-width: 900px) 0px, (max-width: 1280px) 24vw, 390px"
          />
        </div>

        <aside className="hero-visual-controls" aria-label="Hero görsel ayarları">
          <div
            className="hero-visual-controls-panel"
            hidden={!isControlsOpen}
            id="hero-visual-controls-panel"
          >
            <div className="hero-visual-controls-head">
              <strong>Hero görselleri</strong>
              <button
                aria-label="Ayar panelini kapat"
                className="hero-visual-controls-close"
                onClick={() => setIsControlsOpen(false)}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            {heroVisualControlGroups.map((group) => (
              <fieldset className="hero-visual-control-group" key={group.title}>
                <legend>{group.title}</legend>
                {group.controls.map((key) => {
                  const slider = heroVisualSliders[key];

                  return (
                    <div className="hero-visual-control-field" key={key}>
                      <span className="hero-visual-control-row">
                        <span>{slider.label}</span>
                        <span className="hero-visual-control-value">
                          <input
                            aria-label={`${group.title} ${slider.label} değeri`}
                            className="hero-visual-control-number"
                            max={slider.max}
                            min={slider.min}
                            onChange={(event) => updateVisualControl(key, event.currentTarget.value)}
                            step={slider.step}
                            type="number"
                            value={visualControls[key]}
                          />
                          <span>{slider.unit}</span>
                        </span>
                      </span>
                      <input
                        aria-label={`${group.title} ${slider.label} slider`}
                        max={slider.max}
                        min={slider.min}
                        onChange={(event) => updateVisualControl(key, event.currentTarget.value)}
                        onInput={(event) => updateVisualControl(key, event.currentTarget.value)}
                        step={slider.step}
                        type="range"
                        value={visualControls[key]}
                      />
                    </div>
                  );
                })}
              </fieldset>
            ))}

            <button className="hero-visual-controls-reset" onClick={resetVisualControls} type="button">
              Varsayılan
            </button>
          </div>

          <button
            aria-controls="hero-visual-controls-panel"
            aria-expanded={isControlsOpen}
            aria-label={isControlsOpen ? "Hero görsel ayarlarını kapat" : "Hero görsel ayarlarını aç"}
            className="hero-visual-controls-toggle"
            onClick={() => setIsControlsOpen((currentState) => !currentState)}
            title="Hero görsel ayarları"
            type="button"
          >
            <SlidersIcon />
          </button>
        </aside>

        <div className="hero-exact-highlights" aria-label="Öne çıkan özellikler">
          {highlights.map((item) => {
            const meta = heroHighlightMeta[item.title as keyof typeof heroHighlightMeta];

            return (
              <article className="hero-exact-highlight" key={item.title}>
                <FeatureIcon name={meta?.icon ?? "shield"} />
                <div>
                  <h2>{item.title}</h2>
                  <p>{meta?.text ?? item.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <a className="hero-exact-scroll" href="#urun-deneyimi" aria-label="Ürünleri göster">
          <span />
        </a>
      </div>
    </section>
  );
}

function normalizeHeroVisualControls(value: unknown): HeroVisualControls {
  if (!value || typeof value !== "object") {
    return defaultHeroVisualControls;
  }

  const controls = value as Partial<Record<HeroVisualControlKey, unknown>>;

  return {
    phoneHeight: clampHeroVisualControl("phoneHeight", Number(controls.phoneHeight)),
    phoneX: clampHeroVisualControl("phoneX", Number(controls.phoneX)),
    phoneY: clampHeroVisualControl("phoneY", Number(controls.phoneY)),
    boardWidth: clampHeroVisualControl("boardWidth", Number(controls.boardWidth)),
    boardX: clampHeroVisualControl("boardX", Number(controls.boardX)),
    boardY: clampHeroVisualControl("boardY", Number(controls.boardY)),
  };
}

function clampHeroVisualControl(key: HeroVisualControlKey, value: number) {
  const slider = heroVisualSliders[key];

  if (!Number.isFinite(value)) {
    return defaultHeroVisualControls[key];
  }

  return Math.min(slider.max, Math.max(slider.min, Math.round(value)));
}

function SlidersIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M4 7h6m4 0h6M4 17h10m4 0h2M10 7a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm4 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m7 7 10 10M17 7 7 17"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <rect
        fill="none"
        height="17"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.8"
        width="10"
        x="7"
        y="3.5"
      />
      <path d="M11 17.3h2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path
        d="M15.4 3.2c-.2 1.2-.8 2.2-1.7 2.9-.8.7-1.8 1.1-2.8 1 .1-1.1.7-2.1 1.6-2.8.8-.7 1.9-1.1 2.9-1.1Zm3.2 13.7c-.5 1.1-.8 1.6-1.5 2.6-1 1.4-2.3 3-4 3-1 0-1.3-.6-2.8-.6s-1.8.6-2.8.6c-1.7 0-3-1.5-4-2.9-2.7-3.9-3-8.4-1.3-10.8 1.2-1.7 3-2.7 4.7-2.7 1.2 0 2.3.7 3.4.7 1.1 0 2-.7 3.5-.7 1.4 0 3 .8 4.1 2.1-3.6 2-3 7.2.7 8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
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

function FeatureIcon({ name }: { name: string }) {
  if (name === "phone") {
    return (
      <span className="hero-exact-feature-icon" aria-hidden="true">
        <PhoneIcon />
      </span>
    );
  }

  if (name === "clock") {
    return (
      <span className="hero-exact-feature-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="none" r="8.2" stroke="currentColor" strokeWidth="1.9" />
          <path
            d="M12 7.4v5l3.2 2"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="hero-exact-feature-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path
          d="M12 3.4 19 6v5.5c0 4.4-2.8 7.4-7 9.1-4.2-1.7-7-4.7-7-9.1V6l7-2.6Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
        <path
          d="m8.7 12.2 2.1 2.1 4.7-4.9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
    </span>
  );
}
