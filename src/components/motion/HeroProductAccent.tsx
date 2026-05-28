"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useLandingControls } from "@/components/LandingControls";
import {
  DEFAULT_HERO_PRODUCT_IMAGE_ID,
  HERO_PRODUCT_IMAGES,
  type HeroProductMode,
} from "@/config/heroMedia";

type HeroProductAccentProps = {
  placement: Exclude<HeroProductMode, "none">;
};

export function HeroProductAccent({ placement }: HeroProductAccentProps) {
  const { heroProductImageId, heroProductMode } = useLandingControls();
  const selectedProduct = useMemo(
    () =>
      HERO_PRODUCT_IMAGES.find((item) => item.id === heroProductImageId) ??
      HERO_PRODUCT_IMAGES.find((item) => item.id === DEFAULT_HERO_PRODUCT_IMAGE_ID) ??
      HERO_PRODUCT_IMAGES[0],
    [heroProductImageId],
  );

  if (heroProductMode !== placement) {
    return null;
  }

  return (
    <div
      className={`hero-product-accent hero-product-accent--${placement}`}
      key={`${placement}-${selectedProduct.id}`}
    >
      <Image
        alt={selectedProduct.alt}
        className="hero-product-accent-image"
        height={selectedProduct.height}
        priority={placement === "watermark"}
        sizes={
          placement === "cta-side"
            ? "(max-width: 768px) 42vw, 160px"
            : "(max-width: 768px) 74vw, 420px"
        }
        src={selectedProduct.src}
        width={selectedProduct.width}
      />
    </div>
  );
}
