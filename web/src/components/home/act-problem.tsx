import type { CSSProperties } from "react";
import { ActHeader } from "@/components/home/act-header";
import { Reveal } from "@/components/motion/Reveal";

const SUBLINE =
  "An LLM reasons inside a context window that evaporates when the session ends. Your agent re-reads, re-asks, re-fails — every single time.";

const FACT_CHIPS = [
  "Session-scoped memory is the default",
  "Context windows cap out",
  "Retrieval ≠ remembering",
];

// Deterministic widths/opacities — SSR-stable, no randomness.
const SEGMENTS = [
  { grow: 5, o: 0.65 },
  { grow: 2, o: 0.4 },
  { grow: 7, o: 0.75 },
  { grow: 3, o: 0.5 },
  { grow: 4, o: 0.6 },
  { grow: 2, o: 0.35 },
  { grow: 6, o: 0.7 },
  { grow: 3, o: 0.45 },
  { grow: 5, o: 0.65 },
  { grow: 2, o: 0.4 },
  { grow: 4, o: 0.55 },
  { grow: 6, o: 0.7 },
];

const DOTS = [
  { left: "7%", top: "38%", dx: "10px" },
  { left: "18%", top: "62%", dx: "-8px" },
  { left: "31%", top: "30%", dx: "12px" },
  { left: "44%", top: "58%", dx: "-10px" },
  { left: "56%", top: "34%", dx: "8px" },
  { left: "67%", top: "60%", dx: "-12px" },
  { left: "78%", top: "36%", dx: "9px" },
  { left: "88%", top: "56%", dx: "-7px" },
];

/**
 * Act II — the problem. The context bar is pure CSS: segments hold, dissolve
 * into drifting dots mid-cycle, and refill; reduced-motion freezes it filled.
 */
export function ActProblem() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 lg:grid-cols-[11fr_9fr] lg:gap-20 lg:py-36">
        <Reveal>
          <ActHeader
            eyebrow="ACT II — THE PROBLEM"
            title="Every session starts from zero."
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            {SUBLINE}
          </p>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {FACT_CHIPS.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] text-mist"
              >
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="lg:pt-20">
          <div
            aria-hidden
            className="relative h-28 w-full overflow-hidden rounded-lg border border-line bg-abyss/60"
          >
            <div className="absolute inset-0 flex gap-[3px] p-2.5">
              {SEGMENTS.map((seg, i) => (
                <span
                  key={i}
                  className="oz-seg origin-bottom rounded-[2px] bg-foam"
                  style={{
                    flexGrow: seg.grow,
                    opacity: seg.o,
                    animationDelay: `${i * 45}ms`,
                  }}
                />
              ))}
            </div>
            {DOTS.map((dot, i) => (
              <span
                key={`d${i}`}
                className="oz-dot absolute size-[3px] rounded-full bg-biolume"
                style={
                  {
                    left: dot.left,
                    top: dot.top,
                    "--drift-x": dot.dx,
                    animationDelay: `${i * 60}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-deep">
            context window // session-scoped
          </p>
        </Reveal>
      </div>
    </section>
  );
}
