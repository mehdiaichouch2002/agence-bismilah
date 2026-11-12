import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/** Aperçu affiché quand le lien du site est partagé (WhatsApp, Facebook…) */
export const alt = "Agence Immobilière Bismilah, Meknès";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const star = "M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6 4.9 17.3l1-5.7-4.1-4 5.7-.8L10 1.6Z";

const zellige = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 72 72"><g fill="none" stroke="#FAF7F2" stroke-opacity="0.07" stroke-width="1"><path d="M36 8 64 36 36 64 8 36Z"/><path d="M16 16h40v40H16Z"/><path d="M36 0v8M36 64v8M0 36h8M64 36h8"/><path d="M0 0l16 16M72 0 56 16M0 72l16-16M72 72 56 56"/><path d="M36 24 48 36 36 48 24 36Z"/></g></svg>`,
)}")`;

export default async function OpengraphImage() {
  const fraunces = await readFile(join(process.cwd(), "assets/Fraunces-SemiBold.woff"));
  const note = String(site.rating.value).replace(".", ",");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F3D3A",
          backgroundImage: zellige,
          backgroundSize: "96px 96px",
          color: "#FAF7F2",
          fontFamily: "Fraunces",
        }}
      >
        <svg width="92" height="104" viewBox="0 0 32 36" fill="none">
          <path
            d="M4 34V15C4 8.4 9.4 3 16 3s12 5.4 12 12v19M1.5 34h29"
            stroke="#FAF7F2"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="16" cy="14.5" r="3.6" stroke="#B98B4E" strokeWidth="1.8" />
          <path
            d="M16 18.1V28M16 23.4h3.4M16 27.6h2.4"
            stroke="#B98B4E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        <div style={{ fontSize: 148, lineHeight: 1, marginTop: 28, letterSpacing: -3 }}>
          {site.wordmark}
        </div>
        <div style={{ fontSize: 34, letterSpacing: 12, marginTop: 22, color: "#EFE7DA" }}>
          IMMOBILIER · MEKNÈS
        </div>

        <div style={{ width: 120, height: 2, backgroundColor: "#B98B4E", marginTop: 44 }} />

        <div style={{ display: "flex", alignItems: "center", marginTop: 40, fontSize: 40 }}>
          <span style={{ color: "#D9B37A", marginRight: 20 }}>{note}</span>
          <div style={{ display: "flex" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="40" height="40" viewBox="0 0 20 20" style={{ marginRight: 4 }}>
                <path d={star} fill="#B98B4E" />
              </svg>
            ))}
          </div>
          <span style={{ marginLeft: 20 }}>{`sur Google · ${site.rating.count} avis`}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }],
    },
  );
}
