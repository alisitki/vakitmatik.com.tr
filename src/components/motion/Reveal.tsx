"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  start = "top 86%",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const node = ref.current;
    if (!node) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(node, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start,
            once,
          },
        },
      );
    }, node);

    return () => {
      ctx.revert();
    };
  }, [delay, distance, duration, once, start]);

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  );
}
