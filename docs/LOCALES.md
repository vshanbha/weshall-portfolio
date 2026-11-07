# Locales: Current State and Language Activation

The operational reference for the site's locale setup and the checklist for
activating an additional language. It follows the Velocity template's i18n
pattern: **one file holds the enabled languages**, and everything else
derives from it.

## Current state

| Set          | Codes      | Where                                                        | Status                                                                                                               |
| ------------ | ---------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Enabled      | `en`, `de` | `locales` in `src/i18n/config.ts`                            | Live — routable, in the switcher, hreflang, sitemap and redirects                                                    |
| Aspirational | `hi`, `mr` | `src/i18n/translations/hi.ts`, `src/i18n/translations/mr.ts` | Files exist (690+ lines each) and are type-checked, but **not enabled**: no slugs, not routable, not in the switcher |

Rules that keep this honest:

- `src/i18n/config.ts` is the **single switch**. `Locale` derives from
  `locales`, and route slugs, locale names/flags, the content-schema enum,
  the Astro i18n config, bare-path redirects and the sitemap filter all
  derive from it. Never hardcode a locale list anywhere else — AGENTS.md
  rule 5's i18n exception exists for exactly this.
- Translation files are checked **structurally** at compile time: each ends
  with `satisfies SiteStrings` (derived from `en`), so a missing or extra
  key is a type error. The machine checks structure; a human checks quality —
  the Locale Integrity rule in AGENTS.md governs placeholders
  (`// TODO: translate`) and brand transliteration.
- `tests/i18n/locales.test.ts` is the **runtime backstop**: it fails if a
  `satisfies` clause or strict record type is ever loosened, and it pins the
  aspirational set (`isValidLocale('hi')` must be `false`), so it moves with
  activation — see step 3.
- Blog **posts** stay English-only: `englishOnlyDetailRoutes` in
  `src/i18n/routes.ts` plus the per-post `locale` frontmatter gate. The blog
  _index_ gets chrome in every enabled locale automatically.

## Activating a new language

The steps are ordered so the compiler does the bookkeeping. Example uses
`hi` (aspirational).

1. **Human review of the translation file** (`src/i18n/translations/hi.ts`).
   Clear every `// TODO: translate` and "needs native-speaker review"
   marker. This is the quality gate and cannot be automated — it is the
   reason activation is usually funded, not scheduled.
2. **Flip the switch:** add `'hi'` to `locales` in `src/i18n/config.ts`.
   Restart `pnpm dev` afterwards — Astro does not reload `astro.config.mjs`
   when its imported files change (see the comment there), so a running dev
   server keeps serving the stale derived settings until restart.
3. **Fill the compiler's checklist.** The type errors that follow are the
   main work list — do not widen types to silence it:
   - `src/i18n/routes.ts` — URL slugs for each route
   - `localeNames` / `localeFlags` in `src/i18n/config.ts`
   - OG card text: `localizedCards` in `src/pages/og/[...slug].png.ts`
   - any other `Record<Locale, …>` the compiler names
   - `tests/i18n/locales.test.ts` — **invisible to the compiler**: its
     "aspirational locales are known but not routable" assertions hard-code
     the current set, so the suite fails until the activated code moves

   The content-schema enum (`src/content.config.ts`), the Astro `i18n`
   block and the redirect map derive automatically — no edits needed.

4. **Verify:** `pnpm validate` (format, lint, check, build, full vitest
   suite) then `pnpm test:e2e`. Copy the "German locale" describe blocks in
   `tests/e2e/pages.spec.ts` as templates for equivalent new-locale tests.
5. **Content:**
   - Main-site pages render from the translation file — nothing to migrate.
   - Blog index: chrome appears automatically; posts stay English.
   - Blog posts _in_ the new language: add content with `locale: <code>`
     frontmatter — `src/pages/[lang]/blog/[...slug].astro` generates a page
     only for locales the post actually exists in, so translated posts
     appear without any routing change.
6. **Ship:** merge `dev` → `main` via the release PR. The switcher,
   hreflang, sitemap and redirects all pick the locale up from the single
   switch on the next build.

## Deactivating / narrowing

Remove the code from `locales`; the same compiler checklist runs in reverse
(its route slugs and map entries become excess properties), and the
aspirational-set assertions in `tests/i18n/locales.test.ts` must move back.
Keep the translation file — AGENTS.md rule 5 forbids deleting half-done
locale work.

## History

- #20 — the locale type mismatch that led to the single-switch design and
  this document; its description also records the base-path, redirect and
  OG follow-up work.
- `de` was activated in PR #47 (Publish the German locale); the `hi`/`mr`
  files date from the original multi-locale stubs.
