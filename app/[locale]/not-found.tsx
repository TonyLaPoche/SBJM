import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="page-shell flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow">{t("label")}</p>
      <h1 className="display mt-4 max-w-3xl text-[clamp(3rem,12vw,6rem)]">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        {t("text")}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="border border-ink bg-ink px-5 py-3.5 text-center text-xs tracking-[0.16em] uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
        >
          {t("home")}
        </Link>
        <Link
          href="/lessons"
          className="border border-ink px-5 py-3.5 text-center text-xs tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper"
        >
          {t("lessons")}
        </Link>
        <Link
          href="/contact"
          className="border border-ink px-5 py-3.5 text-center text-xs tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper"
        >
          {t("contact")}
        </Link>
      </div>
    </div>
  );
}
