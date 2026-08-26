import Image from "next/image";
import Link from "next/link";
import { ResponsiveImagePreload } from "@/components/ResponsiveImagePreload";
import type { LandingConfig } from "@/types/adLanding";
import { AdLandingPriceGrid } from "./AdLandingPriceGrid";
import { AdLandingProductRail } from "./AdLandingProductRail";
import styles from "./AdLandingShell.module.css";

type AdLandingShellProps = {
  config: LandingConfig;
};

export function AdLandingShell({ config }: AdLandingShellProps) {
  const whatsappExternal = config.contact.whatsappHref.startsWith("http");
  const heroImage = config.hero.productImage;

  return (
    <main className={styles.page} data-variant={config.variant}>
      <ResponsiveImagePreload
        desktopSrc={heroImage.src}
        mobileSrc={heroImage.mobileSrc ?? heroImage.src}
        tabletSrc={heroImage.tabletSrc}
      />
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
          <nav className={styles.nav} aria-label="Vakitmatik sayfa menüsü">
            <Link
              aria-label="Vakitmatik ana sayfasına git"
              className={styles.brand}
              href="/"
              prefetch={false}
            >
              <Image
                alt="Vakitmatik"
                className={styles.logo}
                height={56}
                src="/images/landing/vakitmatik-logo-400.webp"
                width={400}
              />
            </Link>
            <div className={styles.navActions}>
              <div className={styles.navLinks}>
                <a href="#models">{config.navigation.modelsLabel}</a>
                <a href="#engineering">{config.navigation.detailsLabel}</a>
                <a href="#faq">{config.navigation.faqLabel}</a>
              </div>
              <span className={styles.navDivider} aria-hidden="true" />
              <a className={styles.navCta} href="#contact">
                {config.navigation.contactLabel}
              </a>
            </div>
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
                    {whatsappExternal ? "↗" : "↓"}
                  </span>
                </a>
                <a
                  className={styles.secondaryButton}
                  href={config.hero.secondaryHref ?? config.contact.phoneHref}
                >
                  {config.hero.secondaryCta}
                </a>
              </div>

              <p className={styles.microCopy}>{config.hero.microCopy}</p>
            </div>

            <div
              className={styles.heroVisual}
              aria-label={
                config.hero.secondaryProductImage
                  ? "Kırmızı ve yeşil Vakitmatik modül cami mesaj panoları"
                  : "Vakitmatik ürün ve mobil uygulama görünümü"
              }
            >
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
                    loading="eager"
                    sizes="(max-width: 720px) 58vw, (max-width: 1100px) 36vw, 410px"
                    src={config.hero.productImage.src}
                    width={config.hero.productImage.width}
                  />
                </picture>
              </figure>
              {config.hero.secondaryProductImage ? (
                <figure className={styles.secondaryProductFrame}>
                  <picture>
                    {config.hero.secondaryProductImage.mobileSrc ? (
                      <source
                        media="(max-width: 560px)"
                        srcSet={config.hero.secondaryProductImage.mobileSrc}
                      />
                    ) : null}
                    {config.hero.secondaryProductImage.tabletSrc ? (
                      <source
                        media="(min-width: 561px) and (max-width: 900px)"
                        srcSet={config.hero.secondaryProductImage.tabletSrc}
                      />
                    ) : null}
                    <Image
                      alt={config.hero.secondaryProductImage.alt}
                      className={styles.secondaryProductImage}
                      height={config.hero.secondaryProductImage.height}
                      loading="eager"
                      sizes="(max-width: 720px) 54vw, (max-width: 1100px) 34vw, 350px"
                      src={config.hero.secondaryProductImage.src}
                      width={config.hero.secondaryProductImage.width}
                    />
                  </picture>
                </figure>
              ) : config.hero.appImage ? (
                <figure className={styles.phoneFrame}>
                  <span className={styles.phoneSpeaker} aria-hidden="true" />
                  <Image
                    alt={config.hero.appImage.alt}
                    className={styles.phoneImage}
                    height={config.hero.appImage.height}
                    sizes="(max-width: 720px) 22vw, 150px"
                    src={config.hero.appImage.src}
                    width={config.hero.appImage.width}
                  />
                </figure>
              ) : null}
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

          {config.models.priceInquiry ? (
            <AdLandingPriceGrid
              inquiry={config.models.priceInquiry}
              models={config.models.items}
            />
          ) : (
            <AdLandingProductRail
              label={config.models.railLabel}
              trackId={`${config.variant}-model-rayi`}
            >
              {config.models.items.map((model) => (
                <article
                  className={styles.modelCard}
                  data-product-card
                  id={`model-${model.id}`}
                  key={model.id}
                >
                  <Link
                    className={styles.modelCardLink}
                    href={`/#${model.id}`}
                    prefetch={false}
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
                      <span className={styles.modelDescription}>{model.description}</span>
                      <p>{model.dimensions}</p>
                      <span className={styles.modelDetailHint} aria-hidden="true">
                        Ürünü detaylı incele <i>→</i>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </AdLandingProductRail>
          )}

          <div className={styles.modelsExit}>
            <Link href="/#urun-deneyimi" prefetch={false}>
              Tüm ürünleri detaylı incele <span aria-hidden="true">→</span>
            </Link>
          </div>
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
            <p className={styles.sectionEyebrow}>{config.faqHeading.eyebrow}</p>
            <h2>{config.faqHeading.title}</h2>
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
              <span aria-hidden="true">{whatsappExternal ? "↗" : "↑"}</span>
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
