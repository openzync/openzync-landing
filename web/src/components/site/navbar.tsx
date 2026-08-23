"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/site/command-palette";
import { GithubMark } from "@/components/site/github-mark";
import { Wordmark } from "@/components/site/wordmark";
import { cn } from "@/lib/cn";
import { GITHUB_STARS, GITHUB_URL, NAV_LINKS, formatStars } from "@/lib/site";

const linkBase =
  "relative text-sm transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foam after:transition-transform after:duration-300 hover:text-foam hover:after:scale-x-100";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the mobile menu on route change (state-during-render pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const chrome = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          chrome
            ? "border-line bg-void/85 backdrop-blur-sm"
            : "border-transparent",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          <Link href="/" aria-label="OpenZync home">
            <Wordmark />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  linkBase,
                  pathname === link.href
                    ? "text-foam after:scale-x-100"
                    : "text-mist",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-mist transition-colors duration-300 hover:border-deep hover:text-foam"
            >
              <GithubMark className="size-3.5" />
              {GITHUB_STARS !== null && formatStars(GITHUB_STARS)}
            </a>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-deep transition-colors duration-300 hover:border-deep hover:text-mist"
            >
              ⌘K
            </button>
            <Link
              href="/developers"
              className="rounded-full bg-biolume px-4 py-1.5 font-display text-xs font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_24px_var(--color-glow)]"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center text-foam md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300",
                  open && "top-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300",
                  open && "bottom-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-abyss transition-opacity duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-full flex-col justify-center gap-8 px-10">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: `${100 + i * 60}ms` }}
              className={cn(
                "font-display text-4xl font-semibold tracking-tight transition-[opacity,transform] duration-500 ease-out-quint",
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
                pathname === link.href ? "text-biolume" : "text-foam",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/developers"
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: "340ms" }}
            className={cn(
              "mt-4 w-fit rounded-full bg-biolume px-6 py-2.5 font-display text-sm font-semibold text-void transition-[opacity,transform] duration-500 ease-out-quint",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            Get started
          </Link>
        </div>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
