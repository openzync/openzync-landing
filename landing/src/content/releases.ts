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
  version: "1.0.0b4",
  title: "OpenZync Beta v1.0.0b4",
  date: "2026-07-28",
  description:
    "System-level SurrealDB and FalkorDB configuration with per-org fallback. Staged field resets in dashboard config pages. Python SDK v1.0.0b3 with blob ingestion — attach files via a blobs=[(filename, data, mime_type)] parameter on memory ingest. Community click interaction in graph viewer. Various bug fixes and UX improvements.",
  downloadUrl: "https://github.com/openzync/openzync-core",
};
