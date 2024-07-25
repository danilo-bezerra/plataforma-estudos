import FilterSortContentsMenu from "@/components/content/filter-sort-contents-menu";
import ContentList from "@/components/content/content-list";
import NothingFound from "@/components/nothing-found";
import { Button } from "@/components/ui/button";
import { getAllContents } from "@/services/getAllContents";
import { getContentV2 } from "@/services/getContentV2";
import Link from "next/link";
import ContentHeader from "@/components/content/content-header";

type Props = {
  searchParams?: { [key: string]: string };
};

export default async function AdminPage({ searchParams }: Props) {
  const searchOptions = {
    orderBy: searchParams ? searchParams["sortField"] : undefined,
    sortOrder: searchParams ? searchParams["sortOrder"] : undefined,
    searchText: searchParams ? searchParams["searchText"] : undefined,
  };

  const data = await getAllContents(searchOptions);
  const showFavorites = searchParams?.showFavorites == "true";

  if (!data) {
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
      <ContentHeader
        title={`Conteúdos cadastrados (${data?.length || 0})`}
        leftItem={
          <Link href="/conteudos/novo">
            <Button>Cadastrar Conteúdo</Button>
          </Link>
        }
      />
      <ContentList
        data={data}
        showFavorites={showFavorites}
        isEditable={true}
      />
    </>
  );
}
