import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône de l'écran d'accueil (iPhone) : le monogramme arche + clé */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F3D3A",
        }}
      >
        <svg width="104" height="117" viewBox="0 0 32 36" fill="none">
          <path
            d="M4 34V15C4 8.4 9.4 3 16 3s12 5.4 12 12v19M1.5 34h29"
            stroke="#FAF7F2"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="14.5" r="3.6" stroke="#B98B4E" strokeWidth="2" />
          <path
            d="M16 18.1V28M16 23.4h3.4M16 27.6h2.4"
            stroke="#B98B4E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
