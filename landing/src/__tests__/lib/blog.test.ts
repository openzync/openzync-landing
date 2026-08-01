import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

// vi.mock factories are hoisted — use vi.hoisted() for shared state
const mockFs = vi.hoisted(() => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
}));

vi.mock("fs", () => ({
  default: mockFs,
  existsSync: mockFs.existsSync,
  readdirSync: mockFs.readdirSync,
  readFileSync: mockFs.readFileSync,
}));

vi.mock("path", () => ({
  default: {
    join: (...args: string[]) => args.join("/"),
    resolve: (...args: string[]) => args.join("/"),
  },
  join: (...args: string[]) => args.join("/"),
  resolve: (...args: string[]) => args.join("/"),
}));

vi.mock("next-mdx-remote/rsc", () => ({
  compileMDX: vi.fn().mockResolvedValue({
    content: React.createElement("div", { "data-testid": "mocked-mdx" }, "Mocked Content"),
  }),
}));

vi.mock("@/app/mdx-components", () => ({
  useMDXComponents: vi.fn(() => ({})),
}));

import { getAllBlogPosts, getBlogPost } from "@/lib/blog";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getAllBlogPosts()", () => {
  it("returns an empty array when blog directory does not exist", () => {
    mockFs.existsSync.mockReturnValue(false);
    const posts = getAllBlogPosts();
    expect(posts).toEqual([]);
  });

  it("parses .mdx files from the blog directory", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["hello-world.mdx"]);
    mockFs.readFileSync.mockReturnValue(
      '---\ntitle: Hello World\ndate: 2026-01-15\nauthor: Alice\ncategory: engineering\n---\n\nContent body',
    );

    const posts = getAllBlogPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      slug: "hello-world",
      title: "Hello World",
      date: "2026-01-15",
      author: "Alice",
      category: "engineering",
    });
    expect(posts[0].content).toBeTruthy();
  });

  it("skips non-.mdx files", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["notes.txt", "readme.md"]);

    const posts = getAllBlogPosts();
    expect(posts).toEqual([]);
  });

  it("sorts posts by date descending", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["first.mdx", "second.mdx"]);
    mockFs.readFileSync
      .mockReturnValueOnce('---\ntitle: Second\ndate: 2026-02-01\n---\n\nBody')
      .mockReturnValueOnce('---\ntitle: First\ndate: 2026-01-15\n---\n\nBody');

    const posts = getAllBlogPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Second");
    expect(posts[1].title).toBe("First");
  });
});

describe("getBlogPost()", () => {
  it("returns null when the file does not exist", async () => {
    mockFs.existsSync.mockReturnValue(false);
    const post = await getBlogPost("nonexistent");
    expect(post).toBeNull();
  });

  it("returns compiled MDX for an existing post", async () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(
      '---\ntitle: Test Post\ndate: 2026-03-01\nauthor: Bob\ncategory: releases\n---\n\n# Hello',
    );

    const post = await getBlogPost("test-post");
    expect(post).not.toBeNull();
    expect(post!.slug).toBe("test-post");
    expect(post!.title).toBe("Test Post");
    expect(post!.date).toBe("2026-03-01");
    expect(post!.author).toBe("Bob");
    expect(post!.category).toBe("releases");
    expect(post!.MDXContent).toBeDefined();
  });
});
