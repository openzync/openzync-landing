import Link from "next/link";
import { GITHUB_URL, NAV_LINKS } from "@/lib/site";

type LinkGroup = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

const GROUPS: LinkGroup[] = [
  {
    title: "Product",
    links: NAV_LINKS.filter((l) => l.href !== "/company").map((l) => ({
      label: l.label,
      href: l.href,
    })),
  },
  {
    title: "Resources",
    links: [
      { label: "Stream", href: "/stream" },
      { label: "GitHub", href: GITHUB_URL, external: true },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Company", href: "/company" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <svg
        aria-hidden
        viewBox="0 0 200 60"
        className="pointer-events-none absolute right-[8%] top-0 hidden h-14 w-44 md:block"
      >
        <path
          d="M10 50 70 12l60 30 55-24"
          fill="none"
          stroke="#94b8dc"
          strokeOpacity={0.15}
          strokeWidth={0.5}
        />
        <circle cx="10" cy="50" r="1.5" fill="#5b6e80" />
        <circle cx="70" cy="12" r="2" fill="#3df5c6" fillOpacity={0.7} />
        <circle cx="130" cy="42" r="1.5" fill="#5b6e80" />
        <circle cx="185" cy="18" r="1.5" fill="#5b6e80" />
      </svg>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-16 md:grid-cols-4">
        {GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-deep">
              <span aria-hidden className="size-1 rounded-full bg-biolume/70" />
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-mist transition-colors duration-300 hover:text-foam"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors duration-300 hover:text-foam"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 font-mono text-[11px] text-deep">
          <p>© 2026 OpenZync · AGPL-3.0 (core) · MIT (site)</p>
          <p>
            <kbd className="rounded border border-line px-1.5 py-0.5">⌘K</kbd> to
            navigate
          </p>
        </div>
      </div>
    </footer>
  );
}
