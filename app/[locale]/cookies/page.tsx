import { getTranslations, setRequestLocale } from "next-intl/server";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { LegalDoc, LegalSection } from "@/components/LegalDoc";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
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
    title: t("cookiesTitle"),
    description: t("cookiesDescription"),
    path: "/cookies",
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cookiesPage");

  return (
    <Reveal>
      <LegalDoc label={t("label")} title={t("title")}>
        <LegalSection title={t("introTitle")}>
          <p>{t("introText")}</p>
        </LegalSection>
        <LegalSection title={t("necessaryTitle")}>
          <p>{t("necessaryText")}</p>
        </LegalSection>
        <LegalSection title={t("analyticsTitle")}>
          <p>{t("analyticsText")}</p>
        </LegalSection>
        <LegalSection title={t("mediaTitle")}>
          <p>{t("mediaText")}</p>
        </LegalSection>
        <LegalSection title={t("manageTitle")}>
          <p>{t("manageText")}</p>
          <div className="pt-2">
            <CookieSettingsButton />
          </div>
        </LegalSection>
      </LegalDoc>
    </Reveal>
  );
}
