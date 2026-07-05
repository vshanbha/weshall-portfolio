---
name: release-pr
description: Use when creating pull requests, preparing releases, managing version bumps, or generating changelogs for the portfolio project. Covers PR templates, branch naming, pre-merge checklists, semantic versioning, markdown changelogs, git tagging, and GitHub release creation.
---

# Release & PR

## Overview

This skill governs pull request creation and release management for the **portfolio** project (weshall.build). It enforces the branching policy from `docs/AgentWorkflow.md`, ensures pre-merge quality gates are met, and provides a structured release process with markdown changelogs.

## Quick Reference

| Task | Command |
|------|---------|
| Create feature branch | `git checkout -b issue-<number>-<description> dev` |
| Run full validation | `pnpm validate` |
| Run tests | `pnpm test` |
| Run E2E tests | `pnpm test:e2e` |
| Create PR | `gh pr create` |
| List open PRs | `gh pr list` |
| View PR | `gh pr view <number>` |
| Merge PR | `gh pr merge <number>` |
| Create tag | `git tag -a vX.Y.Z -m "Release vX.Y.Z"` |
| Push tag | `git push origin vX.Y.Z` |
| Create GitHub release | `gh release create vX.Y.Z` |

## Branch Naming

All work must follow the branching policy from `docs/AgentWorkflow.md`:

| Branch Type | Convention | Example |
|-------------|-----------|---------|
| Feature | `issue-<number>-<description>` | `issue-42-add-dark-mode` |
| Hotfix | `hotfix-<description>` | `hotfix-fix-nav-overlay` |
| Content | `content-<description>` | `content-add-observability-article` |

- Branch from `dev` for all work.
- Never branch from `main` except for hotfixes.
- Use lowercase kebab-case for descriptions.

## PR Workflow

### Pre-PR Checklist

Before creating a PR, verify every item:

1. **Branch is up to date** — `git pull origin dev` and rebase if needed
2. **Validation passes** — `pnpm validate` (lint + type check + build)
3. **Tests pass** — `pnpm test`
4. **E2E tests pass locally** — `pnpm test:e2e`
5. **No secrets or credentials** in diff — `git diff --cached` review
6. **Commits are atomic** — one logical change per commit
7. **Commit messages are descriptive** — explain what and why

### PR Title Format

Use a prefix that categorises the change:

```
<type>: <short description>
```

| Type | When to Use |
|------|-------------|
| `feat` | New feature or component |
| `fix` | Bug fix |
| `content` | New or updated article/content |
| `refactor` | Code restructuring without behaviour change |
| `chore` | Tooling, config, dependencies |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `perf` | Performance improvement |
| `style` | Formatting, no logic change |

Examples:
- `feat: add dark mode toggle to header`
- `fix: resolve mobile nav overlay z-index`
- `content: add observability deep-dive article`

### PR Body Template

```markdown
## Summary

<1-2 sentence description of what this PR does and why>

## Changes

- <change 1>
- <change 2>

## Related Issues

Closes #<number>

## Validation

- [ ] `pnpm validate` passes
- [ ] `pnpm test` passes
- [ ] `pnpm test:e2e` passes (local)
- [ ] Visual review completed in browser
- [ ] Accessibility check (WCAG 2.2 AA)

## Screenshots

<if applicable, add before/after screenshots>
```

### PR Labels

Apply labels to categorise PRs:

| Label | Use |
|-------|-----|
| `enhancement` | New feature or improvement |
| `bug` | Bug fix |
| `content` | Content addition or update |
| `chore` | Tooling or config change |
| `breaking` | Breaking change |
| `do not merge` | Needs further work |

### Draft vs Ready

- **Draft PR** — Work in progress, not ready for review. Use when you want early feedback.
- **Ready PR** — All checks pass, body complete, ready for review and merge.

Mark PR as ready: `gh pr ready <number>`

## Release Process

### Versioning

Follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

| Increment | When |
|-----------|------|
| **MAJOR** | Breaking change to site structure, content schema, or deployment |
| **MINOR** | New feature, new article, new page, non-breaking enhancement |
| **PATCH** | Bug fix, content correction, dependency update, performance fix |

Current version: see `package.json` (`"version": "0.1.0"`).

### Step-by-Step Release

1. **Ensure `dev` is stable** — all PRs merged, `pnpm validate` passes on `dev`
2. **Merge `dev` into `main`**
   ```bash
   git checkout main
   git pull origin main
   git merge dev
   ```
3. **Run final validation on `main`**
   ```bash
   pnpm validate
   ```
4. **Update version in `package.json`**
   ```bash
   # Choose one:
   npm version patch   # 0.1.0 → 0.1.1
   npm version minor   # 0.1.0 → 0.2.0
   npm version major   # 0.1.0 → 1.0.0
   ```
5. **Generate changelog** (see format below)
6. **Commit version bump + changelog**
   ```bash
   git add package.json pnpm-lock.yaml CHANGELOG.md
   git commit -m "chore: release vX.Y.Z"
   ```
7. **Tag the release**
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```
8. **Push to `main`**
   ```bash
   git push origin main --follow-tags
   ```
9. **Create GitHub Release**
   ```bash
   gh release create vX.Y.Z \
     --title "vX.Y.Z" \
     --notes-file CHANGELOG.md
   ```
10. **`deploy.yml` triggers automatically** on push to `main`

### Changelog Format

Maintain a `CHANGELOG.md` at the portfolio root. Use this structure:

```markdown
# Changelog

## [vX.Y.Z] - YYYY-MM-DD

### Features

- <description of feature> ([`abc1234`](https://github.com/vshanbha/weshall-portfolio/commit/abc1234))

### Bug Fixes

- <description of fix> ([`def5678`](https://github.com/vshanbha/weshall-portfolio/commit/def5678))

### Content

- <description of content change> ([`ghi9012`](https://github.com/vshanbha/weshall-portfolio/commit/ghi9012))

### Commits

`abc1234` - Commit message
`def5678` - Commit message
`ghi9012` - Commit message
```

Rules:
- Group changes by type: Features, Bug Fixes, Content, Chores/Other
- Each entry links to its commit with a short hash
- The Commits section lists all commits included in the release
- Use markdown formatting throughout
- Date format: `YYYY-MM-DD`

### Generating the Changelog

Collect commits since the last tag:

```bash
# Find last tag
git describe --tags --abbrev=0

# List commits since last tag
git log <last-tag>..HEAD --oneline
```

Use these to populate the changelog sections.

## CI/CD Integration

The `deploy.yml` workflow triggers on push to `main`:

1. Builds the Astro site
2. Deploys to GitHub Pages

This means:
- **PRs to `dev`** — do not trigger deployment
- **Merging `dev` → `main`** — does not trigger deployment (manual release process)
- **Pushing to `main`** (via release) — triggers deployment

E2E tests run locally only (pre-push hook), not in CI.

## Commit Guidelines

- **Atomic commits** — one logical change per commit
- **Descriptive messages** — explain what changed and why
- **Prefix with type** — `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- **No secrets, keys, or credentials** — ever
- **No `pnpm-lock.yaml` changes** unless dependency actually changed

## When to Use This Skill

| Scenario | Action |
|----------|--------|
| Finishing a feature | Create PR following PR workflow |
| Fixing a bug | Create PR with `fix:` prefix |
| Publishing content from factory | Create PR with `content:` prefix |
| Preparing a release | Follow release process |
| Bumping version | Follow semantic versioning |
| Writing changelog | Follow changelog format |
