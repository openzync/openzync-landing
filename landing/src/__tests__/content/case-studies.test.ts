import { describe, it, expect } from "vitest";
import { caseStudies } from "@/content/case-studies";

describe("caseStudies", () => {
  it("has at least 1 case study", () => {
    expect(caseStudies.length).toBeGreaterThanOrEqual(1);
  });

  it("each case study has required fields", () => {
    for (const cs of caseStudies) {
      expect(cs.title).toBeTruthy();
      expect(cs.slug).toBeTruthy();
      expect(cs.excerpt).toBeTruthy();
      expect(cs.category).toBeTruthy();
      expect(cs.overview).toBeTruthy();
      expect(cs.challenge).toBeTruthy();
      expect(cs.solution).toBeTruthy();
    }
  });
});
