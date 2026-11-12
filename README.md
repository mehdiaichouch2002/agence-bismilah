# Agence Immobilière Bismilah — site vitrine

Site de l'Agence Immobilière Bismilah (Meknès), en français (`/`) et en arabe (`/ar`).
Next.js (App Router) + TypeScript + Tailwind CSS. Pas de serveur, pas de base de données,
pas de clé d'API : tous les formulaires ouvrent WhatsApp avec un message déjà rédigé.

## Lancer le site sur son ordinateur

Il faut [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
npm install     # une seule fois
npm run dev     # puis ouvrir http://localhost:3000
```

Avant de mettre en ligne, vérifier que tout est bon :

```bash
npm run lint
npm run build
```

## Mettre en ligne (Vercel)

1. Envoyer le projet sur GitHub.
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, choisir le dépôt, **Deploy**. Aucun réglage à faire.
3. Avec un nom de domaine (ex. `agencebismilah.ma`) : l'ajouter dans Vercel, puis créer la variable
   d'environnement `NEXT_PUBLIC_SITE_URL` = `https://www.agencebismilah.ma` et redéployer.
   Sans cette variable, le site utilise automatiquement son adresse `*.vercel.app`.

## Où modifier quoi

| Je veux changer…                                  | Fichier                    |
| ------------------------------------------------- | -------------------------- |
| Téléphone, horaires, note Google, conseiller      | `src/config/site.ts`       |
| Les biens (ajouter, modifier, retirer)            | `src/data/biens.ts`        |
| Les avis affichés                                 | `src/data/avis.ts`         |
| Les textes en français                            | `src/i18n/fr.ts`           |
| Les textes en arabe                               | `src/i18n/ar.ts`           |
| Les couleurs                                      | `src/app/globals.css` (bloc `@theme`) |

### Téléphone, horaires, conseiller (`src/config/site.ts`)

```ts
phoneDisplay: "06 63 65 86 72",   // tel qu'il s'affiche
phoneIntl: "212663658672",        // même numéro, format international (WhatsApp + appels)
hours: { opens: "11:00", closes: "19:00" },
rating: { value: 4.8, count: 48, fiveStars: 46 }, // note Google, nombre d'avis, dont avis à 5 étoiles : à mettre à jour à la main
advisorName: { fr: "Khalid", ar: "خالد" },
```

- **Changer le conseiller** : remplacer les deux prénoms.
- **Ne plus afficher de prénom** : mettre `{ fr: "", ar: "" }`. La ligne disparaît partout.
- **Instagram / Facebook** : coller le lien dans `instagram: ""` ou `facebook: ""`.
  Tant que c'est vide, rien ne s'affiche.
- **Biens à la une** (page d'accueil) : `featuredRefs: ["BSM-007", "BSM-001", "BSM-005"]`.

## Ajouter un bien (`src/data/biens.ts`)

Copier ce bloc, le coller **en haut** de la liste `biens` (juste après `export const biens: Bien[] = [`),
puis changer les valeurs. Le premier bien de la liste est considéré comme le plus récent.

```ts
{
  ref: "BSM-007",
  slug: "appartement-3-chambres-hamria",   // adresse de la page : minuscules, tirets, sans accents
  transaction: "vente",                    // "vente" ou "location"
  type: "appartement",                     // appartement | villa | maison | terrain | local-commercial | bureau
  titre: {
    fr: "Appartement 3 chambres à Hamria",
    ar: "شقة بثلاث غرف في حمرية",
  },
  quartier: "Hamria",                      // un quartier de la liste QUARTIERS (en haut du fichier)
  prix: 950000,                            // en DH, sans espaces ; pour une location : loyer par mois
  surface: 120,                            // m²
  chambres: 3,                             // facultatif (supprimer la ligne pour un terrain)
  sallesDeBain: 2,                         // facultatif
  etage: 2,                                // facultatif ; 0 = rez-de-chaussée
  atouts: {
    fr: ["Titré", "Ascenseur", "Parking"],
    ar: ["محفظة", "مصعد", "موقف سيارة"],
  },
  description: {
    fr: "Description en français.",
    ar: "الوصف بالعربية.",
  },
  images: [
    "/biens/BSM-007/1.jpg",
    "/biens/BSM-007/2.jpg",
    "/biens/BSM-007/3.jpg",
    "/biens/BSM-007/4.jpg",
  ],
  statut: "disponible",                    // disponible | réservé | vendu | loué
  demo: false,                             // false = vrai bien
},
```

À savoir :

- `ref` et `slug` doivent être **uniques**.
- Les prix s'écrivent sans espaces (`950000`) ; le site affiche `950 000 DH` ou `4 500 DH / mois`.
- Un bien vendu ou loué : changer `statut`, ou supprimer le bloc pour le retirer du site.
- Nouveau quartier : l'ajouter dans `QUARTIERS` (même fichier) et sa traduction dans `quartiers` de `src/i18n/ar.ts`.

## Remplacer les photos d'exemple

1. Créer un dossier par bien : `public/biens/BSM-001/`.
2. Y déposer 4 à 6 photos nommées `1.jpg`, `2.jpg`, … (format paysage, environ 1600 px de large ; la n° 1 est la photo principale).
3. Dans `src/data/biens.ts`, remplacer les lignes `photo("…")` du bien par :

```ts
images: ["/biens/BSM-001/1.jpg", "/biens/BSM-001/2.jpg", "/biens/BSM-001/3.jpg", "/biens/BSM-001/4.jpg"],
```

Le site redimensionne et compresse les photos tout seul (AVIF / WebP).
Les photos d'ambiance de l'accueil (grande photo du haut et les deux photos en arche) sont à la fin du même fichier, dans `photosAccueil`.

## Passer des exemples aux vrais biens (`demo`)

Les 14 biens livrés sont des **exemples** : `demo: true`. Tant qu'un bien est en `demo: true` :

- l'étiquette « Exemple » s'affiche sur sa carte et sur sa page, avec une phrase d'explication ;
- un bandeau prévient sur la page « Biens » ;
- sa page n'est **pas proposée à Google** (balise `noindex`, absente du `sitemap.xml`, pas de données structurées).

Pour un vrai bien : mettre `demo: false` (ou supprimer les exemples et ajouter les vrais).
Quand plus aucun bien n'est en `demo: true`, les étiquettes et le bandeau disparaissent d'eux-mêmes.

## Règles d'honnêteté du site

- Aucun chiffre inventé : seuls la note Google (4,8 / 48 avis) et les horaires apparaissent.
- Les avis de `src/data/avis.ts` sont de vrais avis Google recopiés mot pour mot : ne pas en modifier le texte.
- Aucune adresse postale n'est écrite : seulement « Meknès » et la position sur la carte.

## Structure

```
src/
  app/            routes : (fr)/ = français, (ar)/ar/ = arabe, + sitemap, robots, image de partage
  components/     en-tête, pied de page, cartes, sections de l'accueil, galerie, filtres
  config/site.ts  informations de l'agence
  data/           biens.ts (annonces), avis.ts (avis Google)
  i18n/           fr.ts et ar.ts (tous les textes)
  lib/            formats (prix, liens WhatsApp), filtres, référencement
assets/           police utilisée pour l'image de partage (WhatsApp, Facebook)
```

Notes techniques :

- Toutes les pages sont générées à l'avance (statiques). L'optimisation des images est faite par Vercel.
- L'image de partage (`/opengraph-image`) et les icônes sont générées à partir du code : rien à dessiner.
- Animations : tout est en CSS (bloc « MOUVEMENT » de `src/app/globals.css`) avec quelques petits
  composants dans `src/components/fx.tsx` (curseur lumineux, compteur, statut ouvert/fermé).
  Aucune bibliothèque d'animation. Tout respecte le réglage « réduire les animations » du téléphone.
- Le diaporama du haut de page affiche les biens de `featuredRefs` (`src/config/site.ts`).
- « Ouvert en ce moment / Fermé » est calculé à l'heure de Meknès à partir de `hours` (`src/config/site.ts`).
- Les photos de la section « Pourquoi Bismilah » (une par argument) sont dans `photosAccueil.pourquoi`,
  à la fin de `src/data/biens.ts`.
- En cliquant sur un bien, sa photo « voyage » jusqu'à la galerie de sa page (View Transitions,
  sur les navigateurs récents ; ailleurs le changement de page est simplement instantané).
