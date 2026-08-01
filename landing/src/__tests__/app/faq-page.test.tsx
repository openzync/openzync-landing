import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/faq",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/landing/breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
  buildBreadcrumbSegments: () => [{ label: "FAQ", href: "/faq" }],
}));

vi.mock("@/components/landing/accordion", () => ({
  Accordion: () => <div data-testid="accordion" />,
  AccordionItem: () => <div />,
}));

import FaqPage from "@/app/faq/page";

describe("FaqPage", () => {
  it("renders breadcrumbs", () => {
    render(<FaqPage />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders accordion with FAQ items", () => {
    render(<FaqPage />);
    expect(screen.getByTestId("accordion")).toBeInTheDocument();
  });
});
