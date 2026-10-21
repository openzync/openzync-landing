import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request CSP nonce (Next.js 16 `proxy` convention). Next applies the
 * nonce automatically to framework/bundle scripts during SSR; first-party
 * scripts opt in via the `x-nonce` header (see layout.tsx, GaScript, JsonLd).
 *
 * style-src carries the same nonce and NO 'unsafe-inline': Next nonces its
 * generated `<style>` tags from `x-nonce`, and first-party styling lives in
 * stylesheets/Tailwind (dynamic offsets via CSS vars, not `style` props —
 * an SSR style attribute carries no nonce and is dropped pre-hydration).
 * Programmatic CSSOM sets (`document.body.style.*`) are unaffected by
 * style-src. OG-image routes render via ImageResponse, never in a browser.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://*.google-analytics.com`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
