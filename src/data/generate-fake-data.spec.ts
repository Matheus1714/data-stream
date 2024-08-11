import { describe, it, expect } from "vitest";
import { generateFakeData } from "./generate-fake-data";

describe("Tests generate fake data", () => {
  it("should return a fake string when called", () => {
    const fake = generateFakeData();
    expect(typeof fake).toBe("string");
    expect(fake.includes(",")).toBe(true);
  });
});
