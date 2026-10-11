import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBlock } from "@openzync/design-system";

describe("StatBlock", () => {
  it("shows the final value on first render — no count-up from 0", () => {
    render(<StatBlock value={1234} label="Memories stored" />);
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("passes non-numeric strings through unchanged", () => {
    render(<StatBlock value="N/A" label="Uptime" />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it.each([
    ["up", "▲", "text-signal"],
    ["down", "▼", "text-red"],
    ["flat", "—", "text-muted"],
  ] as const)("renders %s trend as its glyph with the right color class", (trend, glyph, colorClass) => {
    render(<StatBlock value="42" label="Score" trend={trend} />);
    expect(screen.getByText(glyph)).toHaveClass(colorClass);
  });

  it("renders the value in amber when flagged", () => {
    render(<StatBlock value="7" label="Breaches" flag />);
    expect(screen.getByText("7")).toHaveClass("text-amber");
  });

  it("renders label and sub", () => {
    render(<StatBlock value="12k" label="Active agents" sub="last 30 days" />);
    expect(screen.getByText("Active agents")).toBeInTheDocument();
    expect(screen.getByText("last 30 days")).toBeInTheDocument();
  });
});
