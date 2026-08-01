import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnnouncementBar } from "@/components/landing/announcement-bar";

describe("AnnouncementBar", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the announcement when not dismissed", async () => {
    render(<AnnouncementBar />);
    await waitFor(() => {
      expect(screen.getByText(/public beta/i)).toBeInTheDocument();
    });
  });

  it("does not render when previously dismissed (localStorage)", async () => {
    localStorage.setItem("openzync-announcement-dismissed", "true");
    render(<AnnouncementBar />);

    await waitFor(() => {
      expect(screen.queryByText(/public beta/i)).not.toBeInTheDocument();
    });
  });

  it("dismisses on close button click", async () => {
    const user = userEvent.setup();
    render(<AnnouncementBar />);

    // Wait for render
    await waitFor(() => {
      expect(screen.getByText(/public beta/i)).toBeInTheDocument();
    });

    // Dismiss
    await user.click(screen.getByLabelText("Dismiss announcement"));

    expect(screen.queryByText(/public beta/i)).not.toBeInTheDocument();
    expect(localStorage.getItem("openzync-announcement-dismissed")).toBe("true");
  });
});
