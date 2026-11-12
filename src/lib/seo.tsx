import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Bien } from "@/data/biens";
import { getDict, type Locale } from "@/i18n";
import { localePath } from "@/lib/utils";

/** Métadonnées communes : canonical, hreflang, Open Graph (aperçu WhatsApp) */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const t = getDict(locale);
  const url = localePath(locale, path);
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: localePath("fr", path),
        ar: localePath("ar", path),
        "x-default": localePath("fr", path),
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name[locale],
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      alternateLocale: locale === "ar" ? "fr_MA" : "ar_MA",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    robots: noindex ? { index: false, follow: true } : undefined,
    formatDetection: { telephone: false },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Fiche « agence immobilière » pour Google */
export function agencyJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#agence`,
    name: site.name[locale],
    alternateName: site.name[locale === "ar" ? "fr" : "ar"],
    url: `${site.url}${localePath(locale)}`,
    image: `${site.url}/opengraph-image`,
    telephone: `+${site.phoneIntl}`,
    address: { "@type": "PostalAddress", addressLocality: "Meknès", addressCountry: "MA" },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: `Mo-Su ${site.hours.opens}-${site.hours.closes}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    areaServed: { "@type": "City", name: "Meknès" },
  };
}

const schemaType: Record<Bien["type"], string> = {
  appartement: "Apartment",
  villa: "House",
  maison: "House",
  terrain: "Residence",
  "local-commercial": "Residence",
  bureau: "Residence",
};

/** Annonce d'un bien (uniquement pour les vrais biens, jamais pour les exemples) */
export function bienJsonLd(bien: Bien, locale: Locale) {
  const url = `${site.url}${localePath(locale, `/biens/${bien.slug}`)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    url,
    sku: bien.ref,
    price: bien.prix,
    priceCurrency: "MAD",
    businessFunction:
      bien.transaction === "location"
        ? "http://purl.org/goodrelations/v1#LeaseOut"
        : "http://purl.org/goodrelations/v1#Sell",
    availability:
      bien.statut === "disponible" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    seller: { "@id": `${site.url}/#agence` },
    itemOffered: {
      "@type": schemaType[bien.type],
      name: bien.titre[locale],
      description: bien.description[locale],
      image: bien.images.map((src) => (src.startsWith("/") ? `${site.url}${src}` : src)),
      floorSize: { "@type": "QuantitativeValue", value: bien.surface, unitCode: "MTK" },
      ...(bien.chambres != null && { numberOfBedrooms: bien.chambres }),
      ...(bien.sallesDeBain != null && { numberOfBathroomsTotal: bien.sallesDeBain }),
      address: {
        "@type": "PostalAddress",
        addressLocality: `${bien.quartier}, Meknès`,
        addressCountry: "MA",
      },
    },
  };
}
