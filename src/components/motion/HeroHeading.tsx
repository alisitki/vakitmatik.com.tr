import { HERO_HEADING_LINES } from "@/config/heroMotion";

type HeroHeadingProps = {
  className?: string;
};

export function HeroHeading({ className }: HeroHeadingProps) {
  return (
    <h1 className={className} aria-label={HERO_HEADING_LINES.join(" ")}>
      {HERO_HEADING_LINES.map((line) => (
        <span className="hero-heading-line" data-text={line} key={line}>
          {line}
        </span>
      ))}
    </h1>
  );
}
