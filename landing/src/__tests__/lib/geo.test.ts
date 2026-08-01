import { describe, it, expect } from "vitest";
import { isEUCountry } from "@/lib/geo";

describe("isEUCountry()", () => {
  it("returns true for EU countries", () => {
    expect(isEUCountry("DE")).toBe(true);
    expect(isEUCountry("FR")).toBe(true);
    expect(isEUCountry("IT")).toBe(true);
    expect(isEUCountry("ES")).toBe(true);
    expect(isEUCountry("PL")).toBe(true);
  });

  it("returns true for EEA countries (NO, IS, LI)", () => {
    expect(isEUCountry("NO")).toBe(true);
    expect(isEUCountry("IS")).toBe(true);
    expect(isEUCountry("LI")).toBe(true);
  });

  it("returns true for Switzerland (equivalent privacy laws)", () => {
    expect(isEUCountry("CH")).toBe(true);
  });

  it("returns true for UK (PECR-equivalent)", () => {
    expect(isEUCountry("GB")).toBe(true);
  });

  it("returns false for non-EU countries", () => {
    expect(isEUCountry("US")).toBe(false);
    expect(isEUCountry("JP")).toBe(false);
    expect(isEUCountry("AU")).toBe(false);
    expect(isEUCountry("IN")).toBe(false);
    expect(isEUCountry("BR")).toBe(false);
  });

  it("defaults to true for missing, null, or empty country codes", () => {
    expect(isEUCountry(null)).toBe(true);
    expect(isEUCountry(undefined)).toBe(true);
    expect(isEUCountry("")).toBe(true);
    expect(isEUCountry("XX")).toBe(true);
  });
});
