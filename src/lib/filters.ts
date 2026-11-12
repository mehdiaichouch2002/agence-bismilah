import { TYPES, QUARTIERS, type Bien } from "@/data/biens";

/** Paliers de budget proposés dans les listes déroulantes */
export const BUDGETS: Record<Bien["transaction"], number[]> = {
  vente: [500000, 750000, 1000000, 1500000, 2500000, 4000000, 5000000],
  location: [3000, 4000, 5000, 6000, 8000, 10000],
};

export type Tri = "recents" | "prix-asc" | "prix-desc";

export type Filters = {
  transaction: Bien["transaction"];
  type: Bien["type"] | "";
  quartier: string;
  budgetMin: number;
  budgetMax: number;
  chambres: number;
  tri: Tri;
};

const num = (v: string | null) => {
  const n = Number(v);
  return v && Number.isFinite(n) && n > 0 ? n : 0;
};

/** Lit les filtres depuis l'adresse de la page (?transaction=…&type=…) */
export function parseFilters(sp: URLSearchParams): Filters {
  const type = sp.get("type") ?? "";
  const quartier = sp.get("quartier") ?? "";
  const tri = sp.get("tri");
  return {
    transaction: sp.get("transaction") === "location" ? "location" : "vente",
    type: (TYPES as string[]).includes(type) ? (type as Bien["type"]) : "",
    quartier: (QUARTIERS as readonly string[]).includes(quartier) ? quartier : "",
    budgetMin: num(sp.get("budgetMin")),
    budgetMax: num(sp.get("budget")),
    chambres: num(sp.get("chambres")),
    tri: tri === "prix-asc" || tri === "prix-desc" ? tri : "recents",
  };
}

export function applyFilters(list: Bien[], f: Filters): Bien[] {
  const out = list.filter(
    (b) =>
      b.transaction === f.transaction &&
      (!f.type || b.type === f.type) &&
      (!f.quartier || b.quartier === f.quartier) &&
      (!f.budgetMin || b.prix >= f.budgetMin) &&
      (!f.budgetMax || b.prix <= f.budgetMax) &&
      (!f.chambres || (b.chambres ?? 0) >= f.chambres),
  );
  // « Plus récents » = ordre du fichier src/data/biens.ts (le premier est le plus récent)
  if (f.tri === "prix-asc") out.sort((a, b) => a.prix - b.prix);
  if (f.tri === "prix-desc") out.sort((a, b) => b.prix - a.prix);
  return out;
}
