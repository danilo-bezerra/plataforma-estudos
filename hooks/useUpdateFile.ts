import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface Store {
  sendRequest: (
    type: "complete" | "time",
    ids: { contentId: string; fileId: string },
    data: { isCompleted?: boolean; elapsedTime?: number }
  ) => Promise<void>;
  addCompleted: (ids: { contentId: string; fileId: string }) => Promise<void>;
  removeCompleted: (ids: {
    contentId: string;
    fileId: string;
  }) => Promise<void>;
  updateElapsedTime: (
    ids: { contentId: string; fileId: string },
    elapsedTime: number
  ) => void;
}

const useUpdateFile = create<Store>((set, get) => ({
  addCompleted: async (id) => {
    const { sendRequest } = get();
    await sendRequest("complete", id, { isCompleted: true });
  },
  removeCompleted: async (id) => {
    const { sendRequest } = get();
    await sendRequest("complete", id, { isCompleted: false });
  },
  updateElapsedTime: async (ids, elapsedTime) => {
    const { sendRequest } = get();
    await sendRequest("time", ids, { elapsedTime: elapsedTime });
  },
  sendRequest: async (type, id, { isCompleted, elapsedTime }) => {
    if (type == "complete") {
      try {
        await axios.put(`/api/v1/contents/${id.contentId}/${id.fileId}`, {
          isCompleted,
        });

        toast.success(
          `arquivo ${isCompleted ? "concluído" : "não concluído"} com sucesso!`
        );
      } catch {
        toast.error(
          `ocorreu um erro ao ${
            isCompleted ? "concluir" : "remover a conclusão do"
          } arquivo!`
        );
      }
    } else if (type == "time") {
      try {
        await axios.put(`/api/v1/contents/${id.contentId}/${id.fileId}`, {
          elapsedTime,
        });
      } catch {}
    }
  },
}));

export default useUpdateFile;
