import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryGraph } from "@/components/graph/MemoryGraph";

describe("MemoryGraph", () => {
  beforeEach(() => {
    // jsdom has no canvas implementation; the component must null-check and bail.
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("smoke-renders without throwing when the canvas context is unavailable", () => {
    const { container, unmount } = render(<MemoryGraph />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(() => unmount()).not.toThrow();
  });
});
