import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "@/components/landing/accordion";

// Mock analytics
vi.mock("@/lib/analytics/events", () => ({
  trackEvent: vi.fn(),
}));

const sampleItems = [
  { question: "What is OpenZync?", answer: "OpenZync is memory infrastructure." },
  { question: "Is it free?", answer: "Yes, it's open source." },
];

describe("Accordion", () => {
  it("renders all question buttons", () => {
    render(<Accordion items={sampleItems} />);
    expect(screen.getByText("What is OpenZync?")).toBeInTheDocument();
    expect(screen.getByText("Is it free?")).toBeInTheDocument();
  });

  it("shows empty state when no items", () => {
    render(<Accordion items={[]} />);
    expect(screen.getByText(/No FAQ entries yet/i)).toBeInTheDocument();
  });

  it("shows answer when a question is clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion items={sampleItems} />);

    const button = screen.getByText("What is OpenZync?");
    await user.click(button);

    expect(screen.getByText("OpenZync is memory infrastructure.")).toBeInTheDocument();
  });

  it("closes the open item when clicked again", async () => {
    const user = userEvent.setup();
    render(<Accordion items={sampleItems} />);

    const button = screen.getByText("What is OpenZync?");
    await user.click(button);
    expect(screen.getByText("OpenZync is memory infrastructure.")).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByText("OpenZync is memory infrastructure.")).not.toBeInTheDocument();
  });

  it("calls onToggle callback when item is toggled", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<Accordion items={sampleItems} onToggle={onToggle} />);

    await user.click(screen.getByText("What is OpenZync?"));
    expect(onToggle).toHaveBeenCalledWith("What is OpenZync?", true);

    await user.click(screen.getByText("What is OpenZync?"));
    expect(onToggle).toHaveBeenCalledWith("What is OpenZync?", false);
  });

  it("only opens one item at a time", async () => {
    const user = userEvent.setup();
    render(<Accordion items={sampleItems} />);

    await user.click(screen.getByText("What is OpenZync?"));
    await user.click(screen.getByText("Is it free?"));

    expect(screen.queryByText("OpenZync is memory infrastructure.")).not.toBeInTheDocument();
    expect(screen.getByText("Yes, it's open source.")).toBeInTheDocument();
  });
});
