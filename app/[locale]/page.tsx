import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TrackList } from "@/components/AudioPlayer";
import { JsonLd } from "@/components/JsonLd";
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
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 text-center md:px-8 md:pt-24">
        <p className="eyebrow">{t("hero.role")}</p>
        <h1 className="display mx-auto mt-6 max-w-4xl text-6xl sm:text-7xl md:text-8xl">
          {artist.firstName}
          <br />
          {artist.lastName}
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/lessons"
            className="border border-ink bg-ink px-5 py-3 text-xs tracking-[0.16em] uppercase text-paper"
          >
            {t("hero.ctaPrimary")}
          </Link>
          <Link
            href="/music"
            className="border border-ink px-5 py-3 text-xs tracking-[0.16em] uppercase"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 md:px-8">
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
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <p className="eyebrow">{t("home.introLabel")}</p>
        <div>
          <p className="max-w-2xl text-xl leading-relaxed text-ink-soft md:text-2xl">
            {t("home.intro")}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm tracking-wide underline-offset-4 hover:underline"
          >
            {t("home.readBio")}
          </Link>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <p className="eyebrow">{t("home.musicLabel")}</p>
            <h2 className="display mt-4 text-5xl md:text-6xl">{t("home.musicTitle")}</h2>
            <Link
              href="/music"
              className="mt-8 inline-block text-sm tracking-wide underline-offset-4 hover:underline"
            >
              {t("home.musicCta")}
            </Link>
          </div>
          <TrackList tracks={[...tracks].slice(0, 2)} />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="eyebrow">{t("home.lessonsLabel")}</p>
          <h2 className="display mt-4 text-5xl md:text-6xl">{t("home.lessonsTitle")}</h2>
        </div>
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            {t("home.lessonsText")}
          </p>
          <Link
            href="/lessons"
            className="mt-8 inline-block border border-ink px-5 py-3 text-xs tracking-[0.16em] uppercase"
          >
            {t("home.lessonsCta")}
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-paper-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <p className="eyebrow">{t("home.contactLabel")}</p>
          <h2 className="display mt-4 text-5xl">{t("home.contactTitle")}</h2>
          <div className="mt-8 flex flex-col gap-2 text-lg">
            <a href={`mailto:${artist.email}`}>{artist.email}</a>
            <a href={`tel:${artist.phoneE164}`}>{artist.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  );
}
