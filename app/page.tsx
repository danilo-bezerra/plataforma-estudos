import FilterSortContentsMenu from "@/components/content/filter-sort-contents-menu";
import ContentList from "@/components/content/content-list";
import NothingFound from "@/components/nothing-found";
import { getAllContents } from "@/services/getAllContents";

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
    return <NothingFound />;
  }

  return (
    <>
      <div className="flex gap-5 items-center">
        <h1>Meus conteúdos ({data.length})</h1>
        <FilterSortContentsMenu defaultShowFavorites={true} />
      </div>

      <ContentList data={data} showFavorites={showFavorites} />
    </>
  );
}
