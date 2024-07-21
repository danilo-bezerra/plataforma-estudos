import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface Store {
  sendRequest: (id: string, isCompleted: string) => Promise<void>;
  addCompleted: (id: string) => Promise<void>;
  removeCompleted: (id: string) => Promise<void>;
}

const useCompleteContent = create<Store>((set, get) => ({
  addCompleted: async (id) => {
    const { sendRequest } = get();
    await sendRequest(id, "true");
  },
  removeCompleted: async (id) => {
    const { sendRequest } = get();
    await sendRequest(id, "false");
  },
  sendRequest: async (id, isCompleted) => {
    try {
      const formData = new FormData();
      formData.append("isCompleted", isCompleted);
      await axios.put(`/api/v1/contents/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        `conteúdo ${
          isCompleted == "true" ? "concluído" : "não concluído"
        } com sucesso!`
      );
    } catch {
      toast.error(
        `ocorreu um erro ao ${
          isCompleted ? "concluir" : "remover a conclusão do"
        } conteúdo!`
      );
    }
  },
}));

export default useCompleteContent;
