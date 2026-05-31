import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/SectionIntro";

const automationModules = [
  {
    title: "Vaktinde ezan",
    description: "Merkezi sisteme alternatif olarak ezan okuma sistemini otomatikleştirelim.",
  },
  {
    title: "Aydınlatma",
    description: "Namaz vakitlerine senkron aydınlatmayı otomatikleştirelim.",
  },
  {
    title: "Halı ısıtma",
    description: "Mevsime ve kullanım saatlerine göre kontrollü ısıtma senaryoları oluşturalım.",
  },
  {
    title: "Kapı kilitleri",
    description: "Giriş çıkış saatlerini ve güvenlik ihtiyaçlarını yönetilebilir hale getirelim.",
  },
];

const projectSteps = [
  "İhtiyacı dinleyelim",
  "Sistemi projelendirelim",
  "Hayata geçirelim",
];

const smartSystemCards = [
  { icon: "clock", title: "Zamanlama" },
  { icon: "automation", title: "Otomasyon" },
  { icon: "control", title: "Kontrol" },
] as const;

const smartPlatformCards = [
  { icon: "android", title: "Android" },
  { icon: "ios", title: "iOS" },
] as const;

export function UseCasesSection() {
  return (
    <section id="akilli-camiler" className="section-space smart-mosques-section">
      <div className="smart-mosques-scroll-panel">
        <div className="container-shell smart-mosques-shell">
          <div className="smart-mosques-copy">
            <SectionIntro
              title={"Akıllı Cami\nOtomasyon\nProjeleleri"}
              description="Caminizin ihtiyacına göre vaktinde ezan, aydınlatma, halı ısıtma, kapı kilitleri ve benzeri akıllı sistemler geliştiriyoruz. Siz isteyin, biz projelendirelim."
            />

            <Reveal
              aria-label="Akıllı sistem akışı"
              className="smart-system-panel"
              delay={0.12}
            >
              <div className="smart-system-card-grid">
                {smartSystemCards.map((card) => (
                  <div className="smart-system-card" key={card.title}>
                    <span className="smart-system-card-icon" aria-hidden="true">
                      <SmartSystemIcon name={card.icon} />
                    </span>
                    <span>{card.title}</span>
                  </div>
                ))}
              </div>

              <div className="smart-system-platform-row" aria-label="Mobil uygulama platformları">
                {smartPlatformCards.map((card) => (
                  <div className="smart-system-platform-card" key={card.title}>
                    <span className="smart-system-platform-icon" aria-hidden="true">
                      <PlatformIcon name={card.icon} />
                    </span>
                    <span>{card.title}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="smart-mosques-blueprint" aria-label="Akıllı cami otomasyon proje alanları">
            <Reveal className="smart-mosques-core" delay={0.08}>
              <span>Proje merkezi</span>
              <strong>İhtiyacınıza göre, proje örnekleri</strong>
            </Reveal>

            <div className="smart-mosques-module-grid">
              {automationModules.map((item, index) => (
                <Reveal
                  className="smart-mosques-module"
                  delay={0.12 + index * 0.04}
                  key={item.title}
                >
                  <span className="smart-mosques-module-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="smart-mosques-process" delay={0.24}>
              {projectSteps.map((step, index) => (
                <span key={step}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {step}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmartSystemIcon({ name }: { name: (typeof smartSystemCards)[number]["icon"] }) {
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" fill="none" r="7.4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7.9v4.35l3 1.85"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === "automation") {
    return (
      <svg viewBox="0 0 24 24">
        <path
          d="M7.2 14.2a4.9 4.9 0 0 1 0-4.4m9.6 0a4.9 4.9 0 0 1 0 4.4M4 17.2a8.7 8.7 0 0 1 0-10.4m16 0a8.7 8.7 0 0 1 0 10.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" fill="currentColor" r="2.15" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5.5 6.8h13m-13 10.4h13M8.4 6.8v4.4m7.2 1.6v4.4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <circle cx="8.4" cy="13.2" fill="currentColor" r="1.85" />
      <circle cx="15.6" cy="10.8" fill="currentColor" r="1.85" />
    </svg>
  );
}

function PlatformIcon({ name }: { name: (typeof smartPlatformCards)[number]["icon"] }) {
  if (name === "android") {
    return (
      <svg viewBox="0 0 24 24">
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

  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M15.4 3.2c-.2 1.2-.8 2.2-1.7 2.9-.8.7-1.8 1.1-2.8 1 .1-1.1.7-2.1 1.6-2.8.8-.7 1.9-1.1 2.9-1.1Zm3.2 13.7c-.5 1.1-.8 1.6-1.5 2.6-1 1.4-2.3 3-4 3-1 0-1.3-.6-2.8-.6s-1.8.6-2.8.6c-1.7 0-3-1.5-4-2.9-2.7-3.9-3-8.4-1.3-10.8 1.2-1.7 3-2.7 4.7-2.7 1.2 0 2.3.7 3.4.7 1.1 0 2-.7 3.5-.7 1.4 0 3 .8 4.1 2.1-3.6 2-3 7.2.7 8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
