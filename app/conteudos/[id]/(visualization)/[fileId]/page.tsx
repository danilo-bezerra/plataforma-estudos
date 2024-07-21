import NothingFound from "@/components/nothing-found";
import { Player } from "@/components/player/player";
import { getFile } from "@/services/getFile";

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

  function onTimeUpdate(currentTime: number) {
    console.log({ currentTime });
  }

  return (
    <>
      {file?.type == "document" ? (
        <iframe className="h-full max-h-[90vh] w-full" src={url}></iframe>
      ) : null}

      <div className="flex items-center justify-center min-h-[20vh]">
        {file.type == "video" || file.type == "audio" ? (
          <Player data={file} mediaSource={url} />
        ) : null}

        {file?.type == "image" ? (
          <img loading="lazy" className="max-h-[80vh] " src={url}></img>
        ) : null}
      </div>

      <div className="px-5">
        <h2>{file?.name}</h2>
      </div>
    </>
  );
}
