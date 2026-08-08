import type { FaqItem } from "@/content/faq";

// type alias (not interface) so it stays assignable to JsonLd's Record<string, unknown>
// — interfaces have no implicit index signature and would fail the type check
export type FaqPageSchema = {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
};

/** Build a schema.org FAQPage JSON-LD block for the /faq page. */
export function buildFaqPageSchema(faqs: FaqItem[]): FaqPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
