import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't include IntersectionObserver — needed by StatBlock (count-on-view)
// and TableOfContents. Must be a class/constructor function; vi.fn() with arrow
// function isn't callable with `new`.
// jsdom doesn't implement matchMedia either — StatBlock reads
// prefers-reduced-motion in an effect. Must be writable so tests can override.
vi.stubGlobal(
  "matchMedia",
  (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
);

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
