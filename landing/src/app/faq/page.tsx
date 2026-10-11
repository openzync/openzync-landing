import type { Metadata } from "next";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { Accordion } from "@/components/landing/accordion";
import { faqItems } from "@/content/faq";
import { CtaSection } from "@/components/landing/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildFaqPageSchema } from "@/lib/seo";
import { MonoMeta } from "@openzync/design-system";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about OpenZync's persistent agent memory infrastructure.",
  alternates: { canonical: "/faq" },
};

const PAGE_DATELINE = "REFERENCE — FAQ";

/**
 * FAQ page — the disclosure list as instrument rows (see Accordion). Schema
 * markup mirrors the visible questions and answers for rich results.
 */
export default function FaqPage() {
  const segments = buildBreadcrumbSegments("/faq");

  return (
    <>
      <JsonLd data={buildFaqPageSchema(faqItems)} />
      <section className="pt-36 pb-14 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <Breadcrumbs segments={segments} />
          <MonoMeta className="tracking-[0.08em] mb-4 block">{PAGE_DATELINE}</MonoMeta>
          <h1 className="font-display text-4xl font-medium text-text md:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Everything you need to know about OpenZync — architecture,
            licensing, deployment, and the limits that are configurable versus
            fixed.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Accordion items={faqItems} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
