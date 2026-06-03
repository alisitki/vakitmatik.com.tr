"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const THEME_STORAGE_KEY = "vakitmatik-theme-mode";
const LEGACY_CONTROLS_STORAGE_KEY = "vakitmatik-landing-controls-v6";
const DEFAULT_LOGO_SCALE = 77;

type ThemeMode = "system" | "light" | "dark";
type ResolvedThemeMode = Exclude<ThemeMode, "system">;

type LandingControlsValue = {
  themeMode: ThemeMode;
  resolvedThemeMode: ResolvedThemeMode;
  setThemeMode: (value: ThemeMode) => void;
  toggleThemeMode: () => void;
  logoScale: number;
};

const LandingControlsContext = createContext<LandingControlsValue | null>(null);

function sanitizeThemeMode(value: unknown): ThemeMode {
  return value === "light" || value === "dark" || value === "system" ? value : "system";
}

function getSystemThemeMode(): ResolvedThemeMode {
  if (typeof window === "undefined" || !window.matchMedia) return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveThemeMode(themeMode: ThemeMode, systemThemeMode: ResolvedThemeMode): ResolvedThemeMode {
  return themeMode === "system" ? systemThemeMode : themeMode;
}

function readStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";

  const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedThemeMode) return sanitizeThemeMode(storedThemeMode);

  try {
    const legacyControls = window.localStorage.getItem(LEGACY_CONTROLS_STORAGE_KEY);
    const parsedControls = legacyControls ? (JSON.parse(legacyControls) as { themeMode?: unknown }) : null;
    return sanitizeThemeMode(parsedControls?.themeMode);
  } catch {
    return "system";
  }
}

function persistThemeMode(themeMode: ThemeMode) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
}

export function LandingControlsProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => readStoredThemeMode());
  const [systemThemeMode, setSystemThemeMode] = useState<ResolvedThemeMode>(() => getSystemThemeMode());
  const resolvedThemeMode = resolveThemeMode(themeMode, systemThemeMode);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      setSystemThemeMode(mediaQuery.matches ? "dark" : "light");
    };

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
    const nextThemeMode = sanitizeThemeMode(value);
    setThemeModeState(nextThemeMode);
    persistThemeMode(nextThemeMode);
  }, []);

  const toggleThemeMode = useCallback(() => {
    setThemeModeState((currentThemeMode) => {
      const currentResolvedThemeMode = resolveThemeMode(currentThemeMode, getSystemThemeMode());
      const nextThemeMode = currentResolvedThemeMode === "dark" ? "light" : "dark";
      persistThemeMode(nextThemeMode);
      return nextThemeMode;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      themeMode,
      resolvedThemeMode,
      setThemeMode,
      toggleThemeMode,
      logoScale: DEFAULT_LOGO_SCALE,
    }),
    [resolvedThemeMode, setThemeMode, themeMode, toggleThemeMode],
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
  return null;
}
