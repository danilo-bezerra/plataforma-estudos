import NothingFound from "@/components/nothing-found";
import { Player } from "@/components/player/player";
import { getFile } from "@/services/getFile";
import { checkFileExistence } from "@/utils/stream-utils";

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

  const fileStillExists = await checkFileExistence(file.path);
  let url = `${process.env.URL}/api/v1/send/${params.fileId}`;

  if (!fileStillExists) {
    url = `${process.env.URL}/images/nao-encontrado.gif`;
    file.type = "image";
  }

  return (
    <>
      {file?.type == "document" ? (
        <iframe className="h-full w-full" src={url}></iframe>
      ) : null}

      {file.type == "video" || file.type == "audio" ? (
        <div className="flex items-center  min-h-[20vh]">
          <Player data={file} mediaSource={url} />
        </div>
      ) : null}

      {file?.type == "image" ? (
        <div className="flex items-center justify-center min-h-[20vh]">
          <img
            loading="lazy"
            className="max-h-[80vh] aspect-auto "
            alt={file.name}
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
