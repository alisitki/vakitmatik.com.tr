"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useLandingControls } from "@/components/LandingControls";
import { HeroHeading } from "@/components/motion/HeroHeading";
import { HeroProductAccent } from "@/components/motion/HeroProductAccent";
import { ENTRANCE_CONFIG } from "@/config/heroMotion";
import type { HeroHighlightItem } from "@/types/landing";

type HeroSectionProps = {
  highlights: HeroHighlightItem[];
};

function toCssUrl(src: string) {
  return `url(${JSON.stringify(src)})`;
}

export function HeroSection({ highlights }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const {
    heroBackdropFeather,
    heroBackdropImage,
    heroBackdropSize,
    heroBackdropX,
    heroBackdropY,
    heroBackdropBrightness,
    heroBackdropContrast,
    heroBackdropSaturation,
    heroBackdropMode,
    heroTextReadability,
    heroReadableCardLeft,
    heroReadableCardRight,
    heroReadableCardOpacity,
    heroReadableCardRadius,
    heroReadableX,
    heroReadableY,
    heroPlatformsX,
    heroPlatformsY,
    heroActionsX,
    heroActionsY,
    heroCardsX,
    heroCardsY,
  } = useLandingControls();
  const backdropFeatherEdge = Number((heroBackdropFeather * 0.45).toFixed(2));
  const textReadabilityRatio = heroTextReadability / 100;
  const heroStyle = {
    "--hero-backdrop-image": toCssUrl(heroBackdropImage),
    "--hero-backdrop-size": `${heroBackdropSize / 100}`,
    "--hero-backdrop-x": `${heroBackdropX}%`,
    "--hero-backdrop-y": `${heroBackdropY}%`,
    "--hero-backdrop-filter": `contrast(${heroBackdropContrast}%) saturate(${heroBackdropSaturation}%) brightness(${heroBackdropBrightness}%)`,
    "--hero-backdrop-mask-edge": `${backdropFeatherEdge}%`,
    "--hero-backdrop-vertical-mask-edge": `${backdropFeatherEdge}%`,
    "--hero-text-readability": `${textReadabilityRatio}`,
    "--hero-readable-card-left": `${heroReadableCardLeft}px`,
    "--hero-readable-card-right": `${heroReadableCardRight}px`,
    "--hero-readable-card-opacity": `${heroReadableCardOpacity / 100}`,
    "--hero-readable-card-radius": `${heroReadableCardRadius}px`,
    "--hero-readable-x": `${heroReadableX}px`,
    "--hero-readable-y": `${heroReadableY}px`,
    "--hero-platforms-x": `${heroPlatformsX}px`,
    "--hero-platforms-y": `${heroPlatformsY}px`,
    "--hero-actions-x": `${heroActionsX}px`,
    "--hero-actions-y": `${heroActionsY}px`,
    "--hero-cards-x": `${heroCardsX}px`,
    "--hero-cards-y": `${heroCardsY}px`,
    "--hero-heading-contour-opacity": `${Math.min(0.9, textReadabilityRatio * 1.08)}`,
    "--hero-heading-outline-width": `${(textReadabilityRatio * 2.2).toFixed(2)}px`,
    "--hero-subcopy-contour-opacity": `${Math.min(0.78, textReadabilityRatio * 0.96)}`,
    "--hero-subcopy-outline-width": `${(textReadabilityRatio * 1.35).toFixed(2)}px`,
  } as CSSProperties;

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const cfg = ENTRANCE_CONFIG;
    const duration = cfg.duration;

    const ctx = gsap.context(() => {
      const heading = node.querySelector(".hero-heading");
      const description = node.querySelector(".hero-description");
      const platforms = node.querySelector(".hero-platforms");
      const buttons = node.querySelectorAll(".hero-buttons a");
      const highlightCards = node.querySelectorAll(".hero-highlight-card-shell");

      // Set initial state
      const targets = [heading, description, platforms].filter(Boolean);
      gsap.set(targets, {
        autoAlpha: 0,
        x: 0,
        y: cfg.distance,
        force3D: true,
        willChange: "transform, opacity",
      });
      gsap.set(buttons, {
        autoAlpha: 0,
        x: 0,
        y: cfg.distance * 0.45,
        scale: cfg.buttonScale,
        transformOrigin: "center center",
        force3D: true,
        willChange: "transform, opacity",
      });
      gsap.set(highlightCards, {
        autoAlpha: 0,
        x: 0,
        y: cfg.distance * 0.55,
        force3D: true,
        willChange: "transform, opacity",
      });

      // Heading
      if (heading) {
        gsap.to(heading, {
          autoAlpha: 1,
          y: 0,
          duration,
          delay: cfg.headlinePrefix,
          ease: cfg.ease,
          clearProps: "willChange",
        });
      }

      // Description
      if (description) {
        gsap.to(description, {
          autoAlpha: 1,
          y: 0,
          duration,
          delay: cfg.description,
          ease: cfg.ease,
          clearProps: "willChange",
        });
      }

      if (platforms) {
        gsap.to(platforms, {
          autoAlpha: 1,
          y: 0,
          duration: duration * 0.85,
          delay: cfg.platforms,
          ease: cfg.ease,
          clearProps: "willChange",
        });
      }

      // Buttons
      gsap.to(buttons, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: duration * 0.9,
        delay: cfg.buttons,
        ease: cfg.ease,
        stagger: 0.08,
        clearProps: "willChange",
      });

      gsap.to(highlightCards, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: duration * 0.9,
        delay: cfg.highlightCards.baseDelay,
        ease: cfg.ease,
        stagger: cfg.highlightCards.stagger,
        clearProps: "willChange",
      });
    }, node);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      id="urun"
      className={`hero-section hero-section--backdrop-${heroBackdropMode}`}
      ref={heroRef}
      style={heroStyle}
    >
      <div className="hero-backdrop-layer" aria-hidden="true" />

      <div className="container-shell hero-grid">
        <HeroProductAccent placement="watermark" />
        <div className="hero-copy">
          <div className="hero-readable-copy">
            <div className="hero-readable-content">
              <HeroHeading className="hero-heading" />
              <p className="hero-description">
                <span data-text="Güncel namaz vakitlerini bilgisayara ihtiyaç duymadan,">
                  Güncel namaz vakitlerini bilgisayara ihtiyaç duymadan,
                </span>
                <span data-text="birkaç adımda telefonunuzdan cihazınıza yükleyin.">
                  birkaç adımda telefonunuzdan cihazınıza yükleyin.
                </span>
              </p>
            </div>
          </div>
          <div className="hero-platforms-positioner">
            <div className="hero-platforms" aria-label="Mobil uygulama platformları">
              <span className="hero-platform-pill">
                <IosIcon />
                iOS
              </span>
              <span className="hero-platform-pill">
                <AndroidIcon />
                Android
              </span>
            </div>
          </div>
          <div className="hero-action-row">
            <div className="hero-buttons">
              <a className="btn-primary" href="#urun-deneyimi">
                Ürünleri Keşfet
              </a>
              <a className="btn-secondary" href="#mobil-uygulama">
                Mobil Uygulama
              </a>
            </div>
            <HeroProductAccent placement="cta-side" />
          </div>
        </div>
      </div>

      <HeroProductAccent placement="mini" />

      <div className="container-shell hero-highlight-grid">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="hero-highlight-card-shell"
          >
            <article className="hero-highlight-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

function IosIcon() {
  return (
    <svg aria-hidden="true" className="hero-platform-icon" viewBox="0 0 24 24">
      <path
        d="M15.4 3.2c-.2 1.2-.8 2.2-1.7 2.9-.8.7-1.8 1.1-2.8 1 .1-1.1.7-2.1 1.6-2.8.8-.7 1.9-1.1 2.9-1.1Zm3.2 13.7c-.5 1.1-.8 1.6-1.5 2.6-1 1.4-2.3 3-4 3-1 0-1.3-.6-2.8-.6s-1.8.6-2.8.6c-1.7 0-3-1.5-4-2.9-2.7-3.9-3-8.4-1.3-10.8 1.2-1.7 3-2.7 4.7-2.7 1.2 0 2.3.7 3.4.7 1.1 0 2-.7 3.5-.7 1.4 0 3 .8 4.1 2.1-3.6 2-3 7.2.7 8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg aria-hidden="true" className="hero-platform-icon" viewBox="0 0 24 24">
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
