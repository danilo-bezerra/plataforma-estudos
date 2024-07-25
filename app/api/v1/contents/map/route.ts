import { ZodError } from "zod";
import { extractFiles, FolderMap, mapFiles } from "@/utils/file-mapper";
import { mapPathSchema } from "@/schemas/schemas";

export async function POST(req: Request) {
  try {
    const { path } = mapPathSchema.parse(await req.json());

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

    const files = extractFiles(map);

    return Response.json(
      {
        filesCount: files.length,
        map,
        files,
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
