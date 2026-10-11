import {
  BarChart3,
  Brain,
  FileCode,
  GitBranch,
  Server,
  ShieldCheck,
  Waypoints,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DataGrid, SectionHeader, SectionShell } from "@openzync/design-system";
import { features } from "@/content/features";

interface Capability {
  feature?: string;
  title?: string;
  description?: string;
  meta: string;
  icon: LucideIcon;
}

/** Pull copy for shipped capabilities from the shared features module. */
function feature(title: string) {
  const found = features.find((f) => f.title === title);
  if (!found) throw new Error(`features content missing entry: ${title}`);
  return found;
}

const CAPABILITIES: Capability[] = [
  {
    feature: "Temporal Memory & Fact Supersession",
    meta: "memory",
    icon: Workflow,
  },
  {
    feature: "Multi-Graph Backends",
    meta: "graph",
    icon: GitBranch,
  },
  {
    feature: "Multi-LLM Support",
    meta: "llm",
    icon: Brain,
  },
  {
    title: "MCP server",
    description:
      "A FastMCP server exposes the same memory surface to any MCP-capable agent runtime, over stdio or HTTP. Point your agent at it and start reading and writing memory.",
    meta: "tools",
    icon: Server,
  },
  {
    feature: "File & Blob Attachments",
    meta: "memory",
    icon: FileCode,
  },
  {
    title: "RBAC and audit log",
    description:
      "Organization-scoped roles and permissions enforced server-side, JWT and API-key auth on every route, and an append-only audit log of administrative activity.",
    meta: "security",
    icon: ShieldCheck,
  },
  {
    feature: "Observability Built-In",
    meta: "observability",
    icon: BarChart3,
  },
  {
    title: "OpenAI-compatible endpoints",
    description:
      "Route to OpenAI, Azure OpenAI, a local Ollama, or any OpenAI-compatible endpoint. The provider is configuration, not a rewrite.",
    meta: "llm",
    icon: Waypoints,
  },
];

/**
 * Section 04 — capability grid. Cells carry the DataCard anatomy directly:
 * the gap-px instrument grid owns the surface, so no nested card borders.
 */
export function Capabilities() {
  return (
    <SectionShell divider>
      <SectionHeader
        index="04 CAPABILITIES"
        title="The memory layer, end to end."
        lede="From ingestion to retrieval to the controls your security team asks about."
      />
      <DataGrid cols={3} className="mt-12">
        {CAPABILITIES.map((capability) => {
          const source = capability.feature
            ? feature(capability.feature)
            : null;
          const Icon = capability.icon;
          return (
            <DataGrid.Cell key={capability.title ?? capability.feature}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Icon size={18} className="mt-0.5 shrink-0 text-signal-dim" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-text">
                    {source ? source.title : capability.title}
                  </h3>
                </div>
                <span className="font-mono text-xs text-dim">{capability.meta}</span>
              </div>
              <p className="mt-3 text-sm text-muted">
                {source ? source.description : capability.description}
              </p>
            </DataGrid.Cell>
          );
        })}
      </DataGrid>
    </SectionShell>
  );
}
