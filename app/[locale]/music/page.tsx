import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrackList } from "@/components/AudioPlayer";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { buildMetadata, musicGroupJsonLd } from "@/lib/seo";
import { artist, tracks } from "@/lib/site";
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
    title: t("musicTitle"),
    description: t("musicDescription"),
    path: "/music",
  });
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("music");

  return (
    <article className="page-shell py-12 sm:py-16 md:py-24">
      <JsonLd data={musicGroupJsonLd()} />
      <Reveal>
        <p className="eyebrow">{t("label")}</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,9vw,4.5rem)]">{t("title")}</h1>
      </Reveal>

      <Reveal className="mt-10 block sm:mt-12" variant="scale">
        <section>
          <div className="aspect-video overflow-hidden bg-ink">
            <iframe
              title={t("liveTitle")}
              src={`https://www.youtube-nocookie.com/embed/${artist.youtubeVideoId}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="mt-4 text-sm text-ink-soft">{t("liveTitle")}</p>
        </section>
      </Reveal>

      <section className="mt-14 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2">
        <Reveal>
          <h2 className="display text-[clamp(2.2rem,7vw,3.25rem)]">{t("fieldsTitle")}</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            <p>{t("fieldsP1")}</p>
            <p>{t("fieldsP2")}</p>
          </div>
        </Reveal>
      </section>

      <section className="mt-14 border-t border-line pt-10 sm:mt-20 sm:pt-12">
        <Reveal>
          <h2 className="display text-[clamp(2.2rem,7vw,3.25rem)]">{t("worksTitle")}</h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t("worksIntro")}</p>
        </Reveal>
        <Reveal delay={100} className="mt-8 block">
          <TrackList tracks={[...tracks]} />
        </Reveal>
      </section>
    </article>
  );
}
