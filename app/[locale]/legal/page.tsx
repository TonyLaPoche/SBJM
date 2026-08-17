import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDoc, LegalSection } from "@/components/LegalDoc";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { artist, SITE_URL } from "@/lib/site";
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
    title: t("legalTitle"),
    description: t("legalDescription"),
    path: "/legal",
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <Reveal>
      <LegalDoc label={t("label")} title={t("title")}>
        <LegalSection title={t("publisherTitle")}>
          <p>{t("publisherText", { name: artist.name })}</p>
          <p>
            {artist.email}
            <br />
            {artist.phoneDisplay}
            <br />
            {SITE_URL}
          </p>
        </LegalSection>
        <LegalSection title={t("hostingTitle")}>
          <p>{t("hostingText")}</p>
        </LegalSection>
        <LegalSection title={t("ipTitle")}>
          <p>{t("ipText", { name: artist.name })}</p>
        </LegalSection>
        <LegalSection title={t("contactTitle")}>
          <p>{t("contactText")}</p>
        </LegalSection>
      </LegalDoc>
    </Reveal>
  );
}
