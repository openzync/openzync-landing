import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { caseStudies } from "@/content/case-studies";
import { audienceTabs } from "@/content/audience-tabs";
import { CtaSection } from "@/components/landing/cta-section";
import {
  DataGrid,
  MonoMeta,
  SectionHeader,
  SectionShell,
  TrustList,
  type TrustListItem,
} from "@openzync/design-system";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Real-world applications of OpenZync's persistent agent memory infrastructure.",
  alternates: { canonical: "/use-cases" },
};

/** The three seats that show up in the use cases below, as routed rows. */
const AUDIENCE_ROUTES: TrustListItem[] = audienceTabs.map((audience) => ({
  label: audience.label,
  detail: audience.heading,
}));

/**
 * Use cases index — every case study as an instrument cell with mono category
 * meta, plus a routing rail for the three seats that read them.
 */
export default function UseCasesPage() {
  const segments = buildBreadcrumbSegments("/use-cases");

  return (
    <>
      <section className="pt-36 pb-14 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs segments={segments} />
          <MonoMeta className="tracking-[0.08em] mb-4 block">
            INDEX — SCENARIOS · {String(caseStudies.length).padStart(2, "0")} ENTRIES
          </MonoMeta>
          <h1 className="font-display text-4xl font-medium text-text md:text-5xl">
            Use Cases
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Seven production scenarios where persistent, graph-based memory
            changes what an agent can do — across sessions, tools, and teams.
          </p>
        </div>
      </section>

      <SectionShell divider>
        <SectionHeader
          index="SCENARIOS"
          title="What teams build on persistent memory."
          lede="Each entry: the problem, the architecture, and what the team actually shipped."
        />
        {caseStudies.length === 0 ? (
          <p className="mt-12 py-16 text-center text-muted">No case studies yet.</p>
        ) : (
          <DataGrid cols={2} className="mt-12">
            {caseStudies.map((cs) => (
              <Link key={cs.slug} href={`/use-cases/${cs.slug}`} className="block h-full">
                <DataGrid.Cell className="h-full transition-colors duration-150 hover:bg-panel-raised">
                  <MonoMeta>{cs.category}</MonoMeta>
                  <h3 className="mt-2 text-base font-semibold text-text">{cs.title}</h3>
                  <p className="mt-2 text-sm text-muted">{cs.excerpt}</p>
                  <span className="mt-4 inline-block font-mono text-xs text-signal">
                    Read the use case <span aria-hidden="true">→</span>
                  </span>
                </DataGrid.Cell>
              </Link>
            ))}
          </DataGrid>
        )}
      </SectionShell>

      <SectionShell divider>
        <SectionHeader
          index="ROUTING"
          title="Start from your seat."
          lede="Three entry points into the same memory layer."
        />
        <TrustList items={AUDIENCE_ROUTES} className="mt-10" />
        <Link
          href="/features"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-signal transition-colors hover:text-signal-dim"
        >
          Feature index <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </SectionShell>

      <CtaSection />
    </>
  );
}
