// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Audience Tab Data
// ═══════════════════════════════════════════════════════════════════════════════

export interface AudienceTab {
  key: string;
  label: string;
  heading: string;
  description: string;
  links: { label: string; href: string }[];
}

export const audienceTabs: AudienceTab[] = [
  {
    key: "developers",
    label: "Developers",
    heading: "Built for developers who demand control.",
    description:
      "OpenZync gives you a clean, typed API for graph memory across 3 backends. Integrate with your stack in minutes — Python SDK, REST API, and an MCP server for AI tool integration.",
    links: [
      { label: "Quickstart (5 min)", href: "https://docs.openzync.tech/en/latest/guides/quickstart.html" },
      { label: "API Reference", href: "https://docs.openzync.tech/en/latest/api/core.html" },
      { label: "SDKs & Libraries", href: "https://github.com/openzync/openzync-core" },
      { label: "MCP Server Docs", href: "https://docs.openzync.tech/en/latest/domains/mcp_server.html" },
    ],
  },
  {
    key: "tech-leads",
    label: "Tech Leads",
    heading: "Production infrastructure you can trust.",
    description:
      "Webhook-driven event system, idempotent APIs, circuit breakers, and audit trails. OpenZync is designed for the failure modes you know are coming — with observability and reliability built into every layer.",
    links: [
      { label: "Architecture Overview", href: "https://docs.openzync.tech/en/latest/guides/architecture.html" },
      { label: "Security Model", href: "https://docs.openzync.tech/en/latest/domains/auth.html" },
      { label: "Self-Hosting Guide", href: "https://docs.openzync.tech/en/latest/guides/deployment.html" },
      { label: "Compliance & Auditing", href: "https://docs.openzync.tech/en/latest/domains/admin_webhooks.html" },
    ],
  },
  {
    key: "product",
    label: "Product Managers",
    heading: "Features that ship, not infrastructure that distracts.",
    description:
      "Your team should focus on agent behavior, not database drivers. OpenZync provides the memory infrastructure so you can build, measure, and iterate — with usage-based billing and observability out of the box.",
    links: [
      { label: "Feature Overview", href: "/features" },
      { label: "Roadmap", href: "https://docs.openzync.tech/en/latest/roadmap" },
      { label: "Pricing", href: "https://docs.openzync.tech/en/latest/pricing" },
      { label: "Case Studies", href: "/use-cases" },
    ],
  },
];
