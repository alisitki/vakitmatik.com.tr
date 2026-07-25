type ResponsiveImagePreloadProps = {
  desktopSrc: string;
  mobileSrc: string;
  tabletSrc?: string;
};

export function ResponsiveImagePreload({
  desktopSrc,
  mobileSrc,
  tabletSrc,
}: ResponsiveImagePreloadProps) {
  return (
    <>
      <link
        as="image"
        fetchPriority="high"
        href={mobileSrc}
        media="(max-width: 560px)"
        rel="preload"
      />
      {tabletSrc ? (
        <link
          as="image"
          fetchPriority="high"
          href={tabletSrc}
          media="(min-width: 561px) and (max-width: 900px)"
          rel="preload"
        />
      ) : null}
      <link
        as="image"
        fetchPriority="high"
        href={desktopSrc}
        media={tabletSrc ? "(min-width: 901px)" : "(min-width: 561px)"}
        rel="preload"
      />
    </>
  );
}
