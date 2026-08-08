import { describe, it, expect } from "vitest";
import { buildFaqPageSchema } from "@/lib/seo";

describe("buildFaqPageSchema()", () => {
  it("maps faqs into a schema.org FAQPage with Question/acceptedAnswer pairs", () => {
    const schema = buildFaqPageSchema([
      { question: "What is OpenZync?", answer: "OpenZync is open-source agent memory." },
      { question: "Is it free?", answer: "Yes, AGPL v3 licensed." },
      { question: "Which LLMs?", answer: "OpenAI, Anthropic, and Ollama." },
    ]);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(3);
    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "What is OpenZync?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OpenZync is open-source agent memory.",
      },
    });
    expect(schema.mainEntity[2]).toMatchObject({
      name: "Which LLMs?",
      acceptedAnswer: { text: "OpenAI, Anthropic, and Ollama." },
    });
  });
});
