"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie-consent";
const CONSENT_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000; // ~12 months

type ConsentState = "loading" | "show" | "accepted" | "rejected";

interface StoredConsent {
  value: "accepted" | "rejected";
  expiresAt: number;
}

function readConsent(): ConsentState {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return "show";
    const stored: StoredConsent = JSON.parse(raw);
    if (Date.now() > stored.expiresAt) {
      localStorage.removeItem(CONSENT_KEY);
      return "show";
    }
    return stored.value;
  } catch {
    return "show";
  }
}

function writeConsent(value: "accepted" | "rejected"): void {
  const stored: StoredConsent = { value, expiresAt: Date.now() + CONSENT_EXPIRY_MS };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
}

export function CookieConsent() {
  const [state, setState] = useState<ConsentState>("loading");

  useEffect(() => {
    setState(readConsent());
  }, []);

  const handleAccept = () => {
    writeConsent("accepted");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("consent", "update", { analytics_storage: "granted" });
    setState("accepted");
  };

  const handleReject = () => {
    writeConsent("rejected");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("consent", "update", { analytics_storage: "denied" });
    setState("rejected");
  };

  if (state !== "show") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-950 border-t border-surface-800 p-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-surface-300 max-w-2xl">
          We use cookies and analytics to understand how you use our site and improve your experience.
          See our{" "}
          <a href="/privacy" className="text-brand-300 hover:text-brand-200 underline">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleReject}
            className="rounded-lg border border-surface-700 px-4 py-2 text-sm font-medium text-surface-300 hover:bg-surface-800 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
