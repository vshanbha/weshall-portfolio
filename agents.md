# Agent Operational Instructions: Portfolio Project

## Universal Commandments

All agents operating in this workspace must treat these as foundational, non-negotiable rules:

1. **Think before coding.** Don't assume — ask. Surface confusion instead of running with a guess.
2. **Simplicity first.** Write the minimum code that solves the problem. No speculative abstractions.
3. **Surgical changes.** Touch only what you were asked to touch. Don't refactor adjacent code.
4. **Goal-driven execution.** Define what "done" looks like. Use tests as success criteria, not vibes.

---

This document contains the operational principles, content conventions, and development protocols for agents working within the `portfolio/` project.

## Working Agreement

All work follows the **Agent Workflow** defined in [`docs/AgentWorkflow.md`](docs/AgentWorkflow.md). This covers:

- **Phase lifecycle:** Scoping → Design → Review (Gate A) → Build → Validation → Final Review (Gate B)
- **Branching policy:** `issue-<number>-<description>` feature branches
- **Definition of Done:** Explicit verification against acceptance criteria
- **Quality matrix:** Validation commands and gate requirements

Read `docs/AgentWorkflow.md` before starting any new task.

## Security and Privacy

Read [`SECURITY.md`](SECURITY.md) for data classification rules and privacy requirements.

**Key rule:** Never commit personal email, phone, address, or API keys to this repository. Use environment variables for sensitive configuration.

## Objective

Build and maintain the public-facing website for **weshall.build** — a professional portfolio and technical blog.

## Foundation: Velocity Template

This project is built on the **Velocity** template by Southwell Media — a production-ready Astro 6 starter kit. It is not a basic scaffold; it is a full-featured component library and design system.

**Documentation:** [https://docs.deployvelocity.com/](https://docs.deployvelocity.com/)

Key areas of the Velocity docs:

| Topic | URL |
|-------|-----|
| Getting Started | [docs.deployvelocity.com/getting-started](https://docs.deployvelocity.com/getting-started/) |
| Project Structure | [docs.deployvelocity.com/getting-started/project-structure](https://docs.deployvelocity.com/getting-started/project-structure/) |
| Components | [docs.deployvelocity.com/components](https://docs.deployvelocity.com/components/) |
| Design System | [docs.deployvelocity.com/design-system](https://docs.deployvelocity.com/design-system/) |
| Configuration | [docs.deployvelocity.com/configuration](https://docs.deployvelocity.com/configuration/) |
| Content Management | [docs.deployvelocity.com/content-management](https://docs.deployvelocity.com/content-management/) |
| SEO | [docs.deployvelocity.com/seo](https://docs.deployvelocity.com/seo/) |
| Customization | [docs.deployvelocity.com/customization](https://docs.deployvelocity.com/customization/) |
| Deployment | [docs.deployvelocity.com/deployment](https://docs.deployvelocity.com/deployment/) |
| API Routes | [docs.deployvelocity.com/api](https://docs.deployvelocity.com/api/) |

**Always consult the Velocity documentation before modifying components, layouts, design tokens, content collections, or configuration.** The template provides patterns and conventions that should be followed rather than reinvented.

### Current State

This project is currently in its **default Velocity template state** — placeholder content, default branding, and template configurations. It has not yet been customised for weshall.build. Agents should be aware that most files still reflect template defaults and will need to be tailored as part of the site build-out.

## Project Independence

This is a **standalone web project** with its own build system, component library, and deployment pipeline. Work within this project should follow standard web development practices (Astro, Tailwind, TypeScript, React) and Velocity conventions. Do not assume `factory/` vault structures or workflows apply here unless explicitly stated.

## Relationship with factory/

The `portfolio/` website is the **public delivery surface** for content authored in `factory/`. However:

- `portfolio/` is an independent project with its own conventions.
- Content from `factory/` is imported into `portfolio/` via the **Manual Export Gate Protocol** (see below).
- Agents must never treat `portfolio/` as an extension of `factory/`.
- For factory-specific rules (vault structure, synthesis workflows, memory protocols), refer to [`factory/agents.md`](../factory/agents.md).

### Manual Export Gate Protocol

No content may be moved, copied, or synced from `factory/` to `portfolio/` without:

1. Content prepared and reviewed in `factory/articles/drafts/`.
2. Explicit human review with `reviewed: true` in frontmatter.
3. Manual export approval by the user.

Agents must NOT automate or bypass this gate. Content arriving in `portfolio/src/content/articles/` is considered **published source material** — treat it as canonical.

## Operational Principles

- **AI Safety:** AI agents may draft components, propose styling, and suggest content structure. They must NOT deploy directly, alter production configuration, or bypass human review.
- **Data Integrity:** Agents MUST NOT delete, move, rename, or otherwise modify files or directory structures without explicit, prior user approval for each specific action.
- **Shell Command Integrity:** All shell commands must be executed independently. Do not chain commands using operators like `&&`, `;`, `||`, or pipes `|` when multiple distinct actions are involved. Each command must be proposed and approved separately.
- **Shell Command Integrity:** All shell commands must be executed independently. Do not chain commands using operators like `&&`, `;`, `||`, or pipes `|` when multiple distinct actions are involved. Each command must be proposed and approved separately.
- **No Secrets in Code:** Never commit environment variables, API keys, or secrets. Use `.env` (gitignored) and reference `.env.example` for documentation.
- **Locale Integrity:** When modifying translation files (`src/i18n/translations/*.ts`), existing translations in non-English locales (de, hi, mr) must be preserved. Never replace a language-specific translation with English text. If new content needs to be added to a locale file and no translation exists, add the English text as a placeholder AND flag it in a comment (e.g. `// TODO: translate`). For brand names that appear in all locales, transliterate into the target script (e.g. Devanagari for hi/mr) rather than keeping Roman script.

## Astro Technical Standards (Iron Laws)

These are **mandatory** for all agents working on this project:

| Law | Rule |
|-----|------|
| **Zero-JS by Default** | Use `.astro` components for static content. Framework components (React, Svelte) only for interactive islands. |
| **Strictly Typed Content** | Content Collections must use Zod schemas via `defineCollection()`. Never skip schema validation. |
| **Intentional Hydration** | Always specify `client:*` directives explicitly. Never rely on defaults. |
| **Image Optimisation** | Never use raw `<img>` tags. Always use `<Image />` from `astro:assets`. |
| **No Untyped Content** | Never use `Astro.glob()`. Always use `getCollection()` from `astro:content`. |
| **Typed Environment** | Use `astro:env` for type-safe environment variables. Never use `process.env`. |

See `factory/skills/astro-specialist/references/technical-standards.md` for the full reference.

## Project Structure

```
src/
  components/         # UI components (ui/, patterns/, layout/, seo/)
  content/            # Content collections (articles, offers, philosophy, profile)
  config/             # Site config, navigation, consent
  i18n/               # Locale routes, translations (en, es, fr)
  layouts/            # BaseLayout, PageLayout
  lib/                # Utilities (cn, schema, og image helpers)
  pages/              # Routes and API endpoints
  styles/             # Global CSS, design tokens, themes
```

See [Velocity Project Structure](https://docs.deployvelocity.com/getting-started/project-structure/) for the full reference.

## Components

Velocity provides **55 production-ready components** across 6 categories:

| Category | Count | Examples |
|----------|-------|----------|
| UI | 31 | Button, Input, Card, Badge, Alert, Tabs, Dialog, Toast |
| Layout | 4 | Header, Footer, ThemeToggle, Analytics |
| Patterns | 7 | ContactForm, NewsletterForm, SearchInput, StatCard |
| Blog | 4 | ArticleHero, BlogCard, ShareButtons, RelatedPosts |
| Landing | 5 | Hero, CTA, FeatureTabs, Credibility |
| SEO | 3 | SEO, JsonLd, Breadcrumbs |

All components are Astro-first (no client JS required), composable, accessible (WCAG 2.2 AA), and token-based. See [Velocity Components](https://docs.deployvelocity.com/components/) for usage patterns.

## Content Collections

This project uses **custom content collections** (not Velocity defaults):

| Collection | Format | Location | Purpose |
|------------|--------|----------|---------|
| `articles` | `.md` / `.mdx` | `src/content/articles/` | Deep-dive technical analysis and operational insights |
| `offers` | `.md` / `.mdx` | `src/content/offers/` | Productised entry offers and positioning |
| `philosophy` | `.md` / `.mdx` | `src/content/philosophy/` | Brand philosophy and "Bypass Surgery" manifesto |
| `profile` | `.md` / `.mdx` | `src/content/profile/` | Professional profile and background |

See `src/content.config.ts` for Zod schemas. All content must pass frontmatter validation at build time.

### Frontmatter Standard

All content files MUST include these fields (enforced by Zod schema):

```yaml
---
title:
description:
publishedAt:
status:
tags:
archetypes:
reviewed:        # MUST be boolean — export gate requirement
visibility:
ai_assisted:
human_reviewed:
origin:
---
```

**Review Gate:** Content must have `reviewed: true` before being published. This ensures only validated truth is exposed publicly.

## Design System

Velocity uses a three-tier token architecture with OKLCH colours:

- **Primitives:** `src/styles/tokens/primitives.css` — base colour values
- **Semantic tokens:** `src/styles/tokens/colors.css` — theme-aware aliases
- **Component tokens:** Inline Tailwind utilities referencing semantic tokens

Built-in themes:
- `default` — neutral grays + International Orange (`#F94C10`)
- `midnight` — deep purple + electric violet

See [Velocity Design System](https://docs.deployvelocity.com/design-system/) for colour tokens, dark mode, and Tailwind utilities.

## Conventions

- **Language:** Use British and Indian English (e.g., 'Modelling', 'Analysed', 'Harmonise') in all user-facing content. Avoid American English spellings.
- **Source Attribution:** When referencing external sources, provide direct, clickable links/URLs. Validate links before presenting.
- **Component Naming:** Follow Velocity patterns — PascalCase for component files, colocated with `.tsx` extension.
- **Styling:** Use Tailwind CSS v4 utility classes. Do not hardcode colours — use design tokens from `src/styles/tokens/`.
- **TypeScript:** Strict mode (`astro/tsconfigs/strict`). Use the `@/` path alias for imports from `src/`.
- **Imports:** Use path aliases — `import { Button } from '@/components/ui'` rather than relative paths.

## Configuration

| File | Purpose |
|------|---------|
| `src/config/site.config.ts` | Site metadata, branding, contact info, social links |
| `src/config/routes.ts` | Type-safe route definitions and navigation |
| `src/config/consent.config.ts` | Cookie consent categories (Google Consent Mode v2) |
| `.env` | Environment variables (SITE_URL, analytics IDs) |

See [Velocity Configuration](https://docs.deployvelocity.com/configuration/) for details.

## Development Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm check` | Astro type checker |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |
| `pnpm validate` | Lint + check + build (full validation) |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright E2E tests |

## Deployment

The site deploys to **GitHub Pages** via GitHub Actions. Deployment happens automatically on merge to `main`. See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for environment variables, scenarios (local, GitHub Pages, custom domain), and troubleshooting.

## Skills

| Skill | Purpose |
|-------|---------|
| `testing` | Vitest unit tests + Playwright E2E patterns |
| `code-quality` | ESLint, Prettier, TypeScript strict mode |
| `performance` | Core Web Vitals, image optimisation, bundle efficiency |
| `accessibility` | WCAG 2.2 AA compliance, ARIA patterns, keyboard navigation |
| `seo` | Meta tags, JSON-LD, OG images, sitemap |

All skills are in `portfolio/skills/`. Consult the relevant skill before working on its domain.

## Git and GitHub

**Repository:** `vshanbha/weshall-portfolio` (SSH: `git@github.com:vshanbha/weshall-portfolio.git`)

### Commands

| Task | Command |
|------|---------|
| Check status | `git status` |
| View changes | `git diff` |
| View history | `git log --oneline -10` |
| Stage files | `git add <file>` |
| Commit | `git commit -m "message"` |
| Push | `git push origin <branch>` (never push directly to `main`) |
| Pull | `git pull origin main` |
| Create PR | `gh pr create --base main --head <branch> --title "title" --body "description"` |
| List PRs | `gh pr list` |
| View PR | `gh pr view <number>` |
| View issue | `gh issue view <number>` |
| Comment on issue | `gh issue comment <number> --body "comment text"` |
| Run tests | `pnpm test` |
| Run E2E tests | `pnpm test:e2e` |
| Full validation | `pnpm validate` |

### Best Practices

- **Always run `git status` and `git diff`** before committing to understand what changed.
- **Never commit secrets, API keys, or credentials.** Use `.env` (gitignored).
- **Use descriptive commit messages** that explain what and why, not just what.
- **Branch for features:** `git checkout -b feature/描述` for non-trivial changes.
- **Run `pnpm validate`** (lint + check + build) before committing web changes.
- **Run `git pull` before starting work** to ensure you're on the latest.
- **Check `gh pr list`** before creating PRs to avoid duplicates.
- **One concern per commit** — keep changes focused and reviewable.

## When Working on This Project

1. **Consult Velocity docs first** — [docs.deployvelocity.com](https://docs.deployvelocity.com/) covers components, layouts, tokens, content collections, and configuration patterns. Follow existing conventions.
2. This is a web project — use standard Astro/Tailwind/TypeScript practices.
3. For content originating from `factory/`, respect the export gate protocol.
4. Run `pnpm validate` before considering any task complete.
5. Do not modify deployment configuration without explicit approval.
6. For factory-related content workflows, see [`factory/agents.md`](../factory/agents.md).
