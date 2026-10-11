"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { GitFork, Mail } from "lucide-react";
import { XLogoIcon, LinkedInIcon } from "./brand-icons";
import { siteConfig, footerLinks, footerSocialLinks } from "@/content/site-config";
import { trackSocialClick } from "@/lib/analytics/events";

type SocialIcon = ComponentType<{ size?: number; className?: string }>;

const socialIcons: Record<string, SocialIcon> = {
  github: GitFork,
  twitter: XLogoIcon,
  linkedin: LinkedInIcon,
};

const footerColumns = [
  { key: "product", label: "Product", links: footerLinks.product },
  { key: "community", label: "Community", links: footerLinks.community },
  { key: "updates", label: "Updates", links: footerLinks.updates },
  { key: "company", label: "Company", links: footerLinks.company },
  { key: "legal", label: "Legal", links: footerLinks.legal },
];

const linkClassName =
  "block py-1.5 text-sm text-muted transition-colors hover:bg-surface-900 hover:text-text";

const columnHeaderClassName =
  "mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-dim";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClassName}>
      {label}
    </Link>
  );
}

/**
 * Dense multi-column instrument footer.
 * Brand zone + 5 link columns (hairline rows) + mono bottom bar.
 * No status affordance exists today — none invented.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-950">
      {/* Support strip — keeps the GitHub star / sponsor hrefs, mono + signal */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
            Support the project
          </span>
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-signal transition-colors hover:text-signal-dim"
            >
              Star on GitHub
            </a>
            <a
              href="https://github.com/sponsors/openzync"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-signal transition-colors hover:text-signal-dim"
            >
              Become a sponsor
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Brand zone */}
        <div className="flex flex-col gap-6 border-b border-line py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/openzync-logo-dark.svg"
                alt={siteConfig.name}
                width={277}
                height={56}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Persistent, graph-based memory infrastructure for AI agents in production.
            </p>
          </div>

          {/* Social row */}
          <div className="flex flex-wrap items-center gap-2">
            {footerSocialLinks.map((s) => {
              const Icon = socialIcons[s.icon] ?? GitFork;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-none border border-line text-dim transition-colors hover:bg-surface-900 hover:text-text"
                  aria-label={s.label}
                  onClick={() => trackSocialClick(s.label.toLowerCase())}
                >
                  <Icon size={16} />
                </a>
              );
            })}
            <a
              href="mailto:hello@openzync.tech"
              className="flex items-center gap-2 rounded-none border border-line px-3 py-2 font-mono text-[11px] text-dim transition-colors hover:bg-surface-900 hover:text-text"
            >
              <Mail size={14} />
              hello@openzync.tech
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-5">
          {footerColumns.map((col) => (
            <div key={col.key}>
              <h4 className={columnHeaderClassName}>{col.label}</h4>
              <ul className="divide-y divide-line">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="font-mono text-[11px] text-dim">
            &copy; {new Date().getFullYear()} {siteConfig.name} · AGPLv3 core · MIT site
          </p>
        </div>
      </div>
    </footer>
  );
}
