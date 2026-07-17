import Image from "next/image";
import type { LandingConfig } from "@/types/adLanding";
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
                height={113}
                priority
                src="/images/vakitmatik-logo2.png"
                width={810}
              />
            </a>
            <div className={styles.navLinks}>
              <a href="#models">Çözümler</a>
              <a href="#engineering">Neden Vakitmatik?</a>
              <a href="#selection">Model seçimi</a>
            </div>
            <a className={styles.navCta} href="#contact">
              Bilgi alın
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
                  rel={whatsappExternal ? "noreferrer" : undefined}
                  target={whatsappExternal ? "_blank" : undefined}
                >
                  {config.hero.primaryCta}
                  <span aria-hidden="true">↗</span>
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

          <div className={styles.modelGrid}>
            {config.models.items.map((model, index) => (
              <article className={styles.modelCard} key={model.title}>
                <figure className={styles.modelMedia}>
                  <Image
                    alt={model.image.alt}
                    className={styles.modelImage}
                    height={model.image.height}
                    sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 380px"
                    src={model.image.src}
                    width={model.image.width}
                  />
                  <span className={styles.modelNumber}>0{index + 1}</span>
                </figure>
                <div className={styles.modelCopy}>
                  <p>{model.label}</p>
                  <h3>{model.title}</h3>
                  <span>{model.description}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.engineeringSection} id="engineering">
        <div className={`${styles.shell} ${styles.engineeringLayout}`}>
          <div className={styles.engineeringVisual}>
            <figure>
              <Image
                alt={config.engineering.image.alt}
                className={styles.engineeringImage}
                height={config.engineering.image.height}
                sizes="(max-width: 900px) 92vw, 520px"
                src={config.engineering.image.src}
                width={config.engineering.image.width}
              />
            </figure>
            <p>
              <strong>Görünen:</strong> sade kullanım
              <span />
              <strong>Arkasında:</strong> kontrollü mühendislik
            </p>
          </div>

          <div className={styles.engineeringCopy}>
            <p className={styles.darkEyebrow}>{config.engineering.eyebrow}</p>
            <h2>{config.engineering.title}</h2>
            <p className={styles.engineeringLead}>{config.engineering.lead}</p>

            <div className={styles.detailList}>
              {config.engineering.details.map((detail, index) => (
                <details className={styles.detailItem} key={detail.title}>
                  <summary>
                    <span>0{index + 1}</span>
                    <div>
                      <strong>{detail.title}</strong>
                      <small>{detail.benefit}</small>
                    </div>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>{detail.technical}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.selectionSection} id="selection">
        <div className={styles.shell}>
          <header className={styles.selectionHeader}>
            <p className={styles.sectionEyebrow}>{config.selection.eyebrow}</p>
            <h2>{config.selection.title}</h2>
            <p>{config.selection.lead}</p>
          </header>

          <div className={styles.selectionGrid}>
            {config.selection.steps.map((step) => (
              <article className={styles.selectionCard} key={step.title}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
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
          <Image alt="Vakitmatik" height={113} src="/images/vakitmatik-logo2.png" width={810} />
          <p>{config.footerNote}</p>
        </div>
      </footer>

      <div className={styles.mobileActions} aria-label="Mobil iletişim seçenekleri">
        <a
          href={config.contact.whatsappHref}
          rel={whatsappExternal ? "noreferrer" : undefined}
          target={whatsappExternal ? "_blank" : undefined}
        >
          WhatsApp
        </a>
        <a href={config.contact.phoneHref}>Ara</a>
      </div>
    </main>
  );
}
