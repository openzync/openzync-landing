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
      <FadeIn delay={560}><CtaSection /></FadeIn>
    </>
  );
}
