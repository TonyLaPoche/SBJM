export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  media: boolean;
  decidedAt: string | null;
};

export const CONSENT_STORAGE_KEY = "sj-consent-v1";

export const defaultConsent: ConsentPreferences = {
  necessary: true,
  analytics: false,
  media: false,
  decidedAt: null,
};

export function readConsent(): ConsentPreferences {
  if (typeof window === "undefined") return defaultConsent;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return defaultConsent;
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      media: Boolean(parsed.media),
      decidedAt: parsed.decidedAt ?? null,
    };
  } catch {
    return defaultConsent;
  }
}

export function writeConsent(preferences: ConsentPreferences) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(
    new CustomEvent("sj:consent-updated", { detail: preferences }),
  );
}
