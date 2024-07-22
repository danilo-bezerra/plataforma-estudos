import React, { ReactNode } from "react";
import FilterSortContentsMenu from "./filter-sort-contents-menu";

type Props = {
  title: string;
  leftItem?: ReactNode;
};

export default function ContentHeader({ title, leftItem }: Props) {
  return (
    <header className="flex flex-col  gap-5">
      <div className="flex justify-between  gap-5 items-center">
        <h1 className="">{title}</h1>

        {leftItem != undefined ? leftItem : null}
      </div>

      <FilterSortContentsMenu />
    </header>
  );
}
