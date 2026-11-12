import { Fraunces, Inter } from "next/font/google";

/*
 * Aucune police n'est préchargée (preload: false) : avec deux mises en page racine,
 * Next.js préchargerait les polices d'une langue sur les pages de l'autre.
 * Elles se chargent dès la lecture du CSS, avec une police de secours ajustée
 * (pas de saut de mise en page), et laissent la priorité à la photo principale.
 */

/** Titres en français, et logo « Bismilah » dans les deux langues */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
  preload: false,
});

/** Texte courant en français */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

// Les deux avis rédigés en arabe utilisent la police arabe du téléphone (pas de téléchargement)
export const fontsFr = `${fraunces.variable} ${inter.variable}`;
