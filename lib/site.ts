function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "");
  if (production) return `https://${production}`;

  const preview = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (preview) return `https://${preview}`;

  return "https://www.sebastiendelacombaz.com";
}

export const SITE_URL = resolveSiteUrl();

export const artist = {
  name: "Sebastien J. Delacombaz",
  shortName: "S.J Delacombaz",
  firstName: "Sebastien J.",
  lastName: "Delacombaz",
  role: "Drummer / Composer",
  email: "sebastien.delacombaz.music@gmail.com",
  phoneDisplay: "+33 6 10 39 19 93",
  phoneE164: "+33610391993",
  whatsapp: "33610391993",
  youtube: "https://www.youtube.com/@krakendrummer",
  youtubeVideoId: "JdxQHzRVpAQ",
  city: "Amsterdam",
  country: "Netherlands",
  languages: ["English", "French"],
} as const;

export const tracks = [
  {
    id: "shift",
    title: "Shift",
    ensemble: "FI:LDS",
    src: "/audio/shift.m4a",
    duration: 437,
  },
  {
    id: "ghost-light",
    title: "Ghost Light",
    ensemble: "Primal Quartet",
    src: "/audio/ghost-light.m4a",
    duration: 294,
  },
  {
    id: "across",
    title: "Across",
    ensemble: "FI:LDS",
    src: "/audio/across.m4a",
    duration: 335,
  },
  {
    id: "untitled-1",
    title: "Untitled 1",
    ensemble: "The Analog Piano Trio",
    src: "/audio/untitled-1.m4a",
    duration: 321,
  },
] as const;

export const lessonTypes = [
  {
    id: "discovery",
    duration: 45,
    price: 35,
  },
  {
    id: "standard",
    duration: 60,
    price: 48,
  },
  {
    id: "extended",
    duration: 90,
    price: 68,
  },
] as const;

export const bookingConfig = {
  timezone: "Europe/Amsterdam",
  daysAhead: 42,
  closedWeekdays: [0] as number[],
  slots: ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
} as const;
