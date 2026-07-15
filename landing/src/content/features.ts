// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Features Configuration
// ═══════════════════════════════════════════════════════════════════════════════

export interface Feature {
  title: string;
  description: string;
  icon: string;
  category: "graph" | "memory" | "llm" | "tools" | "observability";
}

export const features: Feature[] = [
  {
    title: "Multi-Graph Backends",
    description:
      "Seamlessly switch between PostgreSQL, FalkorDB, SurrealDB, and more. Your agent memory isn't locked into any single vendor.",
    icon: "GitBranch",
    category: "graph",
  },
  {
    title: "Graph-Based Memory",
    description:
      "Store agent interactions as a knowledge graph — entities, relationships, and facts that your agents can traverse and reason over.",
    icon: "Network",
    category: "memory",
  },
  {
    title: "Multi-LLM Support",
    description:
      "Works with OpenAI, Anthropic, Azure, OpenRouter, and local models via Ollama. Route different tasks to different providers based on cost, latency, or capability.",
    icon: "Brain",
    category: "llm",
  },
  {
    title: "Human-in-the-Loop (Coming Soon)",
    description:
      "Approval gates for actions with external side effects — email, payments, API writes. Every escalation will be auditable and resumable. Currently in design.",
    icon: "Shield",
    category: "tools",
  },
  {
    title: "Tool Plugin System (Planned)",
    description:
      "A typed plugin interface to extend agent capabilities, with idempotent execution and structured observability. Internal abstractions exist; a public plugin API is on the roadmap.",
    icon: "Puzzle",
    category: "tools",
  },
  {
    title: "Deterministic Workflows (Planned)",
    description:
      "Stage-gated execution graphs for production workflows. Crash-safe and auditable transitions are on the roadmap.",
    icon: "Workflow",
    category: "tools",
  },
  {
    title: "Observability Built-In",
    description:
      "Every tool execution, LLM call, and workflow transition emits structured logs with latency, token counts, and cost estimates out of the box.",
    icon: "BarChart3",
    category: "observability",
  },
  {
    title: "Prompt Versioning",
    description:
      "Version-controlled prompt templates per organization with rollback support. Changes are tracked and reviewed like code changes.",
    icon: "FileCode",
    category: "llm",
  },
  {
    title: "Usage Tracking",
    description:
      "Rate limiting and quota enforcement built into the middleware layer. Usage metering and billing logic are planned for a future release.",
    icon: "CreditCard",
    category: "observability",
  },
];

export const categories: {
  key: Feature["category"];
  label: string;
  description: string;
}[] = [
  {
    key: "graph",
    label: "Graph Backends",
    description: "PostgreSQL-native, FalkorDB, and SurrealDB — all behind a single abstraction",
  },
  {
    key: "memory",
    label: "Agent Memory",
    description: "Persistent, structured memory that agents can reason over",
  },
  {
    key: "llm",
    label: "LLM Providers",
    description: "OpenAI, Anthropic, Azure, OpenRouter, and local models via Ollama",
  },
  {
    key: "tools",
    label: "Tool Ecosystem",
    description: "Webhook system, event-driven architecture, and planned plugin interfaces",
  },
  {
    key: "observability",
    label: "Observability",
    description: "Prometheus metrics, structured logging, and Grafana dashboards out of the box",
  },
];
