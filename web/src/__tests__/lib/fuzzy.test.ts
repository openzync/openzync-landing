import { describe, expect, it } from "vitest";
import { filterEntries, fuzzyScore, type PaletteEntry } from "@/lib/fuzzy";

describe("fuzzyScore", () => {
  it("empty query matches everything with score 0", () => {
    expect(fuzzyScore("", "anything")).toBe(0);
  });

  it("matches subsequences case-insensitively", () => {
    expect(fuzzyScore("GB", "GitHub")).toBeGreaterThanOrEqual(0);
  });

  it("scores contiguous runs cheaper than gapped ones", () => {
    expect(fuzzyScore("he", "hello")).toBeLessThan(fuzzyScore("ho", "hello"));
    expect(fuzzyScore("ell", "hello")).toBe(1);
    expect(fuzzyScore("ho", "hello")).toBe(3);
  });

  it("returns -1 for missing characters and out-of-order queries", () => {
    expect(fuzzyScore("z", "hello")).toBe(-1);
    expect(fuzzyScore("oh", "hello")).toBe(-1);
  });
});

describe("filterEntries", () => {
  const entries: PaletteEntry[] = [
    { id: "home", label: "Home", hint: "landing page" },
    { id: "docs", label: "Docs", hint: "documentation site" },
    { id: "github", label: "GitHub", hint: "source repository" },
  ];

  it("returns all entries in order for an empty query", () => {
    expect(filterEntries("   ", entries).map((e) => e.id)).toEqual([
      "home",
      "docs",
      "github",
    ]);
  });

  it("drops entries with no subsequence match", () => {
    expect(filterEntries("gh", entries).map((e) => e.id)).toEqual(["github"]);
    expect(filterEntries("zz", entries)).toEqual([]);
  });

  it("ranks better (lower) scores first across label and hint", () => {
    expect(filterEntries("om", entries).map((e) => e.id)).toEqual([
      "home",
      "docs",
    ]);
  });
});
