import { getContentPercentage } from "@/services/getContentPercentage";
import ProgressCard from "../ui/progress-card";

type Props = {
  id: string;
};

export async function ContentPercentage({ id }: Props) {
  const percentage = await getContentPercentage(id);

  return (
    <div>
      <div>
        {percentage !== null ? (
          <ProgressCard value={percentage} />
        ) : (
          <div className="text-xs text-red-500">
            Erro ao carregar a porcentagem de conclusão do conteúdo
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentPercentage;
