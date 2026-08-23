import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryGraph } from "@/components/graph/MemoryGraph";

describe("MemoryGraph", () => {
  it("smoke-renders without throwing when the canvas context is unavailable", () => {
    // getContext is stubbed to null globally in setup.ts (jsdom has no canvas).
    const { container, unmount } = render(<MemoryGraph />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(() => unmount()).not.toThrow();
  });
});
