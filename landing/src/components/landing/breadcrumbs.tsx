import Link from "next/link";
import { breadcrumbLabels, siteConfig } from "@/content/site-config";
import { JsonLd } from "@/components/json-ld";

interface BreadcrumbsProps {
  /** Path segments after the base path, e.g. ["features"] */
  segments: { label: string; href: string }[];
}

/**
 * Breadcrumb navigation. Mono chrome: the trail reads as an instrument
 * path (HOME / FEATURES), separators are load-bearing mono characters.
 * Renders as: Home / Section / Page.
 */
export function Breadcrumbs({ segments }: BreadcrumbsProps) {
  if (segments.length === 0) return null;

  const allItems = [
    { label: "Home", href: "/" },
    ...segments,
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(i < allItems.length - 1 ? { item: `${siteConfig.url}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.08em]">
          <li>
            <Link href="/" className="uppercase text-dim transition-colors hover:text-text">
              Home
            </Link>
          </li>
          {segments.map((seg, i) => (
            <li key={seg.href} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-dim">
                /
              </span>
              {i === segments.length - 1 ? (
                <span className="uppercase text-text" aria-current="page">
                  {seg.label}
                </span>
              ) : (
                <Link href={seg.href} className="uppercase text-dim transition-colors hover:text-text">
                  {seg.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * Build breadcrumb segments from a pathname.
 * Looks up labels from breadcrumbLabels config.
 */
export function buildBreadcrumbSegments(pathname: string): { label: string; href: string }[] {
  const parts = pathname.split("/").filter(Boolean);
  const segments: { label: string; href: string }[] = [];

  let accumulated = "";
  for (const part of parts) {
    accumulated += `/${part}`;
    const label = breadcrumbLabels[accumulated] ?? part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    segments.push({ label, href: accumulated });
  }

  return segments;
}
