import type { Metadata } from "next";
import Link from "next/link";
import { Code, Shield, Zap } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { CtaSection } from "@/components/landing/cta-section";
import { maintainers } from "@/content/contact";
import { latestRelease } from "@/content/releases";
import { statsData } from "@/content/stats";
import {
  DataGrid,
  MonoMeta,
  SectionHeader,
  SectionShell,
  StatBlock,
  StatGrid,
  TrustList,
  type TrustListItem,
} from "@openzync/design-system";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about OpenZync, the team behind persistent agent memory infrastructure.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Agent memory should never be the bottleneck. Every layer — from storage to retrieval — is optimized for low-latency production workloads.",
  },
  {
    icon: Shield,
    title: "Production Safety",
    description:
      "Idempotency, audit trails, circuit breakers, and structured error handling. We design for the worst case, not the happy path.",
  },
  {
    icon: Code,
    title: "Developer Experience",
    description:
      "Clean APIs, typed interfaces, comprehensive documentation, and predictable semantics. Your infrastructure should get out of your way.",
  },
];

const PIPELINE_FACTS = [
  {
    index: "01",
    title: "Temporal graph",
    body: "Facts, entities, and relationships carry validity windows. Any read can be answered as-of-now or as-of-past, so the graph reports the state it actually held at a point in time.",
  },
  {
    index: "02",
    title: "Fact supersession",
    body: "A correction supersedes the fact it replaces instead of piling up beside it. Edges expire in lockstep, and the event is observable — superseded_count and webhooks.",
  },
  {
    index: "03",
    title: "File-preserving memory",
    body: "Files attached to a session are preserved as S3-backed blobs, referenced by blob_id. Their content is extracted into the fact store — memory that keeps the file.",
  },
];

const GOVERNANCE: TrustListItem[] = [
  {
    label: "License",
    detail:
      "The core is AGPLv3 with a commercial option for SaaS use. The Python SDK is Apache 2.0.",
    mono: "agplv3",
  },
  {
    label: "Community",
    detail:
      "Built by a growing community of contributors. Free, open, and sovereign — forever.",
    mono: "contributors",
  },
  {
    label: "Access",
    detail:
      "The full power of OpenZync is available to everyone — small team or global enterprise.",
    mono: "self-host",
  },
];

/** Keep three headline stats; the release-version row belongs in the changelog. */
const HEADLINE_STATS = statsData.slice(0, 3);

/**
 * About page — mono dateline + Fraunces H1, then the mission, the pipeline
 * facts, values, governance, and the maintainers, as instrument sections.
 */
export default function AboutPage() {
  const segments = buildBreadcrumbSegments("/about");

  return (
    <>
      <section className="pt-36 pb-14 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs segments={segments} />
          <MonoMeta className="tracking-[0.08em] mb-4 block">
            PROJECT — ABOUT · {latestRelease.date.slice(0, 7)}
          </MonoMeta>
          <h1 className="font-display text-4xl font-medium text-text md:text-5xl">
            What is OpenZync?
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            OpenZync is an open source persistent memory infrastructure for AI
            agents. It creates, stores, and manages agent memory — knowledge
            graphs, session context, and entity relationships — that agents can
            read from, write to, and reason over across conversations.
          </p>
          <p className="mt-4 max-w-2xl text-muted">
            It ships with support for 3 graph backends (PostgreSQL, FalkorDB,
            SurrealDB) and integrations with 5 LLM providers (OpenAI, Anthropic,
            Azure, Ollama, and any OpenAI-compatible endpoint) — a system for
            teams building production-grade agent memory infrastructure.
          </p>
        </div>
      </section>

      <SectionShell divider>
        <SectionHeader
          index="MISSION"
          title="Memory is the missing layer."
          lede="Agents are transforming how we interact with software, but they are fundamentally limited without durable memory."
        />
        <div className="mt-10 max-w-2xl space-y-4 text-muted">
          <p>
            Every reset loses context, every cold start wastes tokens
            re-building state, and every failure requires replaying from
            scratch. OpenZync solves this with a persistent, graph-based memory
            layer that agents read from, write to, and reason over.
          </p>
          <p>
            Three graph backends, five LLM providers, observability and
            structured logging in the core — designed for production from day
            one.
          </p>
        </div>
        <StatGrid cols={3} className="mt-12">
          {HEADLINE_STATS.map((stat) => (
            <StatBlock
              key={stat.label}
              value={stat.value}
              label={stat.label}
              sub={stat.description}
            />
          ))}
        </StatGrid>
      </SectionShell>

      <SectionShell divider>
        <SectionHeader
          index="PIPELINE"
          title="How the project works."
          lede="Three properties define what the memory layer guarantees."
        />
        <DataGrid cols={3} className="mt-12">
          {PIPELINE_FACTS.map((fact) => (
            <DataGrid.Cell key={fact.title}>
              <MonoMeta className="block">{fact.index} —</MonoMeta>
              <h3 className="mt-3 text-base font-semibold text-text">{fact.title}</h3>
              <p className="mt-2 text-sm text-muted">{fact.body}</p>
            </DataGrid.Cell>
          ))}
        </DataGrid>
      </SectionShell>

      <SectionShell divider>
        <SectionHeader
          index="VALUES"
          title="What we believe."
          lede="The engineering commitments behind the code."
        />
        <DataGrid cols={3} className="mt-12">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <DataGrid.Cell key={value.title}>
                <div className="flex items-start gap-3">
                  <Icon size={18} className="mt-0.5 shrink-0 text-signal-dim" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-text">{value.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted">{value.description}</p>
              </DataGrid.Cell>
            );
          })}
        </DataGrid>
      </SectionShell>

      <SectionShell divider>
        <SectionHeader
          index="GOVERNANCE"
          title="Open by construction."
          lede="License, community, and access — the three commitments that outlive any single release."
        />
        <TrustList items={GOVERNANCE} className="mt-10" />
      </SectionShell>

      <SectionShell divider>
        <SectionHeader
          index="TEAM"
          title="Maintainers."
          lede="Built and maintained by a small core team."
          action={
            <Link
              href="/contact"
              className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
            >
              Contact the team <span aria-hidden="true">→</span>
            </Link>
          }
        />
        <DataGrid cols={2} className="mt-12">
          {maintainers.map((maintainer) => (
            <DataGrid.Cell key={maintainer.name}>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-panel-raised font-mono text-xs text-signal-dim"
                >
                  {maintainer.initials}
                </span>
                <div>
                  <p className="text-base font-semibold text-text">{maintainer.name}</p>
                  <p className="text-sm text-muted">{maintainer.role}</p>
                </div>
              </div>
              <p className="mt-4 font-mono text-xs text-dim">{maintainer.location}</p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1 font-mono text-sm text-signal transition-colors hover:text-signal-dim"
              >
                Get in touch <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </DataGrid.Cell>
          ))}
        </DataGrid>
      </SectionShell>

      <CtaSection />
    </>
  );
}
