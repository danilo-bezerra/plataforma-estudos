// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Switch } from "../ui/switch";
// import { Label } from "../ui/label";

// type Props = {
//   defaultShowFavorites?: boolean;
// };

// const FilterSortContentsMenu = ({
//   defaultShowFavorites: defaultShowFavorites = false,
// }: Props) => {
//   const [sortField, setSortField] = useState<string>("name");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [showFavorites, setShowFavorites] =
//     useState<boolean>(defaultShowFavorites);

//   const router = useRouter();

//   const buildQueryString = (params: { [key: string]: any }) => {
//     const searchParams = new URLSearchParams();
//     for (const key in params) {
//       searchParams.set(key, params[key]);
//     }
//     return searchParams.toString();
//   };

//   useEffect(() => {
//     const params = {
//       sortField,
//       sortOrder,
//       showFavorites: showFavorites.toString(),
//     };
//     const queryString = buildQueryString(params);

//     router.push(`?${queryString}`);
//     router.refresh();
//   }, [sortField, sortOrder, showFavorites]);

//   return (
//     <div className="flex gap-4 items-center">
//       <Select onValueChange={(v) => setSortField(v)}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Ordenar por" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="name">Nome</SelectItem>
//             <SelectItem value="createdAt">Data de criação</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       <Select onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Sentido ordenação" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="asc">Crescente</SelectItem>
//             <SelectItem value="desc">Decrescente</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       <Label className="flex items-center gap-2">
//         <Switch checked={showFavorites} onCheckedChange={setShowFavorites} />{" "}
//         Exibir favoritos
//       </Label>
//     </div>
//   );
// };

// export default FilterSortContentsMenu;
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import SearchContents from "./search-contents";
import { Button } from "../ui/button";
// Importe o componente de busca

type Props = {
  defaultShowFavorites?: boolean;
};

const FilterSortContentsMenu = ({
  defaultShowFavorites: defaultShowFavorites = false,
}: Props) => {
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFavorites, setShowFavorites] =
    useState<boolean>(defaultShowFavorites);
  const [searchText, setSearchText] = useState<string>(""); // Estado para o texto de busca

  const router = useRouter();

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
