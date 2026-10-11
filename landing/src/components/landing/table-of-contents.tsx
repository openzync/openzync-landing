"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";
import { cn } from "@openzync/design-system";

/**
 * In-page table of contents as a mono instrument rail: a hairline spine with
 * scroll-spy, the active entry marked by signal color and a lit rail segment
 * (no box, no pill). Behaves as plain anchor links without JS.
 *
 * Scroll-spy contract (preserved from the previous implementation): an
 * IntersectionObserver with a -96px top / -75% bottom rootMargin tracks the
 * topmost visible heading, so the highlighted entry is what the reader is
 * actually looking at.
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
        <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-dim">
          On this page
        </h4>
      )}
      <ul className="border-l border-line">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "-ml-px block border-l py-1 font-mono text-xs leading-relaxed transition-colors",
                  h.level === 3 ? "pl-6" : "pl-3",
                  isActive
                    ? "border-signal text-text"
                    : "border-transparent text-dim hover:text-muted",
                )}
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
