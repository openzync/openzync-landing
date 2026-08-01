import { describe, it, expect } from "vitest";
import { blogCategories } from "@/content/blog";

describe("blogCategories", () => {
  it("has valid category keys and labels", () => {
    for (const cat of blogCategories) {
      expect(cat.key).toBeTruthy();
      expect(cat.label).toBeTruthy();
    }
  });

  it("includes expected categories", () => {
    const keys = blogCategories.map((c) => c.key);
    expect(keys).toContain("engineering");
    expect(keys).toContain("community");
    expect(keys).toContain("releases");
    expect(keys).toContain("tutorials");
  });
});
