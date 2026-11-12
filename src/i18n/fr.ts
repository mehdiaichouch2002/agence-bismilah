import type { Bien } from "@/data/biens";

export const fr = {
  meta: {
    homeTitle: "Agence Immobilière Bismilah | Achat, vente et location à Meknès",
    homeDescription: (note: string, avis: number, horaires: string) =>
      `Agence immobilière à Meknès : achat, vente et location d'appartements, villas et terrains. Notée ${note}/5 sur Google (${avis} avis). Ouverte tous les jours, ${horaires}.`,
    biensTitle: "Biens à vendre et à louer à Meknès | Agence Immobilière Bismilah",
    biensDescription:
      "Appartements, villas, maisons et terrains à vendre ou à louer à Meknès. Filtrez par quartier, budget et nombre de chambres, puis contactez l'agence sur WhatsApp.",
    bienTitle: (titre: string) => `${titre} | Agence Immobilière Bismilah`,
    ogAlt: "Agence Immobilière Bismilah, Meknès",
  },

  common: {
    skip: "Aller au contenu",
    whatsapp: "WhatsApp",
    call: "Appeler",
    directions: "Itinéraire",
    perMonth: "/ mois",
    currency: "DH",
    demo: "Exemple",
    openDaily: (h: string) => `Ouvert tous les jours, ${h}`,
    everyDay: (h: string) => `Tous les jours, ${h}`,
    ratingLine: (note: string, avis: number) => `${note} sur Google · ${avis} avis`,
    ratingAria: (note: string) => `Note : ${note} sur 5`,
    newTab: "(nouvel onglet)",
  },

  nav: {
    home: "Accueil",
    vendre: "Biens à vendre",
    louer: "À louer",
    confier: "Vendre mon bien",
    contact: "Contact",
    main: "Navigation principale",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    langSwitch: "Langue du site",
    logoSub: "Immobilier · Meknès",
  },

  hero: {
    title: "Votre bien à Meknès, entre de bonnes mains.",
    titleLines: ["Votre bien à Meknès,", "entre de bonnes mains."],
    slideshow: "Biens à la une",
    showSlide: (i: number) => `Afficher le bien ${i}`,
    stamp: (avis: number) => `AVIS GOOGLE • ${avis} AVIS • MEKNÈS • `,
    sub: "Achat, vente et location à Meknès. Un conseiller qui vous répond, du premier appel jusqu'aux clés.",
    ctaBiens: "Voir les biens",
    ctaWa: "Parler sur WhatsApp",
    imageAlt: "Salon lumineux d'inspiration marocaine, avec canapés et claustra en bois",
  },

  open: {
    now: "Ouvert en ce moment",
    closes: (h: string) => `ferme à ${h}`,
    closed: "Fermé pour le moment",
    opens: (h: string) => `ouvre à ${h}`,
  },

  marquee: "Les quartiers de Meknès où nous travaillons",

  search: {
    legend: "Rechercher un bien",
    transaction: "Je souhaite",
    acheter: "Acheter",
    louer: "Louer",
    type: "Type de bien",
    allTypes: "Tous",
    quartier: "Quartier",
    allQuartiers: "Tous",
    budgetMax: "Budget max",
    budgetMin: "Budget min",
    noMax: "Sans max.",
    noMin: "Sans min.",
    submit: "Rechercher",
  },

  featured: {
    title: "Biens à la une",
    intro: "Une sélection de biens à vendre et à louer à Meknès.",
    all: "Voir tous les biens",
  },

  why: {
    title: "Pourquoi Bismilah",
    intro: "Ce que nos clients retiennent de nous, dans leurs propres mots.",
    imageAlt: "Patio marocain aux arcades blanches autour d'une fontaine",
    items: [
      {
        title: "Écoute et transparence",
        text: "Des réponses franches à chaque étape. C'est ce que nos clients soulignent le plus dans leurs avis.",
      },
      {
        title: "Accompagnement de A à Z",
        text: "De la première visite à la remise des clés, nous restons à vos côtés.",
      },
      {
        title: "Disponible 7j/7",
        text: "L'agence est ouverte tous les jours. Et sur WhatsApp, vous nous écrivez quand vous voulez.",
      },
      {
        title: "Connaissance des quartiers de Meknès",
        text: "Hamria, Ville Nouvelle, Marjane, Bassatine… Nous vous orientons vers le quartier qui convient à votre projet.",
      },
    ],
  },

  reviews: {
    title: "Ce que disent nos clients",
    outOf: "sur 5",
    count: (n: number) => `${n} avis Google`,
    badge: "Avis Google",
    all: "Voir tous les avis sur Google",
    prev: "Avis précédents",
    next: "Avis suivants",
    region: "Avis de clients",
    intro: "Six avis parmi ceux laissés sur notre fiche Google, recopiés mot pour mot.",
    fiveStars: (n: number, total: number) => `${n} avis sur ${total} nous donnent 5 étoiles`,
    pick: "Choisir un avis",
    by: (name: string) => `Avis de ${name}`,
    original: "Avis rédigé en arabe",
    pause: "Mettre le défilement en pause",
    play: "Reprendre le défilement",
  },

  sell: {
    title: "Vous vendez ou louez votre bien ?",
    text: "Décrivez-le en quelques mots. Nous vous répondons sur WhatsApp pour en parler et organiser une visite.",
    imageAlt: "Salon clair avec miroir en arche et grande baie vitrée",
    intent: "Je souhaite",
    vendre: "Vendre",
    louer: "Louer",
    type: "Type de bien",
    quartier: "Quartier",
    other: "Autre quartier",
    surface: "Surface (m²)",
    prix: "Prix souhaité (DH)",
    nom: "Votre nom",
    submit: "Envoyer sur WhatsApp",
    steps: [
      { title: "Vous décrivez votre bien", text: "Type, quartier, surface, prix : quatre informations suffisent." },
      { title: "Nous vous répondons sur WhatsApp", text: "Pour préciser les détails et convenir d'un moment." },
      { title: "Nous visitons le bien avec vous", text: "Et nous parlons ensemble de la suite." },
    ],
    note: "Rien n'est enregistré sur ce site : le bouton ouvre WhatsApp avec votre message, prêt à envoyer.",
  },

  contact: {
    title: "Passez nous voir ou écrivez-nous",
    advisor: (name: string) => `${name}, votre conseiller`,
    phone: "Téléphone",
    hours: "Horaires",
    place: "Meknès, Maroc",
    where: "Où nous trouver",
    mapTitle: "Carte : emplacement de l'agence à Meknès",
    write: "Écrire sur WhatsApp",
  },

  footer: {
    tagline: "Achat, vente et location à Meknès.",
    links: "Liens rapides",
    hours: "Horaires",
    contact: "Contact",
    allBiens: "Tous les biens",
    rights: (year: number, name: string) => `© ${year} ${name}`,
    credit: "Site réalisé par",
  },

  fab: {
    tip: "Une question ? Écrivez-nous",
    aria: "Écrire à l'agence sur WhatsApp",
  },

  listing: {
    title: "Biens à vendre et à louer à Meknès",
    intro: "Choisissez vos critères. Un bien vous intéresse ? Un message WhatsApp suffit.",
    filters: "Filtres",
    results: "Résultats",
    chambres: "Chambres min.",
    anyChambres: "Peu importe",
    sort: "Trier par",
    sortRecent: "Plus récents",
    sortAsc: "Prix croissant",
    sortDesc: "Prix décroissant",
    count: (n: number) => (n === 0 ? "Aucun bien" : n === 1 ? "1 bien" : `${n} biens`),
    reset: "Réinitialiser les filtres",
    emptyTitle: "Aucun bien ne correspond à ces critères",
    emptyText: "Vous ne trouvez pas ? Dites-nous ce que vous cherchez.",
    emptyCta: "Écrire sur WhatsApp",
    demoNotice:
      "Les biens portant la mention « Exemple » sont des exemples de présentation. Contactez-nous pour connaître les biens disponibles en ce moment.",
  },

  card: {
    details: "Détails",
    detailsAria: (titre: string) => `Détails : ${titre}`,
    waAria: (titre: string) => `Demander ce bien sur WhatsApp : ${titre}`,
    surface: "Surface",
    chambres: "Chambres",
    sdb: "Salles de bain",
  },

  bien: {
    back: "Tous les biens",
    ref: "Réf.",
    surface: "Surface",
    chambres: "Chambres",
    sdb: "Salles de bain",
    etage: "Étage",
    type: "Type",
    quartier: "Quartier",
    rdc: "Rez-de-chaussée",
    etageN: (n: number) => (n === 1 ? "1er" : `${n}e`),
    specs: "Caractéristiques",
    atouts: "Les atouts",
    description: "Description",
    area: "Le quartier",
    areaNote: "La carte montre le quartier, pas l'adresse exacte du bien.",
    mapTitle: (q: string) => `Carte du quartier ${q} à Meknès`,
    interested: "Ce bien vous intéresse ?",
    interestedText: "Écrivez-nous ou appelez : nous vous disons s'il est toujours disponible et organisons la visite.",
    similar: "Biens similaires",
    demoNote: "Ce bien est un exemple de présentation : il n'est pas réellement proposé à la vente ou à la location.",
    photoAlt: (titre: string, i: number) => `${titre} : photo ${i}`,
  },

  gallery: {
    region: "Photos du bien",
    prev: "Photo précédente",
    next: "Photo suivante",
    zoom: (i: number) => `Agrandir la photo ${i}`,
    show: (i: number) => `Afficher la photo ${i}`,
    close: "Fermer",
    lightbox: "Photos en grand format",
  },

  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas ou n'existe plus.",
    home: "Retour à l'accueil",
  },

  types: {
    appartement: "Appartement",
    villa: "Villa",
    maison: "Maison",
    terrain: "Terrain",
    "local-commercial": "Local commercial",
    bureau: "Bureau",
  } satisfies Record<Bien["type"], string>,

  statuts: {
    disponible: "Disponible",
    réservé: "Réservé",
    vendu: "Vendu",
    loué: "Loué",
  } satisfies Record<Bien["statut"], string>,

  transactions: { vente: "À vendre", location: "À louer" } satisfies Record<
    Bien["transaction"],
    string
  >,

  /** Noms des quartiers (en français, identiques aux données) */
  quartiers: {} as Record<string, string>,

  wa: {
    general: "Bonjour, je vous contacte depuis votre site. J'ai une question.",
    search: "Bonjour, je cherche un bien à Meknès. Voici ce que je recherche : ",
    bien: (ref: string, titre: string, prix: string) =>
      `Bonjour, je suis intéressé(e) par le bien ${ref} — ${titre} (${prix}). Est-il toujours disponible ?`,
    sell: (d: {
      intent: string;
      type: string;
      quartier: string;
      surface: string;
      prix: string;
      nom: string;
    }) =>
      [
        `Bonjour, je souhaite confier mon bien à l'Agence Bismilah (${d.intent}).`,
        `Type : ${d.type}`,
        `Quartier : ${d.quartier}`,
        `Surface : ${d.surface} m²`,
        `Prix souhaité : ${d.prix} DH`,
        `Nom : ${d.nom}`,
      ].join("\n"),
    sellIntent: { vente: "vente", location: "location" },
  },
};

export type Dict = typeof fr;
