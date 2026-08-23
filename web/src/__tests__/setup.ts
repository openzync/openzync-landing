import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Globals are off, so RTL auto-cleanup never registers — do it here.
afterEach(cleanup);

// jsdom ships no canvas implementation; graph components must null-check getContext.
vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
