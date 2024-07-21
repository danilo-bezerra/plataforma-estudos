"use client";

import { formatDuration } from "@/utils/format-duration";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { FileV2 } from "@prisma/client";
import Link from "next/link";

import { useParams } from "next/navigation";
import CompleteFileCheckbox from "./complete-file-checkbox";

type Props = {
  data: FileV2;
  index: number;

  children?: ReactNode;
};

export default function FileListItem({
  data,

  index,
}: Props) {
  const params = useParams<{ fileId: string }>();

  return (
    <div
      key={data.id}
      className={cn(
        `flex justify-around items-center w-full h-16 my-6  border-2 shadow-sm rounded-md transition-transform  hover:border-primary`,
        params.fileId === data.id
          ? "   border-primary bg-purple-50 dark:bg-primary/20 dark:text-white"
          : "dark:bg-neutral-900 bg-neutral-50"
      )}
    >
      <Link
        href={`/conteudos/${data.contentId}/${data.id}`}
        className="w-[90%] cursor-pointer h-full  flex gap-2 items-center hover:no-underline group"
      >
        <code className="pl-4">{index}</code>

        <p className=" flex-1 line-clamp-1 text-left text-xs group-hover:underline">
          {data.name}
        </p>
        <code className="bg-purple-100 dark:bg-neutral-500/20 max-w-min max-h-min p-1 rounded-sm shrink-0 h-6 text-xs">
          {data.type}
        </code>

        <code className="p-1 bg-blue-500/20 rounded-md px-2 text-xs dark:text-neutral-300">
          {data.path.split(".").reverse()[0]}
        </code>

        {data.duration != undefined && (
          <code className="p-1 bg-blue-500/20 rounded-md px-2 text-xs dark:text-neutral-300">
            {formatDuration(data.duration)}
          </code>
        )}
      </Link>
      <div className="w-[10%] flex justify-center">
        <CompleteFileCheckbox
          isCompleted={data.isCompleted}
          ids={{ contentId: data.contentId, fileId: data.id }}
        />
      </div>
    </div>
  );
}
