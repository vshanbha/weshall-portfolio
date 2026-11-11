---
title: 'ChatGPT Recommends Not Buying ChatGPT'
description: 'I asked ChatGPT whether its own paid plans offered better coding value than what I already use. It advised me not to buy on the strength of an unmeasured promise.'
publishedAt: 2026-11-11
author: Vishal Shanbhag
tags: [AI, openai, chatgpt, pricing, developer-tools, opencode, transparency]
draft: false
featured: false
locale: en
image: ./chatgpt-recommends-not-buying-chatgpt-hero.png
imageAlt: 'AI-generated illustration: a robot shop assistant holds up a stop gesture and points at an "Expanded Usage" poster, while a weighing scale tips toward numbered coins over a deflating balloon'
imageProvenance:
  kind: ai-generated
  disclosure: AI-generated illustration created with Microsoft Designer; C2PA content credentials embedded in the original file
  system: Microsoft Designer
  systemVersion: '2.0'
  createdOn: 2026-11-11
  prompt: |
    Flat editorial illustration, wide landscape 16:9, light warm off-white background,
    clean geometric shapes with subtle paper grain, generous negative space.

    Scene: a minimalist shop counter. Behind it, a friendly geometric robot shop
    assistant holds up one hand in a polite "stop" gesture toward a customer, while
    pointing with the other hand at a poster on the wall behind it. The poster reads
    "EXPANDED USAGE" and shows an inflated balloon with no numbers anywhere on it.

    On the counter between them sits an old-fashioned weighing scale. One pan holds
    a small neat stack of coins, each coin marked with a tiny number. The other pan
    holds a small deflating balloon. The scale tips toward the coins.

    Colour: everything in muted warm greys and charcoal, with a single accent of
    international orange (#F94C10) used only for the poster, the coins, and the
    robot's eye. No other colours.

    Mood: wry, calm, consumer-rights editorial. No photorealism, no shading
    gimmicks, no characters or robots resembling any real person, existing mascot,
    or trademarked character. Maximum two words of text in the entire image:
    "EXPANDED USAGE" on the poster. Wide composition with clear empty space along
    the top edge for a headline.
heroCaption: 'AI-generated illustration created with Microsoft Designer; C2PA content credentials embedded in the original file. Coins weigh against a deflating balloon labelled "Expanded Usage".'
reviewed: true
ai_assisted: true
human_reviewed: true
---

# ChatGPT Recommends Not Buying ChatGPT

> Does the ChatGPT Go plan offer more Codex usage than the Free plan? And if I am comparing Go and Plus, how do I measure what I actually get for my money?

I asked ChatGPT a simple question. The eventual answer was completely unexpected.

> "Do not choose ChatGPT Go over OpenCode on the promise of 'more usage', or ChatGPT Plus on the promise of 'expanded usage'."

I am a software professional, and I naturally ask more of my AI than the average ChatGPT user.
I use OpenCode for software development. It gives me access to a variety of models, and under the OpenCode Go plan, roughly $60 worth of usage. More importantly, I can inspect individual API calls, see token usage, and track the corresponding dollar amounts.

I know what I am consuming. I have a reasonable idea of what it costs. I can compare models and decide whether a particular task justifies using an expensive one.

So I asked ChatGPT to help me decide whether its own paid plans offered better value. The conversation took an interesting and surprising turn.

## The problem with "more"

ChatGPT's initial answer was predictable.

> Free offers limited Codex access. Go offers more. Plus offers expanded usage and additional capabilities.

I read that on the website. But I am an engineer, and engineers like to measure things. We like precision. In the AI scheme of things, the numbers I like to hear are things like API calls, tokens, usage cost.

How many tokens can I process? What is the equivalent monetary value of the allowance included in the subscription?
I know that questions like "How many coding tasks can I complete?" or "How much reasoning can I buy?" are not good, because those are not precise questions. But surely how much billable usage I accumulate is a question with a precise number as an answer.

I pressed, putting my own words to it:

> More and Expanded are relative terms, not measurements. OpenCode is transparent. It gives me a number for every API call and shows me clearly how much I have used and ties it to a real number (tokens used, API calls made, etc.). Does ChatGPT do that?

ChatGPT explained that usage depends on the model, context size, reasoning effort, and task complexity. It also pointed out that limits can operate over different time windows.

All reasonable explanations. None answers the purchasing question.

Imagine a mobile operator advertising an "expanded data allowance" without telling you how many gigabytes you receive. When challenged, it explains that consumption depends on the websites you visit, the size of the files you download, and the applications you use.

True. But I still need to know whether I am buying 10 GB or 100 GB.

I am not asking if your GO plan is more "fun" than the Free plan. Fun is not a thing that can be measured precisely, so we qualify it with "more" or "less", and that is fine. But the AI industry has invented Tokenomics. The least I expect is an answer that tells me how many tokens I used.

## The awkward question: Can ChatGPT measure its own usage?

This is where it got awkward.

OpenCode can show me usage information when I work with models from different providers. OpenAI models are among the options. Yet ChatGPT's own subscription interface does not provide an equivalent, comprehensive ledger for my included personal-plan usage.

ChatGPT and Codex expose usage or credit-consumption figures as a percentage. But a percentage is a ratio without a unit. It only makes sense to use it with a measurable quantity. So again, the question is: 90% of what?

The problem is the gap between those measurements and what a customer needs to make an informed purchasing decision.

A remaining allowance is not useful for comparison if the underlying unit and conversion rules are undisclosed. And a dollar-equivalent cost calculated by a third-party tool is not necessarily what the customer is actually paying OpenAI.

If a coding assistant tells me that a task consumed 100,000 input tokens and 10,000 output tokens, I have a starting point for comparing models. If it also tells me the corresponding cost at published model rates, I can estimate the value I am getting.

If the subscription provider instead tells me that I have consumed some unspecified portion of an allowance, I cannot independently perform the same calculation.

The provider may have perfectly good business reasons for operating its subscription that way. But those reasons do not make the missing information any less relevant to the buyer.

## Usage is not the same as value

New metrics keep appearing in the list of things the software world tracks. First, there were story points, ticket counts, code commits, CI/CD runs per week. Now a new vanity metric for apparent activity has shown up: tokens.

In my opinion, though, given the wide variety of tasks that AI can do and the wide variety of models in existence, Token counts do offer at least a common, measurable value for checking usage. So it's a starting point.

A model that uses twice as many tokens but solves a difficult problem correctly might be a better purchase than a cheaper model that repeatedly produces broken code. Raw token counts do not capture correctness, latency, tool usage, retries, or the amount of human intervention required.

The ideal comparison would measure both consumption and outcomes.

For example:

- How many input and output tokens did the task consume?
- What was the equivalent cost at published model rates?
- How many tool calls, retries, and additional model invocations were required?
- Did the task succeed?
- How much subscription allowance did the task consume?

That last question is particularly important for subscription users. A $20 subscription does not necessarily provide $20 worth of API-equivalent consumption. Anecdotally, for power users, the value of a subscription can be several times the actual AI consumption costs.

But without a disclosed consumption metric, the customer cannot even begin to make a reliable comparison.

This is not a hypothetical wish. The numbers are already being computed outside the subscription: open-source tools such as [ccusage](https://github.com/ccusage/ccusage) and [CodeBurn](https://github.com/getagentseal/codeburn) rebuild a local token and cost ledger on a developer's own machine, and tools such as [Ridgeline.cloud](https://ridgeline.cloud) attribute the same consumption to commits and pull requests on the team side.

Disclosure: I know the founders of Ridgeline.cloud. This is not a review or a recommendation of any of them. The point is only that the data exists and can be derived today: if it can be derived, it can be published.

## The irony of asking ChatGPT for purchasing advice

Eventually, ChatGPT's recommendation was more useful than its initial sales pitch.

It advised me:

> "Do not choose ChatGPT Go over OpenCode on the promise of 'more usage', or ChatGPT Plus on the promise of 'expanded usage'."

That is a rather remarkable answer from a product whose own paid plans were under consideration.

I don't think that ChatGPT deliberately talked me out of buying its own subscription. The answer follows logically from the information available: without a sufficiently precise measure of included usage, there is no defensible way to calculate the relative coding capacity per euro.

There are millions of consumers who are buying subscriptions and utilising them without bothering to count anything because using AI is already offering them enough value despite hallucinations and the lack of transparent measurements of usage. I was already there when I started.
But as I moved from casual user to agentic coder, that usage changed, and I consume a lot more tokens than the average casual user. So now, I want to know how much is "more" and "expanded".

## What would a better subscription look like?

Predictable monthly pricing has real advantages. I know because I have been in roles where I have to look at budgets. Predictable pricing requires transparent consumption metrics.

Telco companies offer those metrics down to the last second of every call and the last KB of every data usage. They offer it to all customers regardless of whether the customer pays $10 or tens of thousands in an enterprise plan. Why can't OpenAI offer that? OpenCode already offers that.

The essential requirements are straightforward:

- Define the unit. Tell customers what is being measured.
- Expose consumption. Show how much each task uses, not merely that a limit exists.
- Explain the accounting. Document how models, reasoning effort, context, and background tasks affect the allowance.
- Make plans comparable. Publish enough information for customers to evaluate the capacity they receive for their money.

The [OpenCode changelog for 9 November 2026](https://opencode.ai/console/changelog/coding-agents) describes connecting other coding agents, Claude Code and Codex among them, to a shared workspace. Every request runs through the workspace, model rules and budgets apply to it, and billed features carry a published price: web search costs one cent per search, billed to the workspace. Budgets can be set for the whole workspace, for each member, or for each model [OpenCode for Teams](https://opencode.ai/console/teams)). Define the unit, expose the consumption, explain the accounting, make plans comparable. OpenCode's workspace does all four.

## The better question

I started this conversation trying to decide whether ChatGPT Go or Plus was a better deal than my existing coding setup as a second plan apart from OpenCode. I am already on the Free plan. I have already been using ChatGPT for 2+ years.
I figured it might be better to pay them more and get more usage.

AI coding subscriptions are increasingly becoming part of a developer's production infrastructure. They influence which models we use, how we distribute work between agents, and how much we can accomplish within a budget.

At that point, usage transparency is an integral part of the product's economics.

We would not evaluate a cloud provider solely on promises of "more compute". We would want to know the instance types, processing capacity, pricing, and usage.

A provider does not have to promise unlimited usage. It does not have to disclose every internal detail of its infrastructure. It does have to give customers enough information to understand what they are buying. Perhaps we need regulation for that as well, alongside AI safety.

Until then, my purchasing decision is simple: I will evaluate the capabilities I can verify, the consumption I can measure, and the outcomes I can observe.

And when ChatGPT itself advises me not to buy ChatGPT on the strength of an unmeasured promise, I am going to listen.
