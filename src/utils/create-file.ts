import fs from "node:fs";

export function createFile(path: string, content: string) {
  const stream = fs.createWriteStream(path);
  stream.write(content);
  stream.close();
}
