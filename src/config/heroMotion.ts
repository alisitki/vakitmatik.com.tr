/**
 * Central configuration for the Antigravity-style hero experience.
 * Adjust these values to tune hero entrance animations.
 */

// ─── Hero Heading ────────────────────────────────────────────────
export const HERO_HEADING_LINES = [
    "Vakitmatik Ayarları",
    "Artık Cep Telefonunuzda!",
] as const;

// ─── Entrance Animation ─────────────────────────────────────────
export const ENTRANCE_CONFIG = {
    /** Stagger delays in seconds for each hero element */
    headlinePrefix: 0.75,
    headlineAccent: 0.75,
    headlineSuffix: 0.75,
    description: 1.5,
    platforms: 1.75,
    buttons: 2,
    media: 2.5,
    highlightCards: {
        baseDelay: 2.45,
        stagger: 0.08,
    },

    /** Entrance animation properties */
    duration: 1.1,
    ease: "power2.out",
    distance: 22,          // translateY distance in px
    buttonScale: 0.97,     // buttons start at this scale
} as const;
