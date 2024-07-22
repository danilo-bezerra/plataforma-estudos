import FilterSortContentsMenu from "@/components/content/filter-sort-contents-menu";
import ContentList from "@/components/content/content-list";
import NothingFound from "@/components/nothing-found";
import { getAllContents } from "@/services/getAllContents";
import ContentHeader from "@/components/content/content-header";

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
      <ContentHeader title={`Meus conteúdos (${data.length})`} />
      <ContentList data={data} showFavorites={showFavorites} />
    </>
  );
}
