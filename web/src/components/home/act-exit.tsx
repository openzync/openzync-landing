import { Fragment } from "react";
import Link from "next/link";
import { ActHeader } from "@/components/home/act-header";
import { InstallChip } from "@/components/home/install-chip";
import { GithubChip } from "@/components/site/github-mark";
import { Reveal } from "@/components/motion/Reveal";

const FACTS = [
  "AGPL-3.0 core",
  "Apache-2.0 SDK/MCP",
  "Self-hostable",
  "MCP-native",
  "Prometheus-ready",
];

/** Act V — verified-fact constellation and the exit panel. */
export function ActExit() {
  return (
    <section className="relative border-t border-line">
      <Reveal className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-3 px-6 py-10">
        {FACTS.map((fact, i) => (
          <Fragment key={fact}>
            {i > 0 && (
              <span aria-hidden className="size-1 rounded-full bg-biolume/70" />
            )}
            <span className="font-mono text-[11px] tracking-wider text-mist">
              {fact}
            </span>
          </Fragment>
        ))}
      </Reveal>

      <div className="mx-auto max-w-3xl px-6 pb-32 pt-16 text-center lg:pb-40">
        <Reveal>
          <ActHeader
            className="mx-auto text-center"
            eyebrow="ACT V — PROOF & EXIT"
            title="Give your agents a memory."
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <InstallChip />
        </Reveal>
        <Reveal
          delay={220}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/developers"
            className="rounded-full bg-biolume px-7 py-3 font-display text-sm font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_32px_var(--color-glow)]"
          >
            Start building
          </Link>
          <GithubChip />
        </Reveal>
      </div>
    </section>
  );
}
