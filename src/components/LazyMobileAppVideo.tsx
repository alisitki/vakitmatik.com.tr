"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/vakitmatik-mobil.mp4";
const POSTER_SRC = "/images/ekrangor.png";
const PLACEHOLDER_SRC = "/images/ekrangor.webp";

export function LazyMobileAppVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return;

    if (!("IntersectionObserver" in globalThis)) {
      const frame = globalThis.requestAnimationFrame(() => setShouldLoad(true));
      return () => globalThis.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px", threshold: 0.01 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const node = videoRef.current;
    node?.load();
    void node?.play();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="mobile-app-device-video-shell">
      {shouldLoad ? (
        <video
          ref={videoRef}
          aria-label="Vakitmatik mobil uygulama ekran kaydı"
          autoPlay
          className="mobile-app-device-video"
          loop
          muted
          playsInline
          poster={POSTER_SRC}
          preload="none"
          src={VIDEO_SRC}
        />
      ) : (
        <Image
          alt="Vakitmatik mobil uygulama ekran görüntüsü"
          className="mobile-app-device-video"
          height={836}
          src={PLACEHOLDER_SRC}
          width={400}
        />
      )}
    </div>
  );
}
