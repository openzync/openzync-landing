"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";

/**
 * In-page table of contents with scroll-spy. Mirrors the site's footer-column
 * pattern — an uppercase eyebrow over a flush list of quiet links, with the
 * active section marked by color + weight only (no box, no pill, no rail),
 * matching the site's link and breadcrumb conventions. Degrades to plain
 * anchor links without JS.
 */
export function TableOfContents({
  headings,
  showLabel = true,
}: {
  headings: Heading[];
  showLabel?: boolean;
}) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(String(entry.target.id), entry.boundingClientRect.top);
          } else {
            visible.delete(String(entry.target.id));
          }
        }
        let topmost: [string, number] | null = null;
        for (const [id, top] of visible) {
          if (!topmost || top < topmost[1]) topmost = [id, top];
        }
        setActive(topmost?.[0] ?? "");
      },
      { rootMargin: "-96px 0px -75% 0px", threshold: 0 },
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      {showLabel && (
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-surface-500">
          On this page
        </h4>
      )}
      <ul className="space-y-2.5">
        {headings.map((h) => {
          const isH3 = h.level === 3;
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm transition-colors ${isH3 ? "pl-4" : "font-medium"} ${
                  isActive
                    ? "text-text-primary"
                    : "text-surface-400 hover:text-text-primary"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}