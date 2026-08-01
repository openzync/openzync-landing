import { describe, it, expect } from "vitest";
import { faqItems } from "@/content/faq";

describe("faqItems", () => {
  it("has questions and answers", () => {
    for (const item of faqItems) {
      expect(item.question).toBeTruthy();
      expect(item.answer).toBeTruthy();
      expect(item.question).toMatch(/\?$/);
    }
  });
  it("covers key topics", () => {
    const all = faqItems.map((i) => i.question).join(" ");
    expect(all).toMatch(/memory/i);
    expect(all).toMatch(/graph/i);
    expect(all).toMatch(/API/i);
  });
});
