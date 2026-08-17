"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useConsent } from "./ConsentProvider";

export function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const t = useTranslations("cookies");
  const { preferences, savePreferences, openSettings } = useConsent();

  if (!preferences.media) {
    return (
      <div className="relative aspect-video overflow-hidden bg-ink text-paper">
        <Image
          src="/images/fields-bimhuis.jpg"
          alt={title}
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 sm:p-8">
          <p className="max-w-xl text-sm leading-relaxed text-paper/90 sm:text-base">
            {t("youtubeBlocked")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                savePreferences({
                  analytics: preferences.analytics,
                  media: true,
                })
              }
              className="border border-paper bg-paper px-4 py-3 text-xs tracking-[0.16em] uppercase text-ink"
            >
              {t("loadYoutube")}
            </button>
            <button
              type="button"
              onClick={openSettings}
              className="border border-paper/60 px-4 py-3 text-xs tracking-[0.16em] uppercase text-paper"
            >
              {t("customize")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden bg-ink">
      <iframe
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
