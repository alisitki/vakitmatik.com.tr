"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";
import { Reveal } from "@/components/motion/Reveal";
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
  const lastTouchActionRef = useRef(0);

  const scrollToProduct = useCallback((index: number) => {
    const node = itemRefs.current[index];
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const updateMedia = useCallback(
    (itemId: string, mediaLength: number, nextIndex: number | ((currentIndex: number) => number)) => {
      setSelectedMedia((current) => {
        const currentIndex = current[itemId] ?? 0;
        const resolvedIndex =
          typeof nextIndex === "function" ? nextIndex(currentIndex) : nextIndex;

        return {
          ...current,
          [itemId]: (resolvedIndex + mediaLength) % mediaLength,
        };
      });
    },
    [],
  );

  const runClickAction = useCallback((action: () => void) => {
    if (performance.now() - lastTouchActionRef.current < 420) {
      return;
    }

    action();
  }, []);

  const runTouchAction = useCallback(
    (event: TouchEvent<HTMLButtonElement>, action: () => void) => {
      event.preventDefault();
      lastTouchActionRef.current = performance.now();
      action();
    },
    [],
  );

  return (
    <section className="product-story-section">
      <div className="container-shell">
        <h2 className="sr-only">Vakitmatik ürünleri</h2>
        <div className="product-story-layout">
          <span
            aria-hidden="true"
            className="product-story-anchor"
            id="urun-deneyimi"
          />
          <div className="product-story-list">
            {items.map((item, index) => {
              const mediaIndex = selectedMedia[item.id] ?? 0;
              const currentMedia = item.media[mediaIndex] ?? item.media[0];
              const nextItem = items[index + 1];
              const showPreviousMedia = () => updateMedia(item.id, item.media.length, (currentIndex) => currentIndex - 1);
              const showNextMedia = () => updateMedia(item.id, item.media.length, (currentIndex) => currentIndex + 1);

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
                          key={currentMedia.src}
                          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 58vw, 650px"
                          src={currentMedia.src}
                        />
                        {item.media.length > 1 ? (
                          <div className="product-media-nav" aria-label={`${item.title} görsel geçişi`}>
                            <button
                              aria-label={`${item.title} önceki görsel`}
                              className="product-media-arrow product-media-arrow--prev"
                              onClick={() => runClickAction(showPreviousMedia)}
                              onTouchEnd={(event) => runTouchAction(event, showPreviousMedia)}
                              type="button"
                            >
                              <ChevronIcon direction="left" />
                            </button>
                            <button
                              aria-label={`${item.title} sonraki görsel`}
                              className="product-media-arrow product-media-arrow--next"
                              onClick={() => runClickAction(showNextMedia)}
                              onTouchEnd={(event) => runTouchAction(event, showNextMedia)}
                              type="button"
                            >
                              <ChevronIcon direction="right" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <Reveal
                      className="product-copy"
                      delay={0.05}
                      distance={18}
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
                              onClick={() => runClickAction(() => updateMedia(item.id, item.media.length, mediaItemIndex))}
                              onTouchEnd={(event) =>
                                runTouchAction(event, () => updateMedia(item.id, item.media.length, mediaItemIndex))
                              }
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

                      {item.sizeOptions ? (
                        <dl
                          aria-label={`${item.title} boy seçenekleri`}
                          className="product-size-options"
                        >
                          {item.sizeOptions.map((sizeOption) => (
                            <div className="product-size-option" key={sizeOption.label}>
                              <dt>{sizeOption.label}</dt>
                              <dd>
                                {sizeOption.dimensions} - {sizeOption.digitHeight}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <dl className="product-dimension">
                          <dt>Ebat</dt>
                          <dd>{item.dimensions}</dd>
                        </dl>
                      )}

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

                      <div
                        aria-label={`${item.title} mobil uygulama desteği`}
                        className="product-app-platforms"
                      >
                        <span className="product-app-badge">
                          <MobileAppIcon />
                          Mobil Uygulama
                        </span>
                        <span className="product-app-badge">
                          <IosIcon />
                          iOS
                        </span>
                        <span className="product-app-badge">
                          <AndroidIcon />
                          Android
                        </span>
                      </div>

                      {nextItem ? (
                        <button
                          className="product-next-link"
                          onClick={() => scrollToProduct(index + 1)}
                          type="button"
                        >
                          Sonraki ürün: {nextItem.shortName}
                        </button>
                      ) : null}
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

function MobileAppIcon() {
  return (
    <svg aria-hidden="true" className="product-app-icon" viewBox="0 0 24 24">
      <rect
        fill="none"
        height="17.5"
        rx="2.8"
        stroke="currentColor"
        strokeWidth="1.75"
        width="10.5"
        x="6.75"
        y="3.25"
      />
      <path d="M10.2 17.7h3.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
      <path d="M10.4 6.3h3.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
    </svg>
  );
}

function IosIcon() {
  return (
    <svg aria-hidden="true" className="product-app-icon" viewBox="0 0 24 24">
      <path
        d="M15.4 3.2c-.2 1.2-.8 2.2-1.7 2.9-.8.7-1.8 1.1-2.8 1 .1-1.1.7-2.1 1.6-2.8.8-.7 1.9-1.1 2.9-1.1Zm3.2 13.7c-.5 1.1-.8 1.6-1.5 2.6-1 1.4-2.3 3-4 3-1 0-1.3-.6-2.8-.6s-1.8.6-2.8.6c-1.7 0-3-1.5-4-2.9-2.7-3.9-3-8.4-1.3-10.8 1.2-1.7 3-2.7 4.7-2.7 1.2 0 2.3.7 3.4.7 1.1 0 2-.7 3.5-.7 1.4 0 3 .8 4.1 2.1-3.6 2-3 7.2.7 8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg aria-hidden="true" className="product-app-icon" viewBox="0 0 24 24">
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

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "M14.6 6.8 9.4 12l5.2 5.2" : "M9.4 6.8 14.6 12l-5.2 5.2";

  return (
    <svg aria-hidden="true" className="product-media-arrow-icon" viewBox="0 0 24 24">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  );
}
