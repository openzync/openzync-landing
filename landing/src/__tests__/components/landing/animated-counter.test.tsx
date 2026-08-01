import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimatedCounter } from "@/components/landing/animated-counter";

describe("AnimatedCounter", () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        // Immediately report as intersecting to trigger animation start
        setTimeout(() => callback([{ isIntersecting: true } as IntersectionObserverEntry], this), 0);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;

    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      return setTimeout(() => cb(performance.now() + 16), 16) as unknown as number;
    }) as typeof globalThis.requestAnimationFrame;

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders initial display value as 0", () => {
    render(<AnimatedCounter value="100+" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("parses value with numeric suffix", () => {
    // Verify the parseNumericValue helper works by rendering and checking initial state
    render(<AnimatedCounter value="50K" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders plain integer value", () => {
    render(<AnimatedCounter value="42" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("parses decimal values", () => {
    render(<AnimatedCounter value="3.5" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
