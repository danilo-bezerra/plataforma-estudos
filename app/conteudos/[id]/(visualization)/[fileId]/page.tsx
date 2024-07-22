import NothingFound from "@/components/nothing-found";
import { Player } from "@/components/player/player";
import { getFile } from "@/services/getFile";
import Image from "next/image";

type Props = {
  params: { id: string; fileId: string };
};

export default async function FilePage({ params }: Props) {
  const file = await getFile(params.fileId);

  if (!file) {
    return (
      <div className="pt-5">
        <NothingFound />
      </div>
    );
  }

  const url = `${process.env.URL}/api/v1/send/${params.fileId}`;

  return (
    <>
      {file?.type == "document" ? (
        <iframe
          className="h-full border-2 border-primary w-full"
          src={url}
        ></iframe>
      ) : null}

      {file.type == "video" || file.type == "audio" ? (
        <div className="flex items-center justify-center min-h-[20vh]">
          <Player data={file} mediaSource={url} />
        </div>
      ) : null}

      {file?.type == "image" ? (
        <div className="flex items-center justify-center min-h-[20vh]">
          <Image
            loading="lazy"
            className="max-h-[80vh]"
            alt={file.name}
            width={0}
            height={0}
            src={url}
          />{" "}
        </div>
      ) : null}

      <div className="px-5">
        <h2>{file?.name}</h2>
      </div>
    </>
  );
}
