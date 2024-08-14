import { getContentV2 } from "@/services/getContentV2";

import DateFormatter from "@/components/date-formatter";
import FavoriteContentButton from "@/components/content/buttons/favorite-content-btn";
import CompleteContentButton from "@/components/content/buttons/complete-content-btn";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import ContentPercentage from "@/components/content/content-percentage";
import { db } from "@/lib/db";
import LastViewedFile from "@/components/content/files/last-viewed-file";
import ReScanContentFolderButton from "@/components/content/buttons/rescan-content-folder-btn";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export default async function ContentPage({ params }: Props) {
  const data = await getContentV2(params.id);

  if (!data) {
    return null;
  }

  const lastViewed = await db.fileV2.findFirst({
    orderBy: {
      lastViewed: "desc",
    },
    where: {
      contentId: data.id,
      NOT: {
        lastViewed: null,
      },
    },
  });

  return (
    <section className="p-5 space-y-8">
      <h2>Informações sobre esse conteúdo:</h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead className="font-medium">Nome</TableHead>
            <TableHead className="font-medium">Estado de conclusão</TableHead>
            <TableHead className="font-medium">Favorito</TableHead>
            <TableHead className="font-medium"> Criando em</TableHead>
            <TableHead className="font-medium"> Atualizado em</TableHead>
          </TableRow>
          <TableRow>
            <TableCell>{data.name}</TableCell>
            <TableCell>
              <span>{data.isCompleted ? "Concluído" : "Não concluído"}</span>
            </TableCell>
            <TableCell>
              {data.isFavorite ? "É Favorito" : "Não é favorito"}
            </TableCell>
            <TableCell>
              <DateFormatter date={data.createdAt} />
            </TableCell>
            <TableCell>
              <DateFormatter date={data.updatedAt} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="  ">
              <ReScanContentFolderButton data={data} />
            </TableCell>
            <TableCell className="  ">
              <CompleteContentButton
                id={data.id}
                isCompleted={data.isCompleted}
              />
            </TableCell>
            <TableCell>
              <FavoriteContentButton
                id={data.id}
                isFavorite={data.isFavorite}
              />
            </TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>
              <Link href={`/conteudos/${data.id}/editar`}>
                <Button
                  variant="secondary"
                  className="dark:bg-neutral-200 text-neutral-800 hover:opacity-80"
                  size="sm"
                >
                  Editar
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <LastViewedFile data={lastViewed} />
      <div className="space-y-6 ">
        <h3 className="font-medium">
          Progresso:{" "}
          <span className="text-md font-normal text-neutral-500 dark:text-neutral-300">
            (x/y) conteúdos vistos{" "}
          </span>
        </h3>{" "}
        <ContentPercentage id={data.id} />
      </div>
    </section>
  );
}
