import fs from "node:fs";
import * as config from "../config";
import { generateFakeData } from "./generate-fake-data";
import { progress } from "../libs/cli-progress";

export async function writeFakeDataToFile(): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(config.OUT_FILE_PATH);
    progress.start(config.NUMBER_OF_DATA, 0);

    Array.from({ length: config.NUMBER_OF_DATA }).forEach((_, index) => {
      if (index % 100) {
        progress.update(index + 1);
      }

      const fakeData = generateFakeData();
      stream.write(`${fakeData}\n`);
    });

    stream.on("error", (err) => {
      reject(err);
    });

    stream.end();
    progress.stop();
    resolve();
  });
}
