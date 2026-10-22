# BREAKING: Content-Security-Policy is now nonce-only via `proxy.ts`.

- `script-src` and `style-src` allow only the per-request nonce (plus
  `strict-dynamic` for scripts). The static CSP in `netlify.toml` has been
  removed; do not re-add `'unsafe-inline'` or static hashes there or styles
  and scripts will break in production.
- Single-character search is gone: the search index now requires a 2-char
  minimum query, and JSON-LD structured data loads asynchronously.
- Removed the `SECTION_SEAM` sentinel and its `MutationObserver`; section
  seams render through normal layout flow now.
- Escape `<` as `\u003c` in JSON-LD output so embedded `</script>` can no
  longer break out of the script tag.
- Navbar test mock cleanup: replaced the ad-hoc auth mock with the shared
  test helper.
