"use client";

import { useEffect, useRef, useState } from "react";
import {
  MemoryGraph,
  type GraphPhase,
  type MemoryGraphApi,
} from "@/components/graph/MemoryGraph";
import { ActHeader } from "@/components/home/act-header";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Step = {
  id: GraphPhase;
  index: string;
  verb: string;
  quote: string;
  body: string;
};

const STEPS: Step[] = [
  {
    id: "write",
    index: "01",
    verb: "WRITE",
    quote: "“Prefers Python. Ships on Fridays.”",
    body: "Facts are extracted from the session and written as graph nodes.",
  },
  {
    id: "supersede",
    index: "02",
    verb: "SUPERSEDE",
    quote: "“Deadline moved to Q3.”",
    body: "Corrections supersede earlier facts instead of accumulating — history stays observable.",
  },
  {
    id: "recall",
    index: "03",
    verb: "RECALL",
    quote: "Next session, zero re-ingest.",
    body: "The agent retrieves exactly what changed — and what still holds.",
  },
];

/**
 * Act III — the signature scroll moment. Desktop (motion allowed): a 300vh
 * section pins the graph while scroll progress drives write → supersede →
 * recall through the canvas engine. Mobile or reduced motion: the same three
 * states as static SVG panels.
 */
export function ActSupersession() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 pt-24 lg:pt-32">
        <Reveal>
          <ActHeader
            eyebrow="ACT III — WRITE · SUPERSEDE · RECALL"
            title="Watch memory happen."
          />
        </Reveal>
      </div>
      <div className="hidden lg:motion-safe:block">
        <PinnedScenario />
      </div>
      <div className="lg:motion-safe:hidden">
        <StaticSequence />
      </div>
    </section>
  );
}

function PinnedScenario() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const graphApi = useRef<MemoryGraphApi | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastPhase: GraphPhase | null = null;
    let lastIdx = -1;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const idx = progress < 1 / 3 ? 0 : progress < 2 / 3 ? 1 : 2;
      const step = STEPS[idx];
      if (!step) return;
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
      }
      if (step.id === lastPhase) return;
      lastPhase = step.id;
      const api = graphApi.current;
      if (!api) return;
      if (step.id === "write") {
        api.setPhase("write");
        api.burst(0.42, 0.45);
      } else if (step.id === "supersede") {
        api.setPhase("supersede");
        api.burst(0.47, 0.52);
      } else {
        api.setPhase("recall");
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const step = STEPS[active] ?? STEPS[0];

  return (
    <div ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <MemoryGraph apiRef={graphApi} intensity={0.55} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <Caption key={step.id} step={step} active={active} />
        </div>
      </div>
    </div>
  );
}

function Caption({ step, active }: { step: Step; active: number }) {
  return (
    <div className="max-w-md rounded-xl border border-line bg-abyss/85 p-7 animate-[oz-stage-in_0.55s_var(--ease-out-quint)_backwards]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-biolume">
        {step.index} / {step.verb}
      </p>
      <p className="mt-4 font-display text-2xl font-semibold leading-snug text-foam">
        {step.quote}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-mist">{step.body}</p>
      <div className="mt-6 flex gap-2" aria-hidden>
        {STEPS.map((s, i) => (
          <span
            key={s.id}
            className={cn(
              "h-px w-8 transition-colors duration-500",
              i === active ? "bg-biolume" : "bg-line",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function StaticSequence() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 pb-28 pt-14">
      {STEPS.map((s, i) => (
        <Reveal key={s.id} delay={i * 60}>
          <figure className="overflow-hidden rounded-xl border border-line bg-seafloor/50">
            <div aria-hidden className="border-b border-line p-6">
              <MiniGraph step={s.id} />
            </div>
            <figcaption className="p-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-biolume">
                {s.index} / {s.verb}
              </p>
              <p className="mt-3 font-display text-xl font-semibold text-foam">
                {s.quote}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

const BIO = "#3df5c6";
const SIG = "#ffb454";
const DEEP = "#5b6e80";

const N = {
  sat0: [66, 128],
  sat1: [176, 58],
  sat2: [148, 152],
  old: [118, 92],
  fresh: [150, 120],
  query: [266, 128],
} as const;

/** Static three-state diagram of the same scenario, for mobile/reduced. */
function MiniGraph({ step }: { step: GraphPhase }) {
  const isWrite = step === "write";
  const isRecall = step === "recall";
  return (
    <svg viewBox="0 0 320 190" className="h-auto w-full" aria-hidden focusable="false">
      {[N.sat0, N.sat1, N.sat2].map((s, i) => (
        <line
          key={`e${i}`}
          x1={N.old[0]}
          y1={N.old[1]}
          x2={s[0]}
          y2={s[1]}
          stroke={isWrite ? BIO : DEEP}
          strokeOpacity={isWrite ? 0.35 : 0.12}
        />
      ))}
      {!isWrite &&
        [N.sat0, N.sat1, N.sat2].map((s, i) => (
          <line
            key={`f${i}`}
            x1={N.fresh[0]}
            y1={N.fresh[1]}
            x2={s[0]}
            y2={s[1]}
            stroke={BIO}
            strokeOpacity={0.35}
          />
        ))}
      {isRecall && (
        <>
          <line
            x1={N.query[0]}
            y1={N.query[1]}
            x2={N.sat1[0]}
            y2={N.sat1[1]}
            stroke={BIO}
            strokeWidth={2}
            strokeOpacity={0.9}
          />
          <line
            x1={N.sat1[0]}
            y1={N.sat1[1]}
            x2={N.fresh[0]}
            y2={N.fresh[1]}
            stroke={BIO}
            strokeWidth={2}
            strokeOpacity={0.9}
          />
        </>
      )}
      {[N.sat0, N.sat1, N.sat2].map((p, i) => (
        <circle key={`s${i}`} cx={p[0]} cy={p[1]} r={4} fill={BIO} />
      ))}
      <circle cx={N.old[0]} cy={N.old[1]} r={isWrite ? 5 : 4} fill={isWrite ? BIO : DEEP} />
      {!isWrite && (
        <>
          <circle cx={N.fresh[0]} cy={N.fresh[1]} r={9} fill="none" stroke={SIG} strokeOpacity={0.5} />
          <circle cx={N.fresh[0]} cy={N.fresh[1]} r={5} fill={SIG} />
        </>
      )}
      {isRecall && (
        <>
          <circle cx={N.query[0]} cy={N.query[1]} r={7} fill="#04070d" stroke={BIO} strokeWidth={1.5} />
          <circle cx={N.query[0]} cy={N.query[1]} r={2.5} fill={BIO} />
        </>
      )}
    </svg>
  );
}
