"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import type { CSSProperties } from "react";
import { QUARTIERS, TYPES, biens, type Bien } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";
import { BUDGETS, applyFilters, parseFilters } from "@/lib/filters";
import { formatNumber, waLink } from "@/lib/utils";
import { BienCard } from "../BienCard";
import { WhatsAppIcon } from "../icons";

/** Grille de biens (aussi utilisée comme rendu initial côté serveur) */
export function BiensGrid({ list, locale }: { list: Bien[]; locale: Locale }) {
  return (
    <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((b, i) => (
        <li key={b.ref} className="card-in" style={{ "--i": i } as CSSProperties}>
          <BienCard bien={b} locale={locale} priority={i === 0} />
        </li>
      ))}
    </ul>
  );
}

/** Filtres côté navigateur, synchronisés avec l'adresse de la page */
export function BiensExplorer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname() ?? "/biens";
  const sp = useSearchParams();
  const f = parseFilters(new URLSearchParams(sp?.toString()));
  const list = applyFilters(biens, f);

  const update = (patch: Record<string, string | number>) => {
    const next = new URLSearchParams(sp?.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === "" || v === 0) next.delete(k);
      else next.set(k, String(v));
    }
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const reset = () =>
    window.history.replaceState(null, "", `${pathname}?transaction=${f.transaction}`);

  const hasFilters = Boolean(f.type || f.quartier || f.budgetMin || f.budgetMax || f.chambres);
  const budgets = BUDGETS[f.transaction];
  const chip = (active: boolean) =>
    `flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border px-4 text-[0.9rem] font-medium transition-colors ${
      active
        ? "border-emerald bg-emerald text-ivory"
        : "border-line bg-surface text-ink hover:border-brass"
    }`;

  return (
    <div>
      <section
        aria-label={t.listing.filters}
        className="load-in rounded-2xl bg-surface p-4 shadow-lift sm:p-6"
      >
        {/* Acheter / Louer */}
        <div
          role="group"
          aria-label={t.search.transaction}
          className="grid max-w-sm grid-cols-2 gap-1 rounded-full border border-line bg-ivory p-1"
        >
          {(["vente", "location"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={f.transaction === v}
              onClick={() => update({ transaction: v, budget: "", budgetMin: "" })}
              className={`min-h-11 cursor-pointer rounded-full px-4 text-[0.95rem] font-semibold transition-colors ${
                f.transaction === v ? "bg-emerald text-ivory" : "text-ink hover:text-emerald"
              }`}
            >
              {v === "vente" ? t.search.acheter : t.search.louer}
            </button>
          ))}
        </div>

        {/* Types */}
        <div
          role="group"
          aria-label={t.search.type}
          className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          <button type="button" aria-pressed={!f.type} onClick={() => update({ type: "" })} className={chip(!f.type)}>
            {t.search.allTypes}
          </button>
          {TYPES.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={f.type === v}
              onClick={() => update({ type: f.type === v ? "" : v })}
              className={chip(f.type === v)}
            >
              {t.types[v]}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 lg:grid-cols-5">
          <div>
            <label htmlFor="f-quartier" className="label">
              {t.search.quartier}
            </label>
            <select
              id="f-quartier"
              className="field"
              value={f.quartier}
              onChange={(e) => update({ quartier: e.target.value })}
            >
              <option value="">{t.search.allQuartiers}</option>
              {QUARTIERS.map((q) => (
                <option key={q} value={q}>
                  {t.quartiers[q] ?? q}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-chambres" className="label">
              {t.listing.chambres}
            </label>
            <select
              id="f-chambres"
              className="field"
              value={f.chambres || ""}
              onChange={(e) => update({ chambres: e.target.value })}
            >
              <option value="">{t.listing.anyChambres}</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-min" className="label">
              {t.search.budgetMin}
            </label>
            <select
              id="f-min"
              className="field"
              value={f.budgetMin || ""}
              onChange={(e) => update({ budgetMin: e.target.value })}
            >
              <option value="">{t.search.noMin}</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {formatNumber(b)} {t.common.currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-max" className="label">
              {t.search.budgetMax}
            </label>
            <select
              id="f-max"
              className="field"
              value={f.budgetMax || ""}
              onChange={(e) => update({ budget: e.target.value })}
            >
              <option value="">{t.search.noMax}</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {formatNumber(b)} {t.common.currency}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <label htmlFor="f-tri" className="label">
              {t.listing.sort}
            </label>
            <select
              id="f-tri"
              className="field"
              value={f.tri}
              onChange={(e) => update({ tri: e.target.value === "recents" ? "" : e.target.value })}
            >
              <option value="recents">{t.listing.sortRecent}</option>
              <option value="prix-asc">{t.listing.sortAsc}</option>
              <option value="prix-desc">{t.listing.sortDesc}</option>
            </select>
          </div>
        </div>
      </section>

      <div className="mt-8 mb-6 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="font-display text-[1.25rem] text-emerald">
          {t.listing.count(list.length)}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.9rem] font-semibold text-emerald underline decoration-brass underline-offset-[6px] hover:text-brass-deep"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {t.listing.reset}
          </button>
        )}
      </div>

      {list.length > 0 ? (
        // La clé change à chaque filtre : les cartes se reposent une à une
        <BiensGrid key={sp?.toString()} list={list} locale={locale} />
      ) : (
        <div className="rounded-2xl border border-dashed border-brass/60 bg-surface px-6 py-14 text-center">
          <h2 className="text-[1.5rem] leading-snug font-medium text-emerald">
            {t.listing.emptyTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">{t.listing.emptyText}</p>
          <a
            href={waLink(t.wa.search)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa mt-7"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.listing.emptyCta}
          </a>
        </div>
      )}
    </div>
  );
}
