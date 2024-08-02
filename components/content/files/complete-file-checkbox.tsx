"use client";

import { useRouter } from "next/navigation";

import useUpdateFile from "@/hooks/useUpdateFile";
import { Checkbox } from "../../ui/checkbox";

type Props = {
  ids: { contentId: string; fileId: string };
  isCompleted: boolean;
};

export default function CompleteFileCheckbox({ ids, isCompleted }: Props) {
  const router = useRouter();
  const { addCompleted, removeCompleted } = useUpdateFile();

  const toggleCompleted = async () => {
    if (isCompleted) {
      await removeCompleted(ids);
    } else {
      await addCompleted(ids);
    }
    router.refresh();
  };

  return (
    <Checkbox
      title={isCompleted ? "concluído" : "não concluído"}
      checked={isCompleted}
      onCheckedChange={toggleCompleted}
    />
  );
}
