import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/components/landing/mega-menu", () => ({
  MegaMenu: () => <div data-testid="mega-menu" />,
}));

vi.mock("@/lib/analytics/events", () => ({
  trackCtaClick: vi.fn(),
}));

import { Navbar } from "@/components/landing/navbar";

describe("Navbar", () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
    globalThis.MutationObserver = class {
      observe() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    } as any;
    window.getComputedStyle = vi.fn().mockReturnValue({
      getPropertyValue: () => "0px",
    });
  });

  it("renders the brand", () => {
    render(<Navbar />);
    // Look for text containing OpenZync — use getAllByText and check at least one
    const brandElements = screen.getAllByText(/OpenZync/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it("renders navigation sections", () => {
    render(<Navbar />);
    expect(screen.getByText("Why OpenZync")).toBeInTheDocument();
    // "Get Started" appears multiple times — just verify it exists
    const getStartedElements = screen.getAllByText("Get Started");
    expect(getStartedElements.length).toBeGreaterThan(0);
  });

  it("renders mobile menu button", () => {
    render(<Navbar />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders mega-menu component", () => {
    render(<Navbar />);
    expect(screen.getByTestId("mega-menu")).toBeInTheDocument();
  });
});
