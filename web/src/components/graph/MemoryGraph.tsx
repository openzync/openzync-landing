"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/cn";

export type MemoryGraphApi = {
  /** Spawn a fading node cluster at a normalized (0-1) position. */
  burst: (x01: number, y01: number) => void;
};

type MemoryGraphProps = {
  apiRef?: RefObject<MemoryGraphApi | null>;
  /** Biases node spawn density; 1 is default, clamped to [0.4, 2]. */
  intensity?: number;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
  breathePhase: number; // -1 = never breathes
  bornAt: number; // ms offset from mount for bloom stagger
};

type Spark = { x: number; y: number; vx: number; vy: number; life: number; r: number };

const BIOLUME = [61, 245, 198] as const;
const DEEP = [91, 110, 128] as const;
const LINK_DIST = 120;
const CURSOR_RADIUS = 180;
const BLOOM_MS = 900;
const FADE_MS = 600;

const rgba = (c: readonly number[], a: number) =>
  `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const mix = (
  a: readonly number[],
  b: readonly number[],
  t: number,
): readonly number[] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Decorative drifting knowledge-graph field on Canvas 2D. aria-hidden by
 * contract — render inside an aria-hidden wrapper. Pauses offscreen and on
 * hidden tabs; draws one static frame under prefers-reduced-motion.
 */
export function MemoryGraph({ apiRef, intensity = 1 }: MemoryGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const coarsePointer =
      window.matchMedia?.("(pointer: coarse)").matches ?? false;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let sparks: Spark[] = [];
    let raf = 0;
    let onScreen = true;
    let disposed = false;
    const mountedAt = performance.now();
    const cursor = { x: -9999, y: -9999, active: false };
    const density = Math.min(2, Math.max(0.4, intensity));

    const makeNode = (): Node => {
      const depth = 0.35 + Math.random() * 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() * 2 - 1) * 0.08 * depth,
        vy: (Math.random() * 2 - 1) * 0.08 * depth,
        r: (0.8 + Math.random() * 1.6) * (0.55 + 0.45 * depth),
        depth,
        breathePhase: Math.random() < 0.18 ? Math.random() * Math.PI * 2 : -1,
        bornAt: 0,
      };
    };

    const seedNodes = () => {
      const cap = width < 768 ? 60 : 140;
      nodes = Array.from(
        { length: Math.min(cap, Math.round((width * height) / 11000) * density) },
        makeNode,
      );
      // Bloom: stagger births from center outward.
      const maxDist = Math.hypot(width / 2, height / 2) || 1;
      for (const n of nodes) {
        n.bornAt =
          (Math.hypot(n.x - width / 2, n.y - height / 2) / maxDist) * BLOOM_MS;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const bloomAlpha = (n: Node, now: number) =>
      reduced
        ? 1
        : Math.min(1, Math.max(0, (now - mountedAt - n.bornAt) / FADE_MS));

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const aA = bloomAlpha(a, now);
        if (aA <= 0) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bA = bloomAlpha(b, now);
          if (bA <= 0) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          if (Math.abs(dx) > LINK_DIST || Math.abs(dy) > LINK_DIST) continue;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;

          let alpha = (1 - dist / LINK_DIST) * 0.22 * Math.min(aA, bA);
          let color: readonly number[] = DEEP;
          if (cursor.active && !coarsePointer) {
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const cd = Math.hypot(cursor.x - mx, cursor.y - my);
            if (cd < CURSOR_RADIUS) {
              const t = 1 - cd / CURSOR_RADIUS;
              color = mix(DEEP, BIOLUME, t);
              alpha += t * 0.45 * Math.min(aA, bA);
            }
          }
          ctx.strokeStyle = rgba(color, alpha);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const nA = bloomAlpha(n, now);
        if (nA <= 0) continue;
        let color: readonly number[] = DEEP;
        let alpha = (0.18 + 0.4 * n.depth) * nA;
        if (cursor.active && !coarsePointer) {
          const cd = Math.hypot(cursor.x - n.x, cursor.y - n.y);
          if (cd < CURSOR_RADIUS) {
            const t = 1 - cd / CURSOR_RADIUS;
            color = mix(DEEP, BIOLUME, t * 0.8);
            alpha += t * 0.3 * nA;
          }
        }
        const breathe =
          n.breathePhase >= 0 ? 1 + 0.35 * Math.sin(now * 0.0012 + n.breathePhase) : 1;
        ctx.fillStyle = rgba(color, alpha);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * breathe, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const s of sparks) {
        ctx.fillStyle = rgba(BIOLUME, s.life * 0.8);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -8) n.x = width + 8;
        if (n.x > width + 8) n.x = -8;
        if (n.y < -8) n.y = height + 8;
        if (n.y > height + 8) n.y = -8;
        if (cursor.active && !coarsePointer) {
          const dx = cursor.x - n.x;
          const dy = cursor.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d > 0.001 && d < CURSOR_RADIUS) {
            const pull = (1 - d / CURSOR_RADIUS) * 0.04;
            n.x += dx * pull;
            n.y += dy * pull;
          }
        }
      }
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life -= 0.012;
      }
    };

    const frame = (now: number) => {
      if (disposed) return;
      step();
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const isRunning = () => !disposed && onScreen && !document.hidden && !reduced;

    const sync = () => {
      if (isRunning() && !raf) raf = requestAnimationFrame(frame);
      if (!isRunning() && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();

    if (reduced) {
      // One static frame, no loop, no listeners.
      draw(performance.now());
      setReady(true);
      return;
    }

    const onResize = () => {
      resize();
      if (!raf) draw(performance.now());
    };
    const onVisibility = () => sync();
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
      cursor.active = true;
    };
    const onPointerLeave = () => {
      cursor.active = false;
    };

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (!coarsePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    if (typeof IntersectionObserver === "function") {
      const observer = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      });
      observer.observe(canvas);
    }

    if (apiRef) {
      apiRef.current = {
        burst: (x01, y01) => {
          const cx = x01 * width;
          const cy = y01 * height;
          for (let i = 0; i < 10; i++) {
            const ang = Math.random() * Math.PI * 2;
            const speed = 0.4 + Math.random() * 1.2;
            sparks.push({
              x: cx,
              y: cy,
              vx: Math.cos(ang) * speed,
              vy: Math.sin(ang) * speed,
              life: 1,
              r: 1 + Math.random() * 1.6,
            });
          }
          sync();
        },
      };
    }

    setReady(true);
    sync();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (!coarsePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      }
      if (apiRef) apiRef.current = null;
    };
  }, [apiRef, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none h-full w-full transition-opacity duration-1000",
        ready ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
