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
  version: "1.0.0b5",
  title: "OpenZync Beta v1.0.0b5",
  date: "2026-08-16",
  description:
    "The largest update since the initial release: fact retraction and invalidation with lineage tracking, temporal graph edge expiry, a platform admin layer with organization lifecycle approval, org join codes and invites, per-endpoint webhook secrets, enumeration-hardened auth, and idempotent memory ingestion. Python SDK v1.0.0b4 aligns the ingestion contract. The final stretch before Release Candidates.",
  downloadUrl: "https://github.com/openzync/openzync-core",
};
