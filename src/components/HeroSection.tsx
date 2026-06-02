import Image from "next/image";
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

export function HeroSection({ highlights }: HeroSectionProps) {
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

        <div className="hero-exact-product-visual">
          <div
            className="mobile-app-device hero-exact-phone-device"
            aria-label="Vakitmatik mobil uygulama telefon çerçevesi"
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
                  sizes="(max-width: 560px) 34vw, (max-width: 900px) 26vw, (max-width: 1280px) 10vw, 165px"
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
            sizes="(max-width: 560px) 44vw, (max-width: 900px) 34vw, (max-width: 1280px) 24vw, 390px"
          />
        </div>

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
