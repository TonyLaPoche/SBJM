import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDoc, LegalSection } from "@/components/LegalDoc";
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
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    path: "/privacy",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <Reveal>
      <LegalDoc label={t("label")} title={t("title")}>
        <LegalSection title={t("controllerTitle")}>
          <p>{t("controllerText", { name: artist.name, email: artist.email })}</p>
        </LegalSection>
        <LegalSection title={t("dataTitle")}>
          <p>{t("dataText")}</p>
        </LegalSection>
        <LegalSection title={t("purposeTitle")}>
          <p>{t("purposeText")}</p>
        </LegalSection>
        <LegalSection title={t("basisTitle")}>
          <p>{t("basisText")}</p>
        </LegalSection>
        <LegalSection title={t("retentionTitle")}>
          <p>{t("retentionText")}</p>
        </LegalSection>
        <LegalSection title={t("recipientsTitle")}>
          <p>{t("recipientsText")}</p>
        </LegalSection>
        <LegalSection title={t("rightsTitle")}>
          <p>{t("rightsText", { email: artist.email })}</p>
        </LegalSection>
        <LegalSection title={t("cookiesTitle")}>
          <p>{t("cookiesText")}</p>
        </LegalSection>
      </LegalDoc>
    </Reveal>
  );
}
