import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/config/seo";
import type { AdLandingModel, LandingConfig } from "@/types/adLanding";
import styles from "./AdLandingShell.module.css";

type PriceInquiry = NonNullable<LandingConfig["models"]["priceInquiry"]>;

type AdLandingPriceGridProps = {
  inquiry: PriceInquiry;
  models: AdLandingModel[];
};

function createWhatsAppHref({
  phone,
  model,
  sizeOption,
}: {
  phone: string;
  model: AdLandingModel;
  sizeOption?: NonNullable<AdLandingModel["sizeOptions"]>[number];
}) {
  const selectedProduct = sizeOption
    ? `Vakitmatik ${model.title} – ${sizeOption.label} (${sizeOption.dimensions})`
    : `Vakitmatik ${model.title}`;
  const productUrl = absoluteUrl(`/cami-saati/${model.slug}/`);
  const message = `Merhaba, ${selectedProduct} modelinin güncel fiyatını öğrenmek istiyorum.\n\nÜrün: ${productUrl}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function AdLandingPriceGrid({ inquiry, models }: AdLandingPriceGridProps) {
  return (
    <div className={styles.priceGrid} aria-label="Vakitmatik model ve ölçüye göre fiyat sorma alanı">
      {models.map((model) => {
        const sizeOptions = model.sizeOptions ?? [];
        const catalogImage = model.catalogImage ?? model.image;

        return (
          <article className={styles.priceCard} id={`model-${model.id}`} key={model.id}>
            <figure className={styles.priceCardMedia}>
              <Image
                alt={catalogImage.alt}
                className={styles.priceCardImage}
                height={catalogImage.height}
                loading="lazy"
                sizes="(max-width: 760px) 94vw, (max-width: 1100px) 46vw, 580px"
                src={catalogImage.src}
                width={catalogImage.width}
              />
            </figure>

            <div className={styles.priceCardBody}>
              <div className={styles.priceCardIntro}>
                <p>Vakitmatik Cami Saati</p>
                <h3>{model.title}</h3>
                <span>{model.description}</span>
              </div>

              <div className={styles.priceOptions}>
                {sizeOptions.length > 0 ? (
                  sizeOptions.map((sizeOption) => (
                    <div className={styles.priceOption} key={sizeOption.label}>
                      <div>
                        <strong>{sizeOption.label}</strong>
                        <span>
                          {sizeOption.dimensions} · {sizeOption.digitHeight}
                        </span>
                      </div>
                      <a
                        aria-label={`${model.title} ${sizeOption.label} fiyatını WhatsApp’tan sor`}
                        href={createWhatsAppHref({
                          phone: inquiry.phone,
                          model,
                          sizeOption,
                        })}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {inquiry.sizeCtaLabel}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className={styles.priceOption}>
                    <div>
                      <strong>Ürün ölçüsü</strong>
                      <span>{model.dimensions}</span>
                    </div>
                    <a
                      aria-label={`${model.title} fiyatını WhatsApp’tan sor`}
                      href={createWhatsAppHref({ phone: inquiry.phone, model })}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {inquiry.productCtaLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </div>

              <Link
                className={styles.priceDetailLink}
                href={`/cami-saati/${model.slug}/`}
                prefetch={false}
              >
                Ürünü detaylı incele
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
