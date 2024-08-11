import fs from "node:fs";
import * as config from "../config";
import { generateFakeData } from "./generate-fake-data";

export function writeFakeDataToFile() {
  const stream = fs.createWriteStream(config.OUT_FILE_PATH);

  Array.from({ length: config.NUMBER_OF_DATA }).forEach(() => {
    const fakeData = generateFakeData();
    stream.write(`${fakeData}\n`);
  });

  stream.end();
}
