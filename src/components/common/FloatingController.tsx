"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import {
  Volume2,
  VolumeX,
  Settings,
  ArrowUp,
  Sun,
  Moon,
  Monitor,
  Eye,
  Sparkles,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

export function FloatingController() {
  const {
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
  } = usePreferences();

  const modalRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show Arrow Up button when scrolled past first hero section (~280px)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > 280);
  });

  const scrollToTop = () => {
    triggerClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSettingsOpen, setIsSettingsOpen]);

  const handleToggleSettings = () => {
    triggerClickSound();
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      {/* Dimmed backdrop when settings modal is open */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsSettingsOpen(false)}
            className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-[2px] z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Settings panel: rises from the bottom centre of the screen and
          drops back down to close. */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-3 pb-[5.25rem] sm:p-6 sm:pb-[5.5rem] pointer-events-none">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-label="Site preferences"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", damping: 30, stiffness: 380 }}
              style={{ transformOrigin: "bottom center" }}
              className="settings-panel pointer-events-auto w-full max-w-[440px] rounded-3xl bg-white/95 dark:bg-surface-container-low/95 border border-black/10 dark:border-white/15 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-3.5 sm:p-4 text-on-surface dark:text-on-surface select-none"
            >
              {/* Options List with Center Line Between Option Name and Enable/Disable Button */}
              <div className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
                {/* Option 1: THEME */}
                <div
                  onClick={toggleTheme}
                  className="group settings-row flex items-center justify-between cursor-pointer py-3 px-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all select-none"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="w-8 h-8 rounded-lg bg-surface-container-low dark:bg-white/10 flex items-center justify-center text-on-surface dark:text-on-surface transition-colors"
                    >
                      {theme === "dark" ? (
                        <Moon className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Sun className="w-4 h-4 text-on-surface" />
                      )}
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="font-body text-sm font-semibold text-on-surface dark:text-on-surface">
                        Theme
                      </span>
                      <span className="font-body text-[11px] text-muted-subtle">
                        Light or dark mode
                      </span>
                    </div>
                  </div>

                  {/* Center connecting line */}
                  <div className="flex-1 mx-3 sm:mx-4 border-b border-dashed border-hairline-border dark:border-white/20 group-hover:border-on-surface-variant dark:group-hover:border-white/35 transition-colors" />

                  <div className="shrink-0 flex items-center">
                    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-surface-container-low dark:bg-white/10 border border-black/5 dark:border-white/10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (theme !== "light") toggleTheme();
                        }}
                        className={`px-2.5 py-1 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                          theme === "light"
                            ? "bg-primary text-on-primary font-semibold shadow-sm"
                            : "text-muted-subtle hover:text-on-surface"
                        }`}
                      >
                        <Sun className={`w-3.5 h-3.5 ${theme === "light" ? "" : "opacity-60"}`} />
                        <span>Light</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (theme !== "dark") toggleTheme();
                        }}
                        className={`px-2.5 py-1 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                          theme === "dark"
                            ? "bg-primary text-on-primary font-semibold shadow-sm"
                            : "text-muted-subtle hover:text-on-surface"
                        }`}
                      >
                        <Moon className={`w-3.5 h-3.5 ${theme === "dark" ? "" : "opacity-60"}`} />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>
                </div>

                  {/* Option 2: SOUND */}
                  <div
                    onClick={toggleSound}
                    className="group settings-row flex items-center justify-between cursor-pointer py-3 px-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all select-none"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-low dark:bg-white/10 flex items-center justify-center text-on-surface dark:text-on-surface transition-colors">
                        {sound === "enabled" ? (
                          <Volume2 className="w-4 h-4 text-accent" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-muted-subtle" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body text-sm font-semibold text-on-surface dark:text-on-surface">
                          Sound Effects
                        </span>
                        <span className="font-body text-[11px] text-muted-subtle">
                          Click and hover sounds
                        </span>
                      </div>
                    </div>

                    {/* Center connecting line */}
                    <div className="flex-1 mx-3 sm:mx-4 border-b border-dashed border-hairline-border dark:border-white/20 group-hover:border-on-surface-variant dark:group-hover:border-white/35 transition-colors" />

                    <div className="shrink-0">
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-surface-container-low dark:bg-white/10 text-on-surface dark:text-on-surface font-medium border border-black/5 dark:border-white/10 group-hover:bg-surface-container dark:group-hover:bg-white/20 transition-all flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sound === "enabled" ? "bg-accent" : "bg-muted-subtle"
                          }`}
                        />
                        {sound === "enabled" ? "On" : "Off"}
                      </span>
                    </div>
                  </div>

                  {/* Option 3: SYSTEM THEME SYNC */}
                  <div
                    onClick={toggleSystemTheme}
                    className="group settings-row flex items-center justify-between cursor-pointer py-3 px-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all select-none"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-low dark:bg-white/10 flex items-center justify-center text-on-surface dark:text-on-surface transition-colors">
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body text-sm font-semibold text-on-surface dark:text-on-surface">
                          Auto Theme
                        </span>
                        <span className="font-body text-[11px] text-muted-subtle">
                          Match device appearance
                        </span>
                      </div>
                    </div>

                    {/* Center connecting line */}
                    <div className="flex-1 mx-3 sm:mx-4 border-b border-dashed border-hairline-border dark:border-white/20 group-hover:border-on-surface-variant dark:group-hover:border-white/35 transition-colors" />

                    <div className="shrink-0">
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-surface-container-low dark:bg-white/10 text-on-surface dark:text-on-surface font-medium border border-black/5 dark:border-white/10 group-hover:bg-surface-container dark:group-hover:bg-white/20 transition-all flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            systemTheme === "on" ? "bg-accent" : "bg-muted-subtle"
                          }`}
                        />
                        {systemTheme === "on" ? "On" : "Off"}
                      </span>
                    </div>
                  </div>

                  {/* Option 4: SECTION BADGES */}
                  <div
                    onClick={toggleShowLabels}
                    className="group settings-row flex items-center justify-between cursor-pointer py-3 px-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all select-none"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-low dark:bg-white/10 flex items-center justify-center text-on-surface dark:text-on-surface transition-colors">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body text-sm font-semibold text-on-surface dark:text-on-surface">
                          Section Tags
                        </span>
                        <span className="font-body text-[11px] text-muted-subtle">
                          Show category labels
                        </span>
                      </div>
                    </div>

                    {/* Center connecting line */}
                    <div className="flex-1 mx-3 sm:mx-4 border-b border-dashed border-hairline-border dark:border-white/20 group-hover:border-on-surface-variant dark:group-hover:border-white/35 transition-colors" />

                    <div className="shrink-0">
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-surface-container-low dark:bg-white/10 text-on-surface dark:text-on-surface font-medium border border-black/5 dark:border-white/10 group-hover:bg-surface-container dark:group-hover:bg-white/20 transition-all flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            showLabels ? "bg-accent" : "bg-muted-subtle"
                          }`}
                        />
                        {showLabels ? "On" : "Off"}
                      </span>
                    </div>
                  </div>

                  {/* Option 5: PRELOADER */}
                  <div
                    onClick={togglePreloader}
                    className="group settings-row flex items-center justify-between cursor-pointer py-3 px-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all select-none"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-low dark:bg-white/10 flex items-center justify-center text-on-surface dark:text-on-surface transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body text-sm font-semibold text-on-surface dark:text-on-surface">
                          Intro Screen
                        </span>
                        <span className="font-body text-[11px] text-muted-subtle">
                          Play opening animation
                        </span>
                      </div>
                    </div>

                    {/* Center connecting line */}
                    <div className="flex-1 mx-3 sm:mx-4 border-b border-dashed border-hairline-border dark:border-white/20 group-hover:border-on-surface-variant dark:group-hover:border-white/35 transition-colors" />

                    <div className="shrink-0">
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-surface-container-low dark:bg-white/10 text-on-surface dark:text-on-surface font-medium border border-black/5 dark:border-white/10 group-hover:bg-surface-container dark:group-hover:bg-white/20 transition-all flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            preloader ? "bg-accent" : "bg-muted-subtle"
                          }`}
                        />
                        {preloader ? "On" : "Off"}
                      </span>
                    </div>
                  </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom-Right Pill: Theme-Wise Colors, Icons (Top, Theme, Sound, Settings) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center select-none pointer-events-auto">
        <div className="inline-flex items-center gap-1 p-1.5 px-2 rounded-full bg-white/95 dark:bg-surface-container-low/95 border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-lg dark:shadow-2xl text-on-surface dark:text-on-surface transition-all duration-300 hover:border-black/20 dark:hover:border-white/30">
          {/* 1. Scroll-Up Button (Aligned dynamically when scrolled to second section) */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.div
                initial={{ opacity: 0, width: 0, scale: 0.7 }}
                animate={{ opacity: 1, width: "auto", scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="flex items-center overflow-hidden"
              >
                <button
                  type="button"
                  onClick={scrollToTop}
                  title="Scroll to top"
                  aria-label="Scroll to top"
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-on-surface-variant hover:text-on-surface dark:text-on-surface/80 dark:hover:text-on-surface transition-all duration-200 active:scale-90 cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-3.5 bg-black/10 dark:bg-white/20 mx-0.5" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            title={sound === "enabled" ? "Mute audio micro-haptics" : "Enable audio micro-haptics"}
            aria-label={sound === "enabled" ? "Mute audio micro-haptics" : "Enable audio micro-haptics"}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-on-surface-variant hover:text-on-surface dark:text-on-surface/80 dark:hover:text-on-surface transition-all duration-200 active:scale-90 cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              {sound === "enabled" ? (
                <motion.div
                  key="sound-on"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Volume2 className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="sound-off"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <VolumeX className="w-4 h-4 opacity-40" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Divider between sound and settings */}
          <div className="w-[1px] h-3.5 bg-black/10 dark:bg-white/20" />

          {/* 4. Settings Gear Button */}
          <button
            type="button"
            onClick={handleToggleSettings}
            title="Open site preferences"
            aria-label="Open site preferences"
            className={`p-2 rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${
              isSettingsOpen
                ? "bg-black/10 dark:bg-white/15 text-on-surface dark:text-on-surface"
                : "text-on-surface-variant hover:text-on-surface hover:bg-black/5 dark:text-on-surface/80 dark:hover:text-on-surface dark:hover:bg-white/10"
            }`}
          >
            <motion.div
              animate={{ rotate: isSettingsOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Settings className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>
    </>
  );
}
