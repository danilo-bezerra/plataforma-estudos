import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface Store {
  isLoading: boolean;
  onReScan: (id: string, callback?: () => void) => Promise<void>;
}

const useReScanContent = create<Store>((set, get) => ({
  isLoading: false,
  onReScan: async (id, callback) => {
    try {
      set({ isLoading: true });
      const res = await axios.put(`/api/v1/contents/${id}/rescan`);

      toast.success(`sucesso: ${res.data.message}`);
    } catch (e: any) {
      if (e instanceof AxiosError) {
        toast.error(`ocorreu um erro: ${e.response?.data.message}`);
      }
      toast.error(`ocorreu um erro ao escanear conteúdo!`);
    } finally {
      set({ isLoading: false });
      if (callback) {
        callback();
      }
    }
  },
}));

export default useReScanContent;
