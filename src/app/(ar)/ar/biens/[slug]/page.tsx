import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BienView } from "@/components/pages/BienView";
import { biens, getBien } from "@/data/biens";
import { getDict } from "@/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Une page statique par bien ; toute autre adresse renvoie la page 404
export const dynamicParams = false;
export const generateStaticParams = () => biens.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bien = getBien((await params).slug);
  if (!bien) return {};
  return buildMetadata({
    locale: "ar",
    path: `/biens/${bien.slug}`,
    title: getDict("ar").meta.bienTitle(bien.titre.ar),
    description: bien.description.ar,
    // Les biens d'exemple ne sont pas proposés à Google
    noindex: bien.demo,
  });
}

export default async function Page({ params }: Props) {
  const bien = getBien((await params).slug);
  if (!bien) notFound();
  return <BienView bien={bien} locale="ar" />;
}
