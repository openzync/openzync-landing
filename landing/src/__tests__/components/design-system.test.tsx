import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, Button, Spinner } from "@openzync/design-system";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Production</Badge>);
    expect(screen.getByText("Production")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="success">Live</Badge>);
    // Should have the success-related class
    expect(container.firstChild).toHaveClass("bg-success/10");
  });

  it("applies size classes", () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    expect(container.firstChild).toHaveClass("text-[10px]");
  });

  it("renders as a span element", () => {
    render(<Badge>Tag</Badge>);
    const badge = screen.getByText("Tag");
    expect(badge.tagName).toBe("SPAN");
  });

  it("forwards className", () => {
    const { container } = render(<Badge className="extra-class">Custom</Badge>);
    expect(container.firstChild).toHaveClass("extra-class");
  });
});

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: "Click Me" })).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass("bg-brand-500");
  });

  it("applies size styles", () => {
    const { container } = render(<Button size="lg">Large</Button>);
    expect(container.firstChild).toHaveClass("rounded-lg");
  });

  it("renders as disabled when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders Spinner when loading", () => {
    const { container } = render(<Button loading>Saving</Button>);
    // Spinner renders an SVG
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders icon when not loading", () => {
    render(
      <Button icon={<span data-testid="test-icon">*</span>}>With Icon</Button>,
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards className", () => {
    const { container } = render(<Button className="custom-btn">Styled</Button>);
    expect(container.firstChild).toHaveClass("custom-btn");
  });
});

describe("Spinner", () => {
  it("renders an SVG", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has aria-hidden", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts custom size", () => {
    const { container } = render(<Spinner size={24} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  it("accepts custom className", () => {
    const { container } = render(<Spinner className="custom-spin" />);
    expect(container.querySelector("svg")).toHaveClass("custom-spin");
  });
});
