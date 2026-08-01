import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("merges class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves conflicting Tailwind classes (last wins)", () => {
    // tailwind-merge strips the first `px-4` in favour of `px-6`
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("handles conditional classes (clsx semantics)", () => {
    expect(cn("base", false && "hidden", undefined, null, "visible")).toBe(
      "base visible",
    );
  });

  it("accepts arrays and objects", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });
});
