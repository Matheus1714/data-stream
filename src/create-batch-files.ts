import { randomUUID } from "node:crypto";
import fs from "node:fs";
import readline from "node:readline";
import * as config from "./config";
import { recriateFolder } from "./utils/recriate-folder";
import { createFile } from "./utils/create-file";
import { progress } from "./libs/cli-progress";

function outPath(index: number) {
  return `${config.OUT_FOLDER_CHUNK}/${index}_${randomUUID()}.csv`;
}

export async function createBatchFiles() {
  const stream = fs.createReadStream(config.OUT_FILE_PATH);
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  progress.start(config.NUMBER_OF_DATA, 0);

  let count = 0;
  let lineBuffer: string[] = [];

  stream.on("open", () => recriateFolder(config.OUT_FOLDER_CHUNK));

  rl.on("line", (line) => {
    lineBuffer.push(line);

    if (lineBuffer.length === config.LINES_PER_CHUNK) {
      count++;
      progress.update(
        Math.floor(count * (config.LINES_PER_CHUNK / config.NUMBER_OF_DATA))
      );
      const csvPath = outPath(count);
      const content = lineBuffer.join("\n");

      createFile(csvPath, content.concat("\n"));

      lineBuffer = [];
    }
  });

  rl.on("error", (err) => {
    console.error(err);
  });

  rl.on("close", () => {
    progress.stop();
  });
}
