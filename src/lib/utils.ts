import { site } from "@/config/site";
import type { Bien } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";

const NBSP = " ";

/** 1250000 -> "1 250 000" (espaces insécables : le nombre reste entier, y compris en arabe) */
export const formatNumber = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);

/** "1 250 000 DH", "4 500 DH / mois", "1 250 000 درهم", "4 500 درهم / شهريا" */
export function formatPrice(prix: number, transaction: Bien["transaction"], locale: Locale) {
  const t = getDict(locale).common;
  const base = `${formatNumber(prix)}${NBSP}${t.currency}`;
  return transaction === "location" ? `${base} ${t.perMonth}` : base;
}

/** Préfixe /ar pour la version arabe */
export function localePath(locale: Locale, path = "/") {
  if (locale === "fr") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

export const waLink = (message: string) =>
  `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:+${site.phoneIntl}`;

export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;

export const agencyMapEmbed = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;

export const quartierMapEmbed = (quartier: string, locale: Locale) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(`${quartier}, Meknès, Maroc`)}&z=14&hl=${locale}&output=embed`;

/** "11:00" -> "11h" ; "11:30" -> "11h30" */
const frHour = (h: string) => {
  const [hh, mm] = h.split(":");
  return `${Number(hh)}h${mm === "00" ? "" : mm}`;
};

/** Une heure seule : "19h" en français, "19:00" en arabe */
export const hourLabel = (h: string, locale: Locale) => (locale === "ar" ? h : frHour(h));

/** "11h–19h" en français, "من 11:00 إلى 19:00" en arabe */
export function hoursLabel(locale: Locale) {
  const { opens, closes } = site.hours;
  return locale === "ar"
    ? `من ${opens} إلى ${closes}`
    : `${frHour(opens)}–${frHour(closes)}`;
}

/** 4.8 -> "4,8" */
export const ratingLabel = () => String(site.rating.value).replace(".", ",");

export function quartierLabel(quartier: string, locale: Locale) {
  return getDict(locale).quartiers[quartier] ?? quartier;
}

export const hasDemo = (list: Bien[]) => list.some((b) => b.demo);

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");
