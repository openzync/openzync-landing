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
  version: "1.0.0rc1",
  title: "OpenZync RC v1.0.0rc1",
  date: "2026-08-28",
  description:
    "First Release Candidate — permissions freeze (scopes → permissions), org-scoped admin analytics and metrics with 30-day window, Helm 0.2.0, and SDK v1.0.0b5 + MCP v1.0.0b2 aligning the client. No further breaking changes planned before 1.0.0 stable.",
  downloadUrl: "https://github.com/openzync/openzync-core",
};
