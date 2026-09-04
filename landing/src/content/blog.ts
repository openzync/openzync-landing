// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Blog & News Data
// ═══════════════════════════════════════════════════════════════════════════════

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  content: string;
  /** SEO <title>: keyword-first, ≤60 chars. Falls back to title. */
  seoTitle?: string;
  /** SEO meta description: 150–160 chars. Falls back to excerpt. */
  seoDescription?: string;
  /** Meta keywords parsed from comma-separated frontmatter. */
  keywords?: string[];
  /** Frontmatter `updated` date; falls back to date for dateModified. */
  updated?: string;
  /** Per-post OG/JSON-LD image path; falls back to siteConfig.ogImage. */
  image?: string;
}

export type BlogCategory = "engineering" | "community" | "releases" | "tutorials";

export const blogCategories: { key: BlogCategory; label: string }[] = [
  { key: "engineering", label: "Engineering" },
  { key: "community", label: "Community" },
  { key: "releases", label: "Releases" },
  { key: "tutorials", label: "Tutorials" },
];
