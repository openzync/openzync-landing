import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-fonts";

export const alt = "OpenZync — Persistent Agent Memory Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();

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
          background: "linear-gradient(135deg, #0B0D12 0%, #12151C 100%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#78A9F2" strokeWidth="4" />
            <path
              d="M16 24 L22 30 L32 18"
              stroke="#78A9F2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: "#8A93A6",
              marginLeft: 16,
              fontFamily: "IBM Plex Sans",
            }}
          >
            OpenZync
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#E7E9EE",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.2,
            fontFamily: "Fraunces",
          }}
        >
          Persistent Graph Memory Infrastructure for AI Agents
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
