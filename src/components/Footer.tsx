import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/config/site";
import { getDict, type Locale } from "@/i18n";
import { hoursLabel, localePath, telLink, waLink } from "@/lib/utils";
import { OpenStatus } from "./fx";
import { Logo } from "./Logo";
import { Zellige } from "./icons";
import { Reveal } from "./Motion";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const biens = localePath(locale, "/biens");
  const links = [
    { href: `${biens}?transaction=vente`, label: t.nav.vendre },
    { href: `${biens}?transaction=location`, label: t.nav.louer },
    { href: `${localePath(locale)}#confier`, label: t.nav.confier },
    { href: `${localePath(locale)}#contact`, label: t.nav.contact },
  ];
  const socials = [
    { href: site.instagram, label: "Instagram" },
    { href: site.facebook, label: "Facebook" },
  ].filter((s) => s.href);
  const link =
    "inline-flex min-h-11 items-center text-ivory/85 transition-colors hover:text-brass";

  return (
    <footer className="relative bg-emerald text-ivory">
      <div aria-hidden="true" className="arcade absolute inset-x-0 bottom-full" />
      <div className="relative overflow-hidden">
        <Zellige className="absolute inset-0 h-full w-full text-ivory opacity-[0.05]" />

        <div className="wrap relative grid gap-12 pt-16 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:pt-24">
          <div>
            <Logo locale={locale} light />
            <p className="mt-5 max-w-xs text-[0.95rem] text-ivory/80">{t.footer.tagline}</p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-5 text-[0.95rem]">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-brass underline-offset-4 hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label={t.footer.links}>
            <h2 className="font-sans text-[0.95rem] font-semibold text-brass">{t.footer.links}</h2>
            <ul className="mt-4 space-y-1 text-[0.95rem]">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-[0.95rem] font-semibold text-brass">{t.footer.hours}</h2>
            <p className="mt-4 py-1.5 text-[0.95rem] text-ivory/85">
              {t.common.everyDay(hoursLabel(locale))}
            </p>
            <p className="py-1.5 text-[0.95rem] text-ivory/85">
              <OpenStatus locale={locale} />
            </p>
            <p className="py-1.5 text-[0.95rem] text-ivory/85">{t.contact.place}</p>
          </div>

          <div>
            <h2 className="font-sans text-[0.95rem] font-semibold text-brass">{t.footer.contact}</h2>
            <ul className="mt-4 space-y-1 text-[0.95rem]">
              <li>
                <a href={telLink} className={link}>
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={waLink(t.wa.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {t.common.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Grand logo : les lettres montent une à une */}
        <Reveal className="relative overflow-hidden px-2" variant="up">
          <p
            aria-hidden="true"
            lang="fr"
            dir="ltr"
            className="rise text-center font-wordmark text-[clamp(4.5rem,23vw,21rem)] leading-[0.82] font-semibold tracking-[-0.04em] whitespace-nowrap text-ivory/[0.09] select-none"
          >
            {site.wordmark.split("").map((ch, i) => (
              <span key={i} style={{ "--i": i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </p>
        </Reveal>

        <div className="relative border-t border-ivory/15">
          <div className="wrap flex flex-col gap-2 py-6 text-[0.85rem] text-ivory/75 sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.rights(2026, site.name[locale])}</p>
            <p>
              {t.footer.credit}{" "}
              <a
                href={site.credit.url}
                target="_blank"
                rel="noopener"
                lang="fr"
                className="text-ivory underline decoration-brass underline-offset-4 hover:text-white"
              >
                {site.credit.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
