"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, navItems } from "@/content/site-config";
import { Button } from "@openzync/design-system";
import { MegaMenu } from "./mega-menu";
import { trackCtaClick } from "@/lib/analytics/events";

/**
 * Landing page navigation bar with mega-menu dropdowns.
 * - Desktop: mega-menu with hover/click dropdowns
 * - Mobile (<1024px): slide-over drawer
 * - Solid instrument chrome: no translucency, hairline borders, mono meta.
 */
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Track announcement-bar height so the navbar re-renders when it changes.
  // (React does not re-evaluate `style` props when CSS custom properties change.)
  const [topOffset, setTopOffset] = useState("0px");
  useEffect(() => {
    const update = () => {
      const h = getComputedStyle(document.documentElement)
        .getPropertyValue("--announcement-height")
        .trim();
      setTopOffset(h || "0px");
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => observer.disconnect();
  }, []);

  // Drawer focus + Escape handling: focus the close button on open, return
  // focus to the hamburger on close, Escape closes from anywhere.
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (mobileOpen) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      hamburgerRef.current?.focus();
    }
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  // Uses ref-based save/restore to avoid clobbering other scroll locks
  const prevOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    if (mobileOpen) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflowRef.current ?? "";
      prevOverflowRef.current = null;
    }

    const handleBeforeUnload = () => {
      document.body.style.overflow = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.body.style.overflow = prevOverflowRef.current ?? "";
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed left-0 right-0 z-40 border-b border-line bg-surface-950"
      style={{ top: topOffset }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/openzync-logo-dark.svg"
            alt={siteConfig.name}
            width={277}
            height={56}
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop mega-menu */}
        <MegaMenu items={navItems} />

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={`${siteConfig.appUrl}/login`}
            className="font-mono text-xs text-muted transition-colors hover:text-text"
            onClick={() => trackCtaClick("navbar_sign_in", "navbar")}
          >
            Sign in
          </Link>
          <Link
            href={`${siteConfig.appUrl}/signup`}
            onClick={() => trackCtaClick("navbar_get_started", "navbar")}
          >
            <Button variant="primary" size="md">
              Get started
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setMobileOpen(true)}
          className="lg:hidden rounded-none border border-line p-2 text-muted transition-colors hover:bg-surface-800 hover:text-text"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-panel lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 bg-surface-950 border-l border-line lg:hidden",
          "transition-transform duration-300 ease-in-out overflow-y-auto",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-line">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
            Menu
          </span>
          <button
            ref={closeButtonRef}
            onClick={() => setMobileOpen(false)}
            className="rounded-none p-2 text-dim transition-colors hover:bg-surface-800 hover:text-text"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = mobileExpanded === item.label;

            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setMobileExpanded(isExpanded ? null : item.label);
                    } else if (item.href) {
                      window.location.href = item.href;
                    }
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
                    "text-muted hover:text-text hover:bg-surface-800",
                    isExpanded && "text-signal",
                  )}
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform", isExpanded && "rotate-180")}
                    />
                  )}
                </button>

                {hasChildren && isExpanded && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l border-line pl-3">
                    {item.children!.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-muted transition-colors hover:text-text hover:bg-surface-800"
                      >
                        {child.label}
                      </Link>
                    ))}
                    {item.highlights && item.highlights.length > 0 && (
                      <>
                        <hr className="my-2 border-line" />
                        {item.highlights.map((h) => (
                          <Link
                            key={h.label}
                            href={h.href}
                            className="block px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-signal transition-colors hover:text-signal-dim"
                          >
                            {h.label}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <hr className="my-4 border-line" />
          <Link
            href={`${siteConfig.appUrl}/login`}
            className="flex w-full px-3 py-2.5 font-mono text-xs text-muted transition-colors hover:text-text hover:bg-surface-800"
          >
            Sign in
          </Link>
          <Link href={`${siteConfig.appUrl}/signup`} className="block mt-2">
            <Button variant="primary" size="md" className="w-full">
              Get started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
