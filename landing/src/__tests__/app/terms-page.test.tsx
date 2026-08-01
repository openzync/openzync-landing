import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/terms",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "Terms", href: "/terms" }],
}));

vi.mock("@/components/landing/legal-section", () => ({
  LegalSection: ({ title }: { title: string }) => (
    <article data-testid="legal-section">
      <h1>{title}</h1>
    </article>
  ),
}));

import TermsPage from "@/app/terms/page";

describe("TermsPage", () => {
  it("renders breadcrumbs", () => {
    render(<TermsPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders legal sections", () => {
    render(<TermsPage />);
    const sections = screen.getAllByTestId("legal-section");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("renders title text", () => {
    render(<TermsPage />);
    const termsMatches = screen.getAllByText(/Terms/i);
    expect(termsMatches.length).toBeGreaterThan(0);
  });
});
