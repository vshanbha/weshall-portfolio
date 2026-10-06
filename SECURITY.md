# Security Policy

## Overview

This document defines privacy and security rules for the We shall build portfolio project. The portfolio is public-facing; the factory project is always private.

## Data Classification

| Data Type                          | Portfolio (Public)      | Factory (Private) |
| ---------------------------------- | ----------------------- | ----------------- |
| Business email                     | ✅ Allowed              | ✅ Allowed        |
| Personal email                     | ❌ Never                | ⚠️ Internal only  |
| Phone number                       | ❌ Never                | ⚠️ Internal only  |
| Physical address                   | ❌ Never                | ⚠️ Internal only  |
| API keys / tokens                  | ❌ Never (use env vars) | ❌ Never          |
| CV / personal documents            | ❌ Never                | ✅ Allowed        |
| Public profiles (GitHub, LinkedIn) | ✅ Allowed              | ✅ Allowed        |

## Rules for Portfolio Project

### Never commit:

- Personal email addresses (use `contact@weshall.build`)
- Phone numbers
- Physical addresses
- Private API keys or tokens
- Internal URLs or credentials
- CVs, personal documents, or private observations

### Always use:

- Environment variables (`.env`) for sensitive configuration
- Business contact information only
- Public social profiles only

### Before pushing:

- Verify no personal data in `site.config.ts`
- Check `.env` is in `.gitignore`
- Review `git diff` for accidental exposure

## Factory Project

- Always private (contains CVs, personal documents, private syntheses)
- Never merge factory content to portfolio without explicit human review
- Content export requires the Manual Export Gate protocol

## Dependency Advisories

Run `pnpm audit` to check the current state. Most advisories here are in
transitive dependencies whose parent pins an older range, so Dependabot cannot
raise them on its own — `pnpm.overrides` in `package.json` is how they get
fixed. Overrides are keyed on the exact vulnerable version with a caret target,
so a patch or minor upgrade lands without crossing a major boundary.

### Known unfixable advisories

Five advisories remain (four packages). One has no upstream fix at all; the
other four are blocked on a single vitest major upgrade:

| Package          | Severity | Advisory                                                                                                                                           | Why it stays                                                                                       |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `braces`         | high     | [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)                                                                           | No patched version published — `3.0.3` is `latest` on npm. Arrives via `fast-glob` → `micromatch`. |
| `vitest`         | moderate | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9)                                                                           | Path traversal / arbitrary file read. Needs `>=4.1.11`; pinned at `^3.2.0`.                        |
| `@vitest/mocker` | moderate | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9)                                                                           | Same advisory as `vitest`; resolves with it.                                                       |
| `tinypool` (×2)  | critical | [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3), [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr) | Needs `>=2.1.2`. `vitest@3.2.6` requires `tinypool@^1.1.1`, so the fix is a major.                 |

None of these reach the deployed static site. `vitest`, `@vitest/mocker` and
`tinypool` are devDependencies that never ship. `braces` is pulled in by the
build toolchain, so it executes at build time only — the published artefact is
static HTML, CSS and images.

**The path to four of them:** migrating to `vitest` 4.x. That raises `vitest`,
`@vitest/mocker` and `tinypool` together. Re-check when the migration happens,
when `braces` gets a patch, or whenever `pnpm audit` output changes.

**Verify fixable claims against npm, not just `pnpm audit`.** npm's advisory
metadata can report `patched_versions: <0.0.0` for a package that does have a
published fix. `http-cache-semantics` was recorded here as unfixable on that
basis and was wrong — `4.3.0` exists. Cross-check with
`npm view <package> dist-tags` before accepting a `<0.0.0` as final.

## Reporting

If you discover exposed private data, contact the repository owner immediately.
