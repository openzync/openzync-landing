// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Release Spotlight Data
// ═══════════════════════════════════════════════════════════════════════════════

export interface Release {
  version: string;
  title: string;
  date: string;
  description: string;
  downloadUrl: string;
  image?: string;
}

export const latestRelease: Release = {
  version: "1.0.0b1",
  title: "OpenZync Beta Release",
  date: "2026-07-12",
  description:
    "OpenZync alpha provides persistent, graph-based memory for AI agents. With support for 3 graph backends (PostgreSQL, FalkorDB, SurrealDB), 5 LLM providers, prompt versioning, and Prometheus observability — it's the memory layer your agents deserve.",
  downloadUrl: "https://github.com/rohnsha0/openzync",
};
