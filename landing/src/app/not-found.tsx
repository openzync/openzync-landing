import type { Metadata } from "next";
import Link from "next/link";
import { Button, MonoMeta } from "@openzync/design-system";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

/**
 * 404 — a one-screen instrument readout: mono status, Fraunces H1,
 * two exits (home, docs). No link farm.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100svh-9rem)] flex-col items-center justify-center px-6 py-16">
      <MonoMeta className="mb-4 block">error 404 &mdash; route not found</MonoMeta>
      <p className="font-mono text-6xl font-medium leading-none text-text md:text-7xl">
        404
      </p>
      <h1 className="mt-6 text-center text-2xl font-display font-medium text-text md:text-3xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-center text-muted">
        This route doesn&rsquo;t exist in the graph &mdash; it may have been moved or never
        existed.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to home
          </Button>
        </Link>
        <Link
          href={siteConfig.links.docs}
          className="inline-flex items-center gap-1.5 font-mono text-sm text-signal transition-colors hover:text-signal-dim"
        >
          Read the docs <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
