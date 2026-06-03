"use client";

import type { CSSProperties } from "react";
import { useLandingControls } from "@/components/LandingControls";
import { ThemeLogoToggle } from "@/components/ThemeLogoToggle";
import type { NavItem } from "@/types/landing";

type NavbarProps = {
  items: NavItem[];
};

export function Navbar({ items }: NavbarProps) {
  const { logoScale, resolvedThemeMode, toggleThemeMode } = useLandingControls();
  const isDarkTheme = resolvedThemeMode === "dark";
  const logoStyle = {
    "--logo-scale": logoScale / 100,
  } as CSSProperties;

  return (
    <header className="site-nav-wrap">
      <div className="container-shell">
        <div className="site-nav">
          <ThemeLogoToggle
            className="site-brand"
            imageClassName="site-brand-logo"
            imageStyle={logoStyle}
          />

          <nav aria-label="Bölüm navigasyonu" className="site-nav-scroll">
            <ul className="site-nav-list">
              {items.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <a className="site-nav-pill" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-nav-actions">
            <button
              aria-label={isDarkTheme ? "Açık temaya geç" : "Koyu temaya geç"}
              aria-pressed={isDarkTheme}
              className="site-theme-toggle"
              title={isDarkTheme ? "Açık tema" : "Koyu tema"}
              type="button"
              onClick={toggleThemeMode}
            >
              <ThemeToggleIcon isDarkTheme={isDarkTheme} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ThemeToggleIcon({ isDarkTheme }: { isDarkTheme: boolean }) {
  return (
    <svg aria-hidden="true" className="site-theme-toggle-icon" viewBox="0 0 24 24">
      <path
        d="M12 4.25v2M12 17.75v2M4.25 12h2M17.75 12h2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.55"
      />
      <path
        d={isDarkTheme ? "M12 7.35A4.65 4.65 0 0 0 12 16.65Z" : "M12 7.35A4.65 4.65 0 0 1 12 16.65Z"}
        fill="currentColor"
      />
      <circle cx="12" cy="12" fill="none" r="4.65" stroke="currentColor" strokeWidth="1.55" />
    </svg>
  );
}
