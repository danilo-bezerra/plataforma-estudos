// // import { db } from "@/lib/db";
// // import { getFile } from "@/services/getFile";
// // import { ZodError } from "zod";
// // import path from "path";

// // import { NextResponse } from "next/server";

// // import fs from "fs-extra";

// // function getContentType(filePath: string): string {
// //   const ext = path.extname(filePath).toLowerCase();
// //   switch (ext) {
// //     case ".pdf":
// //       return "application/pdf";
// //     case ".jpg":
// //     case ".jpeg":
// //       return "image/jpeg";
// //     case ".png":
// //       return "image/png";
// //     case ".gif":
// //       return "image/gif";
// //     case ".mp4":
// //       return "video/mp4";
// //     case ".mp3":
// //       return "audio/mpeg";
// //     default:
// //       return "application/octet-stream";
// //   }
// // }

// // async function* nodeStreamToIterator(stream: fs.ReadStream) {
// //   for await (const chunk of stream) {
// //     yield new Uint8Array(chunk);
// //   }
// // }

// // function iteratorToStream(iterator: any) {
// //   return new ReadableStream({
// //     async pull(controller) {
// //       const { value, done } = await iterator.next();
// //       if (done) {
// //         controller.close();
// //       } else {
// //         controller.enqueue(value);
// //       }
// //     },
// //   });
// // }

// // export function streamFile(path: string): ReadableStream {
// //   const nodeStream = fs.createReadStream(path);
// //   const data: ReadableStream = iteratorToStream(
// //     nodeStreamToIterator(nodeStream)
// //   );
// //   return data;
// // }

// // export async function GET(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const file = await getFile(params.id);

// //     if (!file) {
// //       return Response.json(
// //         {
// //           error: true,
// //           message: `Arquivo não encontrado`,
// //         },
// //         { status: 404 }
// //       );
// //     }

// //     const filePath = file?.path;

// //     const stats = await fs.stat(filePath);
// //     const stream: ReadableStream = streamFile(filePath);
// //     return new Response(stream, {
// //       status: 200,
// //       headers: new Headers({
// //         "content-type": getContentType(filePath),
// //         "content-length": stats.size.toString(),
// //       }),
// //     });
// //   } catch (e: any) {
// //     console.log({ e });
// //     return Response.json(
// //       {
// //         error: true,
// //         message: `Ocorreu um erro: ${JSON.stringify(e)}`,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { db } from "@/lib/db";
// import { getFile } from "@/services/getFile";
// import { ZodError } from "zod";
// import path from "path";
// import { NextResponse } from "next/server";
// import fs from "fs-extra";

// async function* nodeStreamToIterator(stream: fs.ReadStream) {
//   for await (const chunk of stream) {
//     yield new Uint8Array(chunk);
//   }
// }

// function iteratorToStream(iterator: any) {
//   return new ReadableStream({
//     async pull(controller) {
//       const { value, done } = await iterator.next();
//       if (done) {
//         controller.close();
//       } else {
//         controller.enqueue(value);
//       }
//     },
//   });
// }

export function streamFile(path: string): ReadableStream {
  const nodeStream = fs.createReadStream(path);
  const data: ReadableStream = iteratorToStream(
    nodeStreamToIterator(nodeStream)
  );
  return data;
}

// function getContentType(filePath: string): string {
//   const ext = path.extname(filePath).toLowerCase();
//   switch (ext) {
//     case ".pdf":
//       return "application/pdf";
//     case ".jpg":
//     case ".jpeg":
//       return "image/jpeg";
//     case ".png":
//       return "image/png";
//     case ".gif":
//       return "image/gif";
//     case ".mp4":
//       return "video/mp4";
//     case ".mp3":
//       return "audio/mpeg";
//     default:
//       return "application/octet-stream";
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const file = await getFile(params.id);

//     if (!file) {
//       return NextResponse.json(
//         {
//           error: true,
//           message: `Arquivo não encontrado`,
//         },
//         { status: 404 }
//       );
//     }

//     const filePath = file?.path;
//     const stats = await fs.stat(filePath);
//     const stream: ReadableStream = streamFile(filePath);

//     return new Response(stream, {
//       status: 200,
//       headers: new Headers({
//         "content-type": getContentType(filePath),
//         "content-length": stats.size.toString(),
//       }),
//     });
//   } catch (e: any) {
//     console.log({ e });
//     return NextResponse.json(
//       {
//         error: true,
//         message: `Ocorreu um erro: ${JSON.stringify(e)}`,
//       },
//       { status: 500 }
//     );
//   }
// }
import { db } from "@/lib/db";
import { getFile } from "@/services/getFile";
import { ZodError } from "zod";
import path from "path";
import { NextResponse } from "next/server";
import fs from "fs-extra";

async function* nodeStreamToIterator(stream: fs.ReadStream) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".pdf":
      return "application/pdf";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".mp4":
      return "video/mp4";
    case ".mp3":
      return "audio/mpeg";
    default:
      return "application/octet-stream";
  }
}

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
