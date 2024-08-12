import { getArgs } from "./utils/get-args";

const args = getArgs();

export const NUMBER_OF_DATA = args["n"] ?? 100;
export const OUT_FILE_PATH = "data.csv";
export const OUT_FOLDER_CHUNK = "out";
export const LINES_PER_CHUNK = 100;
