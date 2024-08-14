import { exec } from "child_process";
import path from "path";

const compatibleExtensions: string[] = ["mp4", "webm", "ogg", "3gp", "mov"];

export const noCompatibleVideoWarningPath = path.join(
  process.cwd(),
  "public",
  "videos",
  "aviso-reproducao.mp4"
);

export function isVideoExtensionCompatible(filePath: string): boolean {
  try {
    const fileExtension = path.extname(filePath).slice(1).toLowerCase();

    // Verificar se a extensão é compatível
    if (!compatibleExtensions.includes(fileExtension)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error checking video extension compatibility: ${error}`);
    return false;
  }
}

// export function openNativeVideoPlayer(filePath: string): void {
//   try {
//     let command: string;

//     // Detectar o sistema operacional e configurar o comando apropriado
//     switch (process.platform) {
//       case "win32":
//         command = `start "" "${filePath}"`; // Windows
//         break;
//       case "darwin":
//         command = `open "${filePath}"`; // macOS
//         break;
//       case "linux":
//         command = `xdg-open "${filePath}"`; // Linux
//         break;
//       default:
//         console.error("Unsupported OS");
//         return;
//     }

//     exec(command, (error) => {
//       if (error) {
//         console.error(`Error opening video player: ${error.message}`);
//       }
//     });
//   } catch (error) {
//     console.error(`Error in openNativeVideoPlayer function: ${error}`);
//   }
// }
