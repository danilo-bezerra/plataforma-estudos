import { db } from "@/lib/db";
import { fileUpload } from "@/lib/file-upload";
import { updateContentSchema } from "@/schemas/schemas";
import { extractFiles, FolderMap, mapFiles } from "@/utils/file-mapper";
import { ZodError } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await db.content.findUnique({
      include: {
        files: true,
      },
      where: {
        id: params.id,
      },
    });

    if (!data) {
      return Response.json(
        {
          error: true,
          message: `Conteúdo não encontrado`,
        },
        { status: 404 }
      );
    }

    return Response.json(data);
  } catch (e: any) {
    console.log({ e });
    return Response.json(
      {
        error: true,
        message: `Ocorreu um erro: ${JSON.stringify(e)}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    try {
      const data = await db.content.findUnique({
        where: {
          id: params.id,
        },
      });

      if (!data) {
        return Response.json(
          {
            error: true,
            message: `Conteúdo não encontrado`,
          },
          { status: 404 }
        );
      }

      const formData = await req.formData();
      const file = formData.get("cover") as Blob | null;
      const { cover: c, ...bodyData } = Object.fromEntries(formData);
      const { isCompleted, isFavorite, ...body } =
        updateContentSchema.parse(bodyData);

      let cover: string | null = data.cover;

      if (file) {
        const uploadResult = await fileUpload(file);

        if (uploadResult?.success) {
          cover = uploadResult.fileUrl;
        }
      }

      if (body.path && body.path != data.path) {
        const map: FolderMap | null = await mapFiles(body.path, "", body.path);

        if (!map) {
          return Response.json(
            {
              error: true,
              message: `Caminho de pasta não encontrado no computador`,
            },
            { status: 400 }
          );
        }

        const files = extractFiles(map);

        if (!files) {
          return Response.json(
            {
              error: true,
              message: `O diretório não tem arquivos`,
            },
            { status: 400 }
          );
        }

        await db.fileV2.deleteMany({
          where: {
            contentId: data.id,
          },
        });

        const filesV2 = await db.fileV2.createMany({
          data: files.map((f) => ({ ...f, contentId: data.id })),
        });
      }

      const updated = await db.content.update({
        where: {
          id: params.id,
        },
        data: {
          isCompleted: isCompleted ? isCompleted == "true" : data.isCompleted,
          isFavorite: isFavorite ? isFavorite == "true" : data.isFavorite,
          ...body,
          cover,
        },
      });

      return Response.json(updated);
    } catch (e: any) {
      if (e instanceof ZodError) {
        return Response.json(
          {
            error: true,
            message: `Ocorreu um erro de validação: ${JSON.stringify(e)}`,
            zodError: e,
          },
          { status: 500 }
        );
      }
      console.log({ e });
      return Response.json(
        {
          error: true,
          message: `Ocorreu um erro: ${JSON.stringify(e)}`,
        },
        { status: 500 }
      );
    }
  } catch {}
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    try {
      const data = await db.content.findUnique({
        where: {
          id: params.id,
        },
      });

      if (!data) {
        return Response.json(
          {
            error: true,
            message: `Conteúdo não encontrado`,
          },
          { status: 404 }
        );
      }

      const deleted = await db.content.delete({
        where: {
          id: params.id,
        },
      });

      return Response.json(deleted);
    } catch (e: any) {
      return Response.json(
        {
          error: true,
          message: `Ocorreu um erro: ${JSON.stringify(e)}`,
        },
        { status: 500 }
      );
    }
  } catch {}
}
