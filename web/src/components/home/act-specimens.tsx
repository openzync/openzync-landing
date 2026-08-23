import type { CSSProperties } from "react";
import { ActHeader } from "@/components/home/act-header";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import {
  SPECIMENS,
  type Specimen,
  type SpecimenVisual,
} from "@/content/specimens";

/**
 * Act IV — specimens. Hover micro-interactions are pure CSS/SVG (dash-draw,
 * transforms, blink); no JS per card.
 */
export function ActSpecimens() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-28 lg:py-36">
        <Reveal>
          <ActHeader
            eyebrow="ACT IV — SPECIMENS"
            title="The machinery, up close."
          />
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Stagger>
            {SPECIMENS.map((specimen) => (
              <SpecimenCard key={specimen.index} specimen={specimen} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function SpecimenCard({
  specimen,
  style,
}: {
  specimen: Specimen;
  style?: CSSProperties;
}) {
  return (
    <Reveal
      as="article"
      style={style}
      className="group flex h-full flex-col rounded-xl border border-line bg-seafloor p-6 transition-[border-color,box-shadow] duration-300 hover:border-biolume/40 hover:shadow-[0_0_28px_rgba(61,245,198,0.07)]"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs text-deep">{specimen.index}</span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-biolume">
          {specimen.domain}
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-foam">
        {specimen.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">
        {specimen.description}
      </p>
      <div aria-hidden className="mt-auto pt-6">
        <SpecimenVisual kind={specimen.visual} />
      </div>
    </Reveal>
  );
}

const DRAW =
  "[stroke-dasharray:1][stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out-quint group-hover:[stroke-dashoffset:0]";

function SpecimenVisual({ kind }: { kind: SpecimenVisual }) {
  switch (kind) {
    case "triangle":
      return (
        <svg viewBox="0 0 200 48" className="h-12 w-full" focusable="false">
          <path
            d="M30 38 L100 10 L170 38 Z"
            fill="none"
            stroke="#3df5c6"
            strokeWidth={1}
            pathLength={1}
            className={DRAW}
          />
          <circle cx="30" cy="38" r="3" fill="#3df5c6" />
          <circle cx="100" cy="10" r="3" fill="#3df5c6" />
          <circle cx="170" cy="38" r="3" fill="#3df5c6" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 200 48" className="h-12 w-full" focusable="false">
          <circle
            cx="80"
            cy="26"
            r="7"
            fill="#5b6e80"
            className="transition-opacity duration-500 group-hover:opacity-20"
          />
          <circle
            cx="112"
            cy="10"
            r="7"
            fill="#ffb454"
            className="transition-transform duration-500 ease-out-quint group-hover:[transform:translate(-32px,16px)]"
          />
        </svg>
      );
    case "blob":
      return (
        <svg viewBox="0 0 200 48" className="h-12 w-full" focusable="false">
          <path
            d="M28 8 h20 l8 8 v24 h-28 z M48 8 v8 h8"
            fill="none"
            stroke="#93a7b8"
            strokeWidth={1.2}
          />
          <line
            x1="64"
            y1="26"
            x2="140"
            y2="26"
            stroke="#3df5c6"
            strokeWidth={1}
            pathLength={1}
            className={DRAW}
          />
          <circle cx="150" cy="26" r="4" fill="#3df5c6" />
        </svg>
      );
    case "mcp":
      return (
        <svg viewBox="0 0 200 48" className="h-12 w-full" focusable="false">
          <rect x="34" y="18" width="12" height="12" fill="none" stroke="#93a7b8" strokeWidth={1.2} />
          <rect x="154" y="18" width="12" height="12" fill="none" stroke="#93a7b8" strokeWidth={1.2} />
          <line
            x1="46"
            y1="24"
            x2="154"
            y2="24"
            stroke="#3df5c6"
            strokeWidth={1}
            pathLength={1}
            className={DRAW}
          />
        </svg>
      );
    case "sdk":
      return (
        <svg viewBox="0 0 200 48" className="h-12 w-full" focusable="false">
          <text x="34" y="30" className="fill-mist font-mono text-[13px]">
            import openzync
          </text>
          <rect
            x="146"
            y="16"
            width="8"
            height="16"
            fill="#3df5c6"
            className="opacity-0 [animation:none] group-hover:opacity-100 group-hover:[animation:oz-caret_1s_step-end_infinite]"
          />
        </svg>
      );
    case "metrics":
      return (
        <svg viewBox="0 0 200 48" className="h-12 w-full" focusable="false">
          <path
            d="M34 36 L70 30 L96 34 L124 16 L166 22"
            fill="none"
            stroke="#3df5c6"
            strokeWidth={1.2}
            pathLength={1}
            className={DRAW}
          />
          <circle cx="166" cy="22" r="3" fill="#3df5c6" />
        </svg>
      );
  }
}
