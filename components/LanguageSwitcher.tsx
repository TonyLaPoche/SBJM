"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase">
      {routing.locales.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 ? <span className="text-line">/</span> : null}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            className={
              locale === code
                ? "text-ink"
                : "text-ink-soft transition-colors hover:text-ink"
            }
            aria-current={locale === code ? "true" : undefined}
          >
            {code === "en" ? "EN" : "FR"}
          </button>
        </span>
      ))}
    </div>
  );
}
