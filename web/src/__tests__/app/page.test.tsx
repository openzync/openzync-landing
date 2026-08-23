import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { Reveal } from "@/components/motion/Reveal";

describe("HomePage", () => {
  it("renders both hero H1 lines", () => {
    render(<HomePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("Agents forget.");
    expect(h1.textContent).toContain("OpenZync remembers.");
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
