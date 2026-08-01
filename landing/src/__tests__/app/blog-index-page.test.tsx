import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/blog",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "Blog", href: "/blog" }],
}));

import BlogIndexPage from "@/app/blog/page";

describe("BlogIndexPage", () => {
  it("renders breadcrumbs", () => {
    render(<BlogIndexPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders blog title", () => {
    render(<BlogIndexPage />);
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  });
});
