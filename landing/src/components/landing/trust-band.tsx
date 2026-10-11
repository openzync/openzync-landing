"use client";

import Link from "next/link";
import {
  DataCard,
  SectionHeader,
  SectionShell,
  TrustList,
} from "@openzync/design-system";
import { audienceTabs } from "@/content/audience-tabs";
import { allCaseStudiesHref } from "@/content/case-studies";
import { trackCtaClick } from "@/lib/analytics/events";

const AUDIENCE_BODIES: Record<string, string> = {
  developers:
    "Typed Python SDK, REST API, and an MCP server. Bring your own graph backend — PostgreSQL, FalkorDB, or SurrealDB.",
  "tech-leads":
    "JWT and API-key auth, org-scoped RBAC, an append-only audit log, and Prometheus metrics. Helm chart included.",
  product:
    "Ship agent behaviour, not database drivers. Every session auditable, every retrieval observable.",
};

const TRUST_ITEMS = [
  {
    label: "Secrets",
    detail:
      "Runtime configuration lives in OpenBao, the sole source of truth. Nothing sensitive sits in a .env file.",
    mono: "openbao",
  },
  {
    label: "Auth",
    detail:
      "JWT and API-key authentication on every route. Keys are scoped to an organization.",
    mono: "jwt + api-key",
  },
  {
    label: "Access",
    detail:
      "Organization-scoped roles and permissions, enforced server-side on every endpoint.",
    mono: "rbac",
  },
  {
    label: "Audit",
    detail:
      "Append-only audit log of administrative activity, including webhook deliveries.",
    mono: "audit.log",
  },
];

function audienceBody(key: string) {
  const body = AUDIENCE_BODIES[key];
  if (!body) throw new Error(`audience-tabs content missing key: ${key}`);
  return body;
}

/**
 * Sections 06–07 — trust band (border-only, mono-labelled security facts)
 * plus use-case routing cards for the three seats.
 */
export function TrustBand() {
  return (
    <>
      <SectionShell divider>
        <SectionHeader
          index="SECURITY"
          title="Self-host in minutes. Your data never leaves."
          lede="OpenBao holds every runtime secret. Auth is JWT or API key with org-scoped RBAC. Every administrative action lands in the audit log."
          action={
            <Link
              href="/security"
              onClick={() => trackCtaClick("trust_security_overview", "trust-band")}
              className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
            >
              Read the security overview <span aria-hidden="true">→</span>
            </Link>
          }
        />
        <TrustList items={TRUST_ITEMS} className="mt-10" />
      </SectionShell>

      <SectionShell divider>
        <SectionHeader
          index="ROUTING"
          title="Start from your seat."
          lede="Three entry points into the same memory layer."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audienceTabs.map((audience) => (
            <Link key={audience.key} href={allCaseStudiesHref} className="block h-full">
              <DataCard interactive title={audience.label} className="h-full">
                <p className="text-sm text-muted">{audienceBody(audience.key)}</p>
                <span className="mt-4 inline-block font-mono text-xs text-signal">
                  Use cases <span aria-hidden="true">→</span>
                </span>
              </DataCard>
            </Link>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
