import { recriateFolder } from "./recriate-folder";
import { describe, it, expect, vi } from "vitest";
import fs from "node:fs";

vi.mock("node:fs");

describe("recriateFolder", () => {
  it("should remove the folder if it exists and then create a new one", () => {
    const path = "./test-folder";

    fs.existsSync = vi.fn().mockReturnValue(true);
    fs.rmSync = vi.fn();
    fs.mkdirSync = vi.fn();

    recriateFolder(path);

    expect(fs.existsSync).toHaveBeenCalledWith(path);
    expect(fs.rmSync).toHaveBeenCalledWith(path, { recursive: true });
    expect(fs.mkdirSync).toHaveBeenCalledWith(path, { recursive: true });
  });

  it("should create a new folder if it does not exist", () => {
    const path = "./new-folder";

    fs.existsSync = vi.fn().mockReturnValue(false);
    fs.mkdirSync = vi.fn();

    recriateFolder(path);

    expect(fs.existsSync).toHaveBeenCalledWith(path);
    expect(fs.rmSync).not.toHaveBeenCalledWith(path);
    expect(fs.mkdirSync).toHaveBeenCalledWith(path, { recursive: true });
  });

  it("should handle an empty string path gracefully", () => {
    const path = "";

    fs.existsSync = vi.fn().mockReturnValue(false);
    fs.mkdirSync = vi.fn();

    recriateFolder(path);

    expect(fs.existsSync).toHaveBeenCalledWith(path);
    expect(fs.rmSync).not.toHaveBeenCalledWith(path);
    expect(fs.mkdirSync).toHaveBeenCalledWith(path, { recursive: true });
  });

  it("should handle errors when removing the folder", () => {
    const path = "./error-folder";

    fs.existsSync = vi.fn().mockReturnValue(true);
    fs.rmSync = vi.fn(() => {
      throw new Error("Failed to remove folder");
    });
    fs.mkdirSync = vi.fn();

    expect(() => recriateFolder(path)).toThrow("Failed to remove folder");

    expect(fs.existsSync).toHaveBeenCalledWith(path);
    expect(fs.rmSync).toHaveBeenCalledWith(path, { recursive: true });
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it("should handle errors when creating the folder", () => {
    const path = "./error-create-folder";

    fs.existsSync = vi.fn().mockReturnValue(false);
    fs.mkdirSync = vi.fn(() => {
      throw new Error("Failed to create folder");
    });

    expect(() => recriateFolder(path)).toThrow("Failed to create folder");

    expect(fs.existsSync).toHaveBeenCalledWith(path);
    expect(fs.rmSync).not.toHaveBeenCalledWith(path);
    expect(fs.mkdirSync).toHaveBeenCalledWith(path, { recursive: true });
  });
});
