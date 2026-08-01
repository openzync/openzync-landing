import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/privacy",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "Privacy", href: "/privacy" }],
}));

vi.mock("@/components/landing/legal-section", () => ({
  LegalSection: ({ title, lastUpdated }: { title: string; lastUpdated: string }) => (
    <article data-testid="legal-section">
      <h1>{title}</h1>
      <p>Last updated: {lastUpdated}</p>
    </article>
  ),
}));

import PrivacyPage from "@/app/privacy/page";

describe("PrivacyPage", () => {
  it("renders breadcrumbs", () => {
    render(<PrivacyPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders legal section with title", () => {
    render(<PrivacyPage />);
    const sections = screen.getAllByTestId("legal-section");
    expect(sections.length).toBeGreaterThan(0);
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  it("shows last updated date", () => {
    render(<PrivacyPage />);
    const dateTexts = screen.getAllByText(/Last updated/i);
    expect(dateTexts.length).toBeGreaterThan(0);
  });
});
