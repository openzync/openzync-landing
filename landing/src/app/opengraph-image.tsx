import { ImageResponse } from "next/og";

export const alt = "OpenZync — Persistent Agent Memory Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#14488C" strokeWidth="4" />
            <path
              d="M16 24 L22 30 L32 18"
              stroke="#14488C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#f8fafc",
              marginLeft: 16,
            }}
          >
            OpenZync
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Persistent Graph Memory Infrastructure for AI Agents
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
