"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLandingControls } from "@/components/LandingControls";
import type { NavItem } from "@/types/landing";

type NavbarProps = {
  items: NavItem[];
};

export function Navbar({ items }: NavbarProps) {
  const { logoScale } = useLandingControls();
  const logoStyle = {
    "--logo-scale": logoScale / 100,
  } as CSSProperties;

  return (
    <header className="site-nav-wrap">
      <div className="container-shell">
        <div className="site-nav">
          <a href="#urun" className="site-brand">
            <Image
              src="/images/vakitmatik-logo2.png"
              alt="Vakitmatik"
              width={810}
              height={113}
              className="site-brand-logo"
              style={logoStyle}
              priority
            />
          </a>

          <nav aria-label="Bölüm navigasyonu" className="site-nav-scroll">
            <ul className="site-nav-list">
              {items.map((item) => (
                <li key={item.href}>
                  <a className="site-nav-pill" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
