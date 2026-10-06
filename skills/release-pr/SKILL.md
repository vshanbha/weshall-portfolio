---
name: release-pr
description: Use when creating pull requests, preparing releases, managing version bumps, or generating changelogs for the portfolio project. Covers PR templates, branch naming, pre-merge checklists, semantic versioning, markdown changelogs, git tagging, and GitHub release creation.
---

# Release & PR

## Overview

This skill governs pull request creation and release management for the **portfolio** project (weshall.build). It enforces the branching policy from `docs/AgentWorkflow.md`, ensures pre-merge quality gates are met, and provides a structured release process with markdown changelogs.

## Quick Reference

| Task                  | Command                                            |
| --------------------- | -------------------------------------------------- |
| Create feature branch | `git checkout -b issue-<number>-<description> dev` |
| Run full validation   | `pnpm validate`                                    |
| Run tests             | `pnpm test`                                        |
| Run E2E tests         | `pnpm test:e2e`                                    |
| Create PR             | `gh pr create`                                     |
| List open PRs         | `gh pr list`                                       |
| View PR               | `gh pr view <number>`                              |
| Merge PR              | `gh pr merge <number>`                             |
| Bump version          | `npm version patch --no-git-tag-version`           |
| Create tag            | `git tag -a vX.Y.Z -m "Release vX.Y.Z"`            |
| Push tag only         | `git push origin vX.Y.Z`                           |
| Create GitHub release | `gh release create vX.Y.Z`                         |

## Branch Naming

All work must follow the branching policy from `docs/AgentWorkflow.md`:

| Branch Type | Convention                     | Example                             |
| ----------- | ------------------------------ | ----------------------------------- |
| Feature     | `issue-<number>-<description>` | `issue-42-add-dark-mode`            |
| Hotfix      | `hotfix-<description>`         | `hotfix-fix-nav-overlay`            |
| Content     | `content-<description>`        | `content-add-observability-article` |

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

| Type       | When to Use                                 |
| ---------- | ------------------------------------------- |
| `feat`     | New feature or component                    |
| `fix`      | Bug fix                                     |
| `content`  | New or updated article/content              |
| `refactor` | Code restructuring without behaviour change |
| `chore`    | Tooling, config, dependencies               |
| `docs`     | Documentation only                          |
| `test`     | Adding or updating tests                    |
| `perf`     | Performance improvement                     |
| `style`    | Formatting, no logic change                 |

Examples:

- `feat: add dark mode toggle to header`
- `fix: resolve mobile nav overlay z-index`
- `content: add observability deep-dive article`

### PR Body Template

The repository ships this template as `.github/PULL_REQUEST_TEMPLATE.md`, which
GitHub pre-fills for every new PR — keep the two in sync. It adds a **Review
(Gate B)** section so the human review has a recorded artifact.

```markdown
## Summary

<1-2 sentence description of what this PR does and why>

## Changes

- <change 1>
- <change 2>

## Related Issues

Closes #<number>

## Validation

- [ ] `pnpm validate` passes (lint, `astro check`, build + provenance stamping, `tests/build/`)
- [ ] `pnpm test` passes
- [ ] `pnpm test:e2e` passes (local)
- [ ] No secrets, keys or credentials in the diff
- [ ] Visual review completed in the browser
- [ ] Accessibility check (WCAG 2.2 AA)

## Review (Gate B)

- [ ] Acceptance criteria verified one by one against the issue or plan
- [ ] Every hunk read: nothing unrelated, nothing speculative
- [ ] New or changed images carry `imageProvenance` and a visible disclosure _(content PRs)_
- [ ] Published articles record `reviewed: true` / `human_reviewed: true` _(content PRs)_
- [ ] Claims checked against their sources _(content PRs)_
- [ ] New translation strings added to all four locale files, placeholders marked `// TODO: translate` _(i18n changes)_

Reviewed by: <human handle or agent name that performed the review>

## Screenshots

<if applicable, add before/after screenshots>
```

### PR Labels

Apply labels to categorise PRs:

| Label          | Use                        |
| -------------- | -------------------------- |
| `enhancement`  | New feature or improvement |
| `bug`          | Bug fix                    |
| `content`      | Content addition or update |
| `chore`        | Tooling or config change   |
| `breaking`     | Breaking change            |
| `do not merge` | Needs further work         |

### Draft vs Ready

- **Draft PR** — Work in progress, not ready for review. Use when you want early feedback.
- **Ready PR** — All checks pass, body complete, ready for review and merge.

Mark PR as ready: `gh pr ready <number>`

## Release Process

### Versioning

Follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

| Increment | When                                                             |
| --------- | ---------------------------------------------------------------- |
| **MAJOR** | Breaking change to site structure, content schema, or deployment |
| **MINOR** | New feature, new article, new page, non-breaking enhancement     |
| **PATCH** | Bug fix, content correction, dependency update, performance fix  |

Current version: read it from `package.json` — do not hardcode it in this doc.
The version on `dev` may be ahead of `main` between releases, which is expected:
the bump lands on `dev` first and is promoted by the release PR.

### Step-by-Step Release

The version bump and changelog are prepared **on `dev`**, then promoted to
`main` by a release PR. This is deliberate: every step lands as a local commit
on `dev`, so `.githooks/post-commit` fires the Gate B review agent and the
findings are fixed before anything reaches `main`.

1. **Ensure `dev` is stable** — all feature PRs merged, `pnpm validate` passes on `dev`
2. **Write the changelog on `dev`** (see _Generating the Changelog_ below).
   Backfill any tagged releases that have no entry while you are in the file.
   ```bash
   git add CHANGELOG.md
   git commit -m "chore: release vX.Y.Z changelog"
   ```
3. **Bump the version on `dev`**
   ```bash
   # Choose one:
   npm version patch --no-git-tag-version   # 0.3.2 → 0.3.3
   npm version minor --no-git-tag-version   # 0.3.2 → 0.4.0
   npm version major --no-git-tag-version   # 0.3.2 → 1.0.0
   git add package.json
   git commit -m "chore: bump version to X.Y.Z"
   ```
   `--no-git-tag-version` keeps the tag off `dev` — tags belong on `main`.
   The bump commit is inside the range, so it must be in the Commits list.
   Since it does not exist yet at this point, add it with a follow-up docs
   commit after step 3. While the entry is unreleased the range is
   bump-bounded, so that follow-up sits outside it and is not itself listed —
   which is what stops the recursion. Once the release is tagged the range is
   tag-bounded, so anything committed before the tag moves into scope and
   must be listed by a later commit, which itself lands after the tag and is
   therefore outside it.
4. **Push `dev`** — the pre-push hook runs `pnpm test:e2e` first
   ```bash
   git push origin dev
   ```
5. **Open the release PR `dev` → `main`**
   ```bash
   gh pr create --base main --head dev \
     --title "Release: vX.Y.Z" \
     --body "<what shipped, validation results, Gate B record>"
   ```
6. **Merge the release PR — this deploys.**
   Merging into `main` produces a `push` event on `main`, which runs `ci.yml`
   and then `deploy.yml`. Treat the merge as the production release: confirm the
   branch is green and that Gate B has been signed off _before_ merging.
7. **Tag the release on `main`**
   ```bash
   git checkout main
   git pull origin main
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin vX.Y.Z
   ```
   Push only the tag. `git push origin main --follow-tags` re-pushes `main` and
   can trigger a second deployment for no reason. Note the pre-push hook gates on
   the current _branch_, so with `main` checked out this still runs E2E first —
   that is expected, not a second deploy.
8. **Create the GitHub Release**
   ```bash
   gh release create vX.Y.Z \
     --title "vX.Y.Z" \
     --notes-file CHANGELOG.md
   ```
9. **Verify the deploy** — it fired at step 6, from the merge. Check the
   `Deploy to GitHub Pages` run for that commit rather than waiting for a new
   one. Steps 7 and 8 are metadata only and must not produce a second deploy.

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

### Security

- <description of security change> ([`jkl0123`](https://github.com/vshanbha/weshall-portfolio/commit/jkl0123))

### Commits

`abc1234` - Commit message
`def5678` - Commit message
`ghi9012` - Commit message
```

Rules:

- Group changes by type: Features, Bug Fixes, Content, Security, Tests, CI/CD, Docs, Chores
- Each entry links to its commit with a short hash
- The Commits section lists every non-merge commit in the release range.
  While the entry is unreleased, the range ends at the version bump commit —
  `git log --no-merges <last-tag>..<bump-commit>` — which stops the check
  from chasing its own tail: each fix commit would otherwise enter the range
  and need listing itself, so the list never closes. **Once the release is
  tagged, the range ends at the tag instead** — `<last-tag>..<tag>`. The tag
  is immutable, so nothing further can be added to it. Commits made between
  the bump and the tag are then in scope and must be listed; bounding at the
  bump at that point would leave them in no release at all, since they are
  excluded from the next release's range too.
- The Commits list runs newest-first, in `git log` order, including release-prep commits
- A commit belongs to exactly one release — check for duplicates and misattribution
- Every listed hash must be inside the range above, so the range and the list terminate together
- Newest version at the top; use the tag date for backfilled entries
- British English; no person or company names beyond what the site already publishes
- Use markdown formatting throughout
- Date format: `YYYY-MM-DD`
- Must pass `pnpm format:check` — run `npx prettier --write CHANGELOG.md` if it warns

### Generating the Changelog

Collect commits since the last tag, up to the version bump commit:

```bash
# Find last tag
git describe --tags --abbrev=0

# List commits in the release range, excluding merge commits.
# END is the bump commit while the entry is unreleased, and the tag
# once the release has been tagged.
git log <last-tag>..<end> --oneline --no-merges
```

Use these to populate the changelog sections. Every commit in the range should
appear in exactly one Commits list — verify rather than assume:

```bash
# Extract the current release's Commits section only. Scoping matters:
# grepping the whole file reports every hash from older releases as
# out-of-range, which drowns the result in false positives.
REL='v0.3.4'          # the section being written, e.g. /^## \[v0.3.4\]/
LAST='v0.3.3'
END='<bump-commit-or-tag>'   # bump while unreleased; the tag once tagged

# Any commit in the range missing from this release's section? Scope the
# grep to the same section as the checks below — grepping the whole file
# gives a false pass when a commit is misfiled under an older release.
for h in $(git log --format='%h' --no-merges $LAST..$END); do
  sed -n "/^## \[$REL\]/,/^## \[/p" CHANGELOG.md | grep -q "\`$h\`" \
    || echo "MISSING: $h"
done

# Any commit listed twice across the file?
grep -oE '^`[0-9a-f]{7,}`' CHANGELOG.md | sort | uniq -d

# Any hash in this release's section that is not in the range?
sed -n "/^## \[$REL\]/,/^## \[/p" CHANGELOG.md \
  | grep -oE '^`[0-9a-f]{7,}`' | tr -d '`' | sort -u > /tmp/listed
git log --format='%h' --no-merges $LAST..$END | sort -u > /tmp/inrange
comm -23 /tmp/listed /tmp/inrange   # any output = a stray hash

# Any hash in the range not listed in this release's section?
comm -13 /tmp/listed /tmp/inrange   # any output = a gap
```

Use `{7,}` rather than `{7}`: `git log --format='%h'` abbreviates
dynamically, so it emits 8+ characters when 7 would be ambiguous. A fixed
`{7}` silently drops those from `/tmp/listed`, producing a phantom gap here
and missing a real duplicate above. The two patterns must stay identical.

Never use `HEAD` for `END`. Chasing `HEAD` makes the check recurse: each fix
commit becomes a new commit in range, so it must be listed too, and the list
can never be closed. Use the bump commit while the entry is still unreleased,
and the tag once the release has been tagged — a tagged range is fixed, so it
terminates without recursion. This distinction matters concretely: bounding a
tagged release at its bump excludes commits made between bump and tag, which
are then also outside the next release's range, leaving them in no release
at all.

Both checks have caught real misattribution, where a commit was filed under the
wrong release or appeared in two Commits lists at once.

**Backfills:** when a tagged release has no changelog entry, use that tag as the
range start rather than the current one. Omit revert pairs and other net-zero
commit sequences, and say so in the backfill commit message.

## CI/CD Integration

The `deploy.yml` workflow runs after the `Validate` workflow (`ci.yml`) has
succeeded for a push to `main`:

1. Builds the Astro site (stamping image provenance)
2. Deploys to GitHub Pages

This means:

- **Every push to `dev` or `main`** — runs the `ci.yml` checks
- **Checks** — live in `ci.yml` only; deployment waits for them to pass
- **PRs to `dev`** — do not trigger deployment
- **PRs to `main`** — do not deploy until merged; the merge is the trigger
- **Merging any PR into `main`** — **does** deploy. `deploy.yml` keys off
  `workflow_run` for `Validate` on `branches: [main]` with
  `github.event.workflow_run.event == 'push'`, and a merge is a push to `main`.
  There is no separate deploy step to remember.
- **Pushing tags** — do not deploy; tag-only pushes do not rerun `Validate` for a
  new `main` commit.

E2E tests run locally only (pre-push hook), not in CI.

### Git hooks and the Gate B agent

`.githooks/` is active via `git config core.hooksPath .githooks`:

| Hook          | Fires on               | Runs                    |
| ------------- | ---------------------- | ----------------------- |
| `pre-commit`  | commit to `dev`/`main` | `pnpm validate`         |
| `post-commit` | commit to `dev`/`main` | the Gate B review agent |
| `pre-push`    | push to `dev`/`main`   | `pnpm test:e2e`         |

Review runs on **local commits only**. A GitHub merge fast-forwarded by
`git pull` creates no local commit, so PRs merged on GitHub are not reviewed
automatically — start the agent yourself with `./scripts/review-agent` if you
want the pass. Its findings are worth acting on: it has caught commit
misattribution and scope errors in release prep that the automated checks miss.

`npm test:e2e` must run with `ASTRO_PREVIEW_BACKGROUND=1` set on the Playwright
`webServer` command. Astro 7.2+ backgrounds `astro preview` when it detects an
agentic environment, so the foreground process exits and Playwright fails with
`Process from config.webServer exited early`. Without this the pre-push hook
cannot pass.

## Commit Guidelines

- **Atomic commits** — one logical change per commit
- **Descriptive messages** — explain what changed and why
- **Prefix with type** — `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- **No secrets, keys, or credentials** — ever
- **No `pnpm-lock.yaml` changes** unless dependency actually changed

## When to Use This Skill

| Scenario                        | Action                           |
| ------------------------------- | -------------------------------- |
| Finishing a feature             | Create PR following PR workflow  |
| Fixing a bug                    | Create PR with `fix:` prefix     |
| Publishing content from factory | Create PR with `content:` prefix |
| Preparing a release             | Follow release process           |
| Bumping version                 | Follow semantic versioning       |
| Writing changelog               | Follow changelog format          |
