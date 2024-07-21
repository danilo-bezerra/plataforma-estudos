import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface Store {
  isLoading: boolean;
  onDelete: (id: string, callback?: () => void) => void;
}

const useDeleteContent = create<Store>((set, get) => ({
  isLoading: false,
  async onDelete(id, callback) {
    try {
      set({ isLoading: true });
      await axios.delete(`/api/v1/contents/${id}`);

      toast.success("conteúdo apagado com sucesso!");
    } catch (error: any) {
      let msg = "erro ao apagar conteúdo.";
      if (error instanceof AxiosError) {
        msg = String(error.response?.data?.message);
      }
      toast.error(msg, {
        duration: 2000,
      });
    } finally {
      set({ isLoading: false });
      if (callback) {
        callback();
      }
    }
  },
}));

export default useDeleteContent;
