"use client";

import Link from "next/link";
import {
  DataGrid,
  SectionHeader,
  SectionShell,
  StatBlock,
  StatGrid,
} from "@openzync/design-system";
import { caseStudies, allCaseStudiesHref } from "@/content/case-studies";
import { trackCtaClick } from "@/lib/analytics/events";

const FEATURED_SLUGS = ["customer-support", "code-review"];

const featured = FEATURED_SLUGS.map((slug) => {
  const found = caseStudies.find((cs) => cs.slug === slug);
  if (!found) throw new Error(`case-studies content missing slug: ${slug}`);
  return found;
});

/**
 * Section 05 — proof: benchmark numbers with real provenance, then two
 * case studies routing to /use-cases.
 */
export function Proof() {
  return (
    <SectionShell divider>
      <SectionHeader
        index="PROOF"
        title="Measured, not promised."
        lede="One disclosed benchmark run, one latency budget, and the surface area underneath them."
        action={
          <Link
            href="/blog/openzync-longmemeval-87"
            onClick={() => trackCtaClick("proof_methodology", "proof")}
            className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
          >
            Methodology <span aria-hidden="true">→</span>
          </Link>
        }
      />
      <StatGrid cols={4} className="mt-12">
        <StatBlock
          value="87.1%"
          label="LongMemEval-S"
          sub="500 questions · 2026.10"
          flag
        />
        <StatBlock value="< 50ms" label="Context retrieval" sub="default stack, p50" />
        <StatBlock
          value="3"
          label="Graph backends"
          sub="PostgreSQL · FalkorDB · SurrealDB"
        />
        <StatBlock
          value="5"
          label="LLM providers"
          sub="OpenAI · Anthropic · Azure · Ollama · compatible"
        />
      </StatGrid>

      <DataGrid cols={2} className="mt-6">
        {featured.map((cs) => (
          <Link key={cs.slug} href={`/use-cases/${cs.slug}`} className="block h-full">
            <DataGrid.Cell className="h-full transition-colors duration-150 hover:bg-panel-raised">
              <span className="font-mono text-xs text-dim">{cs.category}</span>
              <h3 className="mt-2 text-base font-semibold text-text">{cs.title}</h3>
              <p className="mt-2 text-sm text-muted">{cs.excerpt}</p>
              <span className="mt-4 inline-block font-mono text-xs text-signal">
                Read the use case <span aria-hidden="true">→</span>
              </span>
            </DataGrid.Cell>
          </Link>
        ))}
      </DataGrid>

      <Link
        href={allCaseStudiesHref}
        onClick={() => trackCtaClick("proof_all_use_cases", "proof")}
        className="mt-6 inline-block font-mono text-sm text-signal transition-colors hover:text-signal-dim"
      >
        All use cases <span aria-hidden="true">→</span>
      </Link>
    </SectionShell>
  );
}
