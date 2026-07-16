import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site-config";
import { CtaSection } from "@/components/landing/cta-section";
import { Button } from "@openzync/design-system";

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
  };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight mb-4">
      {children}
    </h2>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-surface-300 leading-relaxed mb-6 whitespace-pre-line">
      {children}
    </p>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  const segments = buildBreadcrumbSegments("/use-cases");

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-36 pb-12 md:pb-16 border-b border-surface-800">
        <div className="mx-auto max-w-3xl px-6">
          <Breadcrumbs segments={segments} />

          <div className="mt-8 mb-10">
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-200 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to use cases
            </Link>
          </div>

          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-brand-300 mb-4">
            {study.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-6">
            {study.title}
          </h1>

          <p className="text-lg text-surface-400 leading-relaxed border-l-2 border-brand-500/40 pl-4 italic">
            {study.excerpt}
          </p>
        </div>
      </section>

      {/* ── Article Body ──────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Overview */}
          <div className="mb-10">
            <SectionHeading>Overview</SectionHeading>
            <BodyText>{study.overview}</BodyText>
          </div>

          {/* The Challenge */}
          <div className="mb-10">
            <SectionHeading>The Challenge</SectionHeading>
            <BodyText>{study.challenge}</BodyText>
          </div>

          {/* The Solution */}
          <div className="mb-10">
            <SectionHeading>The Solution</SectionHeading>
            <BodyText>{study.solution}</BodyText>
          </div>

          {/* Architecture (optional) */}
          {study.architecture && (
            <div className="mb-10">
              <SectionHeading>Technical Architecture</SectionHeading>
              <BodyText>{study.architecture}</BodyText>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="mb-10">
            <SectionHeading>Key Takeaways</SectionHeading>
            <ul className="space-y-3">
              {study.takeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-surface-300 leading-relaxed">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500/60" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="card-base p-8 md:p-10 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
              Ready to build with OpenZync?
            </h2>
            <p className="text-surface-400 mb-6 max-w-lg mx-auto">
              Start building persistent memory for your agents today. Set up in minutes, not days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`${siteConfig.appUrl}/signup`}>
                <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  Get Started Free
                </Button>
              </Link>
              <Link href="https://docs.openzync.tech/en/latest/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  Read the Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
