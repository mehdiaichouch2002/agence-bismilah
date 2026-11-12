/**
 * Toutes les informations de l'agence sont ici.
 * Modifier une valeur dans ce fichier la change partout sur le site.
 */
export const site = {
  name: {
    fr: "Agence Immobilière Bismilah",
    ar: "وكالة بسم الله العقارية",
  },
  wordmark: "Bismilah",
  city: { fr: "Meknès", ar: "مكناس" },

  /** Téléphone tel qu'il s'affiche sur le site */
  phoneDisplay: "06 63 65 86 72",
  /** Même numéro au format international, sans « + » ni espaces (WhatsApp et appels) */
  phoneIntl: "212663658672",

  /** Horaires, tous les jours. Format 24 h « HH:MM » */
  hours: { opens: "11:00", closes: "19:00" },

  /** Note Google affichée sur le site. À mettre à jour à la main de temps en temps. */
  rating: { value: 4.8, count: 48, fiveStars: 46 },

  /** Position sur la carte (aucune adresse postale n'est affichée) */
  geo: { lat: 33.881005, lng: -5.5380202 },

  /**
   * Prénom du conseiller affiché dans le bloc Contact.
   * Laisser les deux valeurs vides ("") pour ne rien afficher.
   */
  advisorName: { fr: "Khalid", ar: "خالد" },

  /** Réseaux sociaux : rien ne s'affiche tant que la valeur est vide */
  instagram: "",
  facebook: "",

  /** Lien « Voir tous les avis sur Google » */
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=AGENCE+IMMOBILIERE+BISMILAH+MEKNES",

  /** Références des 3 biens mis en avant sur la page d'accueil */
  featuredRefs: ["BSM-007", "BSM-001", "BSM-005"],

  /**
   * Adresse publique du site (pour le référencement et l'aperçu WhatsApp).
   * Sur Vercel, elle est détectée automatiquement. Avec un nom de domaine,
   * définir la variable NEXT_PUBLIC_SITE_URL (ex. https://www.agencebismilah.ma).
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  credit: { name: "Mehdi Aichouch", url: "https://www.mehdiaichouch.com" },
} as const;

export type Site = typeof site;
