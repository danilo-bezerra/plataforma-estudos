"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import SearchContents from "./search-contents";

type Props = {};

const FilterSortContentsMenu = ({}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFavorites, setShowFavorites] = useState<boolean>(pathname == "/");
  const [searchText, setSearchText] = useState<string>("");

  const buildQueryString = (params: { [key: string]: any }) => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.set(key, params[key]);
    }
    return searchParams.toString();
  };

  useEffect(() => {
    const params = {
      sortField,
      sortOrder,
      showFavorites: showFavorites.toString(),
      searchText,
    };
    const queryString = buildQueryString(params);

    router.push(`?${queryString}`);
    router.refresh();
  }, [sortField, sortOrder, showFavorites, searchText, router]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="flex gap-4">
          <Select onValueChange={(v) => setSortField(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="createdAt">Data de criação</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sentido ordenação" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="asc">Crescente</SelectItem>
                <SelectItem value="desc">Decrescente</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label className="flex items-center gap-2">
            <Switch
              checked={showFavorites}
              onCheckedChange={setShowFavorites}
            />{" "}
            Exibir favoritos
          </Label>
        </div>
        <SearchContents onSearch={(text: string) => setSearchText(text)} />{" "}
      </div>
    </div>
  );
};

export default FilterSortContentsMenu;
