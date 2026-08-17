import type { Metadata } from "next";
import { artist, SITE_URL } from "./site";
import type { Locale } from "@/i18n/routing";

function localizedPath(locale: Locale, path: string) {
  const normalized = path === "/" ? "" : path;
  return locale === "en" ? `${SITE_URL}${normalized || "/"}` : `${SITE_URL}/fr${normalized}`;
}

export function buildMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = localizedPath(locale, path);
  const enUrl = localizedPath("en", path);
  const frUrl = localizedPath("fr", path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        fr: frUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: artist.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    alternateName: artist.shortName,
    jobTitle: artist.role,
    email: artist.email,
    telephone: artist.phoneE164,
    url: SITE_URL,
    image: `${SITE_URL}/images/portrait.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: artist.city,
      addressCountry: "NL",
    },
    knowsLanguage: ["en", "fr"],
    sameAs: [artist.youtube],
  };
}

export function musicGroupJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "FI:LDS",
    founder: artist.name,
    genre: "Jazz",
    url: `${SITE_URL}/music`,
  };
}

export function courseJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name:
      locale === "fr"
        ? "Cours de batterie en distanciel"
        : "Online drum lessons",
    description:
      locale === "fr"
        ? "Cours particuliers de batterie à distance, tous niveaux et tous styles, avec Sebastien J. Delacombaz."
        : "Private remote drum lessons for all levels and styles with Sebastien J. Delacombaz.",
    provider: {
      "@type": "Person",
      name: artist.name,
    },
    inLanguage: ["en", "fr"],
    isAccessibleForFree: false,
  };
}
