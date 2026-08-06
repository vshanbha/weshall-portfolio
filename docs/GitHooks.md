# Git Hooks

Local hooks in `.githooks/` enforce quality gates at commit time. Both gates
fire only on `dev` and `main` — feature branches commit freely.

## Active Hooks

| Hook | Branch | What it does |
|------|--------|-------------|
| `pre-commit` | `dev`, `main` | Runs `pnpm validate` (lint + typecheck + build). Blocks commit on failure. |
| `post-commit` | `dev`, `main` | Fires an agentic code review via `scripts/review-agent`. Prints feedback to terminal. |
| `pre-push` | `dev`, `main` | Runs `pnpm test:e2e`. Blocks push on failure. |

## Workflow

```
feature/* → commit (no gates) → push (E2E tests) → PR to dev
dev       → commit (validate gate + agent review) → merge to main
main      → commit (validate gate + agent review) → deploy
```

## Escape Hatch

`git commit --no-verify` or `git push --no-verify` bypasses the gate. Use only
when there is a genuine reason — document it.

## Activation

Hooks are enabled via `git config core.hooksPath .githooks` (runs automatically
after clone). If hooks aren't firing, run this command once.

## Review Agent Tool

The post-commit hook dispatches to a review agent via `scripts/review-agent`.
Default is `opencode`. To use a different tool, set `REVIEW_AGENT_TOOL` in
your `.env` file (see `.env.example`):

```sh
REVIEW_AGENT_TOOL=claude    # or opencode, codex
```

Environment variables take precedence over `.env`. The hook itself never changes
regardless of which tool is configured.
