// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Blog utilities
// ═══════════════════════════════════════════════════════════════════════════════

import fs from "fs";
import path from "path";
import { cache } from "react";
import type { ReactElement } from "react";
import type { Root } from "hast";
import type { BlogPost } from "@/content/blog";
import { parseFrontmatter } from "@/lib/frontmatter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useMDXComponents } from "@/app/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/** Estimate reading time (minutes) from raw post content. */
function readingTimeOf(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** A single table-of-contents entry, ids produced by rehype-slug. */
export interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Concatenate the text of a hast node tree (headings can contain inline code). */
function textOf(node: { type: string; value?: string; children?: unknown[] }): string {
  if (node.type === "text") return node.value ?? "";
  if (node.children) return node.children.map((c) => textOf(c as never)).join("");
  return "";
}

/**
 * Collect h2/h3 headings into a ref after rehype-slug has assigned ids.
 * Reading ids from the compiled tree guarantees the TOC anchors always
 * match the rendered headings, including duplicate-heading `-1` suffixes.
 */
function collectHeadings(ref: Heading[]) {
  return (tree: Root): void => {
    const visit = (nodes: unknown[]): void => {
      for (const node of nodes) {
        const el = node as { type: string; tagName?: string; properties?: Record<string, unknown>; children?: unknown[] };
        if (el.type === "element" && (el.tagName === "h2" || el.tagName === "h3")) {
          const id = el.properties?.id;
          if (typeof id === "string" && id.length > 0) {
            ref.push({
              id,
              text: textOf(el as never).trim(),
              level: Number(el.tagName[1]),
            });
          }
        }
        if (el.children) visit(el.children);
      }
    };
    visit(tree.children);
  };
}

/** A blog post ready to render in the detail page. */
export type BlogPostDetail = Omit<BlogPost, "content"> & {
  readingTime: number;
  headings: Heading[];
  MDXContent: ReactElement;
};

/** Get all blog posts (including content), sorted by date descending. */
export const getAllBlogPosts = cache((): BlogPost[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseFrontmatter(raw);

    posts.push({
      slug,
      title: metadata.title ?? slug,
      date: metadata.date ?? "",
      excerpt: metadata.excerpt ?? content.slice(0, 200).replace(/[#*`]/g, "").trim(),
      author: metadata.author ?? "OpenZync Team",
      category: metadata.category ?? "community",
      content,
      seoTitle: metadata.seoTitle || undefined,
      seoDescription: metadata.seoDescription || undefined,
      keywords: metadata.keywords
        ?.split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      updated: metadata.updated || undefined,
      image: metadata.image || undefined,
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
});

/** Get a single blog post by slug, compiled as MDX. */
export const getBlogPost = cache(async (slug: string): Promise<BlogPostDetail | null> => {
  // Reuse the already-loaded post instead of a second readFileSync of the
  // same file — generateMetadata + page + opengraph-image each call this per
  // request, and React cache() dedupes those to one compile.
  const meta = getAllBlogPosts().find((p) => p.slug === slug);
  if (!meta) return null;

  const content = meta.content;
  const headings: Heading[] = [];

  const { content: MDXContent } = await compileMDX({
    source: content,
    components: useMDXComponents({}),
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [collectHeadings, headings]],
      },
    },
  });

  return {
    slug,
    title: meta.title,
    date: meta.date,
    excerpt: meta.excerpt,
    author: meta.author,
    category: meta.category,
    readingTime: readingTimeOf(content),
    headings,
    MDXContent,
    seoTitle: meta.seoTitle,
    seoDescription: meta.seoDescription,
    keywords: meta.keywords,
    updated: meta.updated,
    image: meta.image,
  };
});
