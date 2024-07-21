import { stat, mkdir, writeFile } from "fs-extra";
import mime from "mime";
import * as dateFn from "date-fns";
import { join } from "path";

export async function fileUpload(file: Blob) {
  try {
    if (!file) {
      return {
        error: true,
        message: "arquivo não encontrado",
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${dateFn.format(
      Date.now(),
      "dd-MM-Y"
    )}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return {
          error: true,
          message: "erro ao checar diretório de upload",
        };
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;
      return {
        success: true,
        fileUrl,
      };
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return {
        error: true,
        message: "erro ao salvar arquivo",
      };
    }
  } catch {
    return {
      error: true,
      message: "ocorreu um erro ao salvar arquivo",
    };
  }
}
