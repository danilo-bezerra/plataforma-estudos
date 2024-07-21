"use client";

import { useState } from "react";

import axios, { AxiosError } from "axios";
import { toast } from "sonner";
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
import useDeleteContent from "@/hooks/useDeleteContent";

type Props = { data: Content };

export default function DeleteContentButton({ data }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const { onDelete, isLoading } = useDeleteContent();

  const handleDelete = async () => {
    onDelete(data.id, () => {
      setShowConfirm(false);
      router.refresh();
    });
  };

  return (
    <>
      <Button
        className="bg-red-700 text-cyan-50 hover:bg-red-950 hover:text-white outline-none border-none"
        variant="outline"
        onClick={() => setShowConfirm(true)}
        size="sm"
      >
        Apagar
      </Button>
      <AlertDialog open={showConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir {data.name}? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirm(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Apagando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
