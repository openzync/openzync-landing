import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock analytics
vi.mock("@/lib/analytics/events", () => ({
  trackCtaClick: vi.fn(),
}));

vi.mock("@/components/landing/hero", () => ({
  Hero: () => <section data-testid="hero" />,
}));

vi.mock("@/components/landing/credibility-wall", () => ({
  CredibilityWall: () => <section data-testid="credibility-wall" />,
}));

vi.mock("@/components/landing/how-it-works", () => ({
  HowItWorks: () => <section data-testid="how-it-works" />,
}));

vi.mock("@/components/landing/capabilities", () => ({
  Capabilities: () => <section data-testid="capabilities" />,
}));

vi.mock("@/components/landing/proof", () => ({
  Proof: () => <section data-testid="proof" />,
}));

vi.mock("@/components/landing/trust-band", () => ({
  TrustBand: () => <section data-testid="trust-band" />,
}));

vi.mock("@/components/landing/cta-section", () => ({
  CtaSection: () => <section data-testid="cta" />,
}));

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders every section in composition order", () => {
    const { container } = render(<HomePage />);
    const rendered = Array.from(
      container.querySelectorAll("section[data-testid]"),
    ).map((el) => el.getAttribute("data-testid"));
    expect(rendered).toEqual([
      "hero",
      "credibility-wall",
      "how-it-works",
      "capabilities",
      "proof",
      "trust-band",
      "cta",
    ]);
  });

  it("emits Organization and SoftwareApplication JSON-LD", () => {
    const { container } = render(<HomePage />);
    const scripts = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    );
    expect(scripts).toHaveLength(2);

    const [organization, software] = scripts.map((script) =>
      JSON.parse(script.textContent ?? "") as Record<string, unknown>,
    );

    expect(organization["@type"]).toBe("Organization");
    expect(organization.name).toBe("OpenZync");
    expect(organization.url).toBe("https://openzync.tech");
    expect(organization.sameAs).toContain("https://github.com/openzync");

    expect(software["@type"]).toBe("SoftwareApplication");
    expect(software.applicationCategory).toBe("DeveloperApplication");
    expect(software.offers).toMatchObject({ price: "0", priceCurrency: "USD" });
    expect(software.featureList).toContain("MCP server");
  });
});

describe("CtaSection", () => {
  it("renders the new closing CTA heading and primary action", async () => {
    // Sections are mocked above for composition; pull the real component to
    // pin the copy contract against the rebuilt cta-section.
    const { CtaSection } = await vi.importActual<
      typeof import("@/components/landing/cta-section")
    >("@/components/landing/cta-section");
    render(<CtaSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Run the memory layer on your own infrastructure.",
    );
    expect(screen.getByText("Start free")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /start free/i }).getAttribute("href"),
    ).toContain("/signup");
  });
});
