"use client";

import { MdOutlineStar, MdStarOutline } from "react-icons/md";

import { useRouter } from "next/navigation";

import useCompleteContent from "@/hooks/useCompleteContent";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  isCompleted: boolean;
};

export default function CompleteContentButton({ id, isCompleted }: Props) {
  const router = useRouter();
  const { addCompleted, removeCompleted } = useCompleteContent();

  const Icon = isCompleted ? MdOutlineStar : MdStarOutline;

  const toggleCompleted = async () => {
    if (isCompleted) {
      await removeCompleted(id);
    } else {
      await addCompleted(id);
    }
    router.refresh();
  };

  return (
    <Button
      variant={isCompleted ? "secondary" : "default"}
      className={cn(isCompleted ? "" : "")}
      onClick={toggleCompleted}
    >
      {isCompleted ? "Não concluir" : "Concluir"}
    </Button>
  );
}
