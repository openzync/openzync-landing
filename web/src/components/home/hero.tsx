"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { GraphPoster } from "@/components/graph/GraphPoster";
import { MemoryGraph, type MemoryGraphApi } from "@/components/graph/MemoryGraph";
import { InstallChip } from "@/components/home/install-chip";
import { GithubChip } from "@/components/site/github-mark";
import { DESCRIPTION } from "@/lib/site";

/**
 * Entrance stages are plain SSR HTML; the .armed class (globals.css) replays
 * them as CSS animations post-hydration only when motion is allowed.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const graphApi = useRef<MemoryGraphApi | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    sectionRef.current?.classList.add("armed");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
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
          <GithubChip />
        </div>

        <div data-stage style={{ animationDelay: "750ms" }} className="mt-8">
          <InstallChip />
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
