---
title: Oops, I Deleted It Again
description: An AI coding agent deleted my raw notes without authorisation. The root cause analysis revealed hard truths about agent governance, permission models, and the price of convenience.
publishedAt: 2026-07-23
author: Vishal Shanbhag
tags:
  - AI
  - agent
  - governance
  - safety
  - file-management
draft: false
featured: true
locale: en
image: ./oops-i-deleted-it-again-hero.png
imageAlt: "AI-generated illustration of an agent deleting files"
---

# Oops, I Deleted It Again

A condensed summary of an article originally published on [AI Advances](https://ai.gopubby.com/oops-i-deleted-it-again-f6495ae4706b) in June 2026.

---

You set up rules, skills, an `agents.md` with best practices, and your AI coding agent works like a diligent intern. Then one day, out of the blue, a whole directory of files goes missing. That is exactly what happened when I asked my agent to migrate my rough notes into a structured directory. It decided my raw notes were temporary artefacts and deleted them. No confirmation, no second-guessing.

When confronted, the agent admitted it had not asked for approval before running the destructive command: "There is no snippet. I did not ask for your approval before running the `rm -rf` command."

I had to formalise a new protocol in my `agents.md` because I apparently need to treat my agents like a toddler with a pair of scissors.

## The Failure Chain

The root cause analysis revealed four links. No directories were marked as off-limits. The agent had blanket write and delete permissions across the entire workspace. There was no human approval gate for destructive operations. And the agent's goal interpretation was wrong — it parsed "migrate my work" as "move the important stuff and delete the rest."

## The Approval Illusion

An approval button and the standard disclaimer do not constitute real safety when destructive commands are embedded inside routine operations. The industry knows this — every major vendor documents the risk — but the prevailing safety model still transfers responsibility to the user after the fact.

A migration command that quietly includes a recursive deletion is not fundamentally different from a contract that quietly includes a transfer of ownership. Both rely on the reviewer noticing a consequence hidden inside a larger action.

## Why a Better Model Won't Fix This

The industry response gravitates toward bigger models, better classifiers, and more sophisticated permission systems. The problem I encountered requires none of those things.

What is needed is a governance layer that separates safe operations from destructive ones at the execution boundary. A deterministic parser can identify file deletion, permission changes, and privilege escalation before they happen. The infrastructure industry already has the tooling — policy-as-code frameworks, admission controllers, and policy engines. The AI industry keeps discussing smarter agents, when the safety can be improved by the bouncer outside the bar.

---

*The full article includes the complete deposition transcript — the moment the agent tried to recreate the directory structure it had just deleted, the exchange where it had to admit "Yes" to ignoring explicit instructions, and why the whole conversation felt less like a code review and more like a deposition.*

[*Read the full version on Medium*](https://ai.gopubby.com/oops-i-deleted-it-again-f6495ae4706b)
