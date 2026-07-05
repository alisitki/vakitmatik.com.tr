import { ThemeLogoToggle } from "@/components/ThemeLogoToggle";
import type { NavItem } from "@/types/landing";

type HeroExactNavProps = {
  className?: string;
  items: readonly NavItem[];
};

export function HeroExactNav({ className, items }: HeroExactNavProps) {
  const headerClassName = className ? `hero-exact-nav ${className}` : "hero-exact-nav";

  return (
    <header className={headerClassName}>
      <ThemeLogoToggle className="hero-exact-brand" imageClassName="hero-exact-logo" />

      <nav aria-label="Bölüm navigasyonu" className="hero-exact-menu">
        {items.map((item) => (
          <a className="hero-exact-menu-link" href={item.href} key={`${item.href}-${item.label}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
