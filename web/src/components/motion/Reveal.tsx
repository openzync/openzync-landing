"use client";

import { cn } from "@/lib/cn";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Extra delay in ms on top of any inherited stagger index. */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

const BASE_STEP_MS = 80;

/**
 * Scroll-reveal wrapper. SSR/no-JS safe: content renders visible; only after
 * mount, for JS users without reduced-motion, does off-screen content hide
 * and then reveal via IntersectionObserver.
 */
export function Reveal({
  children,
  delay = 0,
  as,
  className,
  style,
}: RevealProps) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = el.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;

    setIsRevealed(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transitionDelay = `calc(var(--stagger-index, 0) * var(--stagger-step, ${BASE_STEP_MS}ms) + ${delay}ms)`;

  return (
    <Tag
      ref={ref as never}
      style={{ ...style, transitionDelay }}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-out-quint",
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
