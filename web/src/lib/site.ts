export const GITHUB_URL = "https://github.com/openzync/openzync-core";
export const INSTALL_CMD = "pip install openzync";

/** Star count is not a stable fact in the old site config; neutral placeholder. */
export const GITHUB_STARS: number | null = null;

export const TAGLINE = "Agents forget. OpenZync remembers.";

export const DESCRIPTION =
  "A living knowledge graph that writes, corrects, and recalls across every session — so your agents compound instead of restarting.";

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/product", label: "Product" },
  { href: "/developers", label: "Developers" },
  { href: "/stream", label: "Stream" },
  { href: "/company", label: "Company" },
];

export function formatStars(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
}
