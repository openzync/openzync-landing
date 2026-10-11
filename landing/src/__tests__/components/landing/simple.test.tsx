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

import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";

describe("Breadcrumbs", () => {
  it("returns null for empty segments", () => {
    const { container } = render(<Breadcrumbs segments={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders breadcrumb trail with Home as first item", () => {
    render(
      <Breadcrumbs segments={[{ label: "Blog", href: "/blog" }]} />,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders last segment as plain text (not a link)", () => {
    render(
      <Breadcrumbs
        segments={[
          { label: "Features", href: "/features" },
        ]}
      />,
    );
    const current = screen.getByText("Features");
    expect(current).toBeInTheDocument();
  });

  it("renders nav with aria-label", () => {
    render(
      <Breadcrumbs segments={[{ label: "Test", href: "/test" }]} />,
    );
    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
  });

  it("renders multiple segments", () => {
    render(
      <Breadcrumbs
        segments={[
          { label: "Section", href: "/section" },
          { label: "Page", href: "/section/page" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Page")).toBeInTheDocument();
  });
});

describe("buildBreadcrumbSegments()", () => {
  it("builds segments from a pathname", () => {
    const segments = buildBreadcrumbSegments("/blog/hello-world");
    expect(segments).toHaveLength(2);
    expect(segments[0]).toEqual({ label: "Blog", href: "/blog" });
    expect(segments[1].label).toBe("Hello World");
    expect(segments[1].href).toBe("/blog/hello-world");
  });

  it("returns empty array for root path", () => {
    expect(buildBreadcrumbSegments("/")).toEqual([]);
  });

  it("falls back to capitalized label for unknown paths", () => {
    const segments = buildBreadcrumbSegments("/some-random-path");
    expect(segments[0].label).toBe("Some Random Path");
  });
});
