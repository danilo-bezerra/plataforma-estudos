import { exec } from "child_process";
import path from "path";

const compatibleExtensions: string[] = [
  "mp4",
  "webm",
  "ogg",
  "avi",
  "mov",
  "3gp",
];

export const noCompatibleVideoWarningPath = path.join(
  process.cwd(),
  "public",
  "videos",
  "aviso-reproducao.mp4"
);

export function isVideoExtensionCompatible(filePath: string): boolean {
  console.log(`[VERIFICANDO] - ${filePath}`);
  try {
    // Extrair a extensão do arquivo
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

export function openNativeVideoPlayer(filePath: string): void {
  console.log(`[EXECUTANDO] - abrir player nativo`);
  try {
    // Comando para abrir o player de vídeo nativo
    let command: string;

    // Detectar o sistema operacional e configurar o comando apropriado
    switch (process.platform) {
      case "win32":
        command = `start "" "${filePath}"`; // Windows
        break;
      case "darwin":
        command = `open "${filePath}"`; // macOS
        break;
      case "linux":
        command = `xdg-open "${filePath}"`; // Linux
        break;
      default:
        console.error("Unsupported OS");
        return;
    }

    // Executar o comando
    exec(command, (error) => {
      if (error) {
        console.error(`Error opening video player: ${error.message}`);
      }
    });
  } catch (error) {
    console.error(`Error in openNativeVideoPlayer function: ${error}`);
  }
}
