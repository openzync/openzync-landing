import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";
import { siteConfig } from "@/content/site-config";

export const alt = "OpenZync Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

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
            {post?.title ?? "Blog"}
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "#94a3b8",
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.4,
            }}
          >
            {post?.excerpt ?? ""}
          </p>
          {post?.author && (
            <p style={{ fontSize: 18, color: "#64748b", margin: 0 }}>
              {post.author} &middot; {post.date}
            </p>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
