# Git Hooks

Local hooks in `.githooks/` enforce quality gates at commit time. Both gates
fire only on `dev` and `main` — feature branches commit freely.

## Active Hooks

| Hook          | Branch        | What it does                                                                                                                                                                                                                                                                                                   |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit`  | `dev`, `main` | Runs `pnpm validate` (format, lint, typecheck, build, full `vitest` suite). Blocks commit on failure.                                                                                                                                                                                                          |
| `post-commit` | `dev`, `main` | Fires an agentic code review via `scripts/review-agent`. Prints feedback to terminal.                                                                                                                                                                                                                          |
| `pre-push`    | `dev`, `main` | Runs `pnpm test:e2e`. Blocks push on failure.                                                                                                                                                                                                                                                                  |
| `post-merge`  | `dev`, `main` | Gate B agent review of `ORIG_HEAD..HEAD` when a merge creates a merge commit (detected via `MERGE_HEAD`; `--no-ff` is the convention). Advisory, after the fact. post-merge also runs after fast-forward (`git pull`) and squash results — the `MERGE_HEAD` guard exits those immediately, so they stay quiet. |

## Workflow

```
feature/* → commit (no gates) → merge locally to dev (post-merge review) → push (E2E + CI)
dev       → commit (validate gate + agent review) → push (E2E tests) → release PR to main
main      → commit (validate gate + agent review) → push (E2E tests) → deploy
```

Feature work has no PR (see [`AgentWorkflow.md`](AgentWorkflow.md) → _Branching
Policy_), so merge it with `git merge --no-ff`: git does **not** run
`pre-commit`/`post-commit` for merge commits — `.githooks/post-merge` covers
those instead, reviewing `ORIG_HEAD..HEAD` (advisory, after the fact).
`post-merge` itself fires after every successful merge, including fast-forward
`git pull` and squash results; the `MERGE_HEAD` guard makes those exits
immediately, so they stay quiet. The blocking gates stay on push: `pre-push`
(E2E) and GitHub CI.

## Escape Hatch

`git commit --no-verify` or `git push --no-verify` bypasses the gate. Use only
when there is a genuine reason — document it. `--no-verify` suppresses only the
**pre**-hooks (`pre-commit`, `pre-push`): the `post-commit` and `post-merge`
reviews still run, so do not expect silence from them.

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

The hook's built-in prompt pastes the diff inline (12 000-byte cap) and does
not ask for a `VERDICT:` line, so an automatic run cannot be checked the way a
manual one can. For a review that gates a merge, build the prompt per the rules
in [`AGENTS.md`](../AGENTS.md) → _Code Review (Gate B)_.
