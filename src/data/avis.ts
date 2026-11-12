/** Avis Google réels, recopiés mot pour mot. Ne pas modifier le texte. */
export type Avis = { auteur: string; texte: string; langue: "fr" | "ar" };

export const avis: Avis[] = [
  {
    auteur: "Diki A.",
    langue: "fr",
    texte:
      "J'ai vendu mon appartement grâce à cette agence en moins d'un mois. Merci pour vos conseils et votre efficacité !",
  },
  {
    auteur: "Zakaryae G.",
    langue: "fr",
    texte: "Un service et accompagnement agréable, sérieux. Professionnalisme très élevé.",
  },
  {
    auteur: "Mostafa A.",
    langue: "fr",
    texte: "Comportement très professionnel et disponibilité à tout moment.",
  },
  {
    auteur: "Sanae M.",
    langue: "ar",
    texte:
      "من أفضل الوكالات العقارية، تعامل راقٍ وشفافية تامة في جميع المراحل. الثقة والمصداقية هي عنوانهم.",
  },
  {
    auteur: "Benkiran C.",
    langue: "ar",
    texte: "وكالة بسم الله.. لها مصداقية و صراحة في العمل",
  },
  {
    auteur: "Najib E.",
    langue: "fr",
    texte: "Très bon service et très compétent.",
  },
];
