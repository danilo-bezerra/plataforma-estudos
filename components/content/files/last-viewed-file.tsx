"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileV2 } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  data: FileV2 | null;
};

export default function LastViewedFile({ data }: Props) {
  const [file, setFile] = useState<FileV2 | null>(data);

  if (!file) {
    return null;
  }

  return (
    <div className="py-4 text-sm  space-y-6">
      <h3 className="font-medium">Ultimo Conteúdo aberto: </h3>{" "}
      <div className="space-y-4 ">
        <div className="space-y-2">
          <p>
            Nome:{" "}
            <code className="bg-purple-100 dark:bg-neutral-500/20 max-w-min max-h-min p-1 rounded-sm shrink-0 h-6 text-xs">
              {file.name}
            </code>{" "}
            <span className="text-xs">
              (
              {file.isCompleted
                ? "foi  marcado como visto"
                : "não foi marcado como visto"}
              )
            </span>
          </p>
          <p>
            Tipo:{" "}
            <code className="bg-purple-100 dark:bg-neutral-500/20 max-w-min max-h-min p-1 rounded-sm shrink-0 h-6 text-xs">
              {file.type}
            </code>
          </p>
          {data?.relativePath ? (
            <p>
              Módulo:{" "}
              <code className="bg-purple-100 dark:bg-neutral-500/20 max-w-min max-h-min p-1 rounded-sm shrink-0 h-6 text-xs">
                {data.relativePath.split("\\").join(" -> ")}
              </code>
            </p>
          ) : null}
          <span className="text-xs text-neutral-500 dark:text-neutral-300">
            {" "}
          </span>
        </div>
        <div className="space-x-4">
          <Link href={`/conteudos/${file.contentId}/${file.id}`}>
            <Button size="sm">Visualizar</Button>
          </Link>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setFile(null);
            }}
          >
            Ignorar
          </Button>
        </div>
      </div>
    </div>
  );
}
