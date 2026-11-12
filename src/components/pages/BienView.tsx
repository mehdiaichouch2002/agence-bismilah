import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { biens, type Bien } from "@/data/biens";
import { getDict, isRtl, type Locale } from "@/i18n";
import { JsonLd, bienJsonLd } from "@/lib/seo";
import {
  formatPrice,
  localePath,
  quartierLabel,
  quartierMapEmbed,
  telLink,
  waLink,
} from "@/lib/utils";
import { BienCard, DemoTag, StatutBadge } from "../BienCard";
import { Gallery } from "../biens/Gallery";
import { WhatsAppIcon } from "../icons";

export function BienView({ bien, locale }: { bien: Bien; locale: Locale }) {
  const t = getDict(locale);
  const titre = bien.titre[locale];
  const prix = formatPrice(bien.prix, bien.transaction, locale);
  const quartier = quartierLabel(bien.quartier, locale);
  const wa = waLink(t.wa.bien(bien.ref, titre, prix));
  const Back = isRtl(locale) ? ArrowRight : ArrowLeft;
  const advisor = site.advisorName[locale];

  const specs: { label: string; value: string }[] = [
    { label: t.bien.type, value: t.types[bien.type] },
    { label: t.bien.surface, value: `${bien.surface} m²` },
    ...(bien.chambres != null ? [{ label: t.bien.chambres, value: String(bien.chambres) }] : []),
    ...(bien.sallesDeBain != null ? [{ label: t.bien.sdb, value: String(bien.sallesDeBain) }] : []),
    ...(bien.etage != null
      ? [{ label: t.bien.etage, value: bien.etage === 0 ? t.bien.rdc : t.bien.etageN(bien.etage) }]
      : []),
    { label: t.bien.quartier, value: quartier },
  ];

  const similaires = biens
    .filter((b) => b.transaction === bien.transaction && b.ref !== bien.ref)
    .slice(0, 3);

  return (
    <>
      {!bien.demo && <JsonLd data={bienJsonLd(bien, locale)} />}

      <div className="wrap pt-[calc(var(--header-h)+1.5rem)] pb-16 lg:pt-[calc(var(--header-h)+2rem)] lg:pb-24">
        <Link
          href={`${localePath(locale, "/biens")}?transaction=${bien.transaction}`}
          className="inline-flex min-h-11 items-center gap-2 text-[0.9rem] font-semibold text-emerald hover:text-brass-deep"
        >
          <Back className="h-4 w-4" aria-hidden="true" />
          {t.bien.back}
        </Link>

        <div className="mt-3">
          <Gallery images={bien.images} titre={titre} locale={locale} viewName={`photo-${bien.ref}`} />
        </div>

        <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatutBadge bien={bien} locale={locale} />
              <span className="rounded-full border border-line px-3 py-1 text-[0.75rem] leading-tight font-medium text-ink">
                {t.transactions[bien.transaction]}
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-[0.75rem] leading-tight font-medium text-ink">
                {t.bien.ref} <bdi>{bien.ref}</bdi>
              </span>
              {bien.demo && <DemoTag locale={locale} />}
            </div>

            <h1
              className={`mt-5 text-[1.9rem] font-medium text-emerald sm:text-[2.5rem] ${
                locale === "ar" ? "leading-[1.4] font-semibold" : "leading-[1.1] tracking-[-0.015em]"
              }`}
            >
              {titre}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-[1.05rem] text-muted">
              <MapPin className="h-5 w-5 text-brass" strokeWidth={1.5} aria-hidden="true" />
              {quartier}
              {locale === "ar" ? "، " : ", "}
              {site.city[locale]}
            </p>
            <p className="mt-5 font-display text-[2rem] leading-none font-semibold text-brass-deep lg:hidden">
              <bdi>{prix}</bdi>
            </p>

            {bien.demo && (
              <p className="mt-6 rounded-xl border-s-2 border-brass bg-sand px-4 py-3 text-[0.9rem] text-ink">
                {t.bien.demoNote}
              </p>
            )}

            <section aria-labelledby="specs" className="mt-10">
              <h2 id="specs" className="sr-only">
                {t.bien.specs}
              </h2>
              <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.label} className="border-b border-line py-4 pe-4">
                    <dt className="text-[0.85rem] text-muted">{s.label}</dt>
                    <dd className="mt-0.5 text-[1.1rem] font-medium text-ink">
                      <bdi>{s.value}</bdi>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="description" className="mt-10">
              <h2 id="description" className="text-[1.5rem] font-medium text-emerald">
                {t.bien.description}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-[1.8] text-ink">
                {bien.description[locale]}
              </p>
            </section>

            <section aria-labelledby="atouts" className="mt-10">
              <h2 id="atouts" className="text-[1.5rem] font-medium text-emerald">
                {t.bien.atouts}
              </h2>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {bien.atouts[locale].map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[1.02rem] text-ink">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald text-ivory">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="quartier" className="mt-10">
              <h2 id="quartier" className="text-[1.5rem] font-medium text-emerald">
                {t.bien.area} : {quartier}
              </h2>
              <div className="mt-4 h-72 overflow-hidden rounded-2xl bg-sand">
                <iframe
                  src={quartierMapEmbed(bien.quartier, locale)}
                  title={t.bien.mapTitle(quartier)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
              <p className="mt-3 text-[0.875rem] text-muted">{t.bien.areaNote}</p>
            </section>
          </div>

          {/* Encart contact (colonne fixe sur ordinateur) */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="rounded-2xl bg-surface p-6 shadow-soft sm:p-7">
              <p className="hidden font-display text-[2rem] leading-none font-semibold text-brass-deep lg:block">
                <bdi>{prix}</bdi>
              </p>
              <span className="mt-5 hidden h-px w-12 bg-brass lg:block" />
              <h2 className="text-[1.3rem] leading-snug font-medium text-emerald lg:mt-5">
                {t.bien.interested}
              </h2>
              <p className="mt-2 text-[0.95rem] text-muted">{t.bien.interestedText}</p>
              <div className="mt-5 flex flex-col gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.contact.write}
                </a>
                <a href={telLink} className="btn btn-outline">
                  <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </div>
              {advisor && (
                <p className="mt-5 border-t border-line pt-4 text-[0.9rem] text-muted">
                  {t.contact.advisor(advisor)}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {similaires.length > 0 && (
        <section className="bg-sand py-16 lg:py-24" aria-labelledby="similaires">
          <div className="wrap">
            <h2 id="similaires" className="h2">
              {t.bien.similar}
            </h2>
            <span className="rule" />
            <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {similaires.map((b) => (
                <li key={b.ref}>
                  <BienCard bien={b} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Barre fixe sur mobile */}
      <div
        data-sticky-bar
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-3 border-t border-line bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      >
        <a href={telLink} className="btn btn-primary">
          <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
          {t.common.call}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
          <WhatsAppIcon className="h-5 w-5" />
          {t.common.whatsapp}
        </a>
      </div>
    </>
  );
}
