import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";

import { Content } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import ContentPercentage from "../content/content-percentage";
import DeleteContentButton from "../content/buttons/delete-content-btn";
import FavoriteContentButton from "./buttons/favorite-content-btn";

type Props = {
  data: Content;
  isEditable?: boolean;
};

export default function ContentItem({ data, isEditable }: Props) {
  const coverImage = data.cover
    ? `${process.env.URL}/api/v1/send/cover${data.cover}`
    : "/images/no-cover.png";

  return (
    <li>
      <Card className="bg-white dark:bg-gray-900 shadow hover:scale-105 transition-transform space-y-1 border border-primary/30 border-b-4 border-b-primary/50  hover:border-b-primary overflow-hidden">
        <CardHeader className="p-0 cursor-pointer relative">
          <Link href={`/conteudos/${data.id}`}>
            <img
              className="  aspect-video shrink-0 w-full"
              src={coverImage}
              alt={data.name}
              loading="lazy"
            />

            <Badge
              variant={data.isCompleted ? "default" : "secondary"}
              className={cn(
                "absolute top-2 right-2 shrink-0 text-xs font-normal max-h-max min-w-min",
                data.isCompleted ? "" : ""
              )}
            >
              {data.isCompleted ? "concluído" : "não concluído"}
            </Badge>
          </Link>{" "}
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-4 py-0 pt-2">
          <CardTitle className="text-[hsl(222.2,84%,4.9%)] dark:text-white text-base text-left font-medium">
            {data.name}
          </CardTitle>

          <ContentPercentage id={data.id} />
        </CardContent>
        <CardFooter className="p-4 border space-x-2">
          <FavoriteContentButton id={data.id} isFavorite={data.isFavorite} />

          <div className="flex gap-4 justify-end w-full">
            {isEditable ? (
              <>
                <Link href={`/conteudos/${data.id}/editar`}>
                  <Button
                    variant="secondary"
                    className="dark:bg-neutral-200 text-neutral-800"
                    size="sm"
                  >
                    Editar
                  </Button>
                </Link>
                <DeleteContentButton data={data} />
              </>
            ) : null}
            <Link href={`/conteudos/${data.id}`}>
              <Button size="sm">Visualizar</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}
