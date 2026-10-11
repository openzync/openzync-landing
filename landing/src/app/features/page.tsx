import type { Metadata } from "next";
import { GitFork } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { features, categories } from "@/content/features";
import { DataGrid, MonoMeta, SectionHeader, SectionShell } from "@openzync/design-system";
import { siteConfig } from "@/content/site-config";
import { latestRelease } from "@/content/releases";
import { CtaSection } from "@/components/landing/cta-section";
import {
  GitBranch,
  Network,
  Brain,
  Shield,
  Puzzle,
  Workflow,
  BarChart3,
  FileCode,
  CreditCard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Meta description derived from the features array at build time (constant, static).
const prefix = "OpenZync's feature set: ";
const suffix = ". Multi-graph backends, agent memory, multi-LLM support, and more.";
// Reserve room for the prefix, suffix, and an ellipsis so the total stays under ~160 chars.
const titleBudget = 160 - prefix.length - suffix.length - 1;

const fittedTitles: string[] = [];
for (const f of features) {
  const next = [...fittedTitles, f.title].join(", ");
  if (next.length > titleBudget) break;
  fittedTitles.push(f.title);
}
const allTitlesFit = fittedTitles.length === features.length;

export const metadata: Metadata = {
  title: "Features",
  description: `${prefix}${fittedTitles.join(", ")}${allTitlesFit ? "" : "…"}${suffix}`,
  alternates: { canonical: "/features" },
};

const iconMap: Record<string, LucideIcon> = {
  GitBranch,
  Network,
  Brain,
  Shield,
  Puzzle,
  Workflow,
  BarChart3,
  FileCode,
  CreditCard,
};

/** Counts per category drive the mono rail — computed, never hand-maintained. */
const categoryCounts = new Map(categories.map((cat) => [cat.key, 0]));
for (const f of features) {
  categoryCounts.set(f.category, (categoryCounts.get(f.category) ?? 0) + 1);
}

/**
 * Features page — capability index. One instrument grid over the features
 * module, mono meta per cell, mono category rail above. Follow-on links as
 * plain mono rows so the CtaSection keeps the only pair of buttons on page.
 */
export default function FeaturesPage() {
  const segments = buildBreadcrumbSegments("/features");

  return (
    <>
      <section className="pt-36 pb-14 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs segments={segments} />
          <MonoMeta className="tracking-[0.08em] mb-4 block">
            SURFACE — CAPABILITY INDEX · {latestRelease.date.slice(0, 7)}
          </MonoMeta>
          <h1 className="font-display text-4xl font-medium text-text md:text-5xl">
            Features
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            The full stack for production-grade agent memory infrastructure —
            graph backends, retrieval, observability, and the controls a
            security review asks for. Eleven entries; status is on every cell.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6">
            {categories.map((cat) => (
              <span key={cat.key} className="font-mono text-xs text-dim">
                <span className="text-signal-dim">
                  {String(categoryCounts.get(cat.key) ?? 0).padStart(2, "0")}
                </span>{" "}
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionShell divider>
        <SectionHeader
          index="INDEX"
          title="Everything in the memory layer."
          lede="Shipped capabilities first; roadmap entries are marked on the cell so nothing reads as further along than it is."
        />
        <DataGrid cols={3} className="mt-12">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Puzzle;
            return (
              <DataGrid.Cell key={feature.title}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon size={18} className="mt-0.5 shrink-0 text-signal-dim" aria-hidden="true" />
                    <h3 className="text-base font-semibold text-text">{feature.title}</h3>
                  </div>
                  <span className="shrink-0 text-right font-mono text-xs text-dim">
                    {feature.meta}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{feature.description}</p>
              </DataGrid.Cell>
            );
          })}
        </DataGrid>
      </SectionShell>

      <SectionShell divider>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <MonoMeta className="tracking-[0.08em] mb-3 block">02 — ACCESS</MonoMeta>
            <h2 className="font-display text-2xl font-medium text-text md:text-3xl">
              Run it against your own agents.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`${siteConfig.appUrl}/login`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
            >
              Try the demo <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://github.com/openzync/openzync-core/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-text"
            >
              <GitFork size={14} aria-hidden="true" />
              Download v{latestRelease.version}
            </a>
            <a
              href={siteConfig.links.docs}
              className="font-mono text-sm text-muted transition-colors hover:text-text"
            >
              Docs <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </SectionShell>

      <CtaSection />
    </>
  );
}
