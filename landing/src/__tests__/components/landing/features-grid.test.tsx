import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturesGrid, FeaturesSection } from "@/components/landing/features-grid";

describe("FeaturesGrid", () => {
  it("renders feature titles", () => {
    render(<FeaturesGrid />);
    expect(screen.getByText("Multi-Graph Backends")).toBeInTheDocument();
    expect(screen.getByText("Graph-Based Memory")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    render(<FeaturesGrid />);
    expect(screen.getByText(/Seamlessly switch between PostgreSQL/i)).toBeInTheDocument();
  });
});

describe("FeaturesSection", () => {
  it("renders section heading", () => {
    render(<FeaturesSection />);
    expect(screen.getByText(/Everything you need for/i)).toBeInTheDocument();
  });

  it("renders category sections", () => {
    render(<FeaturesSection />);
    expect(screen.getByText("Graph Backends")).toBeInTheDocument();
    const agentMemoryElements = screen.getAllByText("Agent Memory");
    expect(agentMemoryElements.length).toBeGreaterThan(0);
  });
});
