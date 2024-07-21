import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface Store {
  sendRequest: (id: string, isFavorite: string) => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
}

const useFavoriteContent = create<Store>((set, get) => ({
  addFavorite: async (id) => {
    const { sendRequest } = get();
    await sendRequest(id, "true");
  },
  removeFavorite: async (id) => {
    const { sendRequest } = get();
    await sendRequest(id, "false");
  },
  sendRequest: async (id, isFavorite) => {
    try {
      const formData = new FormData();
      formData.append("isFavorite", isFavorite);
      await axios.put(`/api/v1/contents/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        `favorito ${
          isFavorite == "true" ? "adicionado" : "removido"
        } com sucesso!`
      );
    } catch {
      toast.error(
        `ocorreu um erro ao ${
          isFavorite ? "favoritar" : "remover favorito do"
        } conteúdo!`
      );
    }
  },
}));

export default useFavoriteContent;
