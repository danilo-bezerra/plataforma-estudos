import NothingFound from "@/components/nothing-found";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getContentV2 } from "@/services/getContentV2";

export default async function VisualizationLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const content = await getContentV2(params.id);

  if (!content) {
    return (
      <NothingFound
        title="Conteúdo não encontrado"
        description="O conteúdo que você procura não foi encontrado"
      >
        <Button asChild>
          <Link href="/">Mostrar todos os conteúdos </Link>
        </Button>
      </NothingFound>
    );
  }

  return <>{children}</>;
}
