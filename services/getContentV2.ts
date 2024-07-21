import { db } from "@/lib/db";

export async function getContentV2(id: string, includeFiles: boolean = false) {
  try {
    const data = await db.content.findUnique({
      include: {
        files: includeFiles,
      },
      where: {
        id,
      },
    });

    return data;
  } catch {
    return null;
  }
}
