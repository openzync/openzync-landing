import type { Metadata } from "next";
import Link from "next/link";
import { Badge, MonoMeta } from "@openzync/design-system";
import { getAllChangelogEntries } from "@/lib/changelog";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Latest updates, features, and improvements to OpenZync.",
  alternates: { canonical: "/changelog" },
};

/** ISO date → dotted dateline (2026.10.11), the instrument-log format. */
function dateline(iso: string): string {
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${year}.${month}.${day}` : iso;
}

/**
 * Changelog index — the version log: hairline rows, mono date column,
 * version badge, hover lift via background only.
 */
export default function ChangelogPage() {
  const entries = getAllChangelogEntries();
  const segments = buildBreadcrumbSegments("/changelog");

  return (
    <div className="pt-36 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs segments={segments} />

        <header className="mb-12">
          <MonoMeta className="mb-4 block">
            {entries.length > 0
              ? `${entries.length} releases — latest v${entries[0].version}`
              : "version log — empty"}
          </MonoMeta>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-text">Changelog</h1>
          <p className="mt-4 max-w-xl text-muted">
            Every shipped change, newest first. Breaking changes are called out in the
            entry itself.
          </p>
        </header>

        {entries.length === 0 ? (
          <p className="border-y border-line py-10 text-center font-mono text-sm text-dim">
            no entries in the log
          </p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/changelog/${entry.slug}`}
                  className="group grid gap-2 py-5 transition-colors hover:bg-surface-800 sm:grid-cols-[6.5rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-xs text-dim sm:pt-1">
                    {dateline(entry.date)}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-medium text-text transition-colors group-hover:text-signal">
                        {entry.title}
                      </h2>
                      {entry.version && (
                        <Badge variant="brand" size="sm" showDot={false}>
                          v{entry.version}
                        </Badge>
                      )}
                    </div>
                    <span className="mt-1.5 line-clamp-2 block text-sm text-muted">
                      {entry.excerpt}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
