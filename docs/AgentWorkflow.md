# Agent Workflow: Portfolio Project

This document defines the persistent operating model for the **Portfolio** project, using Agentic Extreme Programming (AXP) principles to guide human-agent collaboration.

## 1. Core XP Practices Applied

| XP Practice                | Human-Agent Collaborative Implementation                                        |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Pair Programming**       | Human (Architect) and Agent (Navigator) collaborate in structured Gate reviews. |
| **Test-First (TDD)**       | Phase II (Design) mandates a test strategy before any feature logic is written. |
| **Collective Ownership**   | Shared `AGENTS.md` and skills act as the common knowledge base.                 |
| **Continuous Integration** | Mandatory `pnpm validate` before final validation.                              |
| **Small Releases**         | Feature-branch isolation for atomic, verified deliverables.                     |

## 2. The Collaborative Lifecycle

| Phase                | Description                                             | Participant | XP Practice           | Applicable Rules                                |
| -------------------- | ------------------------------------------------------- | ----------- | --------------------- | ----------------------------------------------- |
| **I. Scoping**       | Define goal/requirement.                                | Human       | —                     | —                                               |
| **II. Design**       | Map architecture, propose tasks/skills & Test Strategy. | Agent       | Test-First            | Architecture Rules, Velocity Patterns           |
| **III. Review**      | Gate A: Pair Review Session.                            | Human       | Pair Programming      | —                                               |
| **IV. Build**        | Implementation using specialised skills.                | Agent       | —                     | Astro Technical Standards, Velocity Conventions |
| **V. Validation**    | Run automated tests + integration checks + SEO audit.   | Agent       | TDD                   | Quality Bar / Test Matrix, SEO Audit (§3)       |
| **VI. Final Review** | Gate B: Pair Review + CI/CD Gate.                       | Human       | CI / Pair Programming | Commit Guidelines                               |

## 3. Operational Protocols

### Branching Policy

- **Dev branch:** `dev` is the integration branch for all features. All work merges to `dev` first.
- **Pull requests are required only for `dev` → `main` releases.** Feature branches merge into `dev` locally after Gate B passes — no pull request (owner decision, November 2026). Merge with `git merge --no-ff`: `.githooks/post-merge` then runs the Gate B agent review over `ORIG_HEAD..HEAD` — it reviews only when the merge creates a merge commit (detected via `MERGE_HEAD`; git never runs `pre-commit`/`post-commit` for merges). The hook itself fires after fast-forward `git pull` and squash merges too, but the guard exits those immediately. The review is advisory; the blocking gates remain the `pre-push` E2E hook and GitHub CI on the push to `dev`.
- **Main branch protection:** `main` is production-ready only. `dev` → `main` via PR only — never push or merge directly. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for deployment details.
- **Feature branches:** All work for a specific issue must be isolated to a dedicated feature branch: `issue-<number>-<description>` or `feature/<description>`.
- **Workflow:**
  1. Create feature branch from `dev`
  2. Implement and test locally
  3. Run `pnpm validate` + `pnpm test:e2e`
  4. Manual verification in browser (Gate B)
  5. Merge to `dev` locally after approval with `git merge --no-ff`
     (no PR — see Branching Policy); the post-merge hook reviews the payload.
     A `VERDICT: REQUEST-CHANGES` from that review must be fixed on `dev`
     (or the merge reverted) **before** the push in step 6
  6. Push `dev` to origin and wait for CI green before closing the issue
     (for feature work, GitHub CI runs on the push — not pre-merge)
  7. `dev` → `main` only after full QA pass
- Agents must commit in atomic, logical chunks to facilitate granular review.

### Git Hooks

See [`GitHooks.md`](GitHooks.md) for the full hook pipeline, activation, and escape hatches.

### Parallel Agent Isolation (Worktree Policy)

When launching multiple agents in parallel, each agent MUST operate in an
isolated `git worktree` to prevent working-directory cross-contamination.

**Setup:**

- Each parallel agent gets a dedicated worktree:
  `portfolio/.worktrees/<issue-branch>/`
- Create via: `git worktree add ../.worktrees/<branch> <branch>`
- The main working tree stays clean; agents never share unstaged/untracked
  state
- Each agent receives its worktree path as its working directory

**Constraints:**

- `node_modules` is shared — serialise `pnpm install` and `pnpm test:e2e`
  across agents via the orchestrator
- Vite's dev server may reject serving font files from the parent tree's
  `node_modules` via symlink. Run `pnpm test:e2e` from the main working tree
  (checking out the branch temporarily) if worktree tests show spurious
  font-related failures.
- Git objects/refs are shared — safe because each agent operates on its own
  branch

**Cleanup:**

- Remove worktree after merge: `git worktree remove .worktrees/<branch>`
- Prune orphans: `git worktree prune`

### E2E Testing Policy

- **Local only (for now):** E2E tests (`pnpm test:e2e`) run locally via a git pre-push hook before any push to `dev` or `main` (feature-branch pushes run no hooks).
- **CI/CD exclusion:** E2E tests are NOT part of the CI/CD pipeline until the site is stable. Only unit tests (`pnpm test`) run in CI.
- **Pre-push hook:** The hook at `.githooks/pre-push` runs `pnpm test:e2e` automatically. Skip with `git push --no-verify` if needed.
  - Hook is version-controlled — update `.githooks/pre-push` to modify behaviour.
  - Enabled via `git config core.hooksPath .githooks` (runs automatically after clone).
- **When to promote to CI:** Once the site has stable pages and content, E2E tests should be added to the GitHub Actions workflow.

### SEO Audit (Pre-Review)

The SEO audit is a **Phase V (Validation) activity that runs BEFORE Gate B** —
never after the Architect's final review. It uses the `seo` skill checklist
against the built output (`dist/`), extended by the locale expectations the
site now carries.

- **Scope (minimum):** `<title>` ≤ 60 chars and unique per page; meta
  description ≤ 160 chars per locale; self-referencing canonical with
  trailing slash; `<html lang>` correct per locale; hreflang pairs (+
  `x-default`) for every page that exists in more than one locale — and
  ONLY for those pages; sitemap covers every locale and contains no redirect
  stubs; robots.txt reachable; every `og:image` referenced in HTML resolves to
  a generated file; `og:locale` matches the locale; JSON-LD is
  locale-correct; internal link integrity (no broken targets).
- **Gate rule:** every finding must be fixed or explicitly waived by the
  Architect before Gate B starts. Record the audit outcome in the merge
  commit message or the linked issue (feature work has no PR); release PRs
  record it in `## Validation`.
- **When to re-run:** after any locale, routing, head-tag, or content-schema
  change — not only when a site is first built.

### Specialised Agent Skills

When executing Phase IV (Build), the Orchestrator delegates tasks to specialised agent skills:

| Domain          | Skill                                          |
| --------------- | ---------------------------------------------- |
| Testing         | `testing` (Vitest + Playwright)                |
| Code Quality    | `code-quality` (ESLint, Prettier, TypeScript)  |
| Performance     | `performance` (Core Web Vitals, images, fonts) |
| Accessibility   | `accessibility` (WCAG 2.2 AA)                  |
| SEO             | `seo` (meta tags, JSON-LD, OG images)          |
| Astro Framework | `astro-specialist` (via factory reference)     |

### Decision Gates

#### Gate A (Pre-Implementation)

Architect reviews the proposed design and the Test-First plan. **No coding begins until this is approved.**

- Review the component/page design
- Confirm tech stack choices (Astro patterns, hydration strategy)
- Approve the test strategy

#### Gate B (Post-Validation)

Architect approves the implementation **before** the merge (step 5); Gate B closes only once CI is green on `dev` after the merge push (step 6). For releases: CI on the `dev` → `main` PR.

- Confirm the pre-Gate-B SEO audit (§3 _SEO Audit (Pre-Review)_) is recorded (merge commit message / issue, or the release PR) with no unfixed findings
- Run `pnpm validate` (format + lint + check + build + tests)
- Review visual output in browser
- Verify tests pass

### Definition of Done

Before suggesting a task is complete, the agent MUST explicitly review and verify every Acceptance Criteria (AC) item.

**Web tasks:**

- [ ] `pnpm validate` passes (format + lint + check + build + tests)
- [ ] No TypeScript errors
- [ ] Components follow Velocity patterns
- [ ] Astro Technical Standards (Iron Laws) respected
- [ ] Accessibility requirements met (WCAG 2.2 AA)
- [ ] SEO audit passed (§3 _SEO Audit (Pre-Review)_) — findings fixed or waived before Gate B
- [ ] Every issue uncovered during the task has a guard at the cheapest automatic layer (see _Regression Guard Rule_ below)

### Regression Guard Rule

**Every issue uncovered during work must leave behind a guard at the cheapest
layer that runs automatically.** Ask "what will stop this recurring?" — if the
answer is _human memory_, the issue is not fixed.

| Layer           | Use for                                                                                                     | Runs in                    |
| --------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------- |
| **Type system** | Structural/data invariants — preferred: free, compile-time, catches the problem before runtime              | `pnpm validate` / CI       |
| **Unit test**   | Runtime invariants, or backstops for type guards that can themselves be deleted (e.g. a `satisfies` clause) | `pnpm test` / CI           |
| **E2E test**    | User-visible behaviour only                                                                                 | pre-push hook (local only) |

- **Reference the issue** in the test name, assertion message, or `// TODO`
  comment so the provenance stays traceable.
- **Verify the guard fails against the pre-fix code** before trusting it:
  reproduce the failure with the fix stashed, then restore.
- Not every issue needs a test — a typo or content fix needs none — but the
  answer to "what prevents recurrence?" must live somewhere that runs without
  human discipline.

### Layout Protection Rule

**Do not modify existing layout files (`BaseLayout.astro`, `PageLayout.astro`, etc.) unless absolutely necessary.**

- Layouts define the structural HTML contract for all pages.
- Changes to layouts can have cascading effects across the entire site.
- If a layout appears to have a bug, verify against the [Velocity demo](https://demo.deployvelocity.com) before modifying.
- If modification is required, document the exact reasoning and get explicit approval.
- New page-specific styling should be done in the page or component, not the layout.

### Git Push Rules

**`--no-verify` is unacceptable unless there is a genuine issue with E2E tests that should be ignored.**

- Never skip pre-push hooks without explicit justification.
- If E2E tests fail, investigate the root cause before deciding to skip.
- Document the reason if `--no-verify` is used.

### Process Management Rules

**Do not use `pkill` by default. First check if the process is actually running.**

- Check with `lsof` or `ps` before attempting to kill processes.
- `pkill` wastes time when the process is not running and can timeout.
- Only use `pkill` after confirming the process exists.

## 4. Onboarding New Sessions

1. **Confirm the active feature branch:** `issue-<number>-<description>`.
   **For parallel multi-agent sessions:** each agent works from a dedicated
   `git worktree` — see §3 Parallel Agent Isolation.
2. **Read `AGENTS.md`** for applicable standards and quality gates.
3. **Consult Velocity docs** at [docs.deployvelocity.com](https://docs.deployvelocity.com/) for component and pattern guidance.
4. **Load the relevant skills** for the task at hand.
5. **Follow the phases** defined in this document.
6. **Treat every interaction as a Pair Programming session:** Architect (Human) directs, Navigator (Agent) executes.

## 5. Content Receipt (From Factory)

Content arrives from `factory/` via the **Manual Export Gate**. When content lands in `src/content/articles/`:

- Treat it as **published source material** — canonical and trusted.
- Do not modify without going through the factory review process first.
- Focus on presentation, not content editing.

## 6. Quality Matrix

| Work Type           | Validation Command                 | Gate | CI/CD                         |
| ------------------- | ---------------------------------- | ---- | ----------------------------- |
| Component/page code | `pnpm validate`                    | B    | Yes                           |
| Unit tests          | `pnpm test`                        | B    | Yes                           |
| E2E tests           | `pnpm test:e2e`                    | B    | No (local pre-push hook only) |
| SEO / i18n / head   | `seo` skill audit (§3, pre-Gate-B) | B    | —                             |
| Content receipt     | Verify frontmatter + visual check  | B    | —                             |
