import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/music",
  "/lessons",
  "/contact",
  "/legal",
  "/privacy",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((path) => {
    const en = `${SITE_URL}${path || "/"}`;
    const fr = `${SITE_URL}/fr${path}`;

    return [
      {
        url: en,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en,
            fr,
          },
        },
      },
      {
        url: fr,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 0.9 : 0.7,
        alternates: {
          languages: {
            en,
            fr,
          },
        },
      },
    ];
  });
}
