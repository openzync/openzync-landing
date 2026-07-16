# OpenZync Landing

**Marketing website for the OpenZync agent memory platform.**

<p align="center">
  <img src="https://img.shields.io/badge/next.js-16-blue" alt="Next.js">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT">
</p>

Public-facing site at [openzync.tech](https://openzync.tech) — built with Next.js, MDX content, and a shared design system.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Content | MDX with frontmatter |
| Styling | Tailwind CSS |
| Monorepo | Yarn workspaces |
| Shared UI | `packages/design-system` |

## Structure

```
openzync-landing/
├── landing/               # Main application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── features/          # Features page
│   │   │   ├── faq/               # FAQ
│   │   │   ├── about/             # About page
│   │   │   ├── blog/              # Blog (MDX)
│   │   │   ├── changelog/         # Changelog
│   │   │   ├── events/            # Events
│   │   │   ├── terms/             # Terms of service
│   │   │   ├── privacy/           # Privacy policy
│   │   │   └── use-cases/         # Use cases
│   │   ├── components/    # Shared React components
│   │   └── content/       # MDX content files
│   ├── content/           # Blog posts and articles (MDX)
│   └── Dockerfile
└── packages/
    └── design-system/     # Shared UI component library
```

## Pages

- **/** — Home page with hero, feature highlights, and call-to-action
- **/features** — Detailed feature breakdown
- **/faq** — Frequently asked questions
- **/about** — About OpenZync and the team
- **/blog** — Blog with MDX-based articles
- **/changelog** — Release notes and updates
- **/events** — Upcoming and past events
- **/terms** — Terms of service
- **/privacy** — Privacy policy
- **/use-cases** — Use case walkthroughs

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev -w landing
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Related Repositories

- [openzync-core](https://github.com/openzync/openzync-core) — backend platform
- [openzync-frontend](https://github.com/openzync/openzync-frontend) — admin dashboard

## License

MIT — see [LICENSE](./LICENSE).
