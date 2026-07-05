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

- All work for a specific issue must be isolated to a dedicated feature branch: `issue-<number>-<description>`.
- Agents must commit in atomic, logical chunks to facilitate granular review.

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

## 4. Onboarding New Sessions

1. **Confirm the active feature branch:** `issue-<number>-<description>`.
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

| Work Type | Validation Command | Gate |
|-----------|-------------------|------|
| Component/page code | `pnpm validate` | B |
| Unit tests | `pnpm test` | B |
| E2E tests | `pnpm test:e2e` | B |
| Content receipt | Verify frontmatter + visual check | B |
