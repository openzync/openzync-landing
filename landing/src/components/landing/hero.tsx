"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, cn, MonoMeta, ProductFrame } from "@openzync/design-system";
import { latestRelease } from "@/content/releases";
import { siteConfig } from "@/content/site-config";
import { trackCtaClick } from "@/lib/analytics/events";

type NodeId = "session" | "agent" | "entity" | "user" | "fact" | "episode" | "tool" | "blob";

// Mockup topology — coordinates in the graph SVG viewBox (100 × 60).
const NODES: { id: NodeId; x: number; y: number; live?: boolean }[] = [
  { id: "session", x: 13, y: 15, live: true },
  { id: "agent", x: 37, y: 9 },
  { id: "entity", x: 64, y: 13, live: true },
  { id: "user", x: 88, y: 19 },
  { id: "fact", x: 23, y: 43 },
  { id: "episode", x: 52, y: 37 },
  { id: "tool", x: 79, y: 45 },
  { id: "blob", x: 43, y: 55 },
];

// Third tuple element marks the dashed live edges.
const EDGES: [NodeId, NodeId, boolean?][] = [
  ["session", "agent"],
  ["agent", "entity", true],
  ["entity", "user"],
  ["session", "fact"],
  ["fact", "episode"],
  ["episode", "entity", true],
  ["agent", "tool"],
  ["tool", "episode"],
  ["fact", "blob"],
];

function nodeById(id: NodeId) {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`hero graph: unknown node "${id}"`);
  return node;
}

const RAIL_ROWS: { label: string; value: string; className: string }[] = [
  { label: "nodes", value: "1,284", className: "text-text" },
  { label: "edges", value: "3,912", className: "text-text" },
  { label: "facts", value: "746", className: "text-signal" },
  { label: "p50", value: "38ms", className: "text-signal-dim" },
];

/**
 * Hero — category + proof headline, factual lede, one primary CTA.
 * Right: pure-CSS graph mockup; motion budget stays on the mockup
 * (pulse dots + two dashed live edges).
 */
export function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-7rem)] items-center py-14">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* ── Left: dateline, headline, lede, CTAs ─────────────────────── */}
        <div>
          <MonoMeta className="block">
            2026.10 — openzync v{latestRelease.version}
          </MonoMeta>
          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] text-text sm:text-5xl lg:text-6xl">
            Graph memory that
            <br />
            survives production.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Open-source temporal knowledge graph with sub-50ms retrieval across
            PostgreSQL, FalkorDB, and SurrealDB. Five LLM providers, an MCP
            server, and a typed Python SDK.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={`${siteConfig.appUrl}/signup`}
              onClick={() => trackCtaClick("hero_get_started", "hero")}
            >
              <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                Start free
              </Button>
            </Link>
            <Link
              href={siteConfig.links.docs}
              onClick={() => trackCtaClick("hero_read_docs", "hero")}
              className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
            >
              Read the docs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* ── Right: graph explorer mockup ─────────────────────────────── */}
        <ProductFrame title="graph-explorer" variant="graph">
          <GraphMockup />
        </ProductFrame>
      </div>
    </section>
  );
}

/** Decorative mockup — no live data, decorative SVG hidden from AT. */
function GraphMockup() {
  return (
    <div className="flex overflow-hidden bg-surface-950">
      <div className="relative aspect-[5/3] flex-1">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {EDGES.map(([from, to, active]) => {
            const a = nodeById(from);
            const b = nodeById(to);
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={0.4}
                className={active ? "stroke-signal graph-active-edge" : "stroke-line"}
              />
            );
          })}
          {NODES.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x} cy={n.y} r={2.6} strokeWidth={0.5}
                className={cn("fill-surface-900", n.live ? "stroke-signal" : "stroke-line")}
              />
              {n.live ? (
                <circle cx={n.x + 2.1} cy={n.y - 2.1} r={0.9} className="fill-signal animate-pulse-dot" />
              ) : null}
              <text
                x={n.x} y={n.y + 6.4} textAnchor="middle"
                className={cn("font-mono text-[2.6px]", n.live ? "fill-signal" : "fill-muted")}
              >
                {n.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Side rail — mono instrument readout */}
      <div className="w-28 shrink-0 border-l border-line bg-panel-raised p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">live graph</p>
        <dl className="mt-3 space-y-2 font-mono text-[11px]">
          {RAIL_ROWS.map((row) => (
            <div key={row.label} className="flex justify-between gap-2">
              <dt className="text-dim">{row.label}</dt>
              <dd className={row.className}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
