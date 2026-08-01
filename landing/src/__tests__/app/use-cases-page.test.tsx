import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/use-cases",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "Use Cases", href: "/use-cases" }],
}));

import UseCasesPage from "@/app/use-cases/page";

describe("UseCasesPage", () => {
  it("renders breadcrumbs", () => {
    render(<UseCasesPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders page heading", () => {
    render(<UseCasesPage />);
    expect(screen.getByText(/Use Cases/i)).toBeInTheDocument();
  });
});
