import { describe, it, expect } from "vitest";
import { statsData } from "@/content/stats";

describe("stats", () => {
  it("has at least 3 stats", () => {
    expect(statsData.length).toBeGreaterThanOrEqual(3);
  });

  it("each stat has required fields", () => {
    for (const stat of statsData) {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
      expect(stat.description).toBeTruthy();
    }
  });
});
