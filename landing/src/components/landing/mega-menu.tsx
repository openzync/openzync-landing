"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/content/site-config";

interface MegaMenuProps {
  items: NavItem[];
}

/**
 * Mega-menu navigation for desktop.
 * Instrument-panel dropdowns: mono index triggers, hairline-divided rows,
 * signal reserved for active/open state, highlights band with signal-dim dots.
 *
 * Keyboard (ported 1:1): ArrowDown opens the first dropdown, then focuses the
 * first child link; ArrowRight/ArrowLeft move between top-level items;
 * Escape closes. Hover intent is a 150ms close timeout.
 */
export function MegaMenu({ items }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
      setActiveIndex(null);
    }, 150);
  };

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Keyboard navigation for mega-menu.
   * ArrowDown: open next dropdown. ArrowRight/Left: move between top-level items.
   * Escape: close current dropdown.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (activeIndex === null) {
      // No dropdown open — ArrowDown opens first item if it has children
      if (e.key === "ArrowDown") {
        const firstChild = items.findIndex((it) => it.children && it.children.length > 0);
        if (firstChild >= 0) {
          e.preventDefault();
          setActiveIndex(firstChild);
        }
      }
      return;
    }

    const current = items[activeIndex];
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        // Focus the first child link inside the open dropdown
        if (current?.children && current.children.length > 0) {
          const dropdown = dropdownRefs.current[activeIndex];
          if (dropdown) {
            const firstLink = dropdown.querySelector<HTMLAnchorElement>("a");
            firstLink?.focus();
          }
        }
        break;

      case "ArrowRight":
        e.preventDefault();
        setActiveIndex((activeIndex + 1) % items.length);
        break;

      case "ArrowLeft":
        e.preventDefault();
        setActiveIndex((activeIndex - 1 + items.length) % items.length);
        break;

      case "Escape":
        e.preventDefault();
        setActiveIndex(null);
        setHoveredIndex(null);
        break;
    }
  };

  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      onKeyDown={handleKeyDown}
    >
      {items.map((item, i) => {
        const isOpen = activeIndex === i;
        const hasChildren = item.children && item.children.length > 0;

        const triggerClassName = cn(
          "flex items-center gap-2 rounded-none px-3 py-2 text-sm transition-colors",
          isOpen
            ? "text-signal bg-surface-800"
            : "text-muted hover:text-text hover:bg-surface-800",
        );
        const triggerAria = hasChildren
          ? ({ "aria-expanded": isOpen, "aria-haspopup": "true" } as const)
          : {};

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            {item.href ? (
              <Link
                href={item.href}
                onFocus={() => !hoveredIndex && setActiveIndex(i)}
                className={triggerClassName}
                {...triggerAria}
              >
                {item.label}
                {hasChildren && (
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                  />
                )}
              </Link>
            ) : (
              <button
                onClick={() => handleClick(i)}
                onFocus={() => !hoveredIndex && setActiveIndex(i)}
                className={triggerClassName}
                {...triggerAria}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
            )}

            {/* Dropdown */}
            {hasChildren && isOpen && (
              <div
                ref={(el) => { dropdownRefs.current[i] = el; }}
                className="absolute top-full left-0 pt-2 z-50"
              >
                <div className="w-72 rounded-xl border border-line bg-surface-900 overflow-hidden">
                  {/* Children links */}
                  <div className="divide-y divide-line">
                    {item.children!.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="group flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface-800"
                        // Allow Tab within the dropdown, focus first child on ArrowDown
                        tabIndex={0}
                      >
                        <span className="flex flex-col">
                          <span className="text-sm text-text transition-colors group-hover:text-signal">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 text-xs text-muted">
                              {child.description}
                            </span>
                          )}
                        </span>
                        <span
                          aria-hidden="true"
                          className="mt-1 font-mono text-[11px] text-dim transition-colors group-hover:text-signal"
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="border-t border-line bg-surface-950">
                      {item.highlights.map((h) => (
                        <Link
                          key={h.label}
                          href={h.href}
                          className="group flex items-center gap-2.5 px-4 py-2.5 transition-colors hover:bg-surface-800"
                        >
                          <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-full bg-signal-dim"
                          />
                          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-signal transition-colors group-hover:text-signal-dim">
                            {h.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
