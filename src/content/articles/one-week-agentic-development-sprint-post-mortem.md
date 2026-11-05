---
title: 'One Week Agentic Development Sprint: Post Mortem'
description: "A senior AI-engineering screen test: build an end-to-end product slice in seven days. The engineering impressed; the intelligence wasn't validated. Ten rules for the next one, ordered by when they bite."
publishedAt: 2026-11-05
author: Vishal Shanbhag
tags: [AI, agentic-ai, llm, software-engineering, sprint, retrospective, evals, testing, process]
draft: false
featured: false
locale: en
reviewed: true
ai_assisted: true
human_reviewed: true
---

# One Week Agentic Development Sprint: Post Mortem

Recently, I had an interesting task with a client. The ask: to build an end-to-end product component in seven days, and a key part of the product was to use modern AI (LLM) agentic systems both for development and for production.

What I shipped: a working system with caveats, honest documentation, and a passed demo. Verdict from the client: the engineering impressed; the intelligence inside the system needs more work and didn't pass the bar.

They were right. These days, all of us software developers feel a bit like superheroes. I know many people liken AI to Jarvis from Iron Man (including me) from the Marvel series. But sometimes, when the development sprint pressure is high, we might do stuff like "The Incredible Hulk" when we really need to spend time thinking like Bruce Banner.

In short, it felt like I had "smashed" the project out of the park. With the AI superpowers, we can do a lot, and we, the software engineers, like to build quickly. But the pre-superpowers Bruce Banner version of us did get something right in knowing the nuance that our AI-enabled Hulk version can sometimes miss.

So I sat down and tried to identify some rules I'd carry into the next AI Engineering project.
The rules are ordered by when they bite:

## Framing - Day 1

1. **Find out the Why, Who, and What, then the How:** These days, clients are also using AI to write their specifications. As with everything AI, we can sometimes get drowned in a wall of text. Somewhere within that is a tacit point about quality checks.
   The day one conversation should be all about the Why (why the product exists), Who (who is the targeted audience), and What (what problem are we solving for the audience). There are a few more "what" questions.
   1. What needs to be measured?
   2. What do acceptable and rejected outputs look like?
   3. What solutions have been attempted already, and why didn't they work?

   The answers will help reverse-engineer the tacit criteria. These criteria may be explicitly mentioned or may not even be present in the brief. Either way, the old me wouldn't be rushing to Smash because experiments take a lot of time and effort. I think even if the development cycles are faster, these questions deserve their due time before trying to build anything. If one has not done that, one is only getting set up for a failure. A fast failure, which is better than a long-drawn failure, but it is a failure nevertheless.

2. **Book the domain expert on day one, or it never happens:** The Hulk version of me wanted to smash (i.e., build first). I looked at the brief and started structuring the solution but missed asking the right questions of the domain expert who could have unblocked some of those challenges and criteria early on. In my case, I had seen the important bit in the brief, but I left the question to "Somewhere later this week".

   By later in the week, I was drowning in the output of the AI, and by the time I realised that I missed asking these critical questions, I was already deep into the weekend trying to sort out everything that the AI got wrong, leaving no time for the conversation with the expert.

3. **Write the eval before the model:** Many of us have used Test-Driven Development or certainly heard of it. The same applies to AI engineering projects.
   Day-one question: _how will I know this is right?_ Whatever can't be unit-tested is the thing that needs to be evaluated, so it needs an acceptance test you design yourself.

4. **Remove Ambiguity**: Concrete tasks always crowd out fuzzy ones. The AI is great at scheduling concrete tasks, building tests, running iterative improvement loops, and taking shortcuts at solving the fuzzy, ambiguous tasks. It will even give you an impression that it has solved those. Reality is, again, we need to be the Bruce Banner version solving the hard questions on paper before we let the Hulk version smash (I mean build).

## Mid-delivery Measurements and Validation

5. **No Test Data without Right or Wrong labels** - I let the AI create synthetic test data. That was great. However, a side effect of not doing the day one tasks properly is that the AI didn't bother with labelling the test data files with metadata that could be used to judge the quality of the output. The synthetic data didn't have any labelling called "Expected output". The other way I would put it in layperson terms is Garbage In - Garbage Out.

6. **Two minds are better than one** - Where the work has inherent fuzziness to be judged by an AI model, it is really hard to say which one is good. When the volume of data is small, it may be feasible to have a human in the loop make judgements on the output. If the pipeline was prepared using synthetic, labelled data, then we might even get the judgements right most of the time. But how do we know it is actually right most of the time, and what about the confidence levels? There are concepts of adversarial reviews that we as software engineers use all the time to check AI-generated code by another AI model. A similar concept can be used to deal with the fuzziness as well. A high agreement rate is usually a good sign. Either both models are doing really well, or both are really bad. If the test data and evals were built properly, we expect more of the former by the time we get here.

7. **In God we trust. Everyone else should show measurements** - AI is quick to say something is done and dusted. However, we truly know when we can reasonably measure something and that the measurement has some level of determinism. All other "done and dusted" could well be very confidently stated hallucinations.

## Last Day - Delivery with Caveats

8. **Done is better than perfect**: With AI, we have the ability to run fast iterations involving the full cycle from requirements review all the way to deployment within a day. Often, the test and review cycles can offer some issues that feel like they should be fixed right away. It is great to ship code with 100% test coverage and no open review findings. However, when the deadlines are hard, it might be better to ship with known caveats.

9. **Run a Retrospective and Document the Gaps:** One of the great things about the Agile way of doing things is that it inherently acknowledges and allows for the possibility that the speed of development comes at a price. Sometimes, the deadline will be over, and the deliverable may still be left with a few gaps. That still applies; we just need the AI in the room as well when doing this part.

10. **Let Banner present the demo:** The Hulk ships the build; the Banner part is the walkthrough: the criteria you set, the measurements you took, the gaps you would close next. The AI-assisted engineering is going to create a sea of documentation. The AI will even produce a script. However, all of that is overwhelming for human minds. The Banner in us needs to distil the most important bits and present a story that is simple, to the point, and gives the client the important (perhaps tacit) questions that matter.

## Final Word

So what did the week actually teach me? Don't "Smash" just because you now have the power of The Hulk. Every day, our job as Software Engineers is about being Banner and operating The Hulk with precision. It's a bit like asking the Hulk to do a surgical change instead of smash.

---

_If any of this is familiar — the sprint that shipped and the intelligence that didn't — [let's talk](https://weshall.build/en/contact)._
