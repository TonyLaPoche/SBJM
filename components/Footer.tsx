import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { artist } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="display text-4xl">S.J Delacombaz</p>
          <p className="mt-3 text-sm text-ink-soft">{t("lessons")}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <a href={`mailto:${artist.email}`} className="hover:text-ink">
            {artist.email}
          </a>
          <a href={`tel:${artist.phoneE164}`} className="hover:text-ink">
            {artist.phoneDisplay}
          </a>
          <a href={artist.youtube} target="_blank" rel="noreferrer" className="hover:text-ink">
            YouTube
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <Link href="/lessons" className="hover:text-ink">
            {t("lessons")}
          </Link>
          <Link href="/contact" className="hover:text-ink">
            Contact
          </Link>
          <p>
            © {year} {artist.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
