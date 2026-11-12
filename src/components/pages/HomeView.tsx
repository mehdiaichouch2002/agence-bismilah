import type { CSSProperties } from "react";
import type { Locale } from "@/i18n";
import { JsonLd, agencyJsonLd } from "@/lib/seo";
import { Hero } from "../home/Hero";
import { Reviews } from "../home/Reviews";
import { SearchBar } from "../home/SearchBar";
import { Contact, Featured, QuartiersMarquee, Sell, Why } from "../home/Sections";

export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={agencyJsonLd(locale)} />
      <Hero locale={locale} />
      <div
        className="load-in wrap relative z-10 -mt-20 lg:-mt-24"
        style={{ "--d": "0.9s" } as CSSProperties}
      >
        <SearchBar locale={locale} />
      </div>
      <QuartiersMarquee locale={locale} />
      <Featured locale={locale} />
      <Why locale={locale} />
      <Reviews locale={locale} />
      <Sell locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
