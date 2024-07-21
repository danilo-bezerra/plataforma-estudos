import fs from "fs-extra";
import path from "path";

type FileV2 = {
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
  files: FileV2[];
  folders: FolderMap[];
};

const targetFiles = [
  { name: "video", extensions: [".mp4", ".ts", ".mkv", ".mov"] },
  { name: "document", extensions: [".pdf", ".html", ".txt"] },
  { name: "audio", extensions: [".mp3"] },
  { name: "image", extensions: [".png", ".jpeg", ".jpg", ".webp", ".gif"] },
];

function isTargetFile(path: string) {
  const extension = path.split(".").reverse()[0];

  const res = targetFiles.find((t) => t.extensions.includes(`.${extension}`));

  return res ? res : false;
}
let filesCount = 0;
let foldersCount = 0;
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

        foldersCount++;
      } else {
        const target = isTargetFile(filePath);
        if (target) {
          const filename = file.split(".")[0];
          const relativePath = `${targetPath.replace(rootPath, "")}`;

          filesCount++;

          map.files.push({
            name: file.split(".")[0],
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

export function extractFiles(map: FolderMap): FileV2[] {
  const files: FileV2[] = [];

  map.files.forEach((f) => files.push(f));

  map.folders.forEach((f) => {
    files.push(...extractFiles(f));
  });

  return files;
}

export function extractFilesV2(map: FolderMap) {
  const files: FileV2[] = [];

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
