import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/features",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "Features", href: "/features" }],
}));

vi.mock("@/components/landing/fade-in", () => ({
  FadeIn: ({ children }: any) => <div data-testid="fade-in">{children}</div>,
}));

vi.mock("@/components/landing/cta-section", () => ({
  CtaSection: () => <section data-testid="cta">CTA</section>,
}));

import FeaturesPage from "@/app/features/page";

describe("FeaturesPage", () => {
  it("renders breadcrumbs", () => {
    render(<FeaturesPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders section title", () => {
    render(<FeaturesPage />);
    expect(screen.getByText(/Features/i)).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(<FeaturesPage />);
    expect(screen.getByTestId("cta")).toBeInTheDocument();
  });
});
