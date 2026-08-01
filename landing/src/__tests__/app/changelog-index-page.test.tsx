import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/changelog",
  notFound: () => null,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "Changelog", href: "/changelog" }],
}));

vi.mock("@/components/landing/formatted-date", () => ({
  FormattedDate: ({ date }: { date: string }) => <time>{date}</time>,
}));

import ChangelogPage from "@/app/changelog/page";

describe("ChangelogIndexPage", () => {
  it("renders breadcrumbs", () => {
    render(<ChangelogPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders changelog title", () => {
    render(<ChangelogPage />);
    expect(screen.getByText(/Changelog/i)).toBeInTheDocument();
  });
});
