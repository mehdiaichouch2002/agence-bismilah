import { BiensView } from "@/components/pages/BiensView";
import { getDict } from "@/i18n";
import { buildMetadata } from "@/lib/seo";

const t = getDict("fr");

export const metadata = buildMetadata({
  locale: "fr",
  path: "/biens",
  title: t.meta.biensTitle,
  description: t.meta.biensDescription,
});

export default function Page() {
  return <BiensView locale="fr" />;
}
