import { db } from "@/lib/db";

export async function getFile(id: string) {
  try {
    const file = await db.fileV2.findUnique({
      where: {
        id,
      },
    });

    if (!file) {
      return undefined;
    }

    const updated = await db.fileV2.update({
      where: {
        id,
      },
      data: {
        lastViewed: new Date(),
      },
    });

    return updated;
  } catch {
    console.log("ocorreu um erro");
    return undefined;
  }
}
