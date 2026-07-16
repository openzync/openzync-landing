// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Site Configuration
// ═══════════════════════════════════════════════════════════════════════════════

export const siteConfig = {
  name: "OpenZync",
  tagline: "Persistent Agent Memory Infrastructure",
  description:
    "OpenZync provides persistent, graph-based memory for AI agents. Store, retrieve, and reason over agent interactions at scale with support for 3 graph backends and 5 LLM providers.",
  url: "https://openzync.tech",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.openzync.tech",
  ogImage: "/images/og-default.svg",
  links: {
    github: "https://github.com/openzync/openzync-core",
    twitter: "https://twitter.com/openzync",
    docs: "https://docs.openzync.tech/en/latest",
    discord: "https://discord.gg/openzync",
  },
};

// ─── Navigation (Mega-menu) ─────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
  highlights?: { label: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    label: "Why OpenZync",
    children: [
      { label: "What is OpenZync?", href: "/about", description: "Overview and mission" },
      { label: "Features", href: "/features", description: "Everything OpenZync offers" },
      { label: "Use Cases", href: "/use-cases", description: "Real-world applications" },
      { label: "FAQ", href: "/faq", description: "Common questions" },
    ],
  },
  {
    label: "Get Started",
    children: [
      { label: "Quickstart", href: "https://docs.openzync.tech/en/latest/guides/quickstart.html", description: "5-minute setup" },
      { label: "Documentation", href: "https://docs.openzync.tech/en/latest/", description: "Full reference" },
      { label: "GitHub", href: "https://github.com/openzync/openzync-core", description: "Source code" },
      { label: "API Reference", href: "https://docs.openzync.tech/en/latest/api/core.html", description: "REST & SDK API docs" },
      { label: "Contributing Guide", href: "https://docs.openzync.tech/en/latest/guides/contributing.html", description: "How to contribute" },
    ],
    highlights: [
      { label: "Try the Demo", href: "https://demo.openzync.tech" },
      { label: "View on GitHub", href: "https://github.com/openzync/openzync-core" },
    ],
  },
  {
    label: "News & Updates",
    children: [
      { label: "Blog", href: "/blog", description: "Engineering, releases, and community" },
      { label: "Changelog", href: "/changelog", description: "Version release notes" },
      { label: "Releases", href: "https://github.com/openzync/openzync-core/releases", description: "GitHub releases" },
    ],
    highlights: [
      { label: "Latest Release v1.0.0", href: "https://github.com/openzync/openzync-core/releases/tag/v1.0.0" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about", description: "Our mission and team" },
      { label: "Contact", href: "mailto:hello@openzync.tech", description: "Get in touch" },
      { label: "Sponsorship", href: "https://github.com/sponsors/openzync", description: "Support the project" },
    ],
  },
];

// ─── Breadcrumb path labels ─────────────────────────────────────────────────

export const breadcrumbLabels: Record<string, string> = {
  "/": "Home",
  "/features": "Features",
  "/about": "About",
  "/changelog": "Changelog",
  "/blog": "Blog",
  "/use-cases": "Use Cases",
  "/faq": "FAQ",
  "/events": "Events",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
};

// ─── Footer links ───────────────────────────────────────────────────────────

export const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Changelog", href: "/changelog" },
    { label: "Documentation", href: "https://docs.openzync.tech/en/latest/" },
    { label: "API Reference", href: "https://docs.openzync.tech/en/latest/api/core.html" },
  ],
  community: [
    { label: "Contributing", href: "https://docs.openzync.tech/en/latest/guides/contributing.html" },
  ],
  updates: [
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
    { label: "Releases", href: "https://github.com/openzync/openzync-core/releases" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Sponsorship", href: "https://github.com/sponsors/openzync" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const footerSocialLinks = [
  { label: "GitHub", href: "https://github.com/openzync/openzync-core", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/company/openzync", icon: "linkedin" },
];
