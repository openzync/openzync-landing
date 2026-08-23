"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GraphPoster } from "@/components/graph/GraphPoster";
import { MemoryGraph, type MemoryGraphApi } from "@/components/graph/MemoryGraph";
import { GithubMark } from "@/components/site/github-mark";
import { cn } from "@/lib/cn";
import {
  DESCRIPTION,
  GITHUB_STARS,
  GITHUB_URL,
  INSTALL_CMD,
  formatStars,
} from "@/lib/site";

/**
 * Entrance stages are plain SSR HTML; the .armed class (globals.css) replays
 * them as CSS animations post-hydration only when motion is allowed.
 */
export function Hero() {
  const [armed, setArmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const graphApi = useRef<MemoryGraphApi | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
  }, []);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const copyInstall = () => {
    navigator.clipboard
      ?.writeText(INSTALL_CMD)
      .then(() => {
        setCopied(true);
        if (copyTimer.current) clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch((err: unknown) => console.error("copy failed", err));
  };

  return (
    <section
      className={cn(
        "relative flex min-h-[100svh] items-center justify-center overflow-hidden",
        armed && "armed",
      )}
    >
      <div className="absolute inset-0" aria-hidden>
        <GraphPoster />
      </div>
      <div className="absolute inset-0" aria-hidden>
        <MemoryGraph apiRef={graphApi} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-28 text-center">
        <p data-stage style={{ animationDelay: "150ms" }} className="eyebrow">
          OpenZync // Graph memory for AI agents
        </p>

        <h1 className="mt-6 font-display text-display-xl font-semibold text-foam">
          <span className="block overflow-hidden">
            <span
              data-stage-mask
              style={{ animationDelay: "250ms" }}
              className="block"
            >
              Agents forget.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-stage-mask
              style={{ animationDelay: "350ms" }}
              className="block"
            >
              <span className="bg-gradient-to-r from-biolume to-foam bg-clip-text text-transparent">
                OpenZync remembers.
              </span>
            </span>
          </span>
        </h1>

        <p
          data-stage
          style={{ animationDelay: "500ms" }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist"
        >
          {DESCRIPTION}
        </p>

        <div
          data-stage
          style={{ animationDelay: "650ms" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/developers"
            className="rounded-full bg-biolume px-7 py-3 font-display text-sm font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_32px_var(--color-glow)]"
          >
            Start building
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-mist transition-colors duration-300 hover:border-deep hover:text-foam"
          >
            <GithubMark className="size-4" />
            {GITHUB_STARS !== null ? (
              <>
                <StarGlyph />
                {formatStars(GITHUB_STARS)}
              </>
            ) : (
              "GitHub"
            )}
          </a>
        </div>

        <div data-stage style={{ animationDelay: "750ms" }} className="mt-8">
          <button
            type="button"
            onClick={copyInstall}
            aria-live="polite"
            className="group inline-flex items-center gap-3 rounded-full border border-line bg-seafloor/60 px-5 py-2.5 font-mono text-xs text-mist transition-colors duration-300 hover:border-biolume/40 hover:text-foam"
          >
            <span>
              <span className="text-biolume">$</span> {INSTALL_CMD}
            </span>
            <span
              className={cn(
                "transition-colors duration-200",
                copied ? "text-biolume" : "text-deep group-hover:text-mist",
              )}
            >
              {copied ? "copied" : "copy"}
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep">
          scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 h-4 animate-[cue-drop_2.2s_ease-in-out_infinite] bg-biolume/70" />
        </span>
      </div>
    </section>
  );
}

function StarGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 fill-signal" aria-hidden>
      <path d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.3L8 11.1l-3.9 2.2.9-4.3-3.3-3 4.4-.5z" />
    </svg>
  );
}
