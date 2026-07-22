"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./AdLandingShell.module.css";

type AdLandingProductRailProps = {
  children: ReactNode;
  label?: string;
  trackId: string;
};

type NavigationState = {
  canGoBack: boolean;
  canGoForward: boolean;
};

export function AdLandingProductRail({
  children,
  label = "Cami saati modelleri",
  trackId,
}: AdLandingProductRailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState<NavigationState>({
    canGoBack: false,
    canGoForward: true,
  });

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateNavigation = () => {
      const maximumScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const canGoBack = track.scrollLeft > 2;
      const canGoForward = track.scrollLeft < maximumScroll - 2;

      setNavigation((current) => {
        if (
          current.canGoBack === canGoBack &&
          current.canGoForward === canGoForward
        ) {
          return current;
        }

        return { canGoBack, canGoForward };
      });
    };

    updateNavigation();
    track.addEventListener("scroll", updateNavigation, { passive: true });

    const resizeObserver = new ResizeObserver(updateNavigation);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateNavigation);
      resizeObserver.disconnect();
    };
  }, []);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>("[data-product-card]");
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const step = (firstCard?.offsetWidth ?? track.clientWidth * 0.84) + gap;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({
      behavior: reduceMotion ? "auto" : "smooth",
      left: direction * step,
    });
  };

  return (
    <div className={styles.productRail}>
      <div className={styles.railToolbar}>
        <p>{label}</p>
        <div
          aria-label="Ürün rayı kontrolleri"
          className={styles.railButtons}
          role="group"
        >
          <button
            aria-controls={trackId}
            aria-label="Önceki cami saati modellerini göster"
            disabled={!navigation.canGoBack}
            onClick={() => scroll(-1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            aria-controls={trackId}
            aria-label="Sonraki cami saati modellerini göster"
            disabled={!navigation.canGoForward}
            onClick={() => scroll(1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        aria-label={`Vakitmatik ${label.toLocaleLowerCase("tr-TR")}`}
        className={styles.modelTrack}
        id={trackId}
        ref={trackRef}
        role="region"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
