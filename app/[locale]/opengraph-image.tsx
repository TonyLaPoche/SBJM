import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { artist } from "@/lib/site";

export const alt = `${artist.name} — Drummer / Composer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const role = locale === "fr" ? "Batteur / Compositeur" : "Drummer / Composer";
  const lessons =
    locale === "fr" ? "Cours de batterie en distanciel" : "Online drum lessons";

  const portrait = await readFile(
    join(process.cwd(), "public/images/portrait.jpg"),
  );
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f3efe6",
          color: "#161412",
        }}
      >
        <div
          style={{
            width: "48%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            S.J Delacombaz
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 64,
                lineHeight: 0.92,
                letterSpacing: -2,
                fontWeight: 500,
              }}
            >
              Sebastien J.
            </div>
            <div
              style={{
                fontSize: 64,
                lineHeight: 0.92,
                letterSpacing: -2,
                fontWeight: 500,
              }}
            >
              Delacombaz
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 22,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#4a453e",
              }}
            >
              {role}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#4a453e" }}>
            {lessons}
          </div>
        </div>
        <div
          style={{
            width: "52%",
            height: "100%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Portrait of Sebastien J. Delacombaz */}
          <img
            src={portraitSrc}
            alt={artist.name}
            width={624}
            height={630}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 18%",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
