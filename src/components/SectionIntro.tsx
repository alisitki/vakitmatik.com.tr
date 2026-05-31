import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
};

export function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <Reveal className="section-intro" delay={0.05}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </Reveal>
  );
}
