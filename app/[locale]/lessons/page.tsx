import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingWizard } from "@/components/BookingWizard";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, courseJsonLd } from "@/lib/seo";
import { lessonTypes } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale: locale as Locale,
    title: t("lessonsTitle"),
    description: t("lessonsDescription"),
    path: "/lessons",
  });
}

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("lessons");

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <JsonLd data={courseJsonLd(locale as Locale)} />
      <p className="eyebrow">{t("label")}</p>
      <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">{t("title")}</h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {t("intro")}
      </p>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("methodTitle")}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{t("method")}</p>
        </div>
        <div>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("formatTitle")}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{t("format")}</p>
          <p className="mt-4 text-sm text-ink-soft">{t("audience")}</p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="display text-5xl">{t("typesTitle")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {lessonTypes.map((lesson) => (
            <div key={lesson.id} className="border border-line p-6">
              <p className="text-xs tracking-[0.16em] uppercase text-ink-soft">
                {t("minutes", { count: lesson.duration })}
              </p>
              <h3 className="mt-3 text-xl">
                {t(
                  lesson.id === "discovery"
                    ? "discovery"
                    : lesson.id === "standard"
                      ? "standard"
                      : "extended",
                )}
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                {t(
                  lesson.id === "discovery"
                    ? "discoveryText"
                    : lesson.id === "standard"
                      ? "standardText"
                      : "extendedText",
                )}
              </p>
              <p className="mt-6 text-lg">{lesson.price} €</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20" id="book">
        <h2 className="display text-5xl">{t("bookTitle")}</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">{t("bookIntro")}</p>
        <div className="mt-10">
          <BookingWizard />
        </div>
      </section>
    </article>
  );
}
