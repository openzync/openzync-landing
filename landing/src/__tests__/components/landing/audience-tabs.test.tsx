import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

import { AudienceTabs } from "@/components/landing/audience-tabs";

describe("AudienceTabs", () => {
  it("renders audience tab buttons", () => {
    render(<AudienceTabs />);
    expect(screen.getByText("Developers")).toBeInTheDocument();
    expect(screen.getByText("Tech Leads")).toBeInTheDocument();
  });

  it("renders links in active tab", () => {
    render(<AudienceTabs />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
