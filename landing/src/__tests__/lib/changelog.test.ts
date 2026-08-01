import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

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

import { getAllChangelogEntries, getChangelogEntry } from "@/lib/changelog";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getAllChangelogEntries()", () => {
  it("returns an empty array when changelog directory does not exist", () => {
    mockFs.existsSync.mockReturnValue(false);
    const entries = getAllChangelogEntries();
    expect(entries).toEqual([]);
  });

  it("parses .mdx files with version metadata", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["v1-0-0.mdx"]);
    mockFs.readFileSync.mockReturnValue(
      '---\ntitle: v1.0.0\ndate: 2026-07-01\nversion: 1.0.0\nexcerpt: Initial release\n---\n\nRelease notes',
    );

    const entries = getAllChangelogEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      slug: "v1-0-0",
      title: "v1.0.0",
      date: "2026-07-01",
      version: "1.0.0",
      excerpt: "Initial release",
    });
  });

  it("applies defaults when metadata is missing", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["test-entry.mdx"]);
    mockFs.readFileSync.mockReturnValue(
      '---\ndate: 2026-01-01\n---\n\nSome content here',
    );

    const entries = getAllChangelogEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].title).toBe("test-entry"); // slug as fallback
    expect(entries[0].version).toBe("");
    expect(entries[0].excerpt).toBeTruthy();
  });
});

describe("getChangelogEntry()", () => {
  it("returns null when the file does not exist", async () => {
    mockFs.existsSync.mockReturnValue(false);
    const entry = await getChangelogEntry("nonexistent");
    expect(entry).toBeNull();
  });

  it("returns compiled MDX for an existing entry", async () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(
      '---\ntitle: v2.0.0\ndate: 2026-08-01\nversion: 2.0.0\n---\n\nBig release',
    );

    const entry = await getChangelogEntry("v2-0-0");
    expect(entry).not.toBeNull();
    expect(entry!.slug).toBe("v2-0-0");
    expect(entry!.title).toBe("v2.0.0");
    expect(entry!.version).toBe("2.0.0");
    expect(entry!.MDXContent).toBeDefined();
  });
});
