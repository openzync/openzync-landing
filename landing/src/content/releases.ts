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
  version: "1.0.0rc4",
  title: "OpenZync RC v1.0.0rc4",
  date: "2026-10-04",
  description:
    "Three breaking changes: embeddings frozen to snowflake-arctic-embed-m-v1.5, a confirm-gated memory wipe, and a fail-closed PII redaction path behind the v1 cursor envelope. Requires SDK v1.0.0b6 and MCP v1.0.0b3 — both pending release. Plus session-scoped graph, FalkorDB ghost-node and enrichment-queue fixes.",
  downloadUrl: "https://github.com/openzync/openzync-core",
};
