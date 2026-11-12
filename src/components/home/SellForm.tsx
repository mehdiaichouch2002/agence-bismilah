"use client";

import { useState, type FormEvent } from "react";
import { QUARTIERS, TYPES } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";
import { formatNumber, waLink } from "@/lib/utils";
import { WhatsAppIcon } from "../icons";

/** Mini formulaire « confier mon bien » : ouvre WhatsApp avec un message déjà rédigé */
export function SellForm({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [intent, setIntent] = useState<"vente" | "location">("vente");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const prix = Number(get("prix"));
    const type = get("type") as (typeof TYPES)[number];
    const quartier = get("quartier");

    const message = t.wa.sell({
      intent: t.wa.sellIntent[intent],
      type: t.types[type] ?? "—",
      quartier: quartier ? (t.quartiers[quartier] ?? quartier) : "—",
      surface: get("surface") || "—",
      prix: prix > 0 ? formatNumber(prix) : "—",
      nom: get("nom") || "—",
    });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-3 gap-y-4">
      <fieldset className="col-span-2">
        <legend className="label">{t.sell.intent}</legend>
        <div className="grid grid-cols-2 gap-1 rounded-full border border-line bg-surface p-1">
          {(["vente", "location"] as const).map((v) => (
            <label
              key={v}
              className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-center text-[0.9rem] font-semibold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brass ${
                intent === v ? "bg-emerald text-ivory" : "text-ink hover:text-emerald"
              }`}
            >
              <input
                type="radio"
                name="intent"
                value={v}
                checked={intent === v}
                onChange={() => setIntent(v)}
                className="sr-only"
              />
              {v === "vente" ? t.sell.vendre : t.sell.louer}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="c-type" className="label">
          {t.sell.type}
        </label>
        <select id="c-type" name="type" className="field" defaultValue="appartement">
          {TYPES.map((v) => (
            <option key={v} value={v}>
              {t.types[v]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="c-quartier" className="label">
          {t.sell.quartier}
        </label>
        <select id="c-quartier" name="quartier" className="field" defaultValue={QUARTIERS[0]}>
          {QUARTIERS.map((q) => (
            <option key={q} value={q}>
              {t.quartiers[q] ?? q}
            </option>
          ))}
          <option value={t.sell.other}>{t.sell.other}</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-surface" className="label">
          {t.sell.surface}
        </label>
        <input
          id="c-surface"
          name="surface"
          type="number"
          inputMode="numeric"
          min={1}
          className="field"
          dir="ltr"
        />
      </div>
      <div>
        <label htmlFor="c-prix" className="label">
          {t.sell.prix}
        </label>
        <input
          id="c-prix"
          name="prix"
          type="number"
          inputMode="numeric"
          min={1}
          className="field"
          dir="ltr"
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="c-nom" className="label">
          {t.sell.nom}
        </label>
        <input id="c-nom" name="nom" type="text" autoComplete="name" required className="field" />
      </div>

      <button type="submit" className="btn btn-wa col-span-2 mt-1 min-h-13">
        <WhatsAppIcon className="h-5 w-5" />
        {t.sell.submit}
      </button>
      <p className="col-span-2 text-[0.85rem] leading-relaxed text-muted">{t.sell.note}</p>
    </form>
  );
}
