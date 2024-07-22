import { getFile } from "@/services/getFile";

import { NextResponse } from "next/server";

import fs from "fs-extra";
import {
  getContentType,
  iteratorToStream,
  nodeStreamToIterator,
  streamFile,
} from "@/utils/stream-utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const file = await getFile(params.id);

    if (!file) {
      return NextResponse.json(
        {
          error: true,
          message: `Arquivo não encontrado`,
        },
        { status: 404 }
      );
    }

    const filePath = file?.path;
    const stats = await fs.stat(filePath);
    const range = req.headers.get("range");
    const contentType = getContentType(filePath);

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = end - start + 1;

      const stream = fs.createReadStream(filePath, { start, end });
      const data: ReadableStream = iteratorToStream(
        nodeStreamToIterator(stream)
      );

      return new Response(data, {
        status: 206,
        headers: new Headers({
          "Content-Range": `bytes ${start}-${end}/${stats.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": contentType,
        }),
      });
    } else {
      const stream: ReadableStream = streamFile(filePath);

      return new Response(stream, {
        status: 200,
        headers: new Headers({
          "Content-Type": contentType,
          "Content-Length": stats.size.toString(),
        }),
      });
    }
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
