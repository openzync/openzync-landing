// ═══════════════════════════════════════════════════════════════════════════════
// OpenZync Landing — Use Cases / Case Studies Data
// ═══════════════════════════════════════════════════════════════════════════════

export interface CaseStudy {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string;
  /** High-level summary of the use case */
  overview: string;
  /** The problem this use case addresses */
  challenge: string;
  /** How OpenZync addresses the problem */
  solution: string;
  /** Technical implementation details (optional) */
  architecture?: string;
  /** Key lessons learned */
  takeaways: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    title: "Customer Support with Persistent Agent Memory",
    slug: "customer-support",
    excerpt:
      "Give support agents persistent memory of every customer interaction across sessions, tools, and handoffs — eliminating context loss and reducing resolution times.",
    category: "Customer Support",
    overview:
      "Customer support teams often handle complex issues that span multiple channels — email, chat, phone — and involve multiple agents over several days or weeks. Without a shared memory layer, each handoff forces the customer to repeat their issue, and each agent starts with a blank slate. OpenZync provides a persistent, graph-based memory that preserves context across every interaction.",
    challenge:
      "Most support stacks use disconnected tools — ticketing systems, live chat platforms, and CRMs — that don't share context with each other. When a customer follows up on an email thread via chat, the chat agent has no visibility into the email history. This leads to repeated questions from customers, longer resolution times, and increased frustration on both sides. Agents spend more time catching up on context than actually resolving issues.",
    solution:
      "OpenZync acts as a graph-based memory layer between existing support tools. Every customer interaction — email, chat, phone transcript, and order note — is ingested into a per-customer knowledge graph that tracks entities (products, orders, accounts), relationships (escalation paths, agent assignments), and resolution history.\n\nIntegration happens via webhooks with existing support platforms, and directly with the organisation's databases using the Multi-Graph Backend adapter. When a support agent opens a ticket, the OpenZync API returns a structured context brief: customer sentiment trend, unresolved issues, recent interactions, and suggested resolutions based on similar past tickets.\n\nThe system can be rolled out incrementally — starting with one channel and expanding — with minimal disruption to existing workflows.",
    architecture:
      "OpenZync is deployed as a standalone service alongside existing infrastructure. The graph backend uses PostgreSQL (via OpenZync's native pgvector adapter) or any supported graph backend for persistence, with a Redis cache for real-time agent lookups. Each customer is represented as a node with edges to orders, tickets, and support agents. Resolution patterns are stored as sub-graphs that the agent similarity engine queries at runtime.\n\nThe integration surface is minimal: webhook handlers for ticket creation and status changes, and a single API call per agent session. OpenZync's idempotent execution guarantees prevent duplicate context entries even during retries.",
    takeaways: [
      "Graph-based memory eliminates context loss across disconnected tools without replacing the existing stack.",
      "Incremental rollout minimises disruption and builds team confidence.",
      "Structured context briefs at ticket open significantly reduce average handle time.",
    ],
  },
  {
    title: "Research Assistant with Persistent Memory",
    slug: "research-assistant",
    excerpt:
      "AI research agents that maintain context across weeks-long literature review sessions using persistent citation graphs and entity tracking.",
    category: "Research",
    overview:
      "Research teams running AI-powered literature reviews face a fundamental limitation: stateless LLM sessions cannot connect findings across time. A question about a finding mentioned in week 1 requires replaying weeks of conversation history — an expensive and error-prone process. OpenZync provides persistent graph-based memory that lets research agents build on previous work across sessions.",
    challenge:
      "Stateless LLM chains treat each research session as an isolated event. Researchers spend significant time per session re-establishing context — which entities are under investigation, what criteria have been applied, which sources have already been reviewed. The agent frequently recommends already-analysed material, and cross-session questions require manual digging through chat logs. The accumulated context loss results in duplicated effort and missed connections across sessions.",
    solution:
      "OpenZync serves as the persistent memory backend for research agents. Each literature review session creates or resumes a knowledge graph that tracks:\n\n- Sources reviewed (with identifiers, summaries, and key findings as node properties)\n- Entities and concepts mentioned, with relationship edges to sources that reference them\n- Filtering criteria and decisions as graph annotations\n- Reasoning chains that capture why certain conclusions were drawn\n\nOpenZync's Multi-LLM Support allows routing different tasks — summarisation, classification, extraction — to the most suitable provider. The citation graph can be stored in any supported graph backend, selected based on the traversal patterns required.\n\nWhen a researcher asks a cross-session question, OpenZync traverses the knowledge graph to find relevant entities and returns a context window populated with the most connected nodes — without replaying thousands of turns of conversation.",
    architecture:
      "OpenZync runs as a sidecar container alongside existing research pipelines. The graph backend is deployed separately and connected via OpenZync's adapter layer. Graph traversal uses OpenZync's built-in path query API, which returns the shortest relationship chains between entities, sources, and conclusions.\n\nPrompt templates for different research tasks are versioned using OpenZync's Prompt Versioning feature, stored as .jinja2 files and synced at deploy time.",
    takeaways: [
      "Persistent citation graphs eliminate duplicate work and enable cumulative research across sessions.",
      "Different LLM providers can be routed to different tasks, improving both accuracy and cost efficiency.",
      "Shared knowledge graphs let teams build on each other's findings without explicit coordination.",
    ],
  },
  {
    title: "Context-Aware Automated Code Review",
    slug: "code-review",
    excerpt:
      "A code review agent that remembers project conventions, past PR feedback, and architectural decisions across the entire repository history.",
    category: "Engineering",
    overview:
      "AI-assisted code review tools without memory treat every pull request as an isolated event. They flag the same accepted conventions repeatedly, miss regressions against prior architectural decisions, and cannot distinguish between one-time exceptions and evolving team standards. OpenZync provides the persistent context needed for code review agents that learn and improve over time.",
    challenge:
      "In a repository with multiple services, thousands of files, and years of architectural decisions, a stateless review agent has no awareness of past discussions. It flags the same accepted patterns repeatedly, cannot detect when a new change contradicts a previous review decision, and has no way to answer historical questions about why certain approaches were chosen. The noise-to-signal ratio degrades to the point where engineers start ignoring the agent's feedback entirely.",
    solution:
      "OpenZync gives the code review agent persistent memory of the entire repository's review history. Each PR, commit, and review comment is ingested into a knowledge graph with nodes for:\n\n- Services, modules, and functions (extracted from PR diffs)\n- Review decisions (approved, rejected, requested changes) with rationale\n- Coding conventions extracted and confirmed across multiple reviews\n- Architectural decisions (dependency choices, deprecation timelines, ADR references)\n\nThe agent queries the graph for context relevant to changed files before each review — past decisions on the same functions, known conventions for the affected services, and architectural constraints. This context is injected into the LLM prompt before review begins.\n\nConventions previously flagged but accepted by human reviewers are automatically reclassified, reducing noise over time. When a PR genuinely regresses against a past decision, the agent cites the specific prior review.",
    architecture:
      "OpenZync integrates with existing CI/CD pipelines via webhook handlers that ingest PR events and scheduled jobs that backfill historical data. The graph backend can be any supported backend, chosen to stay within the organisation's existing infrastructure.\n\nThe review agent runs as a custom tool. Each review cycle: fetch PR diff, query OpenZync for context, construct prompt with relevant graph nodes, run LLM review, post comments, and feed the review outcome back into the knowledge graph for future queries.",
    takeaways: [
      "Stateless code review creates noise, not value. Memory is what turns an AI reviewer from a nuisance into a trusted tool.",
      "Feeding review outcomes back into the knowledge graph creates a self-improving system that gets quieter on approved patterns and louder on genuine regressions.",
      "Graph-based memory of architectural decisions prevents the same debates from recurring.",
    ],
  },
];

export const allCaseStudiesHref = "/use-cases";
