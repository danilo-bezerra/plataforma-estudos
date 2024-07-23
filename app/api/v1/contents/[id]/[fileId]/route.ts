import { db } from "@/lib/db";
import { getFile } from "@/services/getFile";
import { NextResponse } from "next/server";
import { updateFileSchema } from "@/schemas/schemas";

export async function PUT(
  req: Request,
  { params }: { params: { id: string; fileId: string } }
) {
  try {
    const file = await getFile(params.fileId);

    if (!file) {
      return NextResponse.json(
        {
          error: true,
          message: `Arquivo não encontrado`,
        },
        { status: 404 }
      );
    }

    const body = updateFileSchema.parse(await req.json());

    const updated = await db.fileV2.update({
      where: {
        id: params.fileId,
        contentId: params.id,
      },
      data: body,
    });

    return Response.json(updated);
  } catch (e: any) {
    console.log({ e });
    return NextResponse.json(
      {
        error: true,
        message: `Ocorreu um erro: ${JSON.stringify(e)}`,
      },
      { status: 500 }
    );
  }
}
