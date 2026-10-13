"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { playHoverSound, playClickSound } from "@/lib/sound";

export type ThemeMode = "dark" | "light";
export type SystemThemeMode = "on" | "off";
export type SoundMode = "enabled" | "muted";

/** Every persisted preference, hydrated from localStorage as one unit. */
interface PersistedPreferences {
  sound: SoundMode;
  theme: ThemeMode;
  systemTheme: SystemThemeMode;
  showLabels: boolean;
  preloader: boolean;
}

const DEFAULT_PREFERENCES: PersistedPreferences = {
  sound: "enabled",
  theme: "light",
  systemTheme: "off",
  showLabels: true,
  preloader: true,
};

const STORAGE_KEYS = {
  sound: "gxuri_pref_sound",
  theme: "gxuri_pref_theme",
  systemTheme: "gxuri_pref_system_theme",
  labels: "gxuri_pref_labels",
  preloader: "gxuri_pref_preloader",
} as const;

function readStoredPreferences(): PersistedPreferences {
  const readEnum = <T extends string>(
    key: string,
    allowed: readonly T[],
    fallback: T
  ): T => {
    const raw = localStorage.getItem(key);
    return raw !== null && (allowed as readonly string[]).includes(raw)
      ? (raw as T)
      : fallback;
  };

  const readBoolean = (key: string, fallback: boolean): boolean => {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw === "true";
  };

  return {
    sound: readEnum(STORAGE_KEYS.sound, ["enabled", "muted"], "enabled"),
    theme: readEnum(STORAGE_KEYS.theme, ["dark", "light"], "light"),
    systemTheme: readEnum(STORAGE_KEYS.systemTheme, ["on", "off"], "off"),
    showLabels: readBoolean(STORAGE_KEYS.labels, true),
    preloader: readBoolean(STORAGE_KEYS.preloader, true),
  };
}

interface PreferencesContextType {
  sound: SoundMode;
  theme: ThemeMode;
  systemTheme: SystemThemeMode;
  showLabels: boolean;
  preloader: boolean;
  isSettingsOpen: boolean;
  toggleSound: () => void;
  toggleTheme: () => void;
  toggleSystemTheme: () => void;
  toggleShowLabels: () => void;
  togglePreloader: () => void;
  setIsSettingsOpen: (open: boolean) => void;
  triggerClickSound: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  // Persisted preferences live in one state object so hydration costs a
  // single render instead of one render per key.
  const [prefs, setPrefs] = useState<PersistedPreferences>(DEFAULT_PREFERENCES);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const { sound, theme, systemTheme, showLabels, preloader } = prefs;

  // 1. Load preferences from localStorage on mount
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with an external store (localStorage)
      setPrefs(readStoredPreferences());
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // 2. Handle System Theme detection & media query sync
  useEffect(() => {
    if (systemTheme === "on" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const applySystemTheme = (matches: boolean) => {
        setPrefs((prev) => ({ ...prev, theme: matches ? "dark" : "light" }));
      };

      applySystemTheme(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => applySystemTheme(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [systemTheme]);

  // 3. Apply Theme to DOM root
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  // 4. Apply Show Labels attribute to DOM
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-show-labels", showLabels ? "true" : "false");
  }, [showLabels]);

  // 5. Global Micro-Haptic Sound Listener on Hover for keywords, options, cards, badges & buttons
  useEffect(() => {
    if (sound !== "enabled" || typeof document === "undefined") return;

    const SELECTOR =
      "button, a, .about-keyword, .experience-card, .orbit-badge, .blog-card, .settings-row, [role='button'], input, [data-hover-sound]";
    // The interactive element the pointer is currently over. A tick plays
    // only when this changes, so moving across the children of one card is
    // silent and every new element entered gets exactly one tick.
    let current: Element | null = null;

    const handlePointerOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = (e.target as Element | null)?.closest(SELECTOR) ?? null;
      if (target === current) return;
      current = target;
      if (target) playHoverSound(true);
    };

    const handlePointerLeaveWindow = () => {
      current = null;
    };

    document.addEventListener("pointerover", handlePointerOver, { passive: true, capture: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeaveWindow);
    return () => {
      document.removeEventListener("pointerover", handlePointerOver, { capture: true });
      document.documentElement.removeEventListener("pointerleave", handlePointerLeaveWindow);
    };
  }, [sound]);

  // Toggle Handlers
  const toggleSound = () => {
    playClickSound(sound === "muted"); // Play click sound if toggling on
    const nextSound: SoundMode = sound === "enabled" ? "muted" : "enabled";
    setPrefs((prev) => ({ ...prev, sound: nextSound }));
    localStorage.setItem(STORAGE_KEYS.sound, nextSound);
  };

  const toggleTheme = () => {
    playClickSound(sound === "enabled");
    // If user explicitly changes theme, turn system theme off
    if (systemTheme === "on") {
      setPrefs((prev) => ({ ...prev, systemTheme: "off" }));
      localStorage.setItem(STORAGE_KEYS.systemTheme, "off");
    }
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.add("theme-transitioning");

      const applyTheme = () => {
        setPrefs((prev) => ({ ...prev, theme: nextTheme }));
        localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
      };

      // Native View Transitions if supported
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document as any).startViewTransition) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (document as any).startViewTransition(() => {
            applyTheme();
          });
        } catch {
          applyTheme();
        }
      } else {
        applyTheme();
      }

      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 500);
    } else {
      setPrefs((prev) => ({ ...prev, theme: nextTheme }));
      localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
    }
  };

  const toggleSystemTheme = () => {
    playClickSound(sound === "enabled");
    const nextSystemTheme: SystemThemeMode = systemTheme === "on" ? "off" : "on";
    setPrefs((prev) => ({ ...prev, systemTheme: nextSystemTheme }));
    localStorage.setItem(STORAGE_KEYS.systemTheme, nextSystemTheme);

    if (nextSystemTheme === "on" && typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const targetTheme: ThemeMode = isDark ? "dark" : "light";
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.classList.add("theme-transitioning");
        setPrefs((prev) => ({ ...prev, theme: targetTheme }));
        window.setTimeout(() => {
          root.classList.remove("theme-transitioning");
        }, 500);
      } else {
        setPrefs((prev) => ({ ...prev, theme: targetTheme }));
      }
    }
  };

  const toggleShowLabels = () => {
    playClickSound(sound === "enabled");
    const next = !showLabels;
    setPrefs((prev) => ({ ...prev, showLabels: next }));
    localStorage.setItem(STORAGE_KEYS.labels, String(next));
  };

  const togglePreloader = () => {
    playClickSound(sound === "enabled");
    const next = !preloader;
    setPrefs((prev) => ({ ...prev, preloader: next }));
    localStorage.setItem(STORAGE_KEYS.preloader, String(next));
  };

  const triggerClickSound = () => {
    playClickSound(sound === "enabled");
  };

  return (
    <PreferencesContext.Provider
      value={{
        sound,
        theme,
        systemTheme,
        showLabels,
        preloader,
        isSettingsOpen,
        toggleSound,
        toggleTheme,
        toggleSystemTheme,
        toggleShowLabels,
        togglePreloader,
        setIsSettingsOpen,
        triggerClickSound,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
