import { describe, it, expect } from "vitest";
import { navItems, footerLinks } from "@/content/site-config";

describe("navItems", () => {
  it("has valid items with href or children", () => {
    for (const item of navItems) {
      expect(item.label).toBeTruthy();
      expect(item.href || item.children).toBeTruthy();
    }
  });

  it("includes key navigation entries", () => {
    const labels = navItems.map((n) => n.label);
    expect(labels).toContain("Why OpenZync");
    expect(labels).toContain("Get Started");
  });
});

describe("footerLinks", () => {
  it("has sections with links", () => {
    const sections = Object.keys(footerLinks);
    expect(sections.length).toBeGreaterThanOrEqual(4);
    expect(footerLinks.product.length).toBeGreaterThan(0);
    expect(footerLinks.legal.length).toBeGreaterThan(0);
  });
});
