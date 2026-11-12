import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/config/site";
import { biens } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";
import { formatPrice, localePath, ratingLabel, waLink } from "@/lib/utils";
import { OpenStatus, Spotlight } from "../fx";
import { Stars, WhatsAppIcon, Zellige } from "../icons";
import { HeroSlideshow, type Slide } from "./HeroSlideshow";

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

/** Tampon rond de la note Google ; le texte tourne autour (en français) */
function RatingStamp({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const note = ratingLabel();
  const ring = t.hero.stamp(site.rating.count);
  return (
    <div
      role="img"
      aria-label={`${t.common.ratingAria(note)} · ${t.reviews.count(site.rating.count)}`}
      className="load-in absolute -start-3 top-6 z-10 flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full bg-ivory text-emerald shadow-lift sm:-start-8 sm:h-32 sm:w-32"
      style={delay("1.3s")}
    >
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        {ring ? (
          <>
            <defs>
              <path id="stamp-ring" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
            </defs>
            <text fontSize="10" fontWeight="600" letterSpacing="1.5" fill="currentColor">
              <textPath href="#stamp-ring" textLength="278">
                {ring}
              </textPath>
            </text>
          </>
        ) : (
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="#B98B4E"
            strokeWidth="1.5"
            strokeDasharray="2 7"
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="flex flex-col items-center">
        <span
          dir="ltr"
          className="font-wordmark text-[1.7rem] leading-none font-semibold text-brass-deep sm:text-[2.1rem]"
        >
          {note}
        </span>
        <Stars value={site.rating.value} className="mt-1 text-[0.6rem] text-brass sm:text-[0.72rem]" />
      </div>
    </div>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const refs: readonly string[] = site.featuredRefs;
  const picked = refs.map((r) => biens.find((b) => b.ref === r)).filter((b) => b != null);
  const slides: Slide[] = (picked.length ? picked : biens).slice(0, 3).map((b) => ({
    ref: b.ref,
    href: localePath(locale, `/biens/${b.slug}`),
    titre: b.titre[locale],
    prix: formatPrice(b.prix, b.transaction, locale),
    image: b.images[0],
    alt: t.bien.photoAlt(b.titre[locale], 1),
    demo: b.demo,
  }));

  return (
    <section className="relative isolate overflow-hidden bg-emerald text-ivory">
      <Spotlight className="relative">
        {/* Zellige : une trame très discrète, et la même en laiton sous le curseur */}
        <Zellige className="absolute inset-0 -z-10 h-full w-full text-ivory opacity-[0.045]" />
        <Zellige className="spotlight absolute inset-0 -z-10 h-full w-full text-brass opacity-60" />

        <div className="wrap grid items-center gap-x-16 gap-y-14 pt-[calc(var(--header-h)+2.5rem)] pb-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:pt-[calc(var(--header-h)+4rem)] lg:pb-44">
          <div>
            <h1
              aria-label={t.hero.title}
              className={`text-[clamp(2.5rem,3.6vw+1.2rem,4.5rem)] font-medium ${
                locale === "ar" ? "leading-[1.35] font-semibold" : "leading-[1.02] tracking-[-0.03em]"
              }`}
            >
              {t.hero.titleLines.map((line, i) => (
                <span key={line} className="line" aria-hidden="true">
                  <span style={{ "--i": i } as CSSProperties}>{line}</span>
                </span>
              ))}
            </h1>

            <p
              className="load-in mt-7 max-w-[31rem] text-[1.075rem] leading-relaxed text-ivory/85 md:text-[1.15rem]"
              style={delay("0.45s")}
            >
              {t.hero.sub}
            </p>

            <div className="load-in mt-9 flex flex-col gap-3 sm:flex-row" style={delay("0.6s")}>
              <Link href={localePath(locale, "/biens")} className="btn btn-light min-h-13 px-8">
                {t.hero.ctaBiens}
              </Link>
              <a
                href={waLink(t.wa.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa min-h-13 px-8"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.hero.ctaWa}
              </a>
            </div>

            <ul
              className="load-in mt-9 flex flex-col gap-x-8 gap-y-3 text-[0.95rem] text-ivory/90 sm:flex-row sm:items-center"
              style={delay("0.75s")}
            >
              <li className="flex items-center gap-2.5">
                <Stars value={site.rating.value} className="text-[1.05rem] text-brass" />
                <span>{t.common.ratingLine(ratingLabel(), site.rating.count)}</span>
              </li>
              <li>
                <OpenStatus locale={locale} />
              </li>
            </ul>
          </div>

          <div className="relative mx-auto w-[88%] max-w-[26rem] lg:mx-0 lg:w-full lg:max-w-none">
            <RatingStamp locale={locale} />
            <HeroSlideshow slides={slides} locale={locale} />
          </div>
        </div>
      </Spotlight>
    </section>
  );
}
