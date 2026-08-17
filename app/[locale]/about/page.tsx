import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { artist } from "@/lib/site";
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
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const education = t.raw("education") as string[];

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="eyebrow">{t("label")}</p>
      <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">{t("title")}</h1>

      <div className="mt-12 grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/images/portrait.jpg"
            alt={artist.name}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
        </div>
      </div>

      <div className="mt-20 grid gap-12 border-t border-line pt-16 md:grid-cols-3">
        <div>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("educationTitle")}</h2>
          <ul className="mt-5 space-y-3 text-ink-soft">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("mentorsTitle")}</h2>
          <p className="mt-5 text-ink-soft">
            Mark Turner, Jeff Ballard, Jorge Rossy, Bill McHenry, Julio Barreto,
            Guillermo Klein, Martijn Vink, Lucas Van Merwijk, Marcel Serierse,
            Yoran Vroom.
          </p>
        </div>
        <div>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("teachingTitle")}</h2>
          <p className="mt-5 text-ink-soft">{t("teaching")}</p>
        </div>
      </div>
    </article>
  );
}
