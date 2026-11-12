import { Suspense, type CSSProperties } from "react";
import { biens } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";
import { hasDemo } from "@/lib/utils";
import { BiensExplorer, BiensGrid } from "../biens/BiensExplorer";
import { Spotlight } from "../fx";
import { Zellige } from "../icons";

export function BiensView({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  // Le titre monte en deux lignes : on coupe au milieu de la phrase
  const words = t.listing.title.split(" ");
  const cut = Math.ceil(words.length / 2);
  const lines = [words.slice(0, cut).join(" "), words.slice(cut).join(" ")];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-emerald text-ivory">
        <Spotlight className="relative">
          <Zellige className="absolute inset-0 -z-10 h-full w-full text-ivory opacity-[0.045]" />
          <Zellige className="spotlight absolute inset-0 -z-10 h-full w-full text-brass opacity-60" />
          <div className="wrap pt-[calc(var(--header-h)+2.5rem)] pb-36 lg:pt-[calc(var(--header-h)+4rem)] lg:pb-44">
            <h1
              aria-label={t.listing.title}
              className={`max-w-4xl text-[clamp(2.2rem,4.2vw+1rem,4rem)] font-medium ${
                locale === "ar" ? "leading-[1.35] font-semibold" : "leading-[1.05] tracking-[-0.025em]"
              }`}
            >
              {lines.map((line, i) => (
                <span key={line} className="line" aria-hidden="true">
                  <span style={{ "--i": i } as CSSProperties}>{line}</span>
                </span>
              ))}
            </h1>
            <p
              className="load-in mt-6 max-w-2xl text-[1.075rem] text-ivory/85"
              style={{ "--d": "0.45s" } as CSSProperties}
            >
              {t.listing.intro}
            </p>
          </div>
        </Spotlight>
      </section>

      <div className="wrap relative z-10 -mt-24 pb-20 lg:-mt-28 lg:pb-28">
        <h2 className="sr-only">{t.listing.results}</h2>
        {/* Avant le chargement des filtres, la page affiche déjà tous les biens */}
        <Suspense fallback={<BiensGrid list={biens} locale={locale} />}>
          <BiensExplorer locale={locale} />
        </Suspense>
        {hasDemo(biens) && (
          <p className="mt-10 max-w-2xl rounded-xl border-s-2 border-brass bg-sand px-4 py-3 text-[0.9rem] text-ink">
            {t.listing.demoNotice}
          </p>
        )}
      </div>
    </>
  );
}
