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
  version: "1.0.0rc2",
  title: "OpenZync RC v1.0.0rc2",
  date: "2026-09-15",
  description:
    "True feature-freeze — scoped project pins with org-isolated RLS, openai_like backends replacing OpenRouter, tombstone hard-retraction gate, and a production one-liner installer. SDK v1.0.0b5 + MCP v1.0.0b2 stay pinned. No further breaking changes before 1.0.0 stable.",
  downloadUrl: "https://github.com/openzync/openzync-core",
};
