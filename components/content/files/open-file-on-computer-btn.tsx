"use client";

import { openFile } from "@/actions/open-file";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  path: string;
};

export default function OpenFileOnComputerButton({ path }: Props) {
  return <Button onClick={() => openFile(path)}>Abrir no computador</Button>;
}
