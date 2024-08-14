import CompleteContentButton from "@/components/content/buttons/complete-content-btn";
import CompleteFileCheckbox from "@/components/content/files/complete-file-checkbox";
import OpenFileOnComputerButton from "@/components/content/files/open-file-on-computer-btn";
import NothingFound from "@/components/nothing-found";
import { Player } from "@/components/player/player";
import { Label } from "@/components/ui/label";
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

      <div className="px-5 flex justify-between">
        <h2>{file?.name}</h2>{" "}
        <Label className="flex gap-2 items-center">
          <CompleteFileCheckbox
            ids={{ fileId: file.id, contentId: file.contentId }}
            isCompleted={file.isCompleted}
          />
          {file.isCompleted ? "Concluído" : "Não concluído"}
        </Label>
      </div>

      <OpenFileOnComputerButton path={file.path} />
    </>
  );
}
