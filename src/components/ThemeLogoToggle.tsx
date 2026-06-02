"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLandingControls } from "@/components/LandingControls";

type ThemeLogoToggleProps = {
  className: string;
  imageClassName: string;
  imageStyle?: CSSProperties;
};

export function ThemeLogoToggle({
  className,
  imageClassName,
  imageStyle,
}: ThemeLogoToggleProps) {
  const { resolvedThemeMode, toggleThemeMode } = useLandingControls();
  const isDarkTheme = resolvedThemeMode === "dark";

  return (
    <button
      aria-label={isDarkTheme ? "Açık temaya geç" : "Koyu temaya geç"}
      aria-pressed={isDarkTheme}
      className={className}
      type="button"
      onClick={toggleThemeMode}
    >
      <Image
        src="/images/vakitmatik-logo2.png"
        alt="Vakitmatik"
        width={810}
        height={113}
        className={imageClassName}
        style={imageStyle}
        priority
      />
    </button>
  );
}
