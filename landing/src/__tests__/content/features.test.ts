import { describe, it, expect } from "vitest";
import { features, categories } from "@/content/features";

describe("features", () => {
  it("has at least 5 features", () => {
    expect(features.length).toBeGreaterThanOrEqual(5);
  });

  it("each feature has required fields", () => {
    for (const f of features) {
      expect(f.title).toBeTruthy();
      expect(f.description).toBeTruthy();
      expect(f.icon).toBeTruthy();
      expect(f.category).toBeTruthy();
    }
  });

  it("categories are valid", () => {
    const valid = ["graph", "memory", "llm", "tools", "observability"];
    for (const f of features) {
      expect(valid).toContain(f.category);
    }
  });
});
