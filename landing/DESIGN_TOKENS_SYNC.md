# Design Tokens Sync — landing ⇄ frontend

`openzync-frontend/src/app/globals.css` (`@theme` ink system) is the single
authority. `openzync-landing` mirrors it via a **version-stamped copy** —
never a cross-repo import (separate repos, separate deploys).

## What lives where

| File | Role |
|---|---|
| `packages/design-system/src/tokens.css` | Verbatim copy of frontend `@theme`. Do not edit here. |
| `landing/src/app/globals.css` | `@import "tailwindcss"` + `@import "@openzync/design-system/tokens.css"`, then landing-only base (cards, inputs, prose, scrollbar, motion). No `@theme`. |
| `packages/design-system/src/globals.css` | Shared patterns (cards, inputs, animations) repointed to ink tokens. No `@theme`. |
| `packages/design-system/src/components/button.tsx` | Mirrors frontend `ui/button` variants (inverted primary, ghost secondary, error-border danger). |
| `packages/design-system/src/components/badge.tsx` | Mirrors frontend `ui/badge` semantics (success→signal, warning→amber, error→red, info→signal-dim) + live dot. `StatusBadge`/`ActorTypeBadge` intentionally not mirrored (dashboard-only). |

## Copy checklist (frontend → landing)

1. Read `../openzync-frontend/src/app/globals.css` `@theme` block.
2. Paste it verbatim into `packages/design-system/src/tokens.css` below the
   header, and stamp the header: `Source: openzync-frontend@<short-sha> <date>`.
3. Mirror any `ui/button` / `ui/badge` variant changes by hand.
4. Check fonts in frontend `layout.tsx` (`Fraunces` / `IBM_Plex_Sans` /
   `IBM_Plex_Mono` variables) still match `landing/src/app/layout.tsx`.
5. Run `npm run lint -w landing` and `npm run build -w landing`.

## Diff procedure

```bash
# Extract the authority block and compare against the mirror:
diff <(sed -n '/^@theme/,/^}/p' ../openzync-frontend/src/app/globals.css) \
     <(sed -n '/^@theme/,/^}/p' packages/design-system/src/tokens.css) \
  && echo "tokens in sync"
```

Any output means the mirror is stale — re-copy and re-stamp the header.
