"use client";

import { useState } from "react";

import { Content } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useReScanContent from "@/hooks/useReScanContent";

type Props = { data: Content };

export default function ReScanContentFolderButton({ data }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const { onReScan, isLoading } = useReScanContent();

  const handleReScan = async () => {
    onReScan(data.id, () => {
      setShowConfirm(false);
      router.refresh();
    });
  };

  return (
    <>
      <Button
        className=" text-cyan-50 bg-orange-400 hover:bg-orange-700  hover:text-white outline-none border-none"
        variant="outline"
        onClick={() => setShowConfirm(true)}
        size="sm"
      >
        Re-escanear
      </Button>
      <AlertDialog open={showConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja re-escanear {data.name}? Arquivos
              apagados serão removidos e arquivos adicionados a pasta serão
              cadastrados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirm(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleReScan} disabled={isLoading}>
              {isLoading ? "Escaneando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
