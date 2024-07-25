import { db } from "@/lib/db";

export async function getContent(id: string) {
  try {
    const data = await db.content.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch {
    return null;
  }
}
