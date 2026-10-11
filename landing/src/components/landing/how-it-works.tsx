import {
  MonoMeta,
  ProductFrame,
  SectionHeader,
  SectionShell,
  StepFlow,
  type StepFlowStep,
} from "@openzync/design-system";

const INGEST_SNIPPET = (
  <div className="space-y-1 text-muted">
    <p>
      <span className="text-signal">from</span> openzync{" "}
      <span className="text-signal">import</span> AsyncOpenZync
    </p>
    <p className="pt-2">
      <span className="text-signal">async with</span> AsyncOpenZync(api_key=
      <span className="text-signal">&ldquo;oz_...&rdquo;</span>){" "}
      <span className="text-signal">as</span> oz:
    </p>
    <p className="pl-4 pt-1">
      <span className="text-signal">await</span> oz.memory.ingest(
    </p>
    <p className="pl-8">project_id=<span className="text-signal">&ldquo;proj_abc&rdquo;</span>,</p>
    <p className="pl-8">
      messages=[{"{"}
      <span className="text-signal">&ldquo;role&rdquo;</span>:{" "}
      <span className="text-signal">&ldquo;user&rdquo;</span>,{" "}
      <span className="text-signal">&ldquo;content&rdquo;</span>:{" "}
      <span className="text-signal">&ldquo;Ship the billing fix&rdquo;</span>
      {"}"}],
    </p>
    <p className="pl-8">session_id=<span className="text-signal">&ldquo;session_xyz&rdquo;</span>,</p>
    <p className="pl-4">)</p>
  </div>
);

const SUPERSEDE_FRAME = (
  <div>
    <div className="flex items-center gap-3">
      <span className="rounded-md border border-line bg-surface-950 px-2 py-1 font-mono text-[11px] text-muted">
        region: eu-west
      </span>
      <svg
        width="56"
        height="10"
        viewBox="0 0 56 10"
        aria-hidden="true"
        className="shrink-0"
      >
        <line
          x1="1"
          y1="5"
          x2="47"
          y2="5"
          strokeWidth="1"
          className="stroke-signal graph-active-edge"
        />
        <path
          d="M47 2 L54 5 L47 8"
          fill="none"
          strokeWidth="1"
          className="stroke-signal"
        />
      </svg>
      <span className="rounded-md border border-signal-dim bg-surface-950 px-2 py-1 font-mono text-[11px] text-signal">
        region: us-east
      </span>
    </div>
    <MonoMeta className="mt-3 block">superseded · effective 2026.10</MonoMeta>
  </div>
);

const RETRIEVE_SNIPPET = (
  <div className="space-y-1 text-muted">
    <p>
      ctx = <span className="text-signal">await</span> oz.memory.get_context(
    </p>
    <p className="pl-4">project_id=<span className="text-signal">&ldquo;proj_abc&rdquo;</span>,</p>
    <p className="pl-4">query=<span className="text-signal">&ldquo;billing fix status&rdquo;</span>,</p>
    <p>)</p>
    <p className="pt-2">
      <span className="text-dim">#</span> ✓ 3 facts · 2 entities ·{" "}
      <span className="text-signal">41ms</span>
    </p>
  </div>
);

const STEPS: StepFlowStep[] = [
  {
    index: "01",
    title: "Ingest",
    mono: "sdk · mcp · rest",
    body: "Send messages, files, and events through the Python SDK, the MCP server, or plain REST. Files attached to a session are preserved as S3-backed blobs that messages reference by blob_id — never digested and discarded.",
    frame: (
      <ProductFrame title="memory.ingest" variant="terminal">
        {INGEST_SNIPPET}
      </ProductFrame>
    ),
  },
  {
    index: "02",
    title: "Resolve",
    mono: "temporal knowledge graph",
    body: "Extracted facts land in a temporal graph. A later correction supersedes the fact it replaces instead of piling up beside it, edges expire in lockstep, and as-of reads return the graph exactly as it stood at any point in time.",
    frame: (
      <ProductFrame title="fact-supersession" variant="graph">
        {SUPERSEDE_FRAME}
      </ProductFrame>
    ),
  },
  {
    index: "03",
    title: "Retrieve",
    mono: "sub-50ms context",
    body: "get_context returns ranked, deduplicated context in under 50ms on the default stack. The MCP server exposes the same retrieval to any capable agent runtime, and five LLM providers sit behind one config flag.",
    frame: (
      <ProductFrame title="memory.get_context" variant="terminal">
        {RETRIEVE_SNIPPET}
      </ProductFrame>
    ),
  },
];

/**
 * Section 03 — ingest → resolve → retrieve, as a numbered step flow with
 * real SDK snippets in the frame slots.
 */
export function HowItWorks() {
  return (
    <SectionShell divider>
      <SectionHeader
        index="03 PIPELINE"
        title="Ingest, resolve, retrieve."
        lede="Three calls stand between a raw transcript and a sub-50ms context window."
      />
      <StepFlow steps={STEPS} className="mt-12" />
    </SectionShell>
  );
}
