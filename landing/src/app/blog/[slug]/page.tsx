import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, MonoMeta } from "@openzync/design-system";
import { ChevronDown } from "lucide-react";
import { XLogoIcon, LinkedInIcon } from "@/components/landing/brand-icons";
import { TableOfContents } from "@/components/landing/table-of-contents";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/content/site-config";

const shareUrl = siteConfig.url;

interface Props {
  params: Promise<{ slug: string }>;
}

/** ISO date → dotted dateline (2026.10.11), the instrument-log format. */
function dateline(iso: string): string {
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${year}.${month}.${day}` : iso;
}

/** Generate static params for all blog posts */
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** Generate metadata for the page */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  // Prefer explicit SEO fields; fall back to H1 title + excerpt.
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const image = post.image ?? siteConfig.ogImage;

  return {
    title,
    description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const segments = buildBreadcrumbSegments(`/blog/${slug}`);

  // Log-ordered siblings: newest first, so the previous entry is newer.
  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost =
    currentIndex > -1 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  const canonicalUrl = `${siteConfig.url}/blog/${slug}`;
  const postImage = post.image ?? siteConfig.ogImage;
  const absoluteImage = postImage.startsWith("http")
    ? postImage
    : `${siteConfig.url}${postImage}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/openzync-logo-dark.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: absoluteImage,
    url: canonicalUrl,
  };

  return (
    <div className="pt-36 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <JsonLd data={blogPostingSchema} />
        <Breadcrumbs segments={segments} />

        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 font-mono text-xs text-dim transition-colors hover:text-text"
        >
          <span aria-hidden="true">←</span>
          back to blog
        </Link>

        <div className="xl:grid xl:grid-cols-[1fr_220px] xl:gap-12">
          <div className="mx-auto max-w-3xl w-full">
            {/* Post header — mono meta line under the Fraunces H1 */}
            <header className="mb-8 border-b border-line pb-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                {post.category && (
                  <Badge variant="info" size="sm" showDot={false}>
                    {post.category}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-medium text-text">
                {post.title}
              </h1>
              <p className="mt-3 font-mono text-xs text-muted">
                {post.author} &middot; {dateline(post.date)} &middot; {post.readingTime} min
                read
                {post.updated ? ` &middot; updated ${dateline(post.updated)}` : ""}
              </p>
            </header>

            {/* Social share */}
            <div className="mb-8 flex items-center gap-2 text-dim">
              <span className="flex items-center gap-1 font-mono text-xs">share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${shareUrl}/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 transition-colors hover:bg-surface-800 hover:text-text"
                aria-label="Share on Twitter"
              >
                <XLogoIcon size={16} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${shareUrl}/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 transition-colors hover:bg-surface-800 hover:text-text"
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon size={16} />
              </a>
            </div>

            {/* Mobile & tablet TOC */}
            {post.headings.length > 0 && (
              <details className="group mb-8 xl:hidden">
                <summary className="mb-4 flex cursor-pointer list-none items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.06em] text-dim">
                  On this page
                  <ChevronDown size={14} className="shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <TableOfContents headings={post.headings} showLabel={false} />
              </details>
            )}

            {/* Post content */}
            <article className="prose-custom">
              {post.MDXContent}
            </article>

            {/* Log navigation — newer / older entries */}
            <nav
              aria-label="More posts"
              className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
            >
              {newerPost ? (
                <Link
                  href={`/blog/${newerPost.slug}`}
                  className="group rounded-xl transition-colors hover:bg-surface-800"
                >
                  <MonoMeta className="block">← newer</MonoMeta>
                  <span className="mt-1 block text-sm text-text transition-colors group-hover:text-signal">
                    {newerPost.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {olderPost ? (
                <Link
                  href={`/blog/${olderPost.slug}`}
                  className="group rounded-xl text-right transition-colors hover:bg-surface-800 sm:text-right"
                >
                  <MonoMeta className="block">older →</MonoMeta>
                  <span className="mt-1 block text-sm text-text transition-colors group-hover:text-signal">
                    {olderPost.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>

          {/* Desktop sticky TOC */}
          {post.headings.length > 0 && (
            <aside className="hidden xl:block">
              <div className="sticky top-24">
                <TableOfContents headings={post.headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
