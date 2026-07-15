// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — FAQ Data
// ═══════════════════════════════════════════════════════════════════════════════

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is OpenZync?",
    answer:
      "OpenZync is an open-source, persistent memory infrastructure for AI agents. It stores agent interactions as a knowledge graph — entities, relationships, and facts — that agents can read from, write to, and reason over across sessions.",
  },
  {
    question: "How is OpenZync different from a regular database?",
    answer:
      "Unlike a generic database, OpenZync is purpose-built for agent memory. It provides graph-based storage optimized for agentic access patterns, built-in support for multiple graph backends, LLM-integrated retrieval, webhook-driven events, and observability — all behind a single, clean API.",
  },
  {
    question: "What graph backends does OpenZync support?",
    answer:
      "OpenZync supports PostgreSQL (built-in, no external graph DB required), FalkorDB, and SurrealDB. The backend is swappable via configuration — your agent memory isn't locked into any single vendor.",
  },
  {
    question: "Which LLM providers can I use with OpenZync?",
    answer:
      "OpenZync works with OpenAI, Anthropic (Claude), Azure OpenAI, OpenRouter, and local models through Ollama. You can route different tasks to different providers based on cost, latency, or capability requirements.",
  },
  {
    question: "Is OpenZync open source?",
    answer:
      "Yes, OpenZync core is open source under the AGPL v3 license (dual-license with commercial option for SaaS use). The Python SDK is Apache 2.0. You can self-host, modify, and extend it freely.",
  },
  {
    question: "Can I use OpenZync for free?",
    answer:
      "OpenZync is free and open source for self-hosted deployments. It's AGPL v3 licensed with a commercial option for SaaS use. Self-host without restrictions and only require a commercial license if you offer it as a hosted service without releasing modifications.",
  },
  {
    question: "How does human-in-the-loop work?",
    answer:
      "Human-in-the-loop approval gates are on the roadmap. The webhook system and event-driven architecture provide the foundation, and we plan to add configurable approval workflows in a future release.",
  },
  {
    question: "What languages/frameworks does OpenZync support?",
    answer:
      "OpenZync provides a Python SDK as a first-class citizen, plus a REST API that works with any language. A LangChain integration is also available. The SDK and API are language-agnostic via HTTP.",
  },
  {
    question: "Can I self-host OpenZync?",
    answer:
      "Yes. OpenZync is designed for self-hosting from day one. You can deploy it on your own infrastructure using Docker Compose or Kubernetes (Helm charts provided). We provide Docker images, Helm charts, and reference infrastructure configs for production deployments.",
  },
  {
    question: "How do I migrate from another memory solution?",
    answer:
      "The REST API makes it straightforward to export data from your existing system and import it into OpenZync. The underlying PostgreSQL schema is well-documented for direct data access. Migration tools for common sources are on the roadmap.",
  },
  {
    question: "What are the API rate limits?",
    answer:
      "Self-hosted deployments have no rate limits imposed by the platform — you control your own infrastructure. The platform includes configurable rate limiting middleware that you can tune for your deployment.",
  },
  {
    question: "Is my data portable?",
    answer:
      "Absolutely. OpenZync uses standard PostgreSQL tables for the default graph backend. You can export your data as JSON via the REST API or access the underlying database directly. Your data is never locked in.",
  },
  {
    question: "How does OpenZync handle production scaling?",
    answer:
      "OpenZync is built for production from the ground up. It supports horizontal scaling through database connection pooling, Redis caching, and async worker processing. Self-hosted deployments can be scaled using standard infrastructure patterns like horizontal pod autoscaling and database read replicas.",
  },
];
