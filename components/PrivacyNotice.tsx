"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function PrivacyNotice() {
  const t = useTranslations("privacyNotice");

  return (
    <p className="text-xs leading-relaxed text-ink-soft">
      {t("text")}{" "}
      <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
        {t("link")}
      </Link>
    </p>
  );
}
