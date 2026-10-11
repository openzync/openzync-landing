"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../cn";

export interface StatBlockProps {
  value: string | number;
  label: string;
  sub?: string;
  trend?: "up" | "down" | "flat";
  flag?: boolean;
  className?: string;
}

const TREND_GLYPHS = {
  up: "▲",
  down: "▼",
  flat: "—",
} as const;

const TREND_CLASSES = {
  up: "text-signal",
  down: "text-red",
  flat: "text-muted",
} as const;

const COUNT_DURATION_MS = 600;

interface ParsedValue {
  prefix: string;
  target: number;
  precision: number;
  suffix: string;
}

function parseValue(value: string | number): ParsedValue {
  if (typeof value === "number") {
    const raw = String(value);
    return {
      prefix: "",
      target: value,
      precision: raw.includes(".") ? raw.split(".")[1].length : 0,
      suffix: "",
    };
  }
  const match = /^([^\d-]*)(-?\d+(?:\.\d+)?)([\s\S]*)$/.exec(value);
  if (!match) {
    return { prefix: "", target: NaN, precision: 0, suffix: "" };
  }
  const [, prefix, num, suffix] = match;
  return {
    prefix,
    target: Number(num),
    precision: num.includes(".") ? num.split(".")[1].length : 0,
    suffix,
  };
}

function format(parsed: ParsedValue, n: number): string {
  return `${parsed.prefix}${n.toFixed(parsed.precision)}${parsed.suffix}`;
}

export function StatBlock({
  value,
  label,
  sub,
  trend,
  flag = false,
  className,
}: StatBlockProps) {
  const parsed = parseValue(value);
  const canCount = Number.isFinite(parsed.target);
  const finalText = canCount ? format(parsed, parsed.target) : String(value);
  const [display, setDisplay] = useState(finalText);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!canCount || parsed.target === 0) return;
    // Reduced motion + no-IO environments keep the static final value — the
    // component must never depend on animation to convey the number.
    if (
      typeof window.matchMedia === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / COUNT_DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(format(parsed, parsed.target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, canCount]);

  return (
    <div className={className}>
      <div className="flex items-baseline gap-2">
        <span
          ref={ref}
          className={cn(
            "font-mono text-3xl md:text-4xl font-medium tabular-nums",
            flag ? "text-amber" : "text-text",
          )}
        >
          {display}
        </span>
        {trend ? (
          <span
            aria-hidden="true"
            className={cn("font-mono text-xs", TREND_CLASSES[trend])}
          >
            {TREND_GLYPHS[trend]}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted">{label}</p>
      {sub ? <p className="mt-1 font-mono text-xs text-dim">{sub}</p> : null}
    </div>
  );
}
