import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { caseStudies } from "@/content/case-studies";
import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Real-world applications of OpenZync's persistent agent memory infrastructure.",
  alternates: { canonical: "/use-cases" },
};

export default function UseCasesPage() {
  const segments = buildBreadcrumbSegments("/use-cases");

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumbs segments={segments} />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Use Cases
          </h1>
          <p className="text-surface-400 text-lg max-w-2xl">
            See how teams are using OpenZync to give their agents persistent, graph-based memory
            in production.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {caseStudies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-surface-500">No case studies yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {caseStudies.map((cs, i) => (
                <div key={cs.slug} id={cs.slug} className="card-base p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-sm font-bold text-brand-300">
                      {i + 1}
                    </span>
                    <span className="text-xs uppercase tracking-widest font-semibold text-surface-500">
                      {cs.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-3">
                    {cs.title}
                  </h2>
                  <p className="text-surface-400 leading-relaxed mb-6">
                    {cs.excerpt}
                  </p>
                  <p className="text-sm text-surface-400 leading-relaxed mb-4">
                    {cs.overview}
                  </p>

                  <Link
                    href={`/use-cases/${cs.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-300 hover:text-brand-200 transition-colors"
                  >
                    Read full case study
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
