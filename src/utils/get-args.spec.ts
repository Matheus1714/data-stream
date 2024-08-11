import { describe, it, expect, vi, beforeAll } from "vitest";
import { getArgs } from "./get-args";

describe("getArgs", () => {
  const defaultMockArgv = ["/path/to/node", "/path/tp/script.js"];
  it("shoud return empty object", () => {
    vi.stubGlobal("process", { argv: defaultMockArgv });
    const args = getArgs();
    expect(args).toEqual({});
  });
  it("should return an objecy with true", () => {
    vi.stubGlobal("process", { argv: defaultMockArgv.concat(["-n"]) });
    const args = getArgs();
    expect(args).toEqual({ n: true });
  });
  it("should return an object with string", () => {
    vi.stubGlobal("process", { argv: defaultMockArgv.concat(["--t=name"]) });
    const args = getArgs();
    expect(args).toEqual({ t: "name" });
  });
  it("should return an object with string and boolean", () => {
    vi.stubGlobal("process", {
      argv: defaultMockArgv.concat(["--nt=name", "-a"]),
    });
    const args = getArgs();
    expect(args).toEqual({ nt: "name", a: true });
  });
  it("should return an object with boolean when use only --", () => {
    vi.stubGlobal("process", {
      argv: defaultMockArgv.concat(["--nt"]),
    });
    const args = getArgs();
    expect(args).toEqual({ nt: true });
  });
  it("should return an object a number when use and number --", () => {
    vi.stubGlobal("process", {
      argv: defaultMockArgv.concat(["--n=100"]),
    });
    const args = getArgs();
    expect(args).toEqual({ n: 100 });
  });
  it("should return an error when send --n=test", () => {
    vi.stubGlobal("process", {
      argv: defaultMockArgv.concat(["--n=test"]),
    });
    expect(() => getArgs()).toThrowError("The value --n must be a number");
  });
});
