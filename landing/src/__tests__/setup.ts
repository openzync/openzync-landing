import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't include IntersectionObserver — needed by FadeIn, AnimatedCounter.
// Must be a class/constructor function; vi.fn() with arrow function isn't callable with `new`.
vi.stubGlobal(
  "IntersectionObserver",
  class IntersectionObserverMock {
    readonly root: Element | null = null;
    readonly rootMargin: string = "0px";
    readonly thresholds: ReadonlyArray<number> = [0];

    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
      // no-op in test environment
    }

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  },
);
