import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingWizard } from "@/components/BookingWizard";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
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
    <article className="page-shell py-12 sm:py-16 md:py-24">
      <JsonLd data={courseJsonLd(locale as Locale)} />
      <Reveal>
        <p className="eyebrow">{t("label")}</p>
        <h1 className="display mt-4 max-w-3xl text-[clamp(2.4rem,9vw,4.5rem)]">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:mt-8 sm:text-lg">
          {t("intro")}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 sm:mt-16 sm:gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("methodTitle")}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{t("method")}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("formatTitle")}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{t("format")}</p>
          <p className="mt-4 text-sm text-ink-soft">{t("audience")}</p>
        </Reveal>
      </div>

      <section className="mt-14 sm:mt-20">
        <Reveal>
          <h2 className="display text-[clamp(2.2rem,7vw,3.25rem)]">{t("typesTitle")}</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {lessonTypes.map((lesson, index) => (
            <Reveal key={lesson.id} delay={index * 80}>
              <div className="h-full border border-line p-5 transition-colors hover:border-ink sm:p-6">
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
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-14 sm:mt-20" id="book">
        <Reveal>
          <h2 className="display text-[clamp(2.2rem,7vw,3.25rem)]">{t("bookTitle")}</h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t("bookIntro")}</p>
        </Reveal>
        <Reveal delay={100} className="mt-8 block sm:mt-10">
          <BookingWizard />
        </Reveal>
      </section>
    </article>
  );
}
