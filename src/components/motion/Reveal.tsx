"use client";

import type { HTMLAttributes, ReactNode } from "react";

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
  delay: _delay = 0,
  distance: _distance = 22,
  duration: _duration = 0.8,
  once: _once = true,
  start: _start = "top 86%",
  ...rest
}: RevealProps) {
  void _delay;
  void _distance;
  void _duration;
  void _once;
  void _start;

  return (
    <div className={className} style={style} {...rest}>
      {children}
    </div>
  );
}
