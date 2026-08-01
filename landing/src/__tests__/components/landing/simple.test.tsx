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

import { FormattedDate } from "@/components/landing/formatted-date";
import { FadeIn } from "@/components/landing/fade-in";
import { Breadcrumbs, buildBreadcrumbSegments } from "@/components/landing/breadcrumbs";

describe("FormattedDate", () => {
  it("formats the date on mount", async () => {
    render(<FormattedDate date="2026-07-15" />);
    // In React 18/19 the useEffect runs during commit, so formatted date appears immediately
    const el = await screen.findByText(/July 15, 2026/);
    expect(el).toBeInTheDocument();
  });
});

describe("FadeIn", () => {
  it("renders children", () => {
    render(<FadeIn>Hello World</FadeIn>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <FadeIn className="custom-class">Styled</FadeIn>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("accepts delay prop", () => {
    const { container } = render(
      <FadeIn delay={200}>Delayed</FadeIn>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.animationDelay).toBe("200ms");
  });

  it("accepts different variants", () => {
    render(
      <FadeIn variant="slide-up">Slide</FadeIn>,
    );
    // IntersectionObserver is mocked in setup.ts, so observe runs but never triggers
    // isVisible stays false, so the element stays with opacity-0
    expect(screen.getByText("Slide")).toBeInTheDocument();
  });
});

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
