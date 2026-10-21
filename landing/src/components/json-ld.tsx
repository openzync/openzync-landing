import { headers } from "next/headers";

/**
 * Escape `</` inside the serialized payload so a `</script>` in CMS/FAQ
 * copy cannot break out of this inline block. `<\/` is a valid JSON string
 * escape and parses back to the same value.
 */
export async function JsonLd({ data }: { data: Record<string, unknown> }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/<\//g, "<\\/"),
      }}
    />
  );
}
