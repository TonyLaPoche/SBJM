"use client";

import { useTranslations } from "next-intl";
import { useConsent } from "./ConsentProvider";

export function CookieSettingsButton({
  variant = "button",
}: {
  variant?: "button" | "link";
}) {
  const t = useTranslations("cookies");
  const footer = useTranslations("footer");
  const { openSettings } = useConsent();

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={openSettings}
        className="text-left transition-colors hover:text-ink"
      >
        {footer("manageCookies")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSettings}
      className="border border-ink px-4 py-3 text-xs tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper"
    >
      {t("managePreferences")}
    </button>
  );
}
