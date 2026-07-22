import Image from "next/image";
import type { LandingConfig } from "@/types/adLanding";
import { AdLandingProductRail } from "./AdLandingProductRail";
import styles from "./AdLandingShell.module.css";

type AdLandingShellProps = {
  config: LandingConfig;
};

export function AdLandingShell({ config }: AdLandingShellProps) {
  const whatsappExternal = config.contact.whatsappHref.startsWith("http");

  return (
    <main className={styles.page}>
      {config.previewNote ? (
        <aside className={styles.previewBar} id="design-notes">
          <span>Tasarım önizlemesi</span>
          <p>{config.previewNote}</p>
        </aside>
      ) : null}

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.shell}>
          <nav className={styles.nav} aria-label="Cami saati sayfa menüsü">
            <a className={styles.brand} href="#landing-top" aria-label="Vakitmatik cami saati sayfa başlangıcı">
              <Image
                alt="Vakitmatik"
                className={styles.logo}
                height={56}
                priority
                src="/images/landing/vakitmatik-logo-400.webp"
                width={400}
              />
            </a>
            <div className={styles.navLinks}>
              <a href="#models">Modeller</a>
              <a href="#engineering">Neden Vakitmatik?</a>
              <a href="#faq">Sık sorulanlar</a>
            </div>
            <a className={styles.navCta} href="#contact">
              Bize yazın
            </a>
          </nav>

          <div className={styles.heroLayout} id="landing-top">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{config.hero.eyebrow}</p>
              <h1>{config.hero.title}</h1>
              <p className={styles.heroLead}>{config.hero.lead}</p>

              <div className={styles.actions}>
                <a
                  className={styles.primaryButton}
                  href={config.contact.whatsappHref}
                  aria-label={config.hero.primaryCta}
                  rel={whatsappExternal ? "noreferrer" : undefined}
                  target={whatsappExternal ? "_blank" : undefined}
                >
                  <span className={styles.primaryLabelDesktop} aria-hidden="true">
                    {config.hero.primaryCta}
                  </span>
                  <span className={styles.primaryLabelMobile} aria-hidden="true">
                    {config.hero.mobilePrimaryCta ?? config.hero.primaryCta}
                  </span>
                  <span className={styles.buttonArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
                <a className={styles.secondaryButton} href={config.contact.phoneHref}>
                  {config.hero.secondaryCta}
                </a>
              </div>

              <p className={styles.microCopy}>{config.hero.microCopy}</p>
            </div>

            <div className={styles.heroVisual} aria-label="Vakitmatik ürün ve mobil uygulama görünümü">
              <div className={styles.visualHalo} aria-hidden="true" />
              <figure className={styles.productFrame}>
                <picture>
                  {config.hero.productImage.mobileSrc ? (
                    <source media="(max-width: 560px)" srcSet={config.hero.productImage.mobileSrc} />
                  ) : null}
                  {config.hero.productImage.tabletSrc ? (
                    <source
                      media="(min-width: 561px) and (max-width: 900px)"
                      srcSet={config.hero.productImage.tabletSrc}
                    />
                  ) : null}
                  <Image
                    alt={config.hero.productImage.alt}
                    className={styles.productImage}
                    fetchPriority="high"
                    height={config.hero.productImage.height}
                    priority
                    sizes="(max-width: 720px) 58vw, (max-width: 1100px) 36vw, 410px"
                    src={config.hero.productImage.src}
                    width={config.hero.productImage.width}
                  />
                </picture>
              </figure>
              <figure className={styles.phoneFrame}>
                <span className={styles.phoneSpeaker} aria-hidden="true" />
                <Image
                  alt={config.hero.appImage.alt}
                  className={styles.phoneImage}
                  height={config.hero.appImage.height}
                  priority
                  sizes="(max-width: 720px) 22vw, 150px"
                  src={config.hero.appImage.src}
                  width={config.hero.appImage.width}
                />
              </figure>
              <p className={styles.visualCaption}>
                <span>Vakitmatik</span>
                Ürün + mobil kontrol
              </p>
            </div>
          </div>

          <div className={styles.proofStrip} aria-label="Öne çıkan faydalar">
            {config.proofs.map((proof) => (
              <article className={styles.proofItem} key={proof.title}>
                <span>{proof.index}</span>
                <div>
                  <h2>{proof.title}</h2>
                  <p>{proof.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.modelsSection} id="models">
        <div className={styles.shell}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>{config.models.eyebrow}</p>
            <div>
              <h2>{config.models.title}</h2>
              <p>{config.models.lead}</p>
            </div>
          </header>

          <AdLandingProductRail
            itemCount={config.models.items.length}
            trackId="cami-saati-model-rayi"
          >
            {config.models.items.map((model) => (
              <article
                className={styles.modelCard}
                data-product-card
                id={`model-${model.id}`}
                key={model.id}
              >
                <figure className={styles.modelMedia}>
                  <Image
                    alt={model.image.alt}
                    className={styles.modelImage}
                    height={model.image.height}
                    loading="lazy"
                    sizes="(max-width: 760px) 84vw, (max-width: 1050px) 44vw, 385px"
                    src={model.image.src}
                    width={model.image.width}
                  />
                </figure>
                <div className={styles.modelCopy}>
                  <h3>{model.title}</h3>
                  <span>{model.description}</span>
                  <p>{model.dimensions}</p>
                </div>
              </article>
            ))}
          </AdLandingProductRail>
        </div>
      </section>

      <section className={styles.engineeringSection} id="engineering">
        <div className={`${styles.shell} ${styles.engineeringLayout}`}>
          <div className={styles.engineeringVisual}>
            <figure>
              <div className={styles.engineeringMedia}>
                <Image
                  alt={config.engineering.image.alt}
                  className={styles.engineeringImage}
                  height={config.engineering.image.height}
                  loading="lazy"
                  sizes="(max-width: 900px) 92vw, 520px"
                  src={config.engineering.image.src}
                  width={config.engineering.image.width}
                />
              </div>
              <figcaption className={styles.engineeringStrip}>
                {config.engineering.insightStrip.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </figcaption>
            </figure>
          </div>

          <div className={styles.engineeringCopy}>
            <p className={styles.darkEyebrow}>{config.engineering.eyebrow}</p>
            <h2>{config.engineering.title}</h2>
            <p className={styles.engineeringLead}>{config.engineering.lead}</p>

            <div className={styles.detailList}>
              {config.engineering.details.map((detail, index) => (
                <details className={styles.detailItem} key={detail.title}>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{detail.title}</strong>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>{detail.description}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={`${styles.shell} ${styles.faqLayout}`}>
          <header>
            <p className={styles.sectionEyebrow}>Sık sorulanlar</p>
            <h2>Kısa, doğrudan cevaplar.</h2>
          </header>
          <div className={styles.faqList}>
            {config.faqs.map((faq) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
        <div className={styles.contactGlow} aria-hidden="true" />
        <div className={`${styles.shell} ${styles.contactLayout}`}>
          <div>
            <p className={styles.darkEyebrow}>{config.contact.eyebrow}</p>
            <h2>{config.contact.title}</h2>
            <p>{config.contact.lead}</p>
          </div>
          <div className={styles.contactActions}>
            <a
              className={styles.contactPrimary}
              href={config.contact.whatsappHref}
              rel={whatsappExternal ? "noreferrer" : undefined}
              target={whatsappExternal ? "_blank" : undefined}
            >
              {config.contact.whatsappLabel}
              <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.contactSecondary} href={config.contact.phoneHref}>
              {config.contact.phoneLabel}
            </a>
            <small>{config.contact.note}</small>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <Image
            alt="Vakitmatik"
            height={56}
            loading="lazy"
            src="/images/landing/vakitmatik-logo-400.webp"
            width={400}
          />
          <p>{config.footerNote}</p>
        </div>
      </footer>
    </main>
  );
}
