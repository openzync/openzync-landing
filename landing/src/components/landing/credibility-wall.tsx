import {
  DataGrid,
  LogoWall,
  SectionHeader,
  SectionShell,
} from "@openzync/design-system";

// Real integrations only — no invented users, no vanity metrics.
const STACK_ITEMS = [
  { name: "PostgreSQL", href: "https://www.postgresql.org", mono: true },
  { name: "FalkorDB", href: "https://www.falkordb.com", mono: true },
  { name: "SurrealDB", href: "https://surrealdb.com", mono: true },
  { name: "FastAPI", href: "https://fastapi.tiangolo.com", mono: true },
  { name: "Redis", href: "https://redis.io", mono: true },
  { name: "Docker", href: "https://www.docker.com", mono: true },
  { name: "Kubernetes", href: "https://kubernetes.io", mono: true },
  { name: "Prometheus", href: "https://prometheus.io", mono: true },
  { name: "OpenBao", href: "https://openbao.org", mono: true },
  { name: "Model Context Protocol", href: "https://modelcontextprotocol.io", mono: true },
  { name: "Python SDK", href: "https://pypi.org/project/openzync/", mono: true },
];

const DEPLOYMENT_FACTS = [
  {
    meta: "license",
    title: "AGPLv3 core",
    body: "The backend is open source end to end. Audit it, fork it, run it without a sales call.",
  },
  {
    meta: "deploy",
    title: "Docker Compose + Helm",
    body: "One compose stack for evaluation. A Helm chart for production clusters.",
  },
  {
    meta: "control",
    title: "Self-host or cloud",
    body: "Run it inside your VPC. The graph, the vectors, and the audit trail stay yours.",
  },
];

/**
 * Section 02 — credibility wall: the runtime stack as a marquee of real
 * integration wordmarks, then the three deployment facts underneath.
 */
export function CredibilityWall() {
  return (
    <SectionShell divider>
      <SectionHeader
        index="02 STACK"
        title="Runs on the stack you already operate"
        lede="PostgreSQL, FalkorDB, or SurrealDB for the graph. Redis for caching. Prometheus for metrics. Nothing exotic to buy."
      />
      <LogoWall items={STACK_ITEMS} speed={36} className="mt-12" />
      <DataGrid cols={3} className="mt-12">
        {DEPLOYMENT_FACTS.map((fact) => (
          <DataGrid.Cell key={fact.title}>
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-dim">
              {fact.meta}
            </p>
            <h3 className="mt-3 text-base font-semibold text-text">{fact.title}</h3>
            <p className="mt-2 text-sm text-muted">{fact.body}</p>
          </DataGrid.Cell>
        ))}
      </DataGrid>
    </SectionShell>
  );
}
