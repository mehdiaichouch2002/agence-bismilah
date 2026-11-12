"use client";

import { useState } from "react";
import { QUARTIERS, TYPES, type Bien } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";
import { BUDGETS } from "@/lib/filters";
import { formatNumber, localePath } from "@/lib/utils";

/** Recherche rapide : un simple formulaire GET vers /biens (fonctionne même sans JavaScript) */
export function SearchBar({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [transaction, setTransaction] = useState<Bien["transaction"]>("vente");

  return (
    <form
      action={localePath(locale, "/biens")}
      method="get"
      role="search"
      aria-label={t.search.legend}
      className="grid grid-cols-2 gap-x-3 gap-y-4 rounded-2xl bg-surface p-4 shadow-lift sm:p-6 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end lg:gap-x-4"
    >
      <div>
        <label htmlFor="s-transaction" className="label">
          {t.search.transaction}
        </label>
        <select
          id="s-transaction"
          name="transaction"
          className="field"
          value={transaction}
          onChange={(e) => setTransaction(e.target.value as Bien["transaction"])}
        >
          <option value="vente">{t.search.acheter}</option>
          <option value="location">{t.search.louer}</option>
        </select>
      </div>
      <div>
        <label htmlFor="s-type" className="label">
          {t.search.type}
        </label>
        <select id="s-type" name="type" className="field" defaultValue="">
          <option value="">{t.search.allTypes}</option>
          {TYPES.map((v) => (
            <option key={v} value={v}>
              {t.types[v]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-quartier" className="label">
          {t.search.quartier}
        </label>
        <select id="s-quartier" name="quartier" className="field" defaultValue="">
          <option value="">{t.search.allQuartiers}</option>
          {QUARTIERS.map((q) => (
            <option key={q} value={q}>
              {t.quartiers[q] ?? q}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-budget" className="label">
          {t.search.budgetMax}
        </label>
        <select id="s-budget" name="budget" className="field" defaultValue="" key={transaction}>
          <option value="">{t.search.noMax}</option>
          {BUDGETS[transaction].map((b) => (
            <option key={b} value={b}>
              {formatNumber(b)} {t.common.currency}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary col-span-2 lg:col-span-1 lg:px-8">
        {t.search.submit}
      </button>
    </form>
  );
}
