import Script from "next/script";
import { headers } from "next/headers";

/**
 * Google Analytics without @next/third-parties: that package emits an
 * inline init snippet, which a nonce-less static CSP cannot allow. Here
 * every script is external or carries the per-request nonce from proxy.ts,
 * so gtag works with no 'unsafe-inline'/'unsafe-eval'.
 */
export async function GaScript() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script id="ga-init" strategy="afterInteractive" nonce={nonce}>
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
