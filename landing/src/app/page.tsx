import { Hero } from "@/components/landing/hero";
import { CredibilityWall } from "@/components/landing/credibility-wall";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Capabilities } from "@/components/landing/capabilities";
import { Proof } from "@/components/landing/proof";
import { TrustBand } from "@/components/landing/trust-band";
import { CtaSection } from "@/components/landing/cta-section";
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
      "Temporal knowledge graph with fact supersession",
      "Sub-50ms retrieval across PostgreSQL, FalkorDB, and SurrealDB",
      "5 LLM providers (OpenAI, Anthropic, Azure, Ollama, OpenAI-compatible)",
      "MCP server",
      "Python SDK",
      "Prometheus observability",
      "OpenBao-managed secrets, JWT and API-key auth, RBAC, audit log",
      "Self-hosted with Docker Compose or Helm",
    ],
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
      <Hero />
      <CredibilityWall />
      <HowItWorks />
      <Capabilities />
      <Proof />
      <TrustBand />
      <CtaSection />
    </>
  );
}
