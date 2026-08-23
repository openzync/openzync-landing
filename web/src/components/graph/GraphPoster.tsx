import { cn } from "@/lib/cn";

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(1337);

const DOTS = Array.from({ length: 60 }, () => ({
  cx: rand() * 1000,
  cy: rand() * 1000,
  r: 0.8 + rand() * 1.6,
  opacity: 0.12 + rand() * 0.3,
}));

const LINK_DIST = 260;

const LINES = (() => {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < DOTS.length && lines.length < 40; i++) {
    for (let j = i + 1; j < DOTS.length && lines.length < 40; j++) {
      const a = DOTS[i];
      const b = DOTS[j];
      const d = Math.hypot(a.cx - b.cx, a.cy - b.cy);
      if (d < LINK_DIST) lines.push({ x1: a.cx, y1: a.cy, x2: b.cx, y2: b.cy });
    }
  }
  return lines;
})();

/** Static pre-hydration graph texture behind the canvas. Deterministic SSR. */
export function GraphPoster({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
    >
      {LINES.map((l, i) => (
        <line
          key={`l${i}`}
          {...l}
          stroke="#94b8dc"
          strokeOpacity={0.07}
          strokeWidth={0.5}
        />
      ))}
      {DOTS.map((d, i) => (
        <circle key={`d${i}`} {...d} fill="#5b6e80" fillOpacity={d.opacity} />
      ))}
    </svg>
  );
}
