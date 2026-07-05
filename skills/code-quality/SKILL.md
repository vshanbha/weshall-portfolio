---
name: code-quality
description: Use when linting, formatting, type-checking, or enforcing code standards. Covers ESLint, Prettier, TypeScript strict mode, and pre-commit validation for the Velocity Astro project.
---

# Code Quality

## Overview

This skill enforces consistent code quality across the Velocity Astro project using **ESLint** (linting), **Prettier** (formatting), and **TypeScript** (type safety). All three are configured — use the existing tooling rather than adding new linters.

## Astro Technical Standards (Iron Laws)

These are **mandatory** and override general TypeScript conventions when they conflict:

| Law | Rule |
|-----|------|
| **Zero-JS by Default** | Use `.astro` components for static content. Framework components (React, Svelte) only for interactive islands. |
| **Strictly Typed Content** | Content Collections must use Zod schemas via `defineCollection()`. Never skip schema validation. |
| **Intentional Hydration** | Always specify `client:*` directives explicitly (`client:load`, `client:idle`, `client:visible`). Never rely on defaults. |
| **Image Optimisation** | Never use raw `<img>` tags. Always use `<Image />` or `getImage()` from `astro:assets`. |
| **No Untyped Content** | Never use `Astro.glob()`. Always use `getCollection()` / `getEntry()` from `astro:content`. |
| **Typed Environment** | Use `astro:env` for type-safe environment variables. Never use `process.env`. |

### Anti-Patterns (Never Do)

| Anti-Pattern | Correct Approach |
|-------------|------------------|
| Framework UI for static-only content | Use `.astro` components |
| Raw `<img>` tags | Use `<Image>` from `astro:assets` |
| Content without Zod schema | Define schema in `src/content.config.ts` |
| Default hydration (`client:load` without thinking) | Use `client:idle` or `client:visible` where possible |
| `Astro.glob()` for structured content | Use `getCollection()` from `astro:content` |
| `process.env` for typed config | Use `astro:env` |

## Quick Reference

| Task | Command |
|------|---------|
| Lint | `pnpm lint` |
| Lint and fix | `pnpm lint:fix` |
| Format | `pnpm format` |
| Check formatting | `pnpm format:check` |
| Type check | `pnpm check` |
| Full validation | `pnpm validate` |

**Always run `pnpm validate` before committing.** This runs lint + type check + build in sequence.

## ESLint

### Configuration

- Config: `eslint.config.js` (ESLint 9 flat config)
- Plugins: `@astro/eslint-plugin`, TypeScript

### Rules

- **No unused imports** — remove them, don't suppress
- **Consistent naming** — follow existing PascalCase/camelCase conventions
- **No `any` types** — use proper TypeScript types
- **Import order** — group external imports before internal (enforced by config)

### Fixing Lint Errors

```bash
# Auto-fix what's fixable
pnpm lint:fix

# Manual review for remaining issues
pnpm lint
```

## Prettier

### Configuration

- Config: `.prettierrc`
- Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`
- Ignore: `.prettierignore`

### Formatting Rules

- **Single quotes** for strings
- **Trailing commas** where valid in ES5
- **2-space indentation** (not tabs)
- **Print width: 80** (wrap long lines)
- **Astro files** — Prettier handles `<script>` and `<style>` blocks automatically

### Format Files

```bash
# Format everything
pnpm format

# Check without modifying
pnpm format:check

# Format a specific file
pnpm format -- src/components/Button.astro
```

## TypeScript

### Configuration

- Config: `tsconfig.json` (extends `astro/tsconfigs/strict`)
- Path alias: `@/*` → `src/*`

### Strict Mode Rules

- **No implicit `any`** — all variables and parameters must be typed
- **Strict null checks** — handle `undefined` and `null` explicitly
- **No unused variables** — remove or prefix with `_`
- **Consistent type imports** — use `import type` for type-only imports

### Type Checking

```bash
# Run Astro type checker
pnpm check

# Check specific file (if supported)
pnpm check -- src/pages/blog/[...slug].astro
```

## Code Style Conventions

### Component Files

- **PascalCase** for component file names: `BlogCard.astro`, `HeroSection.tsx`
- **One component per file** — extract sub-components when needed
- **Colocate related files**: `Button.astro` + `Button.test.ts` + `Button.stories.ts`

### Imports

```typescript
// Use path aliases
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

// Use type imports for types
import type { CollectionEntry } from 'astro:content';

// Group: external → internal → relative
import { render } from 'astro:content';
import { cn } from '@/lib/utils';
import Card from './Card.astro';
```

### Exports

- **Default exports** for Astro components (page components)
- **Named exports** for utilities, types, and shared functions
- **Barrel exports** via `index.ts` for component directories

## Pre-Commit Checklist

Before committing any changes:

1. `pnpm lint` — no errors
2. `pnpm format:check` — all files formatted
3. `pnpm check` — no type errors
4. `pnpm build` — build succeeds
5. Or simply: `pnpm validate` (runs all four)

## Common Issues

| Problem | Solution |
|---------|----------|
| Prettier formatting conflict | Run `pnpm format` to auto-resolve |
| Type error in Astro file | Check frontmatter types, ensure proper imports |
| ESLint unused import | Remove the import, don't comment it out |
| Build fails after type check | Check `astro:content` imports match collection schemas |
