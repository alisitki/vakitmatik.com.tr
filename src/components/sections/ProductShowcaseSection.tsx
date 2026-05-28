"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ENTRANCE_CONFIG } from "@/config/heroMotion";
import type { ProductItem } from "@/types/landing";

type ProductShowcaseSectionProps = {
  items: ProductItem[];
};

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ProductShowcaseSection({ items }: ProductShowcaseSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<Record<string, number>>({});
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const scrollToProduct = useCallback((index: number) => {
    const node = itemRefs.current[index];
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id="urun-deneyimi" className="product-story-section">
      <div className="container-shell">
        <div className="product-story-layout">
          <div className="product-story-list">
            {items.map((item, index) => {
              const mediaIndex = selectedMedia[item.id] ?? 0;
              const currentMedia = item.media[mediaIndex] ?? item.media[0];
              const nextItem = items[index + 1] ?? items[0];

              return (
                <article
                  aria-label={`${formatIndex(index)}. ürün: ${item.title}`}
                  className="product-story-panel"
                  data-index={index}
                  id={item.id}
                  key={item.id}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  style={{ "--product-accent": item.accent } as CSSProperties}
                >
                  <div className="product-story-card">
                    <div className="product-media-column">
                      <div className="product-media-stage is-portrait">
                        <Image
                          alt={currentMedia.alt}
                          className="product-media-image"
                          fill
                          priority={index < 2}
                          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 58vw, 650px"
                          src={currentMedia.src}
                        />
                      </div>
                    </div>

                    <Reveal
                      className="product-copy"
                      delay={0.05}
                      distance={18}
                      duration={ENTRANCE_CONFIG.duration}
                      start="top 62%"
                    >
                      <h3>{item.title}</h3>
                      <p className="product-summary">{item.summary}</p>

                      {item.media.length > 1 ? (
                        <div className="product-thumbnail-row" aria-label={`${item.title} görselleri`}>
                          {item.media.map((media, mediaItemIndex) => (
                            <button
                              aria-label={`${item.title} görsel ${mediaItemIndex + 1}`}
                              aria-pressed={mediaIndex === mediaItemIndex}
                              className="product-thumbnail"
                              key={media.src}
                              onClick={() => {
                                setSelectedMedia((current) => ({
                                  ...current,
                                  [item.id]: mediaItemIndex,
                                }));
                              }}
                              type="button"
                            >
                              <Image
                                alt=""
                                className="product-thumbnail-image"
                                fill
                                sizes="72px"
                                src={media.src}
                              />
                            </button>
                          ))}
                        </div>
                      ) : null}

                      <dl className="product-dimension">
                        <dt>Ebat</dt>
                        <dd>{item.dimensions}</dd>
                      </dl>

                      <dl className="product-spec-grid" aria-label={`${item.title} teknik özellikleri`}>
                        {item.specs.map((spec) => (
                          <div className="product-spec" key={spec.label}>
                            <dt>{spec.label}</dt>
                            <dd>{spec.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <ul className="product-feature-list">
                        {item.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>

                      <div className="product-actions">
                        <a className="product-primary-action" href="#iletisim">
                          Teklif Al
                        </a>
                        <a className="product-secondary-action" href="#iletisim">
                          Teknik Bilgi Al
                        </a>
                      </div>

                      <button
                        className="product-next-link"
                        onClick={() => scrollToProduct(index + 1 < items.length ? index + 1 : 0)}
                        type="button"
                      >
                        Sonraki ürün: {nextItem.shortName}
                      </button>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
