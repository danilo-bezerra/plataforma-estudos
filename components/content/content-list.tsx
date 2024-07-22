import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import CourseItem from "./content-item";

import { Content } from "@prisma/client";

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
      <div className="  w-full space-y-16 ">
        {showFavorites && favorites.length > 0 ? (
          <div className="space-y-4">
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
          </div>
        ) : null}
        {data.length > 0 ? (
          <div className="space-y-4">
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
          </div>
        ) : (
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <CardHeader>
              <CardTitle className="text-[hsl(222.2,84%,4.9%)] dark:text-white text-center">
                Nenhum conteúdo encontrado!
              </CardTitle>
            </CardHeader>
            <CardDescription className=" px-4 pb-4 text-center">
              Que tal cadastrar o primeiro?
            </CardDescription>
          </Card>
        )}
      </div>
    </>
  );
}
