// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Statistics Data
// ═══════════════════════════════════════════════════════════════════════════════

export interface StatItem {
  value: string;
  label: string;
  description: string;
  link?: { label: string; href: string };
}

export const statsData: StatItem[] = [
  {
    value: "3+",
    label: "Graph Backends",
    description: "PostgreSQL, FalkorDB, SurrealDB — all swappable",
  },
  {
    value: "5",
    label: "LLM Providers",
    description: "OpenAI, Anthropic, Azure, OpenRouter, and Ollama",
  },
  {
    value: "2",
    label: "Core Contributors",
    description: "Growing — join us on GitHub",
    link: { label: "Contribute", href: "https://github.com/rohnsha0/openzync" },
  },
  {
    value: "0.1",
    label: "Latest Release",
    description: "Alpha — download from GitHub",
    link: { label: "Releases", href: "https://github.com/rohnsha0/openzync/releases" },
  },
];
