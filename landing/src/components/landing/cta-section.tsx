"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, MonoMeta } from "@openzync/design-system";
import { siteConfig } from "@/content/site-config";
import { trackCtaClick } from "@/lib/analytics/events";

/**
 * Shared closing CTA — rendered at the bottom of the home page and every
 * inner page. No props: one action, one destination.
 */
export function CtaSection() {
  return (
    <section className="border-t border-line bg-surface-900">
      <div className="section-seam mx-auto max-w-6xl px-6">
        <MonoMeta className="mb-4 block">08 DEPLOY</MonoMeta>
        <h2 className="max-w-2xl font-display text-3xl font-medium text-text md:text-4xl">
          Run the memory layer on your own infrastructure.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Self-host the AGPLv3 core in your own VPC in ~60s. Docker Compose
          or Helm, your Postgres, your keys.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="https://docs.openzync.tech/en/latest/guides/quickstart.html"
            onClick={() => trackCtaClick("cta_section_get_started", "cta-section")}
          >
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Self-host in 60s
            </Button>
          </Link>
          <Link
            href={siteConfig.links.github}
            onClick={() => trackCtaClick("cta_section_github", "cta-section")}
            className="font-mono text-sm text-signal transition-colors hover:text-signal-dim"
          >
            View on GitHub <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
