import { describe, it, expect, vi, beforeEach } from "vitest";
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

import { CaseStudies } from "@/components/landing/case-studies";
import { CommunityEvents } from "@/components/landing/community-events";
import { LegalSection } from "@/components/landing/legal-section";
import { NewsSection } from "@/components/landing/news-section";
import { ReleaseSpotlight } from "@/components/landing/release-spotlight";
import { SponsorsSection } from "@/components/landing/sponsors-section";
import { WhatsNext } from "@/components/landing/whats-next";

describe("CaseStudies", () => {
  it("renders section heading", () => {
    render(<CaseStudies />);
    expect(screen.getByText(/Where OpenZync Shines/i)).toBeInTheDocument();
  });

  it("renders case study title links", () => {
    render(<CaseStudies />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});

describe("CommunityEvents", () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      observe() {}; unobserve() {}; disconnect() {};
    } as any;
  });

  it("renders section", () => {
    render(<CommunityEvents />);
    expect(screen.getByText(/What's Next/i)).toBeInTheDocument();
  });

  it("renders version milestones", () => {
    render(<CommunityEvents />);
    expect(screen.getByText("v1.0")).toBeInTheDocument();
    expect(screen.getByText("v1.1")).toBeInTheDocument();
  });
});

describe("LegalSection", () => {
  it("renders title and children", () => {
    render(<LegalSection title="Privacy Policy"><p>Policy content</p></LegalSection>);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Policy content")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<LegalSection title="Terms"><p>Legal terms here</p></LegalSection>);
    expect(screen.getByText("Legal terms here")).toBeInTheDocument();
  });
});

describe("NewsSection", () => {
  it("renders section heading", () => {
    render(<NewsSection />);
    expect(screen.getByText(/Latest News/i)).toBeInTheDocument();
  });
});

describe("ReleaseSpotlight", () => {
  it("renders version badge", () => {
    render(<ReleaseSpotlight />);
    expect(screen.getByText(/Download the latest version/i)).toBeInTheDocument();
  });

  it("renders download link", () => {
    render(<ReleaseSpotlight />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href");
  });
});

describe("SponsorsSection", () => {
  it("renders section heading", () => {
    render(<SponsorsSection />);
    expect(screen.getByText(/Supported Backends/i)).toBeInTheDocument();
  });

  it("renders provider names", () => {
    render(<SponsorsSection />);
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("OpenAI")).toBeInTheDocument();
  });
});

describe("WhatsNext", () => {
  it("renders version support timeline", () => {
    render(<WhatsNext />);
    expect(screen.getByText(/Maintenance Support/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Support/i)).toBeInTheDocument();
  });

  it("renders version labels", () => {
    render(<WhatsNext />);
    // Version labels are rendered as "v{major}.{minor}" spans
    const versionElements = screen.getAllByText(/^v\d+\.\d+$/);
    expect(versionElements.length).toBeGreaterThan(0);
  });
});
