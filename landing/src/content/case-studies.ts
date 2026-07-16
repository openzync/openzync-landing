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
  {
    title: "Personalised AI Tutor with Persistent Student Memory",
    slug: "ai-tutor",
    excerpt:
      "An AI tutor that remembers every student's learning history, knowledge gaps, misconceptions, and preferred explanations — adapting in real time across sessions.",
    category: "EdTech",
    overview:
      "AI-powered tutoring systems today treat each session as a fresh start. They can answer questions correctly in isolation, but they cannot remember that a student struggled with a specific concept last week, or that a particular explanation style worked better for them. OpenZync gives AI tutors persistent memory of each student's unique learning journey, enabling truly adaptive and personalised education at scale.",
    challenge:
      "Modern AI tutors operate within a single conversation window. When a student returns for a new session, the tutor has no recollection of past interactions — which topics were mastered, where confusion arose, what analogies resonated. This forces students to re-establish context repeatedly, and prevents the tutor from building on prior progress. Teachers reviewing the tutor's reports see isolated snapshots rather than a coherent picture of each student's development. The lack of longitudinal memory limits AI tutoring to surface-level Q&A rather than genuine personalised instruction.",
    solution:
      "OpenZync serves as the persistent memory layer for AI tutoring systems. Each student is represented as a knowledge graph that tracks:\n\n- Concepts mastered, in progress, and not yet attempted with proficiency scores\n- Misconceptions and errors, linked to the specific concepts they relate to\n- Preferred explanation styles (visual, textual, example-driven) inferred from past positive responses\n- Session history with timestamps, topics covered, and engagement patterns\n\nWhen a student starts a new session, the tutor queries OpenZync to build a complete picture: where the student left off, what needs reinforcement, and which approach is most likely to be effective. The tutor can answer questions like 'Remind me how we solved this type of problem last time' without relying on the student to repeat themselves.\n\nAs the student progresses, the graph evolves — newly mastered concepts are marked, recurring errors trigger targeted remediation, and the tutor's teaching strategy adapts based on what has historically worked best for that individual.",
    architecture:
      "OpenZync integrates with existing tutoring platforms via API, storing per-student knowledge graphs in any supported backend. Each interaction — question, answer, hint request, assessment result — is captured as graph events. The tutor uses OpenZync's context retrieval API to hydrate its prompt with relevant student history before responding.\n\nPrompt templates for different tutoring scenarios (new concept introduction, review session, assessment) are versioned and managed through OpenZync's Prompt Versioning feature.",
    takeaways: [
      "Persistent student memory transforms AI tutoring from stateless Q&A into genuine adaptive learning.",
      "Tracking misconceptions as graph entities enables targeted remediation rather than generic review.",
      "The system improves over time as the knowledge graph accumulates more signal about each student's learning patterns.",
    ],
  },
  {
    title: "Clinical Decision Support with Longitudinal Patient Context",
    slug: "clinical-assistant",
    excerpt:
      "A clinical AI assistant that maintains complete patient context across visits, lab results, treatment history, and clinical reasoning — reducing cognitive load on care teams.",
    category: "Healthcare",
    overview:
      "Healthcare AI assistants face a unique challenge: clinical decisions depend on months or years of patient history, but stateless AI models see only the current conversation. OpenZync provides persistent graph-based memory that maintains a complete, evolving picture of each patient — diagnoses, medications, lab trends, clinical notes, and treatment responses — so AI assistants can deliver contextually aware decision support.",
    challenge:
      "Clinicians using AI-assisted tools today must manually provide context for every interaction: 'This is a 58-year-old male with type 2 diabetes, hypertension, and stage 3 CKD who presented three weeks ago with...' The AI has no memory of previous consultations, no awareness of medication changes or lab result trends, and cannot flag inconsistencies between current recommendations and past treatment decisions. This reduces the AI from a proactive assistant to a passive search tool and adds to, rather than reduces, clinician cognitive load.",
    solution:
      "OpenZync serves as the persistent clinical memory backend for healthcare AI assistants. Each patient is represented as a knowledge graph that tracks:\n\n- Diagnoses, conditions, and comorbidities with onset dates and status\n- Medications, dosages, start and end dates, and documented side effects\n- Lab results as time-series nodes linked to specific encounters\n- Clinical notes and reasoning chains from past consultations\n- Allergies, contraindications, and flagged interactions\n\nWhen a clinician initiates a new consultation, the AI assistant queries OpenZync for a structured patient brief: active conditions, recent changes in medications or labs, pending follow-ups, and clinical notes from the last visit. The assistant can answer questions like 'Has this patient tried a GLP-1 agonist before?' or 'What was the reasoning behind stopping the previous antihypertensive?' by traversing the knowledge graph rather than requiring the clinician to recall or search.\n\nEach new consultation feeds back into the graph, creating a continuously updated longitudinal record that grows more valuable with every interaction.",
    architecture:
      "OpenZync is deployed as a HIPAA-compliant service alongside existing EHR systems. Integration occurs via HL7 FHIR API adapters for structured clinical data, with natural language processing pipelines that extract entities and relationships from unstructured clinical notes and store them in the patient knowledge graph.\n\nThe graph backend uses PostgreSQL with pgvector, configured for encrypted storage at rest and in transit. Access controls are enforced at the knowledge graph level, ensuring that clinicians only access patient data within their authorised scope.",
    takeaways: [
      "Persistent patient memory turns AI assistants from passive search tools into proactive clinical decision support systems.",
      "Graph-based tracking of medication changes and lab trends enables pattern recognition that stateless models cannot achieve.",
      "Continuous updates to the knowledge graph create a self-improving clinical record that reduces documentation burden over time.",
    ],
  },
  {
    title: "Sales Intelligence Agent with Prospect Memory",
    slug: "sales-agent",
    excerpt:
      "A sales AI agent that remembers every prospect interaction across email, calls, and meetings — tracking preferences, objections, and engagement signals over time.",
    category: "Sales",
    overview:
      "Enterprise sales cycles span weeks or months, with multiple touchpoints across email, calls, demos, and in-person meetings. Stateless AI sales assistants treat each interaction as isolated, losing critical context about prospect preferences, objections raised, competitive concerns, and engagement history. OpenZync provides persistent memory that gives sales AI agents a complete, evolving picture of every prospect and deal.",
    challenge:
      "Sales teams use a patchwork of tools — CRMs, email platforms, meeting schedulers, and demo systems — none of which share conversational context with AI assistants. When a sales AI reviews a prospect, it has no awareness of what was discussed in last week's demo, which features generated the most interest, what pricing concerns were raised, or where the prospect is in their evaluation process. Follow-up messages feel generic and disconnected from previous conversations. The salesperson spends valuable time re-establishing context that the AI should already know.",
    solution:
      "OpenZync acts as the memory layer for sales AI assistants, ingesting data from across the sales tech stack. Each prospect and account is represented as a knowledge graph that tracks:\n\n- Interaction history across channels (email threads, call transcripts, meeting notes) with timestamps and topics\n- Product interests and feature preferences mentioned, linked to specific interactions\n- Objections raised and how they were addressed, with outcome tracking\n- Competitive concerns and how they evolved over the sales cycle\n- Stakeholder maps — who was involved, their role, their stance\n\nWhen a sales AI prepares a follow-up or a meeting brief, it queries OpenZync for a complete context summary: where the deal stands, what was discussed last, what objections remain open, and recommended next steps based on patterns from similar closed deals. The assistant can answer questions like 'Did we already share the security whitepaper with this prospect?' or 'What was their primary objection in the last call?' from the knowledge graph.\n\nEvery new interaction — email reply, call recording, internal CRM note — enriches the graph, ensuring the AI's understanding of the prospect deepens over time.",
    architecture:
      "OpenZync integrates with the sales tech stack via API connectors for CRM (Salesforce, HubSpot), email platforms, meeting transcription services, and call recording systems. A webhook-based ingestion pipeline captures events as they happen, while a scheduled backfill job processes historical data.\n\nThe graph backend is selected based on scale requirements — PostgreSQL for smaller teams, FalkorDB for enterprise deployments with complex stakeholder maps and long sales cycles. Access controls ensure that sales team members only see prospects within their territory or pipeline.",
    takeaways: [
      "Persistent prospect memory enables sales AI to deliver genuinely personalised follow-ups that reference past conversations naturally.",
      "Tracking objection resolution as a knowledge graph allows the AI to recommend proven responses based on what has worked in similar situations.",
      "Continuous enrichment from every interaction eliminates the 'generic AI' feeling that plagues stateless sales assistants.",
    ],
  },
  {
    title: "DevOps Incident Response with Infrastructure Memory",
    slug: "devops-incident",
    excerpt:
      "An AI ops assistant that remembers past incidents, runbooks, resolution steps, and infrastructure context — accelerating troubleshooting and reducing MTTR.",
    category: "DevOps",
    overview:
      "Incident response teams operate in high-pressure environments where every minute counts. Stateless AI ops assistants can read logs and suggest fixes, but they cannot remember that a similar outage happened three months ago, what the root cause was, or which runbook resolved it. OpenZync provides persistent graph-based memory that gives ops AI assistants a complete understanding of incident history, infrastructure relationships, and resolution patterns.",
    challenge:
      "DevOps teams manage complex, interconnected systems with hundreds of services, databases, and infrastructure components. When an incident occurs, responders must navigate through multiple monitoring tools, log systems, and runbook repositories to piece together what's happening. AI assistants can help, but without memory they treat each incident as unprecedented — even when the exact same error pattern occurred weeks earlier. They cannot answer questions like 'Has this error happened before?' or 'What did we change right before the last PagerDuty alert on this service?' without manual context provision from the engineer. This dramatically limits the AI's value during the most critical moments.",
    solution:
      "OpenZync serves as the persistent memory and relationship graph for DevOps AI assistants. The infrastructure and its incident history are modelled as a knowledge graph that tracks:\n\n- Services, deployments, and infrastructure components with dependency relationships\n- Incident records with timestamps, severity, root cause, duration, and resolution steps\n- Runbooks and playbooks linked to the specific incident types they address\n- Change history — deployments, config changes, scaling events — connected to services they affected\n- Alert patterns and their correlation with past incidents\n\nWhen an incident is detected, the AI assistant queries OpenZync for contextual intelligence: similar past incidents, their root causes and resolutions, recent changes to the affected service, and the most relevant runbook. As the incident response unfolds, each action — command run, dashboard consulted, escalation made — is logged back into the knowledge graph, building a living post-mortem.\n\nThe assistant can proactively suggest: 'This error signature matches the memory leak incident from April. The fix was a connection pool configuration change in service X. Here's the PR that resolved it.'",
    architecture:
      "OpenZync integrates with existing observability and incident management tools — PagerDuty, DataDog, Prometheus, Grafana — via webhook and API connectors. An event ingestion pipeline captures alerts, deployment events, and incident lifecycle changes in real time.\n\nThe graph backend uses PostgreSQL with pgvector, chosen to remain within existing infrastructure. Historical incident data is backfilled from tools like Opsgenie or linear to populate the knowledge graph with institutional memory that outlasts any single team member.",
    takeaways: [
      "Persistent incident memory prevents teams from solving the same problem twice by surfacing past resolutions automatically.",
      "Graph-based dependency mapping helps AI assistants understand blast radius and cascading failure patterns.",
      "Every incident enriches the knowledge graph, creating an ever-improving institutional memory that survives team turnover.",
    ],
  },
];

export const allCaseStudiesHref = "/use-cases";
