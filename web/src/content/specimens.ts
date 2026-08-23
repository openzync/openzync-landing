export type SpecimenVisual =
  | "triangle"
  | "swap"
  | "blob"
  | "mcp"
  | "sdk"
  | "metrics";

export type Specimen = {
  index: string;
  domain: string;
  title: string;
  description: string;
  visual: SpecimenVisual;
};

/** Facts verified against openzync-core capabilities — nothing speculative. */
export const SPECIMENS: Specimen[] = [
  {
    index: "01",
    domain: "GRAPH-NATIVE MEMORY",
    title: "Three graph backends",
    description:
      "PostgreSQL, FalkorDB, SurrealDB — pick your store, keep the API.",
    visual: "triangle",
  },
  {
    index: "02",
    domain: "FACT SUPERSESSION",
    title: "Corrections, not duplicates",
    description:
      "Newer facts supersede older ones with effective-at reads and observable events.",
    visual: "swap",
  },
  {
    index: "03",
    domain: "FILE-PRESERVING BLOBS",
    title: "Attachments stay files",
    description:
      "Uploads persist as S3-backed objects messages reference by id — never digested away.",
    visual: "blob",
  },
  {
    index: "04",
    domain: "MCP SERVER",
    title: "Speaks MCP natively",
    description: "Plug OpenZync memory into any MCP client out of the box.",
    visual: "mcp",
  },
  {
    index: "05",
    domain: "PYTHON SDK",
    title: "Sync & async clients",
    description: "pip-installable SDK with optional LangChain extras.",
    visual: "sdk",
  },
  {
    index: "06",
    domain: "OBSERVABILITY",
    title: "Prometheus metrics built in",
    description:
      "Request, ingestion, and retrieval metrics exposed for your scrape target.",
    visual: "metrics",
  },
];
