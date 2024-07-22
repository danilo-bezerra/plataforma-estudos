import fs from "fs-extra";
import path from "path";

export function streamFile(path: string): ReadableStream {
  const nodeStream = fs.createReadStream(path);
  const data: ReadableStream = iteratorToStream(
    nodeStreamToIterator(nodeStream)
  );
  return data;
}

export async function* nodeStreamToIterator(stream: fs.ReadStream) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}

export function iteratorToStream(iterator: any) {
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

// export function getContentType(filePath: string): string {
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
export function getContentType(filePath: string): string {
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
    case ".txt":
      return "text/plain";
    case ".svg":
      return "image/svg+xml";
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".xml":
      return "application/xml";
    default:
      return "application/octet-stream";
  }
}
