import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrackList } from "@/components/AudioPlayer";
import { JsonLd } from "@/components/JsonLd";
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
    <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <JsonLd data={musicGroupJsonLd()} />
      <p className="eyebrow">{t("label")}</p>
      <h1 className="display mt-4 text-5xl md:text-7xl">{t("title")}</h1>

      <section className="mt-12">
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

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <h2 className="display text-5xl">{t("fieldsTitle")}</h2>
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>{t("fieldsP1")}</p>
          <p>{t("fieldsP2")}</p>
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-12">
        <h2 className="display text-5xl">{t("worksTitle")}</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">{t("worksIntro")}</p>
        <div className="mt-8">
          <TrackList tracks={[...tracks]} />
        </div>
      </section>
    </article>
  );
}
