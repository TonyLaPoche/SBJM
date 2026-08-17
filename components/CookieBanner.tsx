"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useConsent } from "./ConsentProvider";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const {
    ready,
    hasDecision,
    acceptAll,
    rejectOptional,
    savePreferences,
    preferences,
    settingsOpen,
    openSettings,
    closeSettings,
  } = useConsent();

  const [analytics, setAnalytics] = useState(false);
  const [media, setMedia] = useState(false);

  useEffect(() => {
    setAnalytics(preferences.analytics);
    setMedia(preferences.media);
  }, [preferences]);

  if (!ready) return null;

  const showBanner = !hasDecision || settingsOpen;
  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl border border-line bg-paper p-5 shadow-[0_-12px_40px_rgba(22,20,18,0.12)] sm:p-6">
        <p className="eyebrow">{t("bannerLabel")}</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">{t("bannerTitle")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          {t("bannerText")}{" "}
          <Link href="/cookies" className="underline underline-offset-4 hover:text-ink">
            {t("learnMore")}
          </Link>
        </p>

        {settingsOpen || hasDecision ? (
          <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong className="font-medium">{t("necessary")}</strong>
                <span className="mt-1 block text-ink-soft">{t("necessaryText")}</span>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="mt-1"
              />
              <span>
                <strong className="font-medium">{t("analytics")}</strong>
                <span className="mt-1 block text-ink-soft">{t("analyticsText")}</span>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={media}
                onChange={(event) => setMedia(event.target.checked)}
                className="mt-1"
              />
              <span>
                <strong className="font-medium">{t("media")}</strong>
                <span className="mt-1 block text-ink-soft">{t("mediaText")}</span>
              </span>
            </label>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {settingsOpen || hasDecision ? (
            <>
              <button
                type="button"
                onClick={() => savePreferences({ analytics, media })}
                className="border border-ink bg-ink px-4 py-3 text-xs tracking-[0.16em] uppercase text-paper"
              >
                {t("save")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="border border-ink px-4 py-3 text-xs tracking-[0.16em] uppercase"
              >
                {t("acceptAll")}
              </button>
              {settingsOpen ? (
                <button
                  type="button"
                  onClick={closeSettings}
                  className="px-4 py-3 text-xs tracking-[0.16em] uppercase text-ink-soft"
                >
                  {t("close")}
                </button>
              ) : null}
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={acceptAll}
                className="border border-ink bg-ink px-4 py-3 text-xs tracking-[0.16em] uppercase text-paper"
              >
                {t("acceptAll")}
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                className="border border-ink px-4 py-3 text-xs tracking-[0.16em] uppercase"
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="px-4 py-3 text-xs tracking-[0.16em] uppercase text-ink-soft underline-offset-4 hover:underline"
              >
                {t("customize")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
