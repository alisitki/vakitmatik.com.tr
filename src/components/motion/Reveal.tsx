"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  start?: string;
};

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  distance = 22,
  duration = 0.8,
  once = true,
  start: _start = "top 86%",
  ...rest
}: RevealProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  void _start;

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    document.documentElement.classList.add("reveal-motion-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);

        if (once) {
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      className={className}
      data-reveal-state={isVisible ? "visible" : "pending"}
      ref={nodeRef}
      style={
        {
          ...style,
          "--reveal-delay": `${delay}s`,
          "--reveal-distance": `${distance}px`,
          "--reveal-duration": `${duration}s`,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
}
