"use server";
import { exec } from "child_process";

export async function openFile(filePath: string) {
  try {
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

    exec(command, (error) => {
      if (error) {
        console.error(`Error opening file: ${error.message}`);
      }
    });
  } catch (error) {
    console.error(`Error in openFile function: ${error}`);
  }
}
