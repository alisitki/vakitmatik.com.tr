"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useLandingControls } from "@/components/LandingControls";
import {
  DEFAULT_HERO_PRODUCT_IMAGE_ID,
  HERO_PRODUCT_IMAGES,
} from "@/config/heroMedia";

const prayerTimes = [
  ["İmsak", "05:24"],
  ["Güneş", "06:48"],
  ["Öğle", "13:12"],
  ["İkindi", "16:20"],
] as const;

export function HeroMedia() {
  const { heroProductImageId } = useLandingControls();
  const selectedProduct = useMemo(
    () =>
      HERO_PRODUCT_IMAGES.find((item) => item.id === heroProductImageId) ??
      HERO_PRODUCT_IMAGES.find((item) => item.id === DEFAULT_HERO_PRODUCT_IMAGE_ID) ??
      HERO_PRODUCT_IMAGES[0],
    [heroProductImageId],
  );

  return (
    <div className="hero-media" aria-label="Vakitmatik ürün ve mobil uygulama önizlemesi">
      <div className="hero-product-stage">
        <Image
          alt={selectedProduct.alt}
          className="hero-product-image"
          height={selectedProduct.height}
          priority
          sizes="(max-width: 768px) 88vw, 48vw"
          src={selectedProduct.src}
          width={selectedProduct.width}
        />
      </div>

      <div className="hero-phone-stack">
        <div className="hero-phone" aria-label="Mobil uygulama ekranı önizlemesi">
          <div className="hero-phone-speaker" aria-hidden="true" />
          <div className="hero-phone-screen">
            <div className="mobile-app-top">
              <span>Vakitmatik</span>
              <span className="mobile-app-status">Bağlı</span>
            </div>

            <div className="mobile-app-sync">
              <span className="mobile-app-pulse" aria-hidden="true" />
              <span>Vakitler güncelleniyor</span>
            </div>

            <div className="mobile-app-list">
              {prayerTimes.map(([label, time]) => (
                <div className="mobile-app-row" key={label}>
                  <span>{label}</span>
                  <strong>{time}</strong>
                </div>
              ))}
            </div>

            <div className="mobile-app-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>

        <div className="hero-platforms" aria-label="Mobil uygulama platformları">
          <span className="hero-platform-pill">
            <AndroidIcon />
            Android
          </span>
          <span className="hero-platform-pill">
            <IosIcon />
            iOS
          </span>
        </div>
      </div>
    </div>
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
