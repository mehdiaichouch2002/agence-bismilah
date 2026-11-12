import { site } from "@/config/site";
import { getDict, type Locale } from "@/i18n";
import { Monogram } from "./icons";

export function Logo({ locale, light = false }: { locale: Locale; light?: boolean }) {
  const t = getDict(locale);
  return (
    <span className={`flex items-center gap-3 transition-colors duration-300 ${light ? "text-ivory" : "text-emerald"}`}>
      <Monogram className="h-9 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          lang="fr"
          className="font-wordmark text-[1.45rem] leading-none font-semibold tracking-[-0.01em]"
        >
          {site.wordmark}
        </span>
        <span
          className={`mt-1.5 text-[0.6rem] leading-none font-medium ${
            locale === "ar" ? "text-[0.7rem]" : "tracking-[0.2em] uppercase"
          } ${light ? "text-ivory/75" : "text-muted"}`}
        >
          {t.nav.logoSub}
        </span>
      </span>
    </span>
  );
}
