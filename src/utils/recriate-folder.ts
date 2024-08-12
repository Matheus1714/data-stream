import fs from "node:fs";

export function recriateFolder(path: string) {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true });
  }
  fs.mkdirSync(path, { recursive: true });
}
