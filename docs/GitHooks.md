# Git Hooks

Local hooks in `.githooks/` enforce quality gates at commit time. Both gates
fire only on `dev` and `main` — feature branches commit freely.

## Active Hooks

| Hook | Branch | What it does |
|------|--------|-------------|
| `pre-commit` | `dev`, `main` | Runs `pnpm validate` (lint + typecheck + build). Blocks commit on failure. |
| `post-commit` | `dev`, `main` | Fires an agentic code review via `opencode run`. Prints feedback to terminal. |
| `pre-push` | all | Runs `pnpm test:e2e`. Blocks push on failure. |

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
