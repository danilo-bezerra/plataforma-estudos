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
        <p className="space-x-2">
          <Badge variant="secondary">{file.name} </Badge>{" "}
          <span className="text-xs text-neutral-500 dark:text-neutral-300">
            {" "}
            (
            {file.isCompleted
              ? "foi  marcado como visto"
              : "não foi marcado como visto"}
            )
          </span>
        </p>
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
