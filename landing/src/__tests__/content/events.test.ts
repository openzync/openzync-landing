import { describe, it, expect } from "vitest";
import { events } from "@/content/events";

describe("events", () => {
  it("has at least 1 event", () => {
    expect(events.length).toBeGreaterThanOrEqual(1);
  });

  it("each event has required fields", () => {
    for (const event of events) {
      expect(event.title).toBeTruthy();
      expect(event.date).toBeTruthy();
      expect(event.description).toBeTruthy();
      expect(event.href).toBeTruthy();
    }
  });
});
