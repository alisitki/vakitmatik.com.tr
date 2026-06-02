"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_HERO_PRODUCT_IMAGE_ID,
  DEFAULT_HERO_PRODUCT_MODE,
  type HeroProductImageId,
  type HeroProductMode,
} from "@/config/heroMedia";

const STORAGE_KEY = "vakitmatik-landing-controls-v6";

const DEFAULT_LOGO_SCALE = 77;
const MIN_LOGO_SCALE = 60;
const MAX_LOGO_SCALE = 120;
const DEFAULT_HERO_BACKDROP_FEATHER = 2;
const MIN_HERO_BACKDROP_FEATHER = 0;
const MAX_HERO_BACKDROP_FEATHER = 100;
const MIN_HERO_BACKDROP_OFFSET = -40;
const MAX_HERO_BACKDROP_OFFSET = 40;
const DEFAULT_HERO_BACKDROP_SIZE = 100;
const MIN_HERO_BACKDROP_SIZE = 45;
const MAX_HERO_BACKDROP_SIZE = 180;
const DEFAULT_HERO_TEXT_READABILITY = 0;
const MIN_HERO_TEXT_READABILITY = 0;
const MAX_HERO_TEXT_READABILITY = 100;
const DEFAULT_HERO_READABLE_CARD_SIDE = 590;
const DEFAULT_HERO_READABLE_CARD_LEFT = 533;
const DEFAULT_HERO_READABLE_CARD_RIGHT = 420;
const MIN_HERO_READABLE_CARD_SIDE = 420;
const MAX_HERO_READABLE_CARD_SIDE = 760;
const MIN_HERO_ELEMENT_OFFSET = -180;
const MAX_HERO_ELEMENT_OFFSET = 180;
const DEFAULT_HERO_READABLE_CARD_OPACITY = 100;
const MIN_HERO_READABLE_CARD_OPACITY = 0;
const MAX_HERO_READABLE_CARD_OPACITY = 100;
const DEFAULT_HERO_READABLE_CARD_RADIUS = 40;
const MIN_HERO_READABLE_CARD_RADIUS = 0;
const MAX_HERO_READABLE_CARD_RADIUS = 40;
const DEFAULT_HERO_BACKDROP_CONTRAST = 95;
const MIN_HERO_BACKDROP_CONTRAST = 50;
const MAX_HERO_BACKDROP_CONTRAST = 150;
const DEFAULT_HERO_BACKDROP_SATURATION = 95;
const MIN_HERO_BACKDROP_SATURATION = 50;
const MAX_HERO_BACKDROP_SATURATION = 170;
const DEFAULT_HERO_BACKDROP_BRIGHTNESS = 130;
const MIN_HERO_BACKDROP_BRIGHTNESS = 70;
const MAX_HERO_BACKDROP_BRIGHTNESS = 130;
const DEFAULT_HERO_BACKDROP_IMAGE = "/images/denemeler/fullhero.webp";
const HERO_BACKDROP_MODES = [
  { id: "none", label: "Kapalı" },
  { id: "image", label: "Görsel kullan" },
] as const;
const DEFAULT_HERO_BACKDROP_MODE = "image";
const THEME_MODES = [
  { id: "system", label: "Sistem" },
  { id: "light", label: "Açık" },
  { id: "dark", label: "Koyu" },
] as const;
const DEFAULT_THEME_MODE = "system";

type HeroBackdropMode = (typeof HERO_BACKDROP_MODES)[number]["id"];
type ThemeMode = (typeof THEME_MODES)[number]["id"];
type ResolvedThemeMode = Exclude<ThemeMode, "system">;

type LandingControlsValue = {
  themeMode: ThemeMode;
  resolvedThemeMode: ResolvedThemeMode;
  setThemeMode: (value: ThemeMode) => void;
  toggleThemeMode: () => void;
  logoScale: number;
  setLogoScale: (value: number) => void;
  heroTextReadability: number;
  setHeroTextReadability: (value: number) => void;
  heroReadableCardLeft: number;
  setHeroReadableCardLeft: (value: number) => void;
  heroReadableCardRight: number;
  setHeroReadableCardRight: (value: number) => void;
  heroReadableCardOpacity: number;
  setHeroReadableCardOpacity: (value: number) => void;
  heroReadableCardRadius: number;
  setHeroReadableCardRadius: (value: number) => void;
  heroReadableX: number;
  setHeroReadableX: (value: number) => void;
  heroReadableY: number;
  setHeroReadableY: (value: number) => void;
  heroPlatformsX: number;
  setHeroPlatformsX: (value: number) => void;
  heroPlatformsY: number;
  setHeroPlatformsY: (value: number) => void;
  heroActionsX: number;
  setHeroActionsX: (value: number) => void;
  heroActionsY: number;
  setHeroActionsY: (value: number) => void;
  heroCardsX: number;
  setHeroCardsX: (value: number) => void;
  heroCardsY: number;
  setHeroCardsY: (value: number) => void;
  heroBackdropMode: HeroBackdropMode;
  setHeroBackdropMode: (value: HeroBackdropMode) => void;
  heroBackdropFeather: number;
  setHeroBackdropFeather: (value: number) => void;
  heroBackdropImage: string;
  setHeroBackdropImage: (value: string) => void;
  heroBackdropSize: number;
  setHeroBackdropSize: (value: number) => void;
  heroBackdropX: number;
  setHeroBackdropX: (value: number) => void;
  heroBackdropY: number;
  setHeroBackdropY: (value: number) => void;
  heroBackdropContrast: number;
  setHeroBackdropContrast: (value: number) => void;
  heroBackdropSaturation: number;
  setHeroBackdropSaturation: (value: number) => void;
  heroBackdropBrightness: number;
  setHeroBackdropBrightness: (value: number) => void;
  heroProductMode: HeroProductMode;
  heroProductImageId: HeroProductImageId;
};

type StoredControls = {
  themeMode?: unknown;
  logoScale?: unknown;
  heroTextReadability?: unknown;
  heroReadableCardLeft?: unknown;
  heroReadableCardRight?: unknown;
  heroReadableCardWidth?: unknown;
  heroReadableCardOpacity?: unknown;
  heroReadableCardRadius?: unknown;
  heroReadableX?: unknown;
  heroReadableY?: unknown;
  heroPlatformsX?: unknown;
  heroPlatformsY?: unknown;
  heroActionsX?: unknown;
  heroActionsY?: unknown;
  heroCardsX?: unknown;
  heroCardsY?: unknown;
  heroBackdropMode?: unknown;
  heroBackdropFeather?: unknown;
  heroBackdropImage?: unknown;
  heroBackdropSize?: unknown;
  heroBackdropX?: unknown;
  heroBackdropY?: unknown;
  heroBackdropContrast?: unknown;
  heroBackdropSaturation?: unknown;
  heroBackdropBrightness?: unknown;
  heroProductMode?: unknown;
  heroProductImageId?: unknown;
};

type LandingControlsState = {
  themeMode: ThemeMode;
  logoScale: number;
  heroTextReadability: number;
  heroReadableCardLeft: number;
  heroReadableCardRight: number;
  heroReadableCardOpacity: number;
  heroReadableCardRadius: number;
  heroReadableX: number;
  heroReadableY: number;
  heroPlatformsX: number;
  heroPlatformsY: number;
  heroActionsX: number;
  heroActionsY: number;
  heroCardsX: number;
  heroCardsY: number;
  heroBackdropMode: HeroBackdropMode;
  heroBackdropFeather: number;
  heroBackdropImage: string;
  heroBackdropSize: number;
  heroBackdropX: number;
  heroBackdropY: number;
  heroBackdropContrast: number;
  heroBackdropSaturation: number;
  heroBackdropBrightness: number;
  heroProductMode: HeroProductMode;
  heroProductImageId: HeroProductImageId;
};

const LandingControlsContext = createContext<LandingControlsValue | null>(null);

const DEFAULT_CONTROLS: LandingControlsState = {
  themeMode: DEFAULT_THEME_MODE,
  logoScale: DEFAULT_LOGO_SCALE,
  heroTextReadability: DEFAULT_HERO_TEXT_READABILITY,
  heroReadableCardLeft: DEFAULT_HERO_READABLE_CARD_LEFT,
  heroReadableCardRight: DEFAULT_HERO_READABLE_CARD_RIGHT,
  heroReadableCardOpacity: DEFAULT_HERO_READABLE_CARD_OPACITY,
  heroReadableCardRadius: DEFAULT_HERO_READABLE_CARD_RADIUS,
  heroReadableX: -59,
  heroReadableY: 0,
  heroPlatformsX: -48,
  heroPlatformsY: -5,
  heroActionsX: -57,
  heroActionsY: 0,
  heroCardsX: 0,
  heroCardsY: -58,
  heroBackdropMode: DEFAULT_HERO_BACKDROP_MODE,
  heroBackdropFeather: DEFAULT_HERO_BACKDROP_FEATHER,
  heroBackdropImage: DEFAULT_HERO_BACKDROP_IMAGE,
  heroBackdropSize: DEFAULT_HERO_BACKDROP_SIZE,
  heroBackdropX: 0,
  heroBackdropY: -23,
  heroBackdropContrast: DEFAULT_HERO_BACKDROP_CONTRAST,
  heroBackdropSaturation: DEFAULT_HERO_BACKDROP_SATURATION,
  heroBackdropBrightness: DEFAULT_HERO_BACKDROP_BRIGHTNESS,
  heroProductMode: DEFAULT_HERO_PRODUCT_MODE,
  heroProductImageId: DEFAULT_HERO_PRODUCT_IMAGE_ID,
};

let controlsState = DEFAULT_CONTROLS;
let hasReadClientStorage = false;
const listeners = new Set<() => void>();

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function sanitizeStoredNumber(value: unknown, fallback: number, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value)
    ? clampNumber(value, min, max)
    : fallback;
}

function getReadableCardSideFallback(storedWidth: unknown) {
  return typeof storedWidth === "number" && Number.isFinite(storedWidth)
    ? clampNumber(storedWidth / 2, MIN_HERO_READABLE_CARD_SIDE, MAX_HERO_READABLE_CARD_SIDE)
    : DEFAULT_HERO_READABLE_CARD_SIDE;
}

function sanitizeHeroBackdropMode(value: unknown): HeroBackdropMode {
  if (value === "split") return DEFAULT_HERO_BACKDROP_MODE;

  return HERO_BACKDROP_MODES.some((item) => item.id === value)
    ? (value as HeroBackdropMode)
    : DEFAULT_HERO_BACKDROP_MODE;
}

function sanitizeThemeMode(value: unknown): ThemeMode {
  return THEME_MODES.some((item) => item.id === value)
    ? (value as ThemeMode)
    : DEFAULT_THEME_MODE;
}

function getSystemThemeMode(): ResolvedThemeMode {
  if (typeof window === "undefined" || !window.matchMedia) return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveThemeMode(themeMode: ThemeMode, systemThemeMode: ResolvedThemeMode): ResolvedThemeMode {
  return themeMode === "system" ? systemThemeMode : themeMode;
}

function sanitizeBackdropImage(value: unknown, fallback: string) {
  return typeof value === "string" && value.startsWith("/images/")
    ? value
    : fallback;
}

function getPersistableBackdropImage(value: string, fallback: string) {
  return value.startsWith("/images/") ? value : fallback;
}

function readStoredControls() {
  if (typeof window === "undefined") return null;

  try {
    const savedControls = localStorage.getItem(STORAGE_KEY);
    if (!savedControls) return null;

    const parsed = JSON.parse(savedControls) as StoredControls;

    return {
      themeMode: sanitizeThemeMode(parsed.themeMode),
      logoScale: sanitizeStoredNumber(
        parsed.logoScale,
        DEFAULT_LOGO_SCALE,
        MIN_LOGO_SCALE,
        MAX_LOGO_SCALE,
      ),
      heroTextReadability: sanitizeStoredNumber(
        parsed.heroTextReadability,
        DEFAULT_HERO_TEXT_READABILITY,
        MIN_HERO_TEXT_READABILITY,
        MAX_HERO_TEXT_READABILITY,
      ),
      heroReadableCardLeft: sanitizeStoredNumber(
        parsed.heroReadableCardLeft,
        getReadableCardSideFallback(parsed.heroReadableCardWidth),
        MIN_HERO_READABLE_CARD_SIDE,
        MAX_HERO_READABLE_CARD_SIDE,
      ),
      heroReadableCardRight: sanitizeStoredNumber(
        parsed.heroReadableCardRight,
        getReadableCardSideFallback(parsed.heroReadableCardWidth),
        MIN_HERO_READABLE_CARD_SIDE,
        MAX_HERO_READABLE_CARD_SIDE,
      ),
      heroReadableCardOpacity: DEFAULT_HERO_READABLE_CARD_OPACITY,
      heroReadableCardRadius: DEFAULT_HERO_READABLE_CARD_RADIUS,
      heroReadableX: sanitizeStoredNumber(
        parsed.heroReadableX,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroReadableY: sanitizeStoredNumber(
        parsed.heroReadableY,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroPlatformsX: sanitizeStoredNumber(
        parsed.heroPlatformsX,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroPlatformsY: sanitizeStoredNumber(
        parsed.heroPlatformsY,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroActionsX: sanitizeStoredNumber(
        parsed.heroActionsX,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroActionsY: sanitizeStoredNumber(
        parsed.heroActionsY,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroCardsX: sanitizeStoredNumber(
        parsed.heroCardsX,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroCardsY: sanitizeStoredNumber(
        parsed.heroCardsY,
        0,
        MIN_HERO_ELEMENT_OFFSET,
        MAX_HERO_ELEMENT_OFFSET,
      ),
      heroBackdropMode: sanitizeHeroBackdropMode(parsed.heroBackdropMode),
      heroBackdropFeather: sanitizeStoredNumber(
        parsed.heroBackdropFeather,
        DEFAULT_HERO_BACKDROP_FEATHER,
        MIN_HERO_BACKDROP_FEATHER,
        MAX_HERO_BACKDROP_FEATHER,
      ),
      heroBackdropImage: sanitizeBackdropImage(
        parsed.heroBackdropImage,
        DEFAULT_HERO_BACKDROP_IMAGE,
      ),
      heroBackdropSize: sanitizeStoredNumber(
        parsed.heroBackdropSize,
        DEFAULT_HERO_BACKDROP_SIZE,
        MIN_HERO_BACKDROP_SIZE,
        MAX_HERO_BACKDROP_SIZE,
      ),
      heroBackdropX: sanitizeStoredNumber(
        parsed.heroBackdropX,
        0,
        MIN_HERO_BACKDROP_OFFSET,
        MAX_HERO_BACKDROP_OFFSET,
      ),
      heroBackdropY: sanitizeStoredNumber(
        parsed.heroBackdropY,
        0,
        MIN_HERO_BACKDROP_OFFSET,
        MAX_HERO_BACKDROP_OFFSET,
      ),
      heroBackdropContrast: DEFAULT_HERO_BACKDROP_CONTRAST,
      heroBackdropSaturation: DEFAULT_HERO_BACKDROP_SATURATION,
      heroBackdropBrightness: DEFAULT_HERO_BACKDROP_BRIGHTNESS,
      heroProductMode: DEFAULT_HERO_PRODUCT_MODE,
      heroProductImageId: DEFAULT_HERO_PRODUCT_IMAGE_ID,
    };
  } catch {
    return null;
  }
}

function writeStoredControls({
  themeMode,
  logoScale,
  heroTextReadability,
  heroReadableCardLeft,
  heroReadableCardRight,
  heroReadableCardOpacity,
  heroReadableCardRadius,
  heroReadableX,
  heroReadableY,
  heroPlatformsX,
  heroPlatformsY,
  heroActionsX,
  heroActionsY,
  heroCardsX,
  heroCardsY,
  heroBackdropMode,
  heroBackdropFeather,
  heroBackdropImage,
  heroBackdropSize,
  heroBackdropX,
  heroBackdropY,
  heroBackdropContrast,
  heroBackdropSaturation,
  heroBackdropBrightness,
}: LandingControlsState) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      themeMode,
      logoScale,
      heroTextReadability,
      heroReadableCardLeft,
      heroReadableCardRight,
      heroReadableCardOpacity,
      heroReadableCardRadius,
      heroReadableX,
      heroReadableY,
      heroPlatformsX,
      heroPlatformsY,
      heroActionsX,
      heroActionsY,
      heroCardsX,
      heroCardsY,
      heroBackdropMode,
      heroBackdropFeather,
      heroBackdropImage: getPersistableBackdropImage(
        heroBackdropImage,
        DEFAULT_HERO_BACKDROP_IMAGE,
      ),
      heroBackdropSize,
      heroBackdropX,
      heroBackdropY,
      heroBackdropContrast,
      heroBackdropSaturation,
      heroBackdropBrightness,
    }),
  );
}

function ensureClientStorageRead() {
  if (hasReadClientStorage || typeof window === "undefined") return;

  const storedControls = readStoredControls();
  controlsState = storedControls
    ? {
        ...controlsState,
        themeMode: storedControls.themeMode,
        logoScale: storedControls.logoScale,
        heroTextReadability: storedControls.heroTextReadability,
        heroReadableCardLeft: storedControls.heroReadableCardLeft,
        heroReadableCardRight: storedControls.heroReadableCardRight,
        heroReadableCardOpacity: storedControls.heroReadableCardOpacity,
        heroReadableCardRadius: storedControls.heroReadableCardRadius,
        heroReadableX: storedControls.heroReadableX,
        heroReadableY: storedControls.heroReadableY,
        heroPlatformsX: storedControls.heroPlatformsX,
        heroPlatformsY: storedControls.heroPlatformsY,
        heroActionsX: storedControls.heroActionsX,
        heroActionsY: storedControls.heroActionsY,
        heroCardsX: storedControls.heroCardsX,
        heroCardsY: storedControls.heroCardsY,
        heroBackdropMode: storedControls.heroBackdropMode,
        heroBackdropFeather: storedControls.heroBackdropFeather,
        heroBackdropImage: storedControls.heroBackdropImage,
        heroBackdropSize: storedControls.heroBackdropSize,
        heroBackdropX: storedControls.heroBackdropX,
        heroBackdropY: storedControls.heroBackdropY,
        heroBackdropContrast: storedControls.heroBackdropContrast,
        heroBackdropSaturation: storedControls.heroBackdropSaturation,
        heroBackdropBrightness: storedControls.heroBackdropBrightness,
        heroProductMode: storedControls.heroProductMode,
        heroProductImageId: storedControls.heroProductImageId,
      }
    : controlsState;
  hasReadClientStorage = true;
}

function subscribeToControls(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getControlsSnapshot() {
  ensureClientStorageRead();
  return controlsState;
}

function getServerControlsSnapshot() {
  return DEFAULT_CONTROLS;
}

function updateControls(updater: (current: LandingControlsState) => LandingControlsState) {
  ensureClientStorageRead();

  const nextControls = updater(controlsState);
  if (
    controlsState.themeMode === nextControls.themeMode &&
    controlsState.logoScale === nextControls.logoScale &&
    controlsState.heroTextReadability === nextControls.heroTextReadability &&
    controlsState.heroReadableCardLeft === nextControls.heroReadableCardLeft &&
    controlsState.heroReadableCardRight === nextControls.heroReadableCardRight &&
    controlsState.heroReadableCardOpacity === nextControls.heroReadableCardOpacity &&
    controlsState.heroReadableCardRadius === nextControls.heroReadableCardRadius &&
    controlsState.heroReadableX === nextControls.heroReadableX &&
    controlsState.heroReadableY === nextControls.heroReadableY &&
    controlsState.heroPlatformsX === nextControls.heroPlatformsX &&
    controlsState.heroPlatformsY === nextControls.heroPlatformsY &&
    controlsState.heroActionsX === nextControls.heroActionsX &&
    controlsState.heroActionsY === nextControls.heroActionsY &&
    controlsState.heroCardsX === nextControls.heroCardsX &&
    controlsState.heroCardsY === nextControls.heroCardsY &&
    controlsState.heroBackdropMode === nextControls.heroBackdropMode &&
    controlsState.heroBackdropFeather === nextControls.heroBackdropFeather &&
    controlsState.heroBackdropImage === nextControls.heroBackdropImage &&
    controlsState.heroBackdropSize === nextControls.heroBackdropSize &&
    controlsState.heroBackdropX === nextControls.heroBackdropX &&
    controlsState.heroBackdropY === nextControls.heroBackdropY &&
    controlsState.heroBackdropContrast === nextControls.heroBackdropContrast &&
    controlsState.heroBackdropSaturation === nextControls.heroBackdropSaturation &&
    controlsState.heroBackdropBrightness === nextControls.heroBackdropBrightness &&
    controlsState.heroProductMode === nextControls.heroProductMode &&
    controlsState.heroProductImageId === nextControls.heroProductImageId
  ) {
    return;
  }

  controlsState = nextControls;
  writeStoredControls(controlsState);
  listeners.forEach((listener) => listener());
}

export function LandingControlsProvider({ children }: { children: ReactNode }) {
  const controls = useSyncExternalStore(
    subscribeToControls,
    getControlsSnapshot,
    getServerControlsSnapshot,
  );
  const [systemThemeMode, setSystemThemeMode] = useState<ResolvedThemeMode>("light");
  const resolvedThemeMode = resolveThemeMode(controls.themeMode, systemThemeMode);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      setSystemThemeMode(mediaQuery.matches ? "dark" : "light");
    };

    handleSystemThemeChange();
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (resolvedThemeMode === "dark") {
      root.dataset.theme = "dark";
    } else {
      root.removeAttribute("data-theme");
    }
  }, [resolvedThemeMode]);

  const setThemeMode = useCallback((value: ThemeMode) => {
    updateControls((current) => ({
      ...current,
      themeMode: sanitizeThemeMode(value),
    }));
  }, []);

  const toggleThemeMode = useCallback(() => {
    updateControls((current) => {
      const currentResolvedThemeMode = resolveThemeMode(current.themeMode, getSystemThemeMode());

      return {
        ...current,
        themeMode: currentResolvedThemeMode === "dark" ? "light" : "dark",
      };
    });
  }, []);

  const setLogoScale = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      logoScale: clampNumber(value, MIN_LOGO_SCALE, MAX_LOGO_SCALE),
    }));
  }, []);

  const setHeroTextReadability = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroTextReadability: clampNumber(
        value,
        MIN_HERO_TEXT_READABILITY,
        MAX_HERO_TEXT_READABILITY,
      ),
    }));
  }, []);

  const setHeroReadableCardLeft = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroReadableCardLeft: clampNumber(
        value,
        MIN_HERO_READABLE_CARD_SIDE,
        MAX_HERO_READABLE_CARD_SIDE,
      ),
    }));
  }, []);

  const setHeroReadableCardRight = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroReadableCardRight: clampNumber(
        value,
        MIN_HERO_READABLE_CARD_SIDE,
        MAX_HERO_READABLE_CARD_SIDE,
      ),
    }));
  }, []);

  const setHeroReadableCardOpacity = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroReadableCardOpacity: clampNumber(
        value,
        MIN_HERO_READABLE_CARD_OPACITY,
        MAX_HERO_READABLE_CARD_OPACITY,
      ),
    }));
  }, []);

  const setHeroReadableCardRadius = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroReadableCardRadius: clampNumber(
        value,
        MIN_HERO_READABLE_CARD_RADIUS,
        MAX_HERO_READABLE_CARD_RADIUS,
      ),
    }));
  }, []);

  const setHeroReadableX = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroReadableX: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroReadableY = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroReadableY: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroPlatformsX = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroPlatformsX: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroPlatformsY = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroPlatformsY: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroActionsX = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroActionsX: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroActionsY = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroActionsY: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroCardsX = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroCardsX: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroCardsY = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroCardsY: clampNumber(value, MIN_HERO_ELEMENT_OFFSET, MAX_HERO_ELEMENT_OFFSET),
    }));
  }, []);

  const setHeroBackdropMode = useCallback((value: HeroBackdropMode) => {
    updateControls((current) => ({
      ...current,
      heroBackdropMode: sanitizeHeroBackdropMode(value),
    }));
  }, []);

  const setHeroBackdropFeather = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroBackdropFeather: clampNumber(
        value,
        MIN_HERO_BACKDROP_FEATHER,
        MAX_HERO_BACKDROP_FEATHER,
      ),
    }));
  }, []);

  const setHeroBackdropImage = useCallback((value: string) => {
    updateControls((current) => ({
      ...current,
      heroBackdropImage: value,
    }));
  }, []);

  const setHeroBackdropSize = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroBackdropSize: clampNumber(
        value,
        MIN_HERO_BACKDROP_SIZE,
        MAX_HERO_BACKDROP_SIZE,
      ),
    }));
  }, []);

  const setHeroBackdropX = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroBackdropX: clampNumber(
        value,
        MIN_HERO_BACKDROP_OFFSET,
        MAX_HERO_BACKDROP_OFFSET,
      ),
    }));
  }, []);

  const setHeroBackdropY = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroBackdropY: clampNumber(
        value,
        MIN_HERO_BACKDROP_OFFSET,
        MAX_HERO_BACKDROP_OFFSET,
      ),
    }));
  }, []);

  const setHeroBackdropContrast = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroBackdropContrast: clampNumber(
        value,
        MIN_HERO_BACKDROP_CONTRAST,
        MAX_HERO_BACKDROP_CONTRAST,
      ),
    }));
  }, []);

  const setHeroBackdropSaturation = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroBackdropSaturation: clampNumber(
        value,
        MIN_HERO_BACKDROP_SATURATION,
        MAX_HERO_BACKDROP_SATURATION,
      ),
    }));
  }, []);

  const setHeroBackdropBrightness = useCallback((value: number) => {
    updateControls((current) => ({
      ...current,
      heroBackdropBrightness: clampNumber(
        value,
        MIN_HERO_BACKDROP_BRIGHTNESS,
        MAX_HERO_BACKDROP_BRIGHTNESS,
      ),
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      themeMode: controls.themeMode,
      resolvedThemeMode,
      setThemeMode,
      toggleThemeMode,
      logoScale: controls.logoScale,
      setLogoScale,
      heroTextReadability: controls.heroTextReadability,
      setHeroTextReadability,
      heroReadableCardLeft: controls.heroReadableCardLeft,
      setHeroReadableCardLeft,
      heroReadableCardRight: controls.heroReadableCardRight,
      setHeroReadableCardRight,
      heroReadableCardOpacity: controls.heroReadableCardOpacity,
      setHeroReadableCardOpacity,
      heroReadableCardRadius: controls.heroReadableCardRadius,
      setHeroReadableCardRadius,
      heroReadableX: controls.heroReadableX,
      setHeroReadableX,
      heroReadableY: controls.heroReadableY,
      setHeroReadableY,
      heroPlatformsX: controls.heroPlatformsX,
      setHeroPlatformsX,
      heroPlatformsY: controls.heroPlatformsY,
      setHeroPlatformsY,
      heroActionsX: controls.heroActionsX,
      setHeroActionsX,
      heroActionsY: controls.heroActionsY,
      setHeroActionsY,
      heroCardsX: controls.heroCardsX,
      setHeroCardsX,
      heroCardsY: controls.heroCardsY,
      setHeroCardsY,
      heroBackdropMode: controls.heroBackdropMode,
      setHeroBackdropMode,
      heroBackdropFeather: controls.heroBackdropFeather,
      setHeroBackdropFeather,
      heroBackdropImage: controls.heroBackdropImage,
      setHeroBackdropImage,
      heroBackdropSize: controls.heroBackdropSize,
      setHeroBackdropSize,
      heroBackdropX: controls.heroBackdropX,
      setHeroBackdropX,
      heroBackdropY: controls.heroBackdropY,
      setHeroBackdropY,
      heroBackdropContrast: controls.heroBackdropContrast,
      setHeroBackdropContrast,
      heroBackdropSaturation: controls.heroBackdropSaturation,
      setHeroBackdropSaturation,
      heroBackdropBrightness: controls.heroBackdropBrightness,
      setHeroBackdropBrightness,
      heroProductMode: controls.heroProductMode,
      heroProductImageId: controls.heroProductImageId,
    }),
    [
      controls.themeMode,
      resolvedThemeMode,
      setThemeMode,
      toggleThemeMode,
      controls.logoScale,
      setLogoScale,
      controls.heroTextReadability,
      setHeroTextReadability,
      controls.heroReadableCardLeft,
      setHeroReadableCardLeft,
      controls.heroReadableCardRight,
      setHeroReadableCardRight,
      controls.heroReadableCardOpacity,
      setHeroReadableCardOpacity,
      controls.heroReadableCardRadius,
      setHeroReadableCardRadius,
      controls.heroReadableX,
      setHeroReadableX,
      controls.heroReadableY,
      setHeroReadableY,
      controls.heroPlatformsX,
      setHeroPlatformsX,
      controls.heroPlatformsY,
      setHeroPlatformsY,
      controls.heroActionsX,
      setHeroActionsX,
      controls.heroActionsY,
      setHeroActionsY,
      controls.heroCardsX,
      setHeroCardsX,
      controls.heroCardsY,
      setHeroCardsY,
      controls.heroBackdropMode,
      setHeroBackdropMode,
      controls.heroBackdropFeather,
      setHeroBackdropFeather,
      controls.heroBackdropImage,
      setHeroBackdropImage,
      controls.heroBackdropSize,
      setHeroBackdropSize,
      controls.heroBackdropX,
      setHeroBackdropX,
      controls.heroBackdropY,
      setHeroBackdropY,
      controls.heroBackdropContrast,
      setHeroBackdropContrast,
      controls.heroBackdropSaturation,
      setHeroBackdropSaturation,
      controls.heroBackdropBrightness,
      setHeroBackdropBrightness,
      controls.heroProductMode,
      controls.heroProductImageId,
    ],
  );

  return (
    <LandingControlsContext.Provider value={contextValue}>
      {children}
    </LandingControlsContext.Provider>
  );
}

export function useLandingControls() {
  const context = useContext(LandingControlsContext);

  if (!context) {
    throw new Error("useLandingControls must be used within LandingControlsProvider");
  }

  return context;
}

export function LandingControlsMenu() {
  const {
    themeMode,
    heroBackdropBrightness,
    heroBackdropContrast,
    heroBackdropSaturation,
    setThemeMode,
    setHeroBackdropBrightness,
    setHeroBackdropContrast,
    setHeroBackdropSaturation,
  } = useLandingControls();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <aside className="landing-controls" aria-label="Sayfa ayarları">
      <button
        aria-controls="landing-controls-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Ayar menüsünü kapat" : "Ayar menüsünü aç"}
        className="landing-controls-toggle"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="landing-controls-toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        className={`landing-controls-panel${isOpen ? " is-open" : ""}`}
        hidden={!isOpen}
        id="landing-controls-panel"
      >
        <div className="landing-controls-head">
          <span>Ayarlar</span>
          <button
            aria-label="Ayar menüsünü kapat"
            className="landing-controls-close"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
        </div>

        <fieldset className="landing-control-field landing-control-fieldset">
          <legend>Tema</legend>
          <div className="landing-theme-options">
            {THEME_MODES.map((item) => (
              <label className="landing-theme-option" key={item.id}>
                <input
                  checked={themeMode === item.id}
                  name="themeMode"
                  type="radio"
                  value={item.id}
                  onChange={() => setThemeMode(item.id)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="landing-control-field">
          <span className="landing-control-row">
            <span>Kontrast</span>
            <output>{heroBackdropContrast}%</output>
          </span>
          <input
            max={MAX_HERO_BACKDROP_CONTRAST}
            min={MIN_HERO_BACKDROP_CONTRAST}
            type="range"
            value={heroBackdropContrast}
            onInput={(event) => setHeroBackdropContrast(Number(event.currentTarget.value))}
          />
        </label>

        <label className="landing-control-field">
          <span className="landing-control-row">
            <span>Canlılık</span>
            <output>{heroBackdropSaturation}%</output>
          </span>
          <input
            max={MAX_HERO_BACKDROP_SATURATION}
            min={MIN_HERO_BACKDROP_SATURATION}
            type="range"
            value={heroBackdropSaturation}
            onInput={(event) =>
              setHeroBackdropSaturation(Number(event.currentTarget.value))
            }
          />
        </label>

        <label className="landing-control-field">
          <span className="landing-control-row">
            <span>Parlaklık</span>
            <output>{heroBackdropBrightness}%</output>
          </span>
          <input
            max={MAX_HERO_BACKDROP_BRIGHTNESS}
            min={MIN_HERO_BACKDROP_BRIGHTNESS}
            type="range"
            value={heroBackdropBrightness}
            onInput={(event) =>
              setHeroBackdropBrightness(Number(event.currentTarget.value))
            }
          />
        </label>
      </div>
    </aside>
  );
}
