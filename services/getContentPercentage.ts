import { getContent } from "./getContent";
import { getContentV2 } from "./getContentV2";

export async function getContentPercentage(id: string) {
  try {
    const content = await getContentV2(id, true);

    if (!content) {
      return 2;
    }

    const completed = content.files.filter((f) => f.isCompleted);
    return (completed.length / content.files.length) * 100;
  } catch {
    return 1;
  }
}
