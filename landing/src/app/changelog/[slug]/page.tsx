import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, MonoMeta } from "@openzync/design-system";
import { getChangelogEntry, getAllChangelogEntries } from "@/lib/changelog";
import { Breadcrumbs } from "@/components/landing/breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

/** ISO date → dotted dateline (2026.10.11), the instrument-log format. */
function dateline(iso: string): string {
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${year}.${month}.${day}` : iso;
}

/** Generate static params for all changelog entries */
export async function generateStaticParams() {
  const entries = getAllChangelogEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

/** Generate metadata for the page */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getChangelogEntry(slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.excerpt,
    alternates: { canonical: `/changelog/${slug}` },
  };
}

export default async function ChangelogEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getChangelogEntry(slug);
  if (!entry) notFound();

  // Version label straight from frontmatter — the generic breadcrumbLabels
  // fallback would title-case the slug into "V1 0 0rc4".
  const segments = [
    { label: "Changelog", href: "/changelog" },
    {
      label: entry.version ? `v${entry.version}` : entry.title,
      href: `/changelog/${slug}`,
    },
  ];

  return (
    <div className="pt-36 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Breadcrumbs (with BreadcrumbList JSON-LD), then the back link */}
        <Breadcrumbs segments={segments} />

        {/* Back link */}
        <Link
          href="/changelog"
          className="mb-8 inline-flex items-center gap-1 font-mono text-xs text-dim transition-colors hover:text-text"
        >
          <span aria-hidden="true">←</span>
          back to changelog
        </Link>

        {/* Entry header — version badge over mono meta line, Fraunces H1 */}
        <header className="mb-8 border-b border-line pb-8">
          <div className="mb-3">
            {entry.version && (
              <Badge variant="brand" size="sm" showDot={false}>
                v{entry.version}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-medium text-text">
            {entry.title}
          </h1>
          <MonoMeta className="mt-3 block">{dateline(entry.date)}</MonoMeta>
        </header>

        {/* Entry content */}
        <article className="prose-custom">
          {entry.MDXContent}
        </article>
      </div>
    </div>
  );
}
