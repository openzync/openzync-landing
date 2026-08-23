import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { Reveal } from "@/components/motion/Reveal";

const ACT_HEADLINES = [
  "Every session starts from zero.",
  "Watch memory happen.",
  "The machinery, up close.",
  "Give your agents a memory.",
];

const SPECIMEN_TITLES = [
  "Three graph backends",
  "Corrections, not duplicates",
  "Attachments stay files",
  "Speaks MCP natively",
  "Sync & async clients",
  "Prometheus metrics built in",
];

describe("HomePage", () => {
  it("renders both hero H1 lines", () => {
    render(<HomePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("Agents forget.");
    expect(h1.textContent).toContain("OpenZync remembers.");
  });

  it("renders all four act headlines", () => {
    render(<HomePage />);
    for (const headline of ACT_HEADLINES) {
      expect(
        screen.getByRole("heading", { level: 2, name: headline }),
      ).toBeInTheDocument();
    }
  });

  it("renders six specimen cards with expected titles", () => {
    render(<HomePage />);
    for (const title of SPECIMEN_TITLES) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it("renders the three supersession step captions", () => {
    render(<HomePage />);
    // Captions appear in both the pinned scenario and the static sequence.
    expect(screen.getAllByText(/01 \/ WRITE/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/02 \/ SUPERSEDE/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/03 \/ RECALL/).length).toBeGreaterThan(0);
  });
});

describe("Reveal", () => {
  it("renders children visible by default", () => {
    render(
      <Reveal>
        <span>reveal child</span>
      </Reveal>,
    );
    expect(screen.getByText("reveal child")).toBeVisible();
  });
});
