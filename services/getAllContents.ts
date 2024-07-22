import { db } from "@/lib/db";

type Props = {
  orderBy?: string;
  sortOrder?: string;
  searchText?: string;
};

export async function getAllContents({
  orderBy = "createdAt",
  sortOrder = "desc",
  searchText = "",
}: Props) {
  try {
    const list = await db.content.findMany({
      orderBy: {
        [orderBy]: sortOrder,
      },
      where: {
        name: {
          contains: searchText,
        },
      },
    });

    return list;
  } catch {
    return null;
  }
}
