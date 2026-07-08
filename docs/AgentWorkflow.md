# Agent Workflow: Portfolio Project

This document defines the persistent operating model for the **Portfolio** project, using Agentic Extreme Programming (AXP) principles to guide human-agent collaboration.

## 1. Core XP Practices Applied

| XP Practice | Human-Agent Collaborative Implementation |
|-------------|------------------------------------------|
| **Pair Programming** | Human (Architect) and Agent (Navigator) collaborate in structured Gate reviews. |
| **Test-First (TDD)** | Phase II (Design) mandates a test strategy before any feature logic is written. |
| **Collective Ownership** | Shared `agents.md` and skills act as the common knowledge base. |
| **Continuous Integration** | Mandatory `pnpm validate` before final validation. |
| **Small Releases** | Feature-branch isolation for atomic, verified deliverables. |

## 2. The Collaborative Lifecycle

| Phase | Description | Participant | XP Practice | Applicable Rules |
|-------|-------------|-------------|-------------|------------------|
| **I. Scoping** | Define goal/requirement. | Human | — | — |
| **II. Design** | Map architecture, propose tasks/skills & Test Strategy. | Agent | Test-First | Architecture Rules, Velocity Patterns |
| **III. Review** | Gate A: Pair Review Session. | Human | Pair Programming | — |
| **IV. Build** | Implementation using specialised skills. | Agent | — | Astro Technical Standards, Velocity Conventions |
| **V. Validation** | Run automated tests + integration checks. | Agent | TDD | Quality Bar / Test Matrix |
| **VI. Final Review** | Gate B: Pair Review + CI/CD Gate. | Human | CI / Pair Programming | Commit Guidelines |

## 3. Operational Protocols

### Branching Policy

- **Main branch protection:** `main` is production-ready only. Never push directly to `main`.
- **Dev branch:** `dev` is the integration branch for all features. All work merges to `dev` first.
- **Feature branches:** All work for a specific issue must be isolated to a dedicated feature branch: `issue-<number>-<description>` or `feature/<description>`.
- **Workflow:**
  1. Create feature branch from `dev`
  2. Implement and test locally
  3. Run `pnpm validate` + `pnpm test:e2e`
  4. Manual verification in browser (Gate B)
  5. Merge to `dev` after approval
  6. `dev` → `main` only after full QA pass
- Agents must commit in atomic, logical chunks to facilitate granular review.

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

- **Local only (for now):** E2E tests (`pnpm test:e2e`) run locally via a git pre-push hook before any push to `dev` or feature branches.
- **CI/CD exclusion:** E2E tests are NOT part of the CI/CD pipeline until the site is stable. Only unit tests (`pnpm test`) run in CI.
- **Pre-push hook:** The hook at `.githooks/pre-push` runs `pnpm test:e2e` automatically. Skip with `git push --no-verify` if needed.
  - Hook is version-controlled — update `.githooks/pre-push` to modify behaviour.
  - Enabled via `git config core.hooksPath .githooks` (runs automatically after clone).
- **When to promote to CI:** Once the site has stable pages and content, E2E tests should be added to the GitHub Actions workflow.

### Specialised Agent Skills

When executing Phase IV (Build), the Orchestrator delegates tasks to specialised agent skills:

| Domain | Skill |
|--------|-------|
| Testing | `testing` (Vitest + Playwright) |
| Code Quality | `code-quality` (ESLint, Prettier, TypeScript) |
| Performance | `performance` (Core Web Vitals, images, fonts) |
| Accessibility | `accessibility` (WCAG 2.2 AA) |
| SEO | `seo` (meta tags, JSON-LD, OG images) |
| Astro Framework | `astro-specialist` (via factory reference) |

### Decision Gates

#### Gate A (Pre-Implementation)

Architect reviews the proposed design and the Test-First plan. **No coding begins until this is approved.**

- Review the component/page design
- Confirm tech stack choices (Astro patterns, hydration strategy)
- Approve the test strategy

#### Gate B (Post-Validation)

Architect reviews the implementation, validates UX, and verifies that CI/CD passed successfully.

- Run `pnpm validate` (lint + check + build)
- Review visual output in browser
- Verify tests pass

### Definition of Done

Before suggesting a task is complete, the agent MUST explicitly review and verify every Acceptance Criteria (AC) item.

**Web tasks:**
- [ ] `pnpm validate` passes (lint + check + build)
- [ ] No TypeScript errors
- [ ] Components follow Velocity patterns
- [ ] Astro Technical Standards (Iron Laws) respected
- [ ] Accessibility requirements met (WCAG 2.2 AA)

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
2. **Read `agents.md`** for applicable standards and quality gates.
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

| Work Type | Validation Command | Gate | CI/CD |
|-----------|-------------------|------|-------|
| Component/page code | `pnpm validate` | B | Yes |
| Unit tests | `pnpm test` | B | Yes |
| E2E tests | `pnpm test:e2e` | B | No (local pre-push hook only) |
| Content receipt | Verify frontmatter + visual check | B | — |
