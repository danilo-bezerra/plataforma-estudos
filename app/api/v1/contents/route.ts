import { db } from "@/lib/db";

import { createContentSchema } from "@/schemas/schemas";
import { ZodError } from "zod";
import { extractFiles, FolderMap, mapFiles } from "@/utils/file-mapper";

import { fileUpload } from "@/lib/file-upload";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("cover") as Blob | null;
    const { cover: c, ...body } = Object.fromEntries(formData);
    const { path, name } = createContentSchema.parse(body);

    let cover: null | string = null;

    if (file) {
      const uploadResult = await fileUpload(file);

      if (uploadResult?.success) {
        cover = uploadResult.fileUrl;
      }
    }

    const map: FolderMap | null = await mapFiles(path, "", path);

    if (!map) {
      return Response.json(
        {
          error: true,
          message: `Caminho de pasta não encontrado no computador`,
        },
        { status: 400 }
      );
    }
    const contentId = crypto.randomUUID();
    const content = await db.content.create({
      data: {
        id: contentId,
        name,
        path,
        cover,
      },
    });

    const files = extractFiles(map);

    if (!files) {
      return Response.json(
        {
          error: true,
          message: `Sem files`,
        },
        { status: 400 }
      );
    }

    const createdFiles = await db.fileV2.createMany({
      data: files.map((f) => ({ ...f, contentId })),
    });

    return Response.json(
      {
        content,
        createdFiles,
      },
      { status: 201 }
    );
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
        e,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const list = await db.content.findMany();

    return Response.json(list);
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
}
