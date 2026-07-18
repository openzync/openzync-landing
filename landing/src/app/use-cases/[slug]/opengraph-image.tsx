import { ImageResponse } from "next/og";
import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site-config";

export const alt = "OpenZync Use Case";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#14488C" strokeWidth="4" />
            <path
              d="M16 24 L22 30 L32 18"
              stroke="#14488C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 24, fontWeight: 600, color: "#94a3b8", marginLeft: 12 }}>
            {siteConfig.name}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {study?.category && (
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#14488C",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              {study.category}
            </span>
          )}
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#f8fafc",
              margin: 0,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            {study?.title ?? "Use Case"}
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "#94a3b8",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {study?.excerpt ?? ""}
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
