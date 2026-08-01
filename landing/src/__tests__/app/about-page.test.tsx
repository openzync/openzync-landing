import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "About", href: "/about" }],
}));

vi.mock("@/components/landing/cta-section", () => ({
  CtaSection: () => <section data-testid="cta" />,
}));

import AboutPage from "@/app/about/page";

describe("AboutPage", () => {
  it("renders breadcrumbs", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("cta")).toBeInTheDocument();
  });

  it("renders company values", () => {
    render(<AboutPage />);
    expect(screen.getByText("Performance First")).toBeInTheDocument();
    expect(screen.getByText("Production Safety")).toBeInTheDocument();
  });
});
