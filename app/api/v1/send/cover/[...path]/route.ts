import { getFile } from "@/services/getFile";

import { NextResponse } from "next/server";

import fs from "fs-extra";
import {
  getContentType,
  iteratorToStream,
  nodeStreamToIterator,
  streamFile,
} from "@/utils/stream-utils";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = path.join(process.cwd(), "public", params.path.join("/"));
    const stats = await fs.stat(filePath);
    const contentType = getContentType(filePath);

    const stream: ReadableStream = streamFile(filePath);
    console.log("sem range");
    return new Response(stream, {
      status: 200,
      headers: new Headers({
        "Content-Type": contentType,
        "Content-Length": stats.size.toString(),
      }),
    });
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
