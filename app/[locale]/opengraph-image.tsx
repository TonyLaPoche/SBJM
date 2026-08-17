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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f3efe6",
          color: "#161412",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
          <span>S.J Delacombaz</span>
          <span>{role}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.9, letterSpacing: -3 }}>
            Sebastien J.
          </div>
          <div style={{ fontSize: 92, lineHeight: 0.9, letterSpacing: -3 }}>
            Delacombaz
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>{lessons}</span>
          <span>Amsterdam</span>
        </div>
      </div>
    ),
    size,
  );
}
