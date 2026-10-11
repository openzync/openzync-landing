"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "openzync-announcement-dismissed";
const BAR_HEIGHT = 36;

/**
 * Fixed announcement bar at the very top of the page.
 * - Mono release dateline + single changelog link (signal on hover only)
 * - Dismissable — state persisted in localStorage
 * - Sets --announcement-height CSS variable for the navbar to consume
 */
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "true") {
      setDismissed(false);
    }
  }, []);

  // Sync CSS variable so the navbar can read it
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--announcement-height",
      dismissed ? "0px" : `${BAR_HEIGHT}px`,
    );
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  // Don't render during SSR to avoid flash
  if (!mounted || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-surface-950 border-b border-line">
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center gap-3 px-6">
        <span className="font-mono text-[11px] text-dim">v1.0.0 — 2026-10-10</span>
        <span aria-hidden="true" className="font-mono text-[11px] text-dim">
          ·
        </span>
        <Link
          href="/changelog"
          className="font-mono text-[11px] text-signal transition-colors hover:text-signal-dim"
        >
          Read the release notes
          <span aria-hidden="true" className="ml-1 text-dim">
            →
          </span>
        </Link>
        <button
          onClick={handleDismiss}
          className="absolute right-6 flex items-center justify-center rounded-none p-1 text-dim transition-colors hover:bg-surface-800 hover:text-text"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
