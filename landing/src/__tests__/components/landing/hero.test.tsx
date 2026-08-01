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
    expect(screen.getByText("Graph Memory")).toBeInTheDocument();
    expect(screen.getByText("for AI Agents")).toBeInTheDocument();
  });

  it("renders the subtext paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/open-source graph memory infrastructure/i),
    ).toBeInTheDocument();
  });

  it("renders both CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("Get Started Free")).toBeInTheDocument();
    expect(screen.getByText("View on GitHub")).toBeInTheDocument();
  });

  it("renders value badges", () => {
    render(<Hero />);
    expect(screen.getByText("Multi-Graph Backends")).toBeInTheDocument();
    expect(screen.getByText("Enterprise Security")).toBeInTheDocument();
    expect(screen.getByText("100% Open Source")).toBeInTheDocument();
  });

  it("links to signup and github", () => {
    render(<Hero />);
    const getStartedLink = screen
      .getByText("Get Started Free")
      .closest("a");
    expect(getStartedLink?.getAttribute("href")).toContain("/signup");

    const githubLink = screen.getByText("View on GitHub").closest("a");
    expect(githubLink?.getAttribute("href")).toContain("github.com");
  });
});
