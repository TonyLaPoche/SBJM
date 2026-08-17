import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ConsentProvider } from "@/components/ConsentProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { PostHogProvider } from "@/components/PostHogProvider";
import { artist, SITE_URL } from "@/lib/site";
import { personJsonLd } from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${artist.name} | ${t("homeTitle")}`,
      template: `%s | ${artist.name}`,
    },
    description: t("homeDescription"),
    applicationName: artist.shortName,
    authors: [{ name: artist.name, url: SITE_URL }],
    creator: artist.name,
    publisher: artist.name,
    keywords: [
      "Sebastien Delacombaz",
      "drummer",
      "jazz",
      "FI:LDS",
      "online drum lessons",
      "Amsterdam",
      "batteur",
      "cours de batterie",
    ],
    alternates: {
      canonical: locale === "fr" ? `${SITE_URL}/fr` : SITE_URL,
      languages: {
        en: SITE_URL,
        fr: `${SITE_URL}/fr`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      type: "website",
      siteName: artist.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: [
        {
          url: "/images/og-portrait.jpg",
          width: 1200,
          height: 630,
          alt: `${artist.name} — ${locale === "fr" ? "Batteur / Compositeur" : "Drummer / Composer"}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/og-portrait.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("common");

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            <PostHogProvider>
              <a
                href="#content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
              >
                {t("skip")}
              </a>
              <Header />
              <main id="content">{children}</main>
              <Footer />
              <CookieBanner />
              <JsonLd data={personJsonLd()} />
            </PostHogProvider>
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
