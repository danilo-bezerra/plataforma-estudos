import { db } from "@/lib/db";
import { fileUpload } from "@/lib/file-upload";
import { updateContentSchema } from "@/schemas/schemas";
import { extractFiles, FolderMap, mapFiles } from "@/utils/file-mapper";
import { ZodError } from "zod";

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

      const map: FolderMap | null = await mapFiles(data.path, "", data.path);

      if (!map) {
        return Response.json(
          {
            error: true,
            message: `Caminho de pasta não encontrado no computador`,
          },
          { status: 400 }
        );
      }

      const foundFiles = extractFiles(map);

      const existingFiles = await db.fileV2.findMany({
        where: {
          contentId: params.id,
        },
      });

      const filesToDelete = existingFiles.filter(
        (f) => !foundFiles.find((ef) => ef.path == f.path)
      );

      const deleted = await db.fileV2.deleteMany({
        where: {
          id: {
            in: filesToDelete.map((f) => f.id),
          },
        },
      });

      const filesToAdd = foundFiles.filter(
        (f) => !existingFiles.find((ef) => ef.path == f.path)
      );

      const added = await db.fileV2.createMany({
        data: filesToAdd.map((f) => ({ ...f, contentId: data.id })),
      });

      return Response.json({
        message: `novos arquivos: ${added.count}, arquivos apagados: ${deleted.count}`,
      });
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
