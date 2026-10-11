import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock analytics
vi.mock("@/lib/analytics/events", () => ({
  trackCtaClick: vi.fn(),
}));

import { Hero } from "@/components/landing/hero";

describe("Hero", () => {
  it("renders the main headline", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Graph memory that/);
    expect(heading).toHaveTextContent(/survives production\./);
  });

  it("renders the subtext paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/open-source temporal knowledge graph/i),
    ).toBeInTheDocument();
  });

  it("renders both CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("Start free")).toBeInTheDocument();
    expect(screen.getByText("Read the docs")).toBeInTheDocument();
  });

  it("renders the dateline and graph mockup", () => {
    render(<Hero />);
    expect(screen.getByText(/2026\.10 — openzync v/i)).toBeInTheDocument();
    expect(screen.getByText("graph-explorer")).toBeInTheDocument();
  });

  it("links to signup and docs", () => {
    render(<Hero />);
    const getStartedLink = screen.getByText("Start free").closest("a");
    expect(getStartedLink?.getAttribute("href")).toContain("/signup");

    const docsLink = screen.getByText("Read the docs").closest("a");
    expect(docsLink?.getAttribute("href")).toContain("docs.openzync.tech");
  });
});
