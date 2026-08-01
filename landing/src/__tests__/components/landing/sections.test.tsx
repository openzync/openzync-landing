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
  trackSocialClick: vi.fn(),
}));

import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { StatsSection } from "@/components/landing/stats-section";

describe("CtaSection", () => {
  it("renders heading and CTA text", () => {
    render(<CtaSection />);
    expect(screen.getByText(/Ready to give/i)).toBeInTheDocument();
    expect(screen.getByText("Get Started Free")).toBeInTheDocument();
  });

  it("renders a link to signup", () => {
    render(<CtaSection />);
    const link = screen.getByRole("link", { name: /get started free/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toContain("/signup");
  });
});

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    // The logo has alt text "OpenZync"
    expect(screen.getByAltText("OpenZync")).toBeInTheDocument();
  });

  it("renders link columns", () => {
    render(<Footer />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Updates")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Email Us")).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });

  it("renders the copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it("renders sponsor message", () => {
    render(<Footer />);
    expect(screen.getByText("Powering the Future of Agent Memory")).toBeInTheDocument();
  });
});

describe("StatsSection", () => {
  it("renders the section heading", () => {
    render(<StatsSection />);
    expect(screen.getByText("OpenZync by the Numbers")).toBeInTheDocument();
  });

  it("renders all stat items", () => {
    render(<StatsSection />);
    expect(screen.getByText("Graph Backends")).toBeInTheDocument();
    expect(screen.getByText("LLM Providers")).toBeInTheDocument();
    expect(screen.getByText("Core Contributors")).toBeInTheDocument();
    expect(screen.getByText("Latest Release")).toBeInTheDocument();
  });

  it("renders stat descriptions", () => {
    render(<StatsSection />);
    expect(screen.getByText(/PostgreSQL, FalkorDB, SurrealDB/)).toBeInTheDocument();
  });
});
