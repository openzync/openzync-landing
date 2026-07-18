"use client";

import { sendGAEvent } from "@next/third-parties/google";
import type { Ga4Event, Ga4EventParams } from "./types";

export function trackEvent(eventName: Ga4Event, params?: Ga4EventParams): void {
  sendGAEvent("event", eventName, params ?? {});
}

export function trackCtaClick(name: string, location: string): void {
  trackEvent("cta_click", { cta_name: name, cta_location: location });
}

export function trackSocialClick(platform: string): void {
  trackEvent("social_click", { social_platform: platform });
}

export function trackDocClick(path: string): void {
  trackEvent("doc_click", { doc_path: path });
}
