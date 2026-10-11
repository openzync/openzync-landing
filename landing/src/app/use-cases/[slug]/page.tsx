import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site-config";
import { CtaSection } from "@/components/landing/cta-section";
import {
  DataGrid,
  MonoMeta,
  SectionHeader,
  SectionShell,
} from "@openzync/design-system";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return {};

  return {
    title: `${study.title} | Use Cases`,
    description: study.excerpt,
    alternates: { canonical: `/use-cases/${slug}` },
    openGraph: {
      title: `${study.title} | Use Cases`,
      description: study.excerpt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | Use Cases`,
      description: study.excerpt,
    },
  };
}

/** Split content modules' "\n\n"-separated blocks; keep single \n as line breaks. */
function paragraphs(text: string): string[] {
  return text.split(/\n{2,}/).filter((block) => block.trim().length > 0);
}

function ArticleBlock({ text }: { text: string }) {
  return (
    <div className="max-w-2xl space-y-6">
      {paragraphs(text).map((block, i) => (
        <p key={i} className="whitespace-pre-line leading-relaxed text-muted">
          {block}
        </p>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  const segments = buildBreadcrumbSegments(`/use-cases/${slug}`);
  const related = caseStudies.filter((cs) => cs.slug !== study.slug).slice(0, 2);

  return (
    <>
      <section className="border-b border-line pt-36 pb-14 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs segments={segments} />
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-dim transition-colors hover:text-text"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            BACK TO USE CASES
          </Link>
          <MonoMeta className="tracking-[0.08em] mt-8 block">{study.category.toUpperCase()} — USE CASE</MonoMeta>
          <h1 className="mt-4 font-display text-4xl font-medium text-text md:text-5xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{study.excerpt}</p>
        </div>
      </section>

      <SectionShell divider>
        <SectionHeader
          index="01 OVERVIEW"
          title="The situation."
          lede="Context before architecture."
        />
        <div className="mt-10">
          <ArticleBlock text={study.overview} />
        </div>
      </SectionShell>

      <SectionShell divider>
        <SectionHeader index="02 CHALLENGE" title="The problem." />
        <div className="mt-10">
          <ArticleBlock text={study.challenge} />
        </div>
      </SectionShell>

      <SectionShell divider>
        <SectionHeader index="03 SOLUTION" title="How OpenZync addresses it." />
        <div className="mt-10">
          <ArticleBlock text={study.solution} />
        </div>
      </SectionShell>

      {study.architecture ? (
        <SectionShell divider>
          <SectionHeader index="04 ARCHITECTURE" title="Technical architecture." />
          <div className="mt-10">
            <ArticleBlock text={study.architecture} />
          </div>
        </SectionShell>
      ) : null}

      <SectionShell divider>
        <SectionHeader
          index="05 OUTCOME"
          title="What you get."
          lede="The durable result of running this scenario on the memory layer."
        />
        <DataGrid cols={3} className="mt-12">
          {study.takeaways.map((takeaway, i) => (
            <DataGrid.Cell key={takeaway}>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-signal-dim" aria-hidden="true" />
                <MonoMeta className="mt-0.5">{String(i + 1).padStart(2, "0")}</MonoMeta>
              </div>
              <p className="mt-3 text-sm text-muted">{takeaway}</p>
            </DataGrid.Cell>
          ))}
        </DataGrid>
      </SectionShell>

      {related.length > 0 ? (
        <SectionShell divider>
          <SectionHeader
            index="06 RELATED"
            title="Read the next one."
            action={
              <Link
                href="/use-cases"
                className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
              >
                All use cases <span aria-hidden="true">→</span>
              </Link>
            }
          />
          <DataGrid cols={2} className="mt-12">
            {related.map((cs) => (
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
        </SectionShell>
      ) : null}

      <SectionShell divider>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <MonoMeta className="tracking-[0.08em] mb-3 block">07 — ACCESS</MonoMeta>
            <h2 className="font-display text-2xl font-medium text-text md:text-3xl">
              Build this scenario on your own infrastructure.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Set up in minutes, not days. Docs, the SDK, and the MCP server
              ship alongside the core.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={`${siteConfig.appUrl}/signup`}
              className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
            >
              Start free <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="https://docs.openzync.tech/en/latest/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-text"
            >
              Read the docs <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </SectionShell>

      <CtaSection />
    </>
  );
}
