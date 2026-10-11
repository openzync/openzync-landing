import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { Badge, MonoMeta } from "@openzync/design-system";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest news, engineering deep-dives, tutorials, and community updates from OpenZync.",
  alternates: { canonical: "/blog" },
};

/** ISO date → dotted dateline (2026.10.11), the instrument-log format. */
function dateline(iso: string): string {
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${year}.${month}.${day}` : iso;
}

/**
 * Blog index — the engineering log: hairline rows, mono date column,
 * category badge, hover lift via background only.
 */
export default function BlogPage() {
  const posts = getAllBlogPosts();
  const segments = buildBreadcrumbSegments("/blog");

  return (
    <div className="pt-36 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs segments={segments} />

        <header className="mb-12">
          <MonoMeta className="mb-4 block">
            {posts.length > 0
              ? `${posts.length} entries — latest ${dateline(posts[0].date)}`
              : "engineering log — empty"}
          </MonoMeta>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-text">Blog</h1>
          <p className="mt-4 max-w-xl text-muted">
            Engineering deep-dives, release announcements, and community notes from the
            OpenZync team.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="border-y border-line py-10 text-center font-mono text-sm text-dim">
            no entries in the log — check back soon
          </p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 py-5 transition-colors hover:bg-surface-800 sm:grid-cols-[6.5rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-xs text-dim sm:pt-1">
                    {dateline(post.date)}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-medium text-text transition-colors group-hover:text-signal">
                        {post.title}
                      </h2>
                      {post.category && (
                        <Badge variant="info" size="sm" showDot={false}>
                          {post.category}
                        </Badge>
                      )}
                    </div>
                    <span className="mt-1.5 line-clamp-2 block text-sm text-muted">
                      {post.excerpt}
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
