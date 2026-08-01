import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/json-ld", () => ({
  JsonLd: () => null,
}));

vi.mock("@/components/landing/hero", () => ({
  Hero: () => <section data-testid="hero" />,
}));

vi.mock("@/components/landing/release-spotlight", () => ({
  ReleaseSpotlight: () => <section data-testid="release-spotlight" />,
}));

vi.mock("@/components/landing/audience-tabs", () => ({
  AudienceTabs: () => <section data-testid="audience-tabs" />,
}));

vi.mock("@/components/landing/stats-section", () => ({
  StatsSection: () => <section data-testid="stats" />,
}));

vi.mock("@/components/landing/case-studies", () => ({
  CaseStudies: () => <section data-testid="case-studies" />,
}));

vi.mock("@/components/landing/news-section", () => ({
  NewsSection: () => <section data-testid="news" />,
}));

vi.mock("@/components/landing/sponsors-section", () => ({
  SponsorsSection: () => <section data-testid="sponsors" />,
}));

vi.mock("@/components/landing/whats-next", () => ({
  WhatsNext: () => <section data-testid="whats-next" />,
}));

vi.mock("@/components/landing/cta-section", () => ({
  CtaSection: () => <section data-testid="cta" />,
}));

vi.mock("@/components/landing/fade-in", () => ({
  FadeIn: ({ children }: any) => <>{children}</>,
}));

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders hero section", () => {
    render(<HomePage />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders homepage sections", () => {
    render(<HomePage />);
    expect(screen.getByTestId("release-spotlight")).toBeInTheDocument();
    expect(screen.getByTestId("audience-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("stats")).toBeInTheDocument();
    expect(screen.getByTestId("case-studies")).toBeInTheDocument();
    expect(screen.getByTestId("news")).toBeInTheDocument();
    expect(screen.getByTestId("sponsors")).toBeInTheDocument();
    expect(screen.getByTestId("whats-next")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(<HomePage />);
    expect(screen.getByTestId("cta")).toBeInTheDocument();
  });
});
