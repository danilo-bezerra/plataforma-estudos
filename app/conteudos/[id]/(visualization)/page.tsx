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
    },
  });

  return (
    <section className="p-5 space-y-8">
      <LastViewedFile data={lastViewed} />
      <ContentPercentage id={data.id} />
      <Table>
        <TableCaption>Informações sobre esse conteúdo</TableCaption>

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
            <TableCell className="  "></TableCell>
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
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
