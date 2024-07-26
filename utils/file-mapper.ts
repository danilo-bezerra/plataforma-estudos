import fs from "fs-extra";
import path from "path";

type File = {
  name: string;
  path: string;
  type: string;
  isCompleted: boolean;
  duration?: number;
  elapsedTime?: number;
  relativePath: string;
  contentId?: string;
};

export type FolderMap = {
  name: string;
  path: string;
  files: File[];
  folders: FolderMap[];
};

const targetFiles = [
  {
    name: "video",
    extensions: [".mp4", ".ts", ".mkv", ".mov", ".wmv", ".ts", ".avi"],
  },
  { name: "document", extensions: [".pdf", ".html", ".txt", ".xml"] },
  { name: "audio", extensions: [".mp3"] },
  {
    name: "image",
    extensions: [".png", ".jpeg", ".jpg", ".webp", ".gif", ".svg"],
  },
];

function isTargetFile(path: string) {
  const extension = path.toLowerCase().split(".").reverse()[0];

  const res = targetFiles.find((t) => t.extensions.includes(`.${extension}`));

  return res ? res : false;
}

export async function mapFiles(
  targetPath: string,
  name: string,
  rootPath: string
) {
  try {
    const pathExists = await fs.pathExists(targetPath);

    if (!pathExists) {
      return null;
    }

    const map: FolderMap = {
      name,
      path: targetPath,
      files: [],
      folders: [],
    };

    const files = await fs.readdir(targetPath);

    for (const file of files) {
      const filePath = path.join(targetPath, file);

      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        const result = await mapFiles(filePath, file, rootPath);
        if (result != null) {
          map.folders.push(result);
        }
      } else {
        const target = isTargetFile(filePath);
        if (target) {
          const filenameWordList = file.split(".");
          filenameWordList.pop();
          const filename = filenameWordList.join(".");
          const relativePath = `${targetPath.replace(rootPath, "")}`;

          map.files.push({
            name: filename,
            path: filePath,
            type: target.name,
            isCompleted: false,
            relativePath: relativePath.replace("\\", ""),
          });
        }
      }
    }

    return map;
  } catch (e: any) {
    return null;
  }
}

export function extractFiles(map: FolderMap): File[] {
  const files: File[] = [];

  map.files.forEach((f) => files.push(f));

  map.folders.forEach((f) => {
    files.push(...extractFiles(f));
  });

  return files;
}

export function extractModules(map: FolderMap) {
  const list: FolderMap[] = [map];

  map.folders.forEach((f) => {
    if (f.folders.length > 0) {
      list.push(...extractModules(f));
    }

    list.push(f);
  });

  return list;
}
