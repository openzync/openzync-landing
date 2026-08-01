import { describe, it, expect } from "vitest";
import { parseFrontmatter } from "@/lib/frontmatter";

describe("parseFrontmatter()", () => {
  it("parses standard frontmatter", () => {
    const input = `---
title: Hello World
date: 2026-01-15
author: OpenZync Team
---

# Content here`;

    const result = parseFrontmatter(input);
    expect(result.metadata).toEqual({
      title: "Hello World",
      date: "2026-01-15",
      author: "OpenZync Team",
    });
    expect(result.content).toBe("# Content here");
  });

  it("handles quoted values by stripping quotes", () => {
    const input = `---
title: "Quoted Title"
---

Body`;
    const result = parseFrontmatter(input);
    expect(result.metadata.title).toBe("Quoted Title");
  });

  it("returns empty metadata and full content when no frontmatter", () => {
    const input = "Just content without frontmatter";
    const result = parseFrontmatter(input);
    expect(result.metadata).toEqual({});
    expect(result.content).toBe("Just content without frontmatter");
  });

  it("handles empty frontmatter (--- ---)", () => {
    const input = `---
---

Content after empty frontmatter`;
    const result = parseFrontmatter(input);
    expect(result.metadata).toEqual({});
    expect(result.content).toBe("Content after empty frontmatter");
  });

  it("parses multiline content after frontmatter", () => {
    const input = `---
title: Post
---

Paragraph one.

Paragraph two.`;
    const result = parseFrontmatter(input);
    expect(result.metadata.title).toBe("Post");
    expect(result.content).toContain("Paragraph one.");
    expect(result.content).toContain("Paragraph two.");
  });

  it("handlines colon in value correctly (takes everything after first colon)", () => {
    const input = `---
title: OpenZync: The Future
---

Content`;
    const result = parseFrontmatter(input);
    expect(result.metadata.title).toBe("OpenZync: The Future");
  });
});
