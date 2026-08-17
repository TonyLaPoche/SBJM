import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
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
    <article className="page-shell py-12 sm:py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{t("label")}</p>
        <h1 className="display mt-4 max-w-3xl text-[clamp(2.4rem,9vw,4.5rem)]">
          {t("title")}
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-10 sm:mt-12 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-12">
        <Reveal variant="scale">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/portrait.jpg"
              alt={artist.name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:space-y-6 sm:text-lg">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 border-t border-line pt-12 sm:mt-20 sm:gap-12 sm:pt-16 md:grid-cols-3">
        <Reveal delay={0}>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("educationTitle")}</h2>
          <ul className="mt-5 space-y-3 text-ink-soft">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("mentorsTitle")}</h2>
          <p className="mt-5 text-ink-soft">
            Mark Turner, Jeff Ballard, Jorge Rossy, Bill McHenry, Julio Barreto,
            Guillermo Klein, Martijn Vink, Lucas Van Merwijk, Marcel Serierse,
            Yoran Vroom.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <h2 className="text-sm tracking-[0.16em] uppercase">{t("teachingTitle")}</h2>
          <p className="mt-5 text-ink-soft">{t("teaching")}</p>
        </Reveal>
      </div>
    </article>
  );
}
