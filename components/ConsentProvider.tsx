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
import {
  defaultConsent,
  readConsent,
  writeConsent,
  type ConsentPreferences,
} from "@/lib/consent";

type ConsentContextValue = {
  ready: boolean;
  preferences: ConsentPreferences;
  hasDecision: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (next: Pick<ConsentPreferences, "analytics" | "media">) => void;
  openSettings: () => void;
  settingsOpen: boolean;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setPreferences(readConsent());
    setReady(true);

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<ConsentPreferences>).detail;
      if (detail) setPreferences(detail);
    };

    window.addEventListener("sj:consent-updated", onUpdate);
    return () => window.removeEventListener("sj:consent-updated", onUpdate);
  }, []);

  const persist = useCallback((next: ConsentPreferences) => {
    writeConsent(next);
    setPreferences(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist({
      necessary: true,
      analytics: true,
      media: true,
      decidedAt: new Date().toISOString(),
    });
    setSettingsOpen(false);
  }, [persist]);

  const rejectOptional = useCallback(() => {
    persist({
      necessary: true,
      analytics: false,
      media: false,
      decidedAt: new Date().toISOString(),
    });
    setSettingsOpen(false);
  }, [persist]);

  const savePreferences = useCallback(
    (next: Pick<ConsentPreferences, "analytics" | "media">) => {
      persist({
        necessary: true,
        analytics: next.analytics,
        media: next.media,
        decidedAt: new Date().toISOString(),
      });
      setSettingsOpen(false);
    },
    [persist],
  );

  const value = useMemo(
    () => ({
      ready,
      preferences,
      hasDecision: Boolean(preferences.decidedAt),
      acceptAll,
      rejectOptional,
      savePreferences,
      openSettings: () => setSettingsOpen(true),
      settingsOpen,
      closeSettings: () => setSettingsOpen(false),
    }),
    [
      ready,
      preferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      settingsOpen,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return context;
}
