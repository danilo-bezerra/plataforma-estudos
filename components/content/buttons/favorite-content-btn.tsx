"use client";

import { MdOutlineStar, MdStarOutline } from "react-icons/md";

import useFavoriteContent from "@/hooks/useFavoriteContent";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  isFavorite: boolean;
};

export default function FavoriteContentButton({ id, isFavorite }: Props) {
  const router = useRouter();
  const { addFavorite, removeFavorite } = useFavoriteContent();

  const Icon = isFavorite ? MdOutlineStar : MdStarOutline;

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
    router.refresh();
  };

  return (
    <Button variant="ghost" size="icon" className="text-yellow-500">
      <Icon size={28} onClick={toggleFavorite} />
    </Button>
  );
}
