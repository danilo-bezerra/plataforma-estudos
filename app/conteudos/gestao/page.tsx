import FilterSortContentsMenu from "@/components/content/filter-sort-contents-menu";
import ContentList from "@/components/content/content-list";
import NothingFound from "@/components/nothing-found";
import { Button } from "@/components/ui/button";
import { getAllContents } from "@/services/getAllContents";
import { getContentV2 } from "@/services/getContentV2";
import Link from "next/link";

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

  if (data === null) {
    return <NothingFound />;
  }

  return (
    <>
      <div className="flex justify-between gap-5">
        <div className="flex gap-5 items-center">
          <h1>Conteúdos cadastrados ({data.length})</h1>
          <FilterSortContentsMenu />
        </div>
        <Link href="/conteudos/novo">
          <Button>Cadastrar Conteúdo</Button>
        </Link>
      </div>
      <ContentList
        data={data}
        showFavorites={showFavorites}
        isEditable={true}
      />
    </>
  );
}
