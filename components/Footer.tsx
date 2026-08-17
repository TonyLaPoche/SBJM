import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { artist } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="page-shell flex flex-col gap-8 py-10 sm:py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-3xl sm:text-4xl">S.J Delacombaz</p>
          <p className="mt-3 text-sm text-ink-soft">{t("lessons")}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <a
            href={`mailto:${artist.email}`}
            className="break-words-safe transition-colors hover:text-ink"
          >
            {artist.email}
          </a>
          <a
            href={`tel:${artist.phoneE164}`}
            className="transition-colors hover:text-ink"
          >
            {artist.phoneDisplay}
          </a>
          <a
            href={artist.youtube}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            YouTube
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <Link href="/lessons" className="transition-colors hover:text-ink">
            {t("lessons")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-ink">
            Contact
          </Link>
          <Link href="/legal" className="transition-colors hover:text-ink">
            {t("legal")}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-ink">
            {t("privacy")}
          </Link>
          <Link href="/cookies" className="transition-colors hover:text-ink">
            {t("cookies")}
          </Link>
          <CookieSettingsButton variant="link" />
          <p className="pt-2">
            © {year} {artist.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
