/**
 * LISTE DES BIENS
 * ----------------
 * Pour ajouter un bien : copier un bloc { ... } complet, le coller EN HAUT de la
 * liste (le premier bien de la liste est considéré comme le plus récent), puis
 * changer les valeurs. Voir le README pour un exemple pas à pas.
 */

export type Bien = {
  ref: string; // "BSM-001"
  slug: string; // adresse de la page : /biens/<slug> (minuscules, tirets, sans accents)
  transaction: "vente" | "location";
  type: "appartement" | "villa" | "maison" | "terrain" | "local-commercial" | "bureau";
  titre: { fr: string; ar: string };
  quartier: string; // un des quartiers de la liste QUARTIERS ci-dessous
  prix: number; // en DH ; pour une location = loyer par mois
  surface: number; // m²
  chambres?: number;
  sallesDeBain?: number;
  etage?: number; // 0 = rez-de-chaussée
  atouts: { fr: string[]; ar: string[] };
  description: { fr: string; ar: string };
  images: string[]; // 4 à 6 photos ; la première sert de photo principale
  statut: "disponible" | "réservé" | "vendu" | "loué";
  demo: boolean; // true = bien d'exemple (étiquette « Exemple » affichée)
};

/** Quartiers de Meknès proposés dans les filtres */
export const QUARTIERS = [
  "Hamria",
  "Ville Nouvelle",
  "Marjane",
  "Riad Ismailia",
  "Bassatine",
  "Plaisance",
  "Sidi Baba",
  "Ouislane",
  "Zitoune",
  "Toulal",
] as const;

export const TYPES: Bien["type"][] = [
  "appartement",
  "villa",
  "maison",
  "terrain",
  "local-commercial",
  "bureau",
];

/** Raccourci pour les photos de démonstration hébergées sur Unsplash (haute définition) */
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=85`;

export const biens: Bien[] = [
  {
    ref: "BSM-014",
    slug: "maison-avec-patio-zitoune",
    transaction: "vente",
    type: "maison",
    titre: {
      fr: "Maison traditionnelle avec patio à Zitoune",
      ar: "منزل تقليدي بفناء داخلي في الزيتون",
    },
    quartier: "Zitoune",
    prix: 1150000,
    surface: 210,
    chambres: 4,
    sallesDeBain: 2,
    etage: 0,
    atouts: {
      fr: ["Titré", "Patio avec fontaine", "Zellige d'origine", "Terrasse sur le toit"],
      ar: ["محفظ", "فناء بنافورة", "زليج أصلي", "سطح"],
    },
    description: {
      fr: "Maison de 210 m² organisée autour d'un patio avec fontaine. Quatre chambres, deux salons marocains et une terrasse sur le toit. Zellige et boiseries d'origine conservés.",
      ar: "منزل من 210 م² حول فناء بنافورة. أربع غرف، صالونان مغربيان وسطح. الزليج والخشب الأصليان محفوظان.",
    },
    images: [
      photo("1470409512492-0e9216fc7213"),
      photo("1539020140153-e479b8c22e70"),
      photo("1764259316836-82affe70e0c6"),
      photo("1782939355626-8df602c595fb"),
    ],
    statut: "vendu",
    demo: true,
  },
  {
    ref: "BSM-013",
    slug: "appartement-2-chambres-a-louer-sidi-baba",
    transaction: "location",
    type: "appartement",
    titre: {
      fr: "Appartement 2 chambres avec terrasse à Sidi Baba",
      ar: "شقة بغرفتين وسطح في سيدي بابا",
    },
    quartier: "Sidi Baba",
    prix: 3500,
    surface: 82,
    chambres: 2,
    sallesDeBain: 1,
    etage: 2,
    atouts: {
      fr: ["Terrasse", "Cuisine équipée", "Proche écoles", "Lumineux"],
      ar: ["سطح", "مطبخ مجهز", "قرب المدارس", "مضيئة"],
    },
    description: {
      fr: "Appartement de 82 m² au deuxième étage, avec un séjour ouvert sur la cuisine et une terrasse. Deux chambres et une salle de bain. Écoles et commerces à proximité.",
      ar: "شقة من 82 م² في الطابق الثاني، بصالون مفتوح على المطبخ وسطح. غرفتان وحمام. المدارس والمحلات على مقربة.",
    },
    images: [
      photo("1649083048381-520a5b3d91ff"),
      photo("1682184805271-11671b7ecf4c"),
      photo("1628745423029-59d3491c0b44"),
      photo("1613904819171-375a5e09a08c"),
    ],
    statut: "loué",
    demo: true,
  },
  {
    ref: "BSM-012",
    slug: "villa-avec-piscine-a-louer-toulal",
    transaction: "location",
    type: "villa",
    titre: {
      fr: "Villa contemporaine avec piscine à Toulal",
      ar: "فيلا عصرية بمسبح في تولال",
    },
    quartier: "Toulal",
    prix: 9500,
    surface: 280,
    chambres: 4,
    sallesDeBain: 3,
    atouts: {
      fr: ["Piscine", "Jardin", "Garage 2 voitures", "Climatisation"],
      ar: ["مسبح", "حديقة", "مرآب لسيارتين", "مكيف هواء"],
    },
    description: {
      fr: "Villa de 280 m² sur un terrain arboré, avec piscine et jardin. Grand séjour, salle à manger, quatre chambres et trois salles de bain. Garage pour deux voitures.",
      ar: "فيلا من 280 م² على أرض مشجرة، بمسبح وحديقة. صالون واسع، غرفة طعام، أربع غرف وثلاثة حمامات. مرآب لسيارتين.",
    },
    images: [
      photo("1706808849780-7a04fbac83ef"),
      photo("1781794902242-f8578908d640"),
      photo("1635108197695-05184e426907"),
      photo("1596178067639-5c6e68aea6dc"),
      photo("1781344334947-60c704bafd51"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-011",
    slug: "bureau-a-louer-ville-nouvelle",
    transaction: "location",
    type: "bureau",
    titre: {
      fr: "Plateau de bureaux au centre de la Ville Nouvelle",
      ar: "مكتب في وسط المدينة الجديدة",
    },
    quartier: "Ville Nouvelle",
    prix: 6500,
    surface: 110,
    sallesDeBain: 1,
    etage: 3,
    atouts: {
      fr: ["Ascenseur", "Open space et 2 bureaux fermés", "Fibre optique", "Parking"],
      ar: ["مصعد", "فضاء مفتوح ومكتبان مغلقان", "ألياف بصرية", "موقف سيارات"],
    },
    description: {
      fr: "Plateau de 110 m² au troisième étage d'un immeuble de bureaux : un open space, deux bureaux fermés et une salle de réunion. Adapté à un cabinet ou à une petite équipe.",
      ar: "مكتب من 110 م² في الطابق الثالث من عمارة مكاتب: فضاء مفتوح، مكتبان مغلقان وقاعة اجتماعات. مناسب لمكتب مهني أو لفريق صغير.",
    },
    images: [
      photo("1497366811353-6870744d04b2"),
      photo("1604328698692-f76ea9498e76"),
      photo("1758448500688-3ababa93fd67"),
      photo("1497366754035-f200968a6e72"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-010",
    slug: "local-commercial-a-louer-hamria",
    transaction: "location",
    type: "local-commercial",
    titre: {
      fr: "Local commercial sur avenue passante à Hamria",
      ar: "محل تجاري على شارع رئيسي في حمرية",
    },
    quartier: "Hamria",
    prix: 7000,
    surface: 95,
    sallesDeBain: 1,
    etage: 0,
    atouts: {
      fr: ["Rez-de-chaussée", "Grande vitrine", "Plateau libre", "Fort passage"],
      ar: ["طابق أرضي", "واجهة زجاجية كبيرة", "فضاء مفتوح", "حركة مرور كبيرة"],
    },
    description: {
      fr: "Local de 95 m² en rez-de-chaussée, avec une grande vitrine sur une avenue commerçante. Plateau libre à aménager, sanitaires. Convient à une boutique, une agence ou un showroom.",
      ar: "محل من 95 م² في الطابق الأرضي، بواجهة زجاجية كبيرة على شارع تجاري. فضاء مفتوح قابل للتهيئة، مع مرافق صحية. مناسب لمتجر، وكالة أو صالة عرض.",
    },
    images: [
      photo("1774021801445-1311b0b90aaa"),
      photo("1542081403278-ba5973c25c7a"),
      photo("1783819503950-acff77f911fa"),
      photo("1600994562666-98dbd6d44e44"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-009",
    slug: "appartement-economique-riad-ismailia",
    transaction: "vente",
    type: "appartement",
    titre: {
      fr: "Appartement 2 chambres à Riad Ismailia",
      ar: "شقة بغرفتين في رياض الإسماعيلية",
    },
    quartier: "Riad Ismailia",
    prix: 480000,
    surface: 68,
    chambres: 2,
    sallesDeBain: 1,
    etage: 1,
    atouts: {
      fr: ["Titré", "Balcon", "Proche transports", "Faibles charges"],
      ar: ["محفظة", "شرفة", "قرب وسائل النقل", "تكاليف منخفضة"],
    },
    description: {
      fr: "Appartement de 68 m² au premier étage : séjour avec coin bureau, cuisine ouverte, deux chambres et un balcon. Un premier achat ou un investissement locatif à budget maîtrisé.",
      ar: "شقة من 68 م² في الطابق الأول: صالون بركن للمكتب، مطبخ مفتوح، غرفتان وشرفة. مناسبة لأول شراء أو للاستثمار بميزانية معقولة.",
    },
    images: [
      photo("1630699294897-723e02620662"),
      photo("1649083048337-4aeb6dda80bb"),
      photo("1638799869566-b17fa794c4de"),
      photo("1613900412286-13d398a17665"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-008",
    slug: "maison-familiale-bassatine",
    transaction: "vente",
    type: "maison",
    titre: {
      fr: "Maison familiale de 4 chambres à Bassatine",
      ar: "منزل عائلي بأربع غرف في البساتين",
    },
    quartier: "Bassatine",
    prix: 1450000,
    surface: 185,
    chambres: 4,
    sallesDeBain: 2,
    atouts: {
      fr: ["Titré", "Deux niveaux", "Jardinet", "Garage", "Salle à manger"],
      ar: ["محفظ", "طابقان", "حديقة صغيرة", "مرآب", "غرفة طعام"],
    },
    description: {
      fr: "Maison de 185 m² sur deux niveaux, dans une rue calme. Séjour, salle à manger, cuisine séparée, quatre chambres et deux salles de bain. Petit jardin à l'entrée et garage.",
      ar: "منزل من 185 م² على طابقين، في زنقة هادئة. صالون، غرفة طعام، مطبخ مستقل، أربع غرف وحمامان. حديقة صغيرة عند المدخل ومرآب.",
    },
    images: [
      photo("1685514823717-7e1ff6ee0563"),
      photo("1780427670049-43aa7921e3f0"),
      photo("1593136596203-7212b076f4d2"),
      photo("1560185128-e173042f79dd"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-007",
    slug: "villa-contemporaine-marjane",
    transaction: "vente",
    type: "villa",
    titre: {
      fr: "Villa contemporaine avec piscine à Marjane",
      ar: "فيلا عصرية بمسبح في مرجان",
    },
    quartier: "Marjane",
    prix: 4200000,
    surface: 410,
    chambres: 5,
    sallesDeBain: 4,
    atouts: {
      fr: ["Titré", "Piscine", "Jardin", "Suite parentale", "Garage", "Domotique"],
      ar: ["محفظة", "مسبح", "حديقة", "جناح رئيسي", "مرآب", "نظام منزل ذكي"],
    },
    description: {
      fr: "Villa d'architecte de 410 m² : volumes ouverts, grandes baies vitrées sur la piscine, cinq chambres dont une suite parentale. Finitions soignées, garage et jardin paysager.",
      ar: "فيلا بتصميم معماري من 410 م²: فضاءات مفتوحة، واجهات زجاجية كبيرة تطل على المسبح، خمس غرف منها جناح رئيسي. تشطيبات متقنة، مرآب وحديقة منسقة.",
    },
    images: [
      photo("1686164748261-33e13eef70b6"),
      photo("1758448511322-8bfc73daf606"),
      photo("1668026694348-b73c5eb5e299"),
      photo("1560448205-4d9b3e6bb6db"),
      photo("1733426107854-ee00a25d72a7"),
      photo("1613490493576-7fde63acd811"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-006",
    slug: "appartement-recent-a-louer-bassatine",
    transaction: "location",
    type: "appartement",
    titre: {
      fr: "Appartement récent et clair à Bassatine",
      ar: "شقة حديثة ومضيئة في البساتين",
    },
    quartier: "Bassatine",
    prix: 3800,
    surface: 78,
    chambres: 2,
    sallesDeBain: 1,
    etage: 1,
    atouts: {
      fr: ["Cuisine équipée", "Double vitrage", "Résidence calme", "Place de parking"],
      ar: ["مطبخ مجهز", "زجاج مزدوج", "إقامة هادئة", "موقف سيارة"],
    },
    description: {
      fr: "Au premier étage d'une petite résidence calme, cet appartement de 78 m² offre un séjour clair, deux chambres et une cuisine équipée. Idéal pour un couple ou une petite famille.",
      ar: "في الطابق الأول من إقامة صغيرة وهادئة، شقة من 78 م² بصالون مضيء، غرفتين ومطبخ مجهز. مناسبة لزوجين أو لأسرة صغيرة.",
    },
    images: [
      photo("1759691555285-74005fcf3ddf"),
      photo("1595526051245-4506e0005bd0"),
      photo("1592506119503-c0b18879bd5a"),
      photo("1771372012124-f7696f374a5a"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-005",
    slug: "appartement-meuble-a-louer-ville-nouvelle",
    transaction: "location",
    type: "appartement",
    titre: {
      fr: "Appartement meublé au cœur de la Ville Nouvelle",
      ar: "شقة مفروشة في قلب المدينة الجديدة",
    },
    quartier: "Ville Nouvelle",
    prix: 5500,
    surface: 95,
    chambres: 2,
    sallesDeBain: 1,
    etage: 4,
    atouts: {
      fr: ["Meublé", "Ascenseur", "Climatisation", "Proche commerces"],
      ar: ["مفروشة", "مصعد", "مكيف هواء", "قرب المحلات التجارية"],
    },
    description: {
      fr: "Appartement entièrement meublé de 95 m², au quatrième étage avec ascenseur. Séjour chaleureux, deux chambres, cuisine ouverte. Commerces et cafés à quelques minutes à pied.",
      ar: "شقة مفروشة بالكامل من 95 م²، في الطابق الرابع مع مصعد. صالون دافئ، غرفتان ومطبخ مفتوح. المحلات والمقاهي على بعد دقائق مشيا.",
    },
    images: [
      photo("1665249934445-1de680641f50"),
      photo("1772563214602-3c6434766700"),
      photo("1649083048428-3d8ed23a3ce0"),
      photo("1770987685744-630d3c2494bd"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-004",
    slug: "terrain-titre-ouislane",
    transaction: "vente",
    type: "terrain",
    titre: {
      fr: "Terrain titré de 240 m² à Ouislane",
      ar: "أرض محفظة من 240 م² في ويسلان",
    },
    quartier: "Ouislane",
    prix: 780000,
    surface: 240,
    atouts: {
      fr: ["Titré", "Deux façades", "Accès goudronné", "Eau et électricité à proximité"],
      ar: ["محفظة", "واجهتان", "طريق معبدة", "الماء والكهرباء على مقربة"],
    },
    description: {
      fr: "Terrain plat de 240 m² avec deux façades, dans un secteur résidentiel d'Ouislane. Titre foncier individuel. Une bonne base pour un projet de maison familiale.",
      ar: "أرض مستوية من 240 م² بواجهتين، في منطقة سكنية بويسلان. رسم عقاري مستقل. أساس جيد لمشروع منزل عائلي.",
    },
    images: [
      photo("1494187570835-b188e7f0f26e"),
      photo("1760285878002-f471bbbee583"),
      photo("1495107334309-fcf20504a5ab"),
      photo("1506744476757-8407c4647c7f"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-003",
    slug: "villa-avec-jardin-plaisance",
    transaction: "vente",
    type: "villa",
    titre: {
      fr: "Villa avec jardin et piscine à Plaisance",
      ar: "فيلا بحديقة ومسبح في بلزانس",
    },
    quartier: "Plaisance",
    prix: 3400000,
    surface: 320,
    chambres: 5,
    sallesDeBain: 3,
    atouts: {
      fr: ["Titré", "Jardin", "Piscine", "Garage", "Terrasse"],
      ar: ["محفظة", "حديقة", "مسبح", "مرآب", "سطح"],
    },
    description: {
      fr: "Villa de 320 m² dans un quartier résidentiel recherché. Grand salon ouvert sur le jardin, cinq chambres, trois salles de bain, piscine et garage. Une maison faite pour recevoir la famille.",
      ar: "فيلا من 320 م² في حي سكني مطلوب. صالون واسع يطل على الحديقة، خمس غرف، ثلاثة حمامات، مسبح ومرآب. بيت يتسع لاستقبال العائلة.",
    },
    images: [
      photo("1600596542815-ffad4c1539a9"),
      photo("1618221195710-dd6b41faaea6"),
      photo("1671197244266-73129c97c096"),
      photo("1598928636135-d146006ff4be"),
      photo("1507652313519-d4e9174996dd"),
      photo("1721989518229-3e84837fc398"),
    ],
    statut: "disponible",
    demo: true,
  },
  {
    ref: "BSM-002",
    slug: "appartement-2-chambres-marjane",
    transaction: "vente",
    type: "appartement",
    titre: {
      fr: "Appartement 2 chambres en résidence à Marjane",
      ar: "شقة بغرفتين داخل إقامة في مرجان",
    },
    quartier: "Marjane",
    prix: 620000,
    surface: 86,
    chambres: 2,
    sallesDeBain: 1,
    etage: 2,
    atouts: {
      fr: ["Titré", "Résidence sécurisée", "Parking en sous-sol", "Ascenseur"],
      ar: ["محفظة", "إقامة محروسة", "موقف تحت أرضي", "مصعد"],
    },
    description: {
      fr: "Appartement de 86 m² au deuxième étage d'une résidence sécurisée. Séjour ouvert sur la cuisine, deux chambres, une salle de bain. Place de parking en sous-sol.",
      ar: "شقة من 86 م² في الطابق الثاني من إقامة محروسة. صالون مفتوح على المطبخ، غرفتان وحمام. موقف سيارة تحت أرضي.",
    },
    images: [
      photo("1738168246881-40f35f8aba0a"),
      photo("1512916194211-3f2b7f5f7de3"),
      photo("1562438668-bcf0ca6578f0"),
      photo("1696987007764-7f8b85dd3033"),
    ],
    statut: "réservé",
    demo: true,
  },
  {
    ref: "BSM-001",
    slug: "appartement-lumineux-hamria",
    transaction: "vente",
    type: "appartement",
    titre: {
      fr: "Appartement lumineux de 3 chambres à Hamria",
      ar: "شقة مضيئة بثلاث غرف في حمرية",
    },
    quartier: "Hamria",
    prix: 890000,
    surface: 112,
    chambres: 3,
    sallesDeBain: 2,
    etage: 3,
    atouts: {
      fr: ["Titré", "Ascenseur", "Balcon", "Double séjour", "Proche écoles et commerces"],
      ar: ["محفظة", "مصعد", "شرفة", "صالون مزدوج", "قرب المدارس والمحلات"],
    },
    description: {
      fr: "Au troisième étage avec ascenseur, cet appartement de 112 m² profite de la lumière toute la journée. Double séjour, trois chambres, deux salles de bain et une cuisine séparée. Écoles et commerces à proximité.",
      ar: "في الطابق الثالث مع مصعد، شقة من 112 م² يدخلها الضوء طوال النهار. صالون مزدوج، ثلاث غرف، حمامان ومطبخ مستقل. المدارس والمحلات على مقربة.",
    },
    images: [
      photo("1560448204-e02f11c3d0e2"),
      photo("1628745277862-bc0b2d68c50c"),
      photo("1616486029423-aaa4789e8c9a"),
      photo("1631889993959-41b4e9c6e3c5"),
    ],
    statut: "disponible",
    demo: true,
  },
];

export const getBien = (slug: string) => biens.find((b) => b.slug === slug);

/** Photos d'ambiance utilisées sur la page d'accueil */
export const photosAccueil = {
  /** Une photo par argument de la section « Pourquoi Bismilah » (dans le même ordre) */
  pourquoi: [
    photo("1768144092684-c1a5dd6c7aad"),
    photo("1745761320791-5ae142edee8c"),
    photo("1682184805271-11671b7ecf4c"),
    photo("1759250451654-72ab594ba2c9"),
  ],
  confier: photo("1782939355626-8df602c595fb"),
};
