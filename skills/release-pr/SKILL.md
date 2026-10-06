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
   commit after step 3. That follow-up touches only `CHANGELOG.md`, so it is
   exempt from the Commits list either way — see the range rule under
   _Changelog Format_.
4. **Push `dev`** — the pre-push hook runs `pnpm test:e2e` first
   ```bash
   git push origin dev
   ```
5. **Validate the range on `dev` before opening the PR.** Run the preamble
   under _Generating the Changelog_ with `END` snapshotted to the current
   `dev` HEAD, set `REL='vX.Y.Z'` in the check block, then run all four
   checks.

   ```bash
   # Precondition: dev must contain main, so dev-HEAD-bounded == tag-bounded
   git merge-base --is-ancestor origin/main HEAD \
     || { echo "main has commits dev lacks — the two ranges diverge"; exit 1; }
   END=$(git rev-parse --short HEAD)
   ```

   This is the set the tag will cover, because the tag lands on the merge
   commit whose second parent is this `dev` tip. A gap found here is fixed on
   `dev`, where pushing is allowed — so no commit to `main` is ever needed
   after the release has been tagged. Do it **before** step 6: `gh release
create` takes `CHANGELOG.md` as its notes, so a gap ships in the release.

6. **Open the release PR `dev` → `main`**
   ```bash
   gh pr create --base main --head dev \
     --title "Release: vX.Y.Z" \
     --body "<what shipped, validation results, Gate B record>"
   ```
7. **Merge the release PR — this deploys.**
   Merge with a **merge commit**, not squash or rebase. Step 5's range
   equivalence depends on it: the tag must land on a merge whose second parent
   is the `dev` tip that was validated. A squash commit collapses the branch
   into one commit, so the tag-bounded set would be a single hash while the
   validated set holds every individual commit — and step 5 cannot catch this,
   because it runs before the merge choice is made.
   Merging into `main` produces a `push` event on `main`, which runs `ci.yml`
   and then `deploy.yml`. Treat the merge as the production release: confirm the
   branch is green and that Gate B has been signed off _before_ merging.
8. **Tag the release on `main`**
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
9. **Create the GitHub Release**
   ```bash
   gh release create vX.Y.Z \
     --title "vX.Y.Z" \
     --notes-file CHANGELOG.md
   ```
10. **Verify the deploy** — it fired at step 7, from the merge. Check the
    `Deploy to GitHub Pages` run for that commit rather than waiting for a new
    one. Steps 8 and 9 are metadata only and must not produce a second deploy.

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
- **Range rule:** the Commits section lists every non-merge commit in the
  release range.
  The check runs on `dev` **before the release PR is opened**, with `END` set
  to a snapshot of `dev` HEAD. This is the same set the tag will cover: the tag
  lands on the merge commit, whose second parent is that `dev` tip, and
  `--no-merges` excludes the merge itself. Verify the precondition with
  `git merge-base --is-ancestor origin/main HEAD` — if `main` has commits `dev`
  lacks, the two sets diverge and this shortcut is invalid.

  **Commits that touch `CHANGELOG.md` are exempt from the Commits list.** A
  commit cannot contain its own hash, so listing record-maintaining commits is
  self-referential and unbounded. Exempting on _any_ contact with the file — not
  only commits touching nothing else — is what makes this hold: a gap fix
  necessarily edits `CHANGELOG.md`, so it is always exempt and one round closes
  the loop. Restricting it to single-file commits breaks immediately, because a
  fix that also corrects the skill or the rules is in scope and unlisted,
  leaving a permanent gap. A commit that touches no part of `CHANGELOG.md` is
  release content and must be listed.

- The Commits list runs newest-first, in `git log` order, including release-prep commits
- A commit belongs to exactly one release — check for duplicates and misattribution
- Every listed hash must be inside the range above, so the range and the list terminate together
- Newest version at the top; use the tag date for backfilled entries
- British English; no person or company names beyond what the site already publishes
- Use markdown formatting throughout
- Date format: `YYYY-MM-DD`
- Must pass `pnpm format:check` — run `npx prettier --write CHANGELOG.md` if it warns

### Generating the Changelog

Collect commits since the previous release, up to the range end:

```bash
END='<dev-head-snapshot-or-tag>'
LAST=$(git describe --tags --abbrev=0 "$END"^)

# Guard LAST itself, not just the range. An empty LAST degrades $LAST..$END to
# ..$END, which Git reads as HEAD..$END without erroring. Without this direct
# check, the range guard below would see that: at step 5 END is a snapshot of
# dev HEAD, so HEAD contains END and the range is empty — the guard fires with
# the misleading "wrong LAST" message. Re-run later from another branch, where
# HEAD does not contain END, and the range is non-empty so it passes while LAST
# is still broken. Checking LAST directly names the real cause either way.
test -n "$LAST" || { echo "cannot derive LAST from END=$END"; exit 1; }
test -n "$(git log $LAST..$END)" || { echo "empty range — wrong LAST"; exit 1; }

# List commits in the release range, excluding merge commits.
git log $LAST..$END --oneline --no-merges
```

Plain `git describe --tags --abbrev=0` without the `^` returns the newest tag,
which is `END` itself whenever `END` _is_ a tag — a backfill or a post-release
verification. Then `LAST==END`, the range is empty, and every check passes
without testing anything. The `^` is required in that case and harmless when
`END` is a commit snapshot, so it is unconditional.

This preamble is the single source for `LAST` and `END`. The check block below
and step 5 both consume it; neither restates it.

Use these to populate the changelog sections. Every commit in the range should
appear in exactly one Commits list — verify rather than assume:

```bash
# Fails loudly if the preamble has not run. Without these guards, a block
# pasted on its own would find LAST and END unset, git log .. would fail with
# its exit status swallowed by the substitution, and the MISSING check's for
# loop would iterate zero times — so it would pass vacuously while the
# stray-hash check would report a false failure.
# Section being written. Set it explicitly — a hardcoded example would
# silently check the wrong section for every other release.
: "${LAST:?run the preamble under _Generating the Changelog_ first}"
: "${END:?run the preamble under _Generating the Changelog_ first}"
: "${REL:?set REL to the section header, e.g. REL='v0.3.4'}"
# REL differs from END only while END is a dev-HEAD snapshot rather than the tag.

# Extract the current release's Commits section only. Scoping matters:
# grepping the whole file reports every hash from older releases as
# out-of-range, which drowns the result in false positives.
sed -n "/^## \[$REL\]/,/^## \[/p" CHANGELOG.md \
  | grep -oE '^`[0-9a-f]{7,}`' | tr -d '`' | sort -u > /tmp/listed

# The range, and the in-scope subset. Any commit touching CHANGELOG.md is
# exempt: it maintains the record, and a gap fix always does too, so the
# exemption is what stops the loop recursing.
git log --format='%h' --no-merges $LAST..$END | sort -u > /tmp/inrange
> /tmp/inscope
for h in $(cat /tmp/inrange); do
  git show --name-only --format='' "$h" | grep -q 'CHANGELOG.md' \
    || echo "$h" >> /tmp/inscope
done

# 1. Any in-scope commit missing from this release's section? Scope the grep
# to the section — grepping the whole file gives a false pass when a commit
# is misfiled under an older release.
for h in $(cat /tmp/inscope); do
  sed -n "/^## \[$REL\]/,/^## \[/p" CHANGELOG.md | grep -q "\`$h\`" \
    || echo "MISSING: $h"
done

# 2. Any commit listed twice across the file?
grep -oE '^`[0-9a-f]{7,}`' CHANGELOG.md | sort | uniq -d

# 3. Any listed hash that is not in the range at all? Tested against the full
# range, not in-scope: an exempt commit may still be listed legitimately.
comm -23 /tmp/listed /tmp/inrange   # any output = a stray hash

# 4. Any in-scope hash not listed in this release's section?
comm -13 /tmp/listed /tmp/inscope   # any output = a gap
```

Use `{7,}` rather than `{7}`: `git log --format='%h'` abbreviates
dynamically, so it emits 8+ characters when 7 would be ambiguous. A fixed
`{7}` silently drops those from `/tmp/listed`, producing a phantom gap here
and missing a real duplicate above. The two patterns must stay identical.

Step 5 snapshots `dev` HEAD into `END`; that is safe because the value is
copied once, not re-read. The old warning against `HEAD` was about _chasing_ it
— re-reading HEAD after each fix puts the fix back in range, so the list never
closes. The `CHANGELOG`-touching exemption now terminates that loop regardless,
but snapshotting still avoids a needless second round. See the range rule under
_Changelog Format_ for the rationale; it lives there alone so it cannot go
stale in a second copy.

The gap and stray-hash checks have caught real misattribution, where a commit
was filed under the wrong release or appeared in two Commits lists at once.

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
