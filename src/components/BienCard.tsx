import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import type { Bien } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";
import { formatPrice, localePath, quartierLabel, waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

const statutStyle: Record<Bien["statut"], string> = {
  disponible: "bg-emerald text-ivory",
  réservé: "bg-brass-deep text-white",
  vendu: "bg-ink text-ivory",
  loué: "bg-ink text-ivory",
};

export function StatutBadge({ bien, locale }: { bien: Bien; locale: Locale }) {
  const t = getDict(locale);
  return (
    <span
      className={`rounded-full px-3 py-1 text-[0.75rem] leading-tight font-semibold ${statutStyle[bien.statut]}`}
    >
      {t.statuts[bien.statut]}
    </span>
  );
}

export function DemoTag({ locale }: { locale: Locale }) {
  return (
    <span className="rounded-full border border-line bg-ivory/95 px-3 py-1 text-[0.75rem] leading-tight font-medium text-ink">
      {getDict(locale).common.demo}
    </span>
  );
}

export function BienCard({
  bien,
  locale,
  priority = false,
}: {
  bien: Bien;
  locale: Locale;
  priority?: boolean;
}) {
  const t = getDict(locale);
  const titre = bien.titre[locale];
  const prix = formatPrice(bien.prix, bien.transaction, locale);
  const href = localePath(locale, `/biens/${bien.slug}`);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-soft transition-[box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      {/* Au survol, le cadre de la photo prend la forme d'une arche */}
      <div className="relative m-2.5 mb-0 aspect-[4/3] overflow-hidden rounded-[0.9rem] bg-sand transition-[border-radius] duration-700 ease-out group-hover:rounded-t-[12rem]">
        <ViewTransition name={`photo-${bien.ref}`} share="morph" default="none">
        <Image
          src={bien.images[0]}
          alt={t.bien.photoAlt(titre, 1)}
          fill
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          quality={85}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        </ViewTransition>
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2 transition-opacity duration-300 group-hover:opacity-0">
          <StatutBadge bien={bien} locale={locale} />
          {bien.demo && <DemoTag locale={locale} />}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-display text-[1.4rem] leading-tight font-semibold text-brass-deep">
          <bdi>{prix}</bdi>
        </p>
        <h3 className="mt-2 text-[1.1rem] leading-snug font-medium text-ink">{titre}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-[0.9rem] text-muted">
          <MapPin className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.75} aria-hidden="true" />
          {quartierLabel(bien.quartier, locale)}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-[0.9rem] text-ink">
          <li className="flex items-center gap-1.5">
            <Maximize2 className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">{t.card.surface} : </span>
            <bdi>{bien.surface} m²</bdi>
          </li>
          {bien.chambres != null && (
            <li className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only">{t.card.chambres} : </span>
              {bien.chambres}
            </li>
          )}
          {bien.sallesDeBain != null && (
            <li className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only">{t.card.sdb} : </span>
              {bien.sallesDeBain}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center gap-3 pt-5">
          {/* Le lien « Détails » couvre toute la carte */}
          <Link
            href={href}
            aria-label={t.card.detailsAria(titre)}
            className="btn btn-outline min-h-11 flex-1 after:absolute after:inset-0 after:content-['']"
          >
            {t.card.details}
          </Link>
          <a
            href={waLink(t.wa.bien(bien.ref, titre, prix))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.card.waAria(titre)}
            className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-emerald-deep transition-colors hover:bg-[#1fbd5a]"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
