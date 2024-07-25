import Link from "next/link";
import NothingFound from "../nothing-found";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import CourseItem from "./content-item";

import { Content } from "@prisma/client";
import { Button } from "../ui/button";

type Props = {
  data: Content[];
  isEditable?: boolean;
  showFavorites?: boolean;
};

export default function ContentList({
  data,
  isEditable = false,
  showFavorites = false,
}: Props) {
  const favorites = data.filter((f) => f.isFavorite);

  return (
    <>
      <section className="  w-full space-y-16 ">
        {showFavorites && favorites.length > 0 ? (
          <section className="space-y-4">
            <h2>Favoritos ({favorites.length})</h2>{" "}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((content) => (
                <CourseItem
                  key={content.id}
                  data={content}
                  isEditable={isEditable}
                />
              ))}
            </ul>{" "}
          </section>
        ) : null}
        {data.length > 0 ? (
          <section className="space-y-4">
            {showFavorites && favorites.length > 0 ? (
              <h2>Todos ({data.length})</h2>
            ) : null}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data.map((content) => (
                <CourseItem
                  key={content.id}
                  data={content}
                  isEditable={isEditable}
                />
              ))}
            </ul>
          </section>
        ) : (
          <NothingFound
            title="Nenhum conteúdo encontrado!"
            description="Que tal cadastrar o primeiro?"
          >
            <Link href="/conteudos/novo">
              <Button>Cadastrar conteúdo</Button>
            </Link>
          </NothingFound>
        )}
      </section>
    </>
  );
}
