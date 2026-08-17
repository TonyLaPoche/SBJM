import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
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
    title: t("contactTitle"),
    description: t("contactDescription"),
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <article className="page-shell py-12 sm:py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{t("label")}</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,9vw,4.5rem)]">{t("title")}</h1>
      </Reveal>

      <div className="mt-12 grid gap-12 sm:mt-16 sm:gap-16 md:grid-cols-2">
        <Reveal>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-ink-soft">
                {t("email")}
              </p>
              <a
                href={`mailto:${artist.email}`}
                className="break-words-safe mt-2 block text-lg transition-colors hover:text-bronze sm:text-xl"
              >
                {artist.email}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-ink-soft">
                {t("phone")}
              </p>
              <a
                href={`tel:${artist.phoneE164}`}
                className="mt-2 block text-lg transition-colors hover:text-bronze sm:text-xl"
              >
                {artist.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${artist.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm underline-offset-4 transition-colors hover:text-bronze hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <h2 className="mb-6 text-sm tracking-[0.16em] uppercase">
              {t("formTitle")}
            </h2>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
