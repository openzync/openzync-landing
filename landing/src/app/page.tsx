import { Hero } from "@/components/landing/hero";
import { ReleaseSpotlight } from "@/components/landing/release-spotlight";
import { AudienceTabs } from "@/components/landing/audience-tabs";
import { StatsSection } from "@/components/landing/stats-section";
import { CaseStudies } from "@/components/landing/case-studies";
import { NewsSection } from "@/components/landing/news-section";
import { SponsorsSection } from "@/components/landing/sponsors-section";
import { WhatsNext } from "@/components/landing/whats-next";
import { CtaSection } from "@/components/landing/cta-section";
import { FadeIn } from "@/components/landing/fade-in";
import { JsonLd } from "@/components/json-ld";
import { FileUp, History } from "lucide-react";
import { siteConfig } from "@/content/site-config";

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OpenZync",
    url: "https://openzync.tech",
    logo: "https://openzync.tech/images/openzync-logo-dark.svg",
    description: siteConfig.description,
    sameAs: [
      "https://github.com/openzync",
      siteConfig.links.twitter,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@openzync.tech",
      contactType: "sales",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OpenZync",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud / Self-Hosted",
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Graph-based agent memory",
      "3 graph backends (PostgreSQL, FalkorDB, SurrealDB)",
      "5 LLM providers",
      "MCP server",
      "Prometheus observability",
      "Python SDK",
    ],
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
      <Hero />
      <WhatsNext />
      <FadeIn delay={80}><ReleaseSpotlight /></FadeIn>
      <FadeIn delay={160}><AudienceTabs /></FadeIn>
      <FadeIn delay={240}><StatsSection /></FadeIn>
      <FadeIn delay={320}><CaseStudies /></FadeIn>
      <FadeIn delay={400}><NewsSection /></FadeIn>
      <FadeIn delay={480}><SponsorsSection /></FadeIn>

      {/* Blob differentiator band — memory that keeps the file */}
      <FadeIn delay={520}>
        <section className="relative overflow-hidden py-20 md:py-28 border-t border-surface-800">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 mb-6">
              <FileUp size={14} className="text-brand-300" />
              <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">
                File-Preserving Memory
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Memory that <span className="text-brand-300">keeps the file</span>.
            </h2>
            <p className="text-surface-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Files attached to a session aren&rsquo;t just digested to text and thrown away.
              Blobs are preserved as first-class, S3-backed objects that messages reference —
              and their content feeds a fact store where corrections supersede instead of piling up.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
              <div className="rounded-xl border border-surface-800 bg-surface-900 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/10 mb-4">
                  <FileUp size={22} className="text-brand-300" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  Preserved &amp; referenced
                </h3>
                <p className="text-surface-400 leading-relaxed text-sm">
                  Attachments are stored S3-backed as first-class session objects.
                  Messages link to them via blob_id — the original file is never lost.
                </p>
              </div>
              <div className="rounded-xl border border-surface-800 bg-surface-900 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/10 mb-4">
                  <History size={22} className="text-brand-300" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  Supersede, not accumulate
                </h3>
                <p className="text-surface-400 leading-relaxed text-sm">
                  Extracted content lands in the fact store, where later corrections
                  supersede earlier facts — with effective-at reads and observable
                  supersession events.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={560}><CtaSection /></FadeIn>
    </>
  );
}
