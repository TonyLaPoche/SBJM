import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TrackList } from "@/components/AudioPlayer";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { buildMetadata, courseJsonLd, musicGroupJsonLd } from "@/lib/seo";
import { artist, tracks } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    ...buildMetadata({
      locale: locale as Locale,
      title: `${artist.name} | ${t("homeTitle")}`,
      description: t("homeDescription"),
      path: "/",
    }),
    title: {
      absolute: `${artist.name} | ${t("homeTitle")}`,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <JsonLd data={[musicGroupJsonLd(), courseJsonLd(locale as Locale)]} />

      <section className="page-shell pb-6 pt-12 text-center sm:pb-8 sm:pt-16 md:pt-24">
        <Reveal>
          <p className="eyebrow">{t("hero.role")}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display mx-auto mt-5 max-w-4xl text-[clamp(2.75rem,12vw,6.5rem)] sm:mt-6">
            {artist.firstName}
            <br />
            {artist.lastName}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="/lessons"
              className="border border-ink bg-ink px-5 py-3.5 text-center text-[0.68rem] tracking-[0.16em] uppercase text-paper transition-colors hover:bg-transparent hover:text-ink sm:text-xs"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/music"
              className="border border-ink px-5 py-3.5 text-center text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper sm:text-xs"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="page-shell">
        <Reveal variant="scale" delay={80}>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10]">
            <Image
              src="/images/portrait.jpg"
              alt={artist.name}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
        </Reveal>
      </section>

      <section className="page-shell grid gap-8 py-14 sm:gap-10 sm:py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20">
        <Reveal>
          <p className="eyebrow">{t("home.introLabel")}</p>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl md:text-2xl">
              {t("home.intro")}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm tracking-wide underline-offset-4 transition-colors hover:text-bronze hover:underline sm:mt-8"
            >
              {t("home.readBio")}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line">
        <div className="page-shell grid gap-10 py-14 sm:gap-12 sm:py-16 md:grid-cols-2 md:py-20">
          <Reveal>
            <div>
              <p className="eyebrow">{t("home.musicLabel")}</p>
              <h2 className="display mt-4 text-[clamp(2.25rem,8vw,3.75rem)]">
                {t("home.musicTitle")}
              </h2>
              <Link
                href="/music"
                className="mt-6 inline-block text-sm tracking-wide underline-offset-4 transition-colors hover:text-bronze hover:underline sm:mt-8"
              >
                {t("home.musicCta")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120} variant="right">
            <TrackList tracks={[...tracks].slice(0, 2)} />
          </Reveal>
        </div>
      </section>

      <section className="page-shell grid gap-8 py-14 sm:gap-10 sm:py-16 md:grid-cols-2 md:py-20">
        <Reveal>
          <div>
            <p className="eyebrow">{t("home.lessonsLabel")}</p>
            <h2 className="display mt-4 text-[clamp(2.25rem,8vw,3.75rem)]">
              {t("home.lessonsTitle")}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("home.lessonsText")}
            </p>
            <Link
              href="/lessons"
              className="mt-6 inline-flex border border-ink px-5 py-3.5 text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper sm:mt-8 sm:text-xs"
            >
              {t("home.lessonsCta")}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-paper-deep/40">
        <div className="page-shell py-12 sm:py-16">
          <Reveal>
            <p className="eyebrow">{t("home.contactLabel")}</p>
            <h2 className="display mt-4 text-[clamp(2.1rem,7vw,3.25rem)]">
              {t("home.contactTitle")}
            </h2>
            <div className="mt-6 flex flex-col gap-2 text-base sm:mt-8 sm:text-lg">
              <a
                href={`mailto:${artist.email}`}
                className="break-words-safe transition-colors hover:text-bronze"
              >
                {artist.email}
              </a>
              <a
                href={`tel:${artist.phoneE164}`}
                className="transition-colors hover:text-bronze"
              >
                {artist.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
