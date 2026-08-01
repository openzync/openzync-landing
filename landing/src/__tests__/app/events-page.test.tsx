import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/events",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "Events", href: "/events" }],
}));

import EventsPage from "@/app/events/page";

describe("EventsPage", () => {
  it("renders breadcrumbs", () => {
    render(<EventsPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders page title", () => {
    render(<EventsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
