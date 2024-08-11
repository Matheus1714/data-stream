import { describe, it, expect, vi } from "vitest";
import fs from "node:fs";
import { writeFakeDataToFile } from "./write-fake-data-to-file";
import * as config from "../config";

vi.mock("./generate-fake-data", () => ({
  generateFakeData: vi.fn(() => "fakeData"),
}));

vi.mock("node:fs");

describe("Test writeFakeDataToFile", () => {
  it("Must write fake data in file", () => {
    const fakeStream = { write: vi.fn(), end: vi.fn() };
    vi.spyOn(fs, "createWriteStream").mockReturnValue(fakeStream as any);

    writeFakeDataToFile();

    expect(fs.createWriteStream).toHaveBeenCalledWith(config.OUT_FILE_PATH);
    expect(fakeStream.write).toHaveBeenCalledTimes(config.NUMBER_OF_DATA);
    expect(fakeStream.write).toHaveBeenCalledWith("fakeData\n");
    expect(fakeStream.end).toHaveBeenCalled();
  });
});
