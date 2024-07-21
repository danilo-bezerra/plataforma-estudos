"use client";

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
    <div className="p-4 text-sm border space-y-2">
      <p className="">
        <strong>Ultimo Conteúdo aberto:</strong> {file.name}{" "}
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
  );
}
