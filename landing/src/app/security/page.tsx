import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  MonoMeta,
  SectionHeader,
  SectionShell,
  TrustList,
  DataGrid,
} from "@openzync/design-system";
import { CtaSection } from "@/components/landing/cta-section";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { siteConfig } from "@/content/site-config";
import { trackCtaClick } from "@/lib/analytics/events";

export const metadata: Metadata = {
  title: "Security",
  description:
    "OpenZync security posture — OpenBao-managed secrets, JWT and API-key auth, project-scoped RBAC, an immutable audit log, and self-hosting on your own infrastructure.",
  alternates: { canonical: "/security" },
};

/**
 * Controls — every line verified against the openzync-core repository.
 * Phrase conservatively: "designed for" / "supports" where the code is
 * the contract. No certification, uptime, or compliance claims.
 */
const CONTROLS = [
  {
    label: "Secrets",
    detail:
      "Runtime configuration is loaded from OpenBao at startup — the sole source of truth. There is no .env fallback: if OpenBao is unreachable the process fails fast instead of booting with defaults.",
    mono: "openbao",
  },
  {
    label: "Encryption",
    detail:
      "Organization LLM keys, webhook signing secrets, and PII fields are encrypted through OpenBao's Transit engine before they reach PostgreSQL — the database stores ciphertext, not plaintext.",
    mono: "transit",
  },
  {
    label: "Authentication",
    detail:
      "Dashboard users present JWT access tokens. SDK clients use oz_live_ / oz_test_ API keys, verified against a Redis-cached lookup with a negative cache for unknown keys.",
    mono: "jwt + api-key",
  },
  {
    label: "Authorization",
    detail:
      "Every API key is scoped to exactly one project. Users carry an org role plus explicit permission strings, checked server-side on every route — never client-side.",
    mono: "project-scoped rbac",
  },
  {
    label: "Fail closed",
    detail:
      "Role and permission lookups are cached in Redis and fail closed: a cache or database outage denies access or falls back to least privilege — it never elevates.",
    mono: "rbac cache",
  },
  {
    label: "Rate limiting",
    detail:
      "Sliding-window limits per IP for public routes and per organization for authenticated API traffic. Login and signup endpoints are throttled per email and per IP.",
    mono: "redis",
  },
  {
    label: "Audit log",
    detail:
      "Every non-exempt request is recorded to an immutable audit_logs table by a background worker — no UPDATE or DELETE at the application layer.",
    mono: "audit.log",
  },
  {
    label: "Webhooks",
    detail:
      "Each webhook endpoint gets its own HMAC-SHA256 signing secret, shown once at creation, so receivers can verify every delivery.",
    mono: "hmac-sha256",
  },
  {
    label: "Transport",
    detail:
      "CORS runs as an explicit origin allowlist — never a wildcard. API errors, including rate limits, return RFC 7807 problem details with stable type URIs.",
    mono: "cors + rfc 7807",
  },
];

const LICENSES = [
  {
    label: "Core",
    detail: "API, workers, graph and memory services — GNU Affero General Public License v3.",
    mono: "agpl-3.0",
  },
  {
    label: "Dashboard",
    detail: "Web dashboard — MIT License.",
    mono: "mit",
  },
  {
    label: "Python SDK",
    detail: "openzync on PyPI — Apache License 2.0.",
    mono: "apache-2.0",
  },
  {
    label: "MCP server",
    detail: "Model Context Protocol tools — Apache License 2.0.",
    mono: "apache-2.0",
  },
];

const DISCLOSURE = [
  {
    label: "Public source",
    detail:
      "Every control above is implemented in the openzync-core repository and readable before you deploy.",
    mono: "github.com/openzync",
  },
  {
    label: "Responsible disclosure",
    detail:
      "Report suspected vulnerabilities with reproduction steps and affected versions — we coordinate fixes and disclosure with the reporter.",
    mono: "hello@openzync.tech",
  },
];

export default function SecurityPage() {
  const segments = buildBreadcrumbSegments("/security");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumbs segments={segments} />
          <MonoMeta className="mb-5 block">2026.10 &mdash; security posture</MonoMeta>
          <h1 className="font-display text-4xl font-medium text-text md:text-5xl">Security</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            OpenZync&rsquo;s core is open source, so this page lists controls rather than
            promises: each one is implemented in the openzync-core repository and can be
            read before you deploy. We state what is built &mdash; and what is not
            claimed.
          </p>
        </div>
      </section>

      {/* ── 01 Controls ──────────────────────────────────────────────────── */}
      <SectionShell divider>
        <SectionHeader
          index="CONTROLS"
          title="What the core repository enforces."
          lede="Nine controls, each traceable to source: secrets, encryption, authentication, authorization, rate limiting, audit, webhook signing, and transport rules."
        />
        <TrustList items={CONTROLS} className="mt-10" />
      </SectionShell>

      {/* ── 02 Deployment ────────────────────────────────────────────────── */}
      <SectionShell divider>
        <SectionHeader
          index="DEPLOYMENT"
          title="Run it where your data lives."
          lede="PostgreSQL 15 and Redis are the only stateful dependencies. Pick the deployment model that matches your infrastructure."
        />
        <DataGrid cols={4} className="mt-12">
          <DataGrid.Cell>
            <h3 className="text-base font-semibold text-text">Docker Compose</h3>
            <MonoMeta className="mt-1 block">single node</MonoMeta>
            <p className="mt-3 text-sm text-muted">
              One compose file runs OpenBao, PostgreSQL 15, Redis 7, the API, and the
              workers. The fastest path to a private instance.
            </p>
          </DataGrid.Cell>
          <DataGrid.Cell>
            <h3 className="text-base font-semibold text-text">Helm</h3>
            <MonoMeta className="mt-1 block">kubernetes</MonoMeta>
            <p className="mt-3 text-sm text-muted">
              Chart with API and worker deployments, autoscaling, ingress, and persistent
              volumes, for teams already on Kubernetes.
            </p>
          </DataGrid.Cell>
          <DataGrid.Cell>
            <h3 className="text-base font-semibold text-text">Hosted</h3>
            <MonoMeta className="mt-1 block">app.openzync.tech</MonoMeta>
            <p className="mt-3 text-sm text-muted">
              Managed instance with the same API, SDK, and MCP surface &mdash; no cluster
              to operate.
            </p>
          </DataGrid.Cell>
          <DataGrid.Cell>
            <h3 className="text-base font-semibold text-text">Local development</h3>
            <MonoMeta className="mt-1 block">make dev</MonoMeta>
            <p className="mt-3 text-sm text-muted">
              Boots the same stack locally &mdash; OpenBao, Postgres, Redis &mdash; for
              evaluation and development before you commit infrastructure.
            </p>
          </DataGrid.Cell>
        </DataGrid>
      </SectionShell>

      {/* ── 03 Licenses ──────────────────────────────────────────────────── */}
      <SectionShell divider>
        <SectionHeader
          index="LICENSES"
          title="Open source, all the way down."
          lede="The core is AGPLv3. The dashboard, SDK, and MCP server are permissively licensed so you can embed them freely."
        />
        <TrustList items={LICENSES} className="mt-10" />
      </SectionShell>

      {/* ── 04 Transparency ──────────────────────────────────────────────── */}
      <SectionShell divider>
        <SectionHeader
          index="TRANSPARENCY"
          title="Read the code. Report what you find."
          lede="No compliance certifications are claimed — the controls above are the implementation, and the repositories are the evidence."
        />
        <TrustList items={DISCLOSURE} className="mt-10" />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Badge variant="warning" showDot={false}>
            No SOC 2 or ISO 27001 audit yet
          </Badge>
          <span className="text-sm text-dim">
            Certification is not claimed; the controls listed above are what ships today.
          </span>
        </div>
        <Link
          href={siteConfig.links.github}
          onClick={() => trackCtaClick("security_view_source", "security-page")}
          className="mt-8 inline-flex font-mono text-sm text-signal transition-colors hover:text-signal-dim"
        >
          Read the source on GitHub <span aria-hidden="true">→</span>
        </Link>
      </SectionShell>

      <CtaSection />
    </>
  );
}
