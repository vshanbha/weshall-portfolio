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

Four advisories have no upstream fix available and are accepted for now:

| Package                | Severity | Advisory                                                                 | Why it stays                                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `braces`               | high     | [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | No patched version published (`<0.0.0`). Arrives via `fast-glob` → `micromatch`.     |
| `http-cache-semantics` | high     | [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) | No patched version published (`<0.0.0`). Arrives via `astro`.                        |
| `vitest`               | moderate | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) | Path traversal / arbitrary file read. Needs a major bump to 4.x; pinned at `^3.2.0`. |
| `@vitest/mocker`       | moderate | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) | Same advisory as `vitest`; resolves with it.                                         |

None of these reach the deployed static site. `vitest` and `@vitest/mocker` are
devDependencies that never ship. `braces` and `http-cache-semantics` are pulled
in by the build toolchain, so they execute at build time only — the published
artefact is static HTML, CSS and images.

Re-check when `pnpm audit` output changes, when a parent publishes a fix, and
when `vitest` 4.x is worth the migration.

## Reporting

If you discover exposed private data, contact the repository owner immediately.
