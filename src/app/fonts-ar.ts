import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { fraunces } from "./fonts-fr";

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-plex-arabic",
  preload: false,
});

// Fraunces (même fichier que la version française) sert au logo « Bismilah »
export const fontsAr = `${plexArabic.variable} ${fraunces.variable}`;
