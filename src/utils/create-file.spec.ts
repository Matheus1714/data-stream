import { describe, it, expect, vi } from "vitest";
import { createFile } from "./create-file";
import fs from "node:fs";

vi.mock("node:fs");

describe("create-file", () => {
  it("should create a file and write the content to it", () => {
    const path = "./test-file.txt";
    const content = "Hello, world!";

    const mockWriteStream = {
      write: vi.fn(),
      close: vi.fn(),
    };
    fs.createWriteStream = vi.fn().mockReturnValue(mockWriteStream);

    createFile(path, content);

    expect(fs.createWriteStream).toHaveBeenCalledWith(path);
    expect(mockWriteStream.write).toHaveBeenCalledWith(content);
    expect(mockWriteStream.close).toHaveBeenCalled();
  });

  it("should handle an empty content", () => {
    const path = "./empty-file.txt";
    const content = "";

    const mockWriteStream = {
      write: vi.fn(),
      close: vi.fn(),
    };
    fs.createWriteStream = vi.fn().mockReturnValue(mockWriteStream);

    createFile(path, content);

    expect(fs.createWriteStream).toHaveBeenCalledWith(path);
    expect(mockWriteStream.write).toHaveBeenCalledWith(content);
    expect(mockWriteStream.close).toHaveBeenCalled();
  });

  it("should handle errors when writing to the file", () => {
    const path = "./error-file.txt";
    const content = "This will fail";

    const mockWriteStream = {
      write: vi.fn(() => {
        throw new Error("Failed to write to file");
      }),
      close: vi.fn(),
    };
    fs.createWriteStream = vi.fn().mockReturnValue(mockWriteStream);

    expect(() => createFile(path, content)).toThrow("Failed to write to file");

    expect(fs.createWriteStream).toHaveBeenCalledWith(path);
    expect(mockWriteStream.write).toHaveBeenCalledWith(content);
    expect(mockWriteStream.close).not.toHaveBeenCalled();
  });

  it("should handle errors when closing the file", () => {
    const path = "./error-close-file.txt";
    const content = "This will fail on close";

    const mockWriteStream = {
      write: vi.fn(),
      close: vi.fn(() => {
        throw new Error("Failed to close the file");
      }),
    };
    fs.createWriteStream = vi.fn().mockReturnValue(mockWriteStream);

    expect(() => createFile(path, content)).toThrow("Failed to close the file");

    expect(fs.createWriteStream).toHaveBeenCalledWith(path);
    expect(mockWriteStream.write).toHaveBeenCalledWith(content);
    expect(mockWriteStream.close).toHaveBeenCalled();
  });
});
