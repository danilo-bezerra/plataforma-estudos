import FilterSortContentsMenu from "@/components/content/filter-sort-contents-menu";
import ContentList from "@/components/content/content-list";
import NothingFound from "@/components/nothing-found";
import { getAllContents } from "@/services/getAllContents";
import ContentHeader from "@/components/content/content-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams?: { [key: string]: string };
};

export default async function Home({ searchParams }: Props) {
  const searchOptions = {
    orderBy: searchParams ? searchParams["sortField"] : undefined,
    sortOrder: searchParams ? searchParams["sortOrder"] : undefined,
    searchText: searchParams ? searchParams["searchText"] : undefined,
  };

  const data = await getAllContents(searchOptions);
  const showFavorites = searchParams?.showFavorites == "true";

  if (data === null) {
    return (
      <NothingFound
        title="Nenhum conteúdo encontrado!"
        description="Que tal cadastrar o primeiro?"
      >
        <Link href="/conteudos/novo">
          <Button>Cadastrar conteúdo</Button>
        </Link>
      </NothingFound>
    );
  }

  return (
    <>
      <ContentHeader title={`Meus conteúdos (${data.length})`} />
      <ContentList data={data} showFavorites={showFavorites} />
    </>
  );
}
