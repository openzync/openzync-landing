import { describe, it, expect } from "vitest";
import { latestRelease } from "@/content/releases";

describe("latestRelease", () => {
  it("has required fields", () => {
    expect(latestRelease.version).toBeTruthy();
    expect(latestRelease.date).toBeTruthy();
    expect(latestRelease.description).toBeTruthy();
  });
});
