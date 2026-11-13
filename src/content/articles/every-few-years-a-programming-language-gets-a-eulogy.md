---
title: 'Every Few Years a Programming Language Gets a Eulogy'
description: 'DHH retired from professional programming, wrote 150,000 lines of code in August alone, and 37signals is rebuilding HEY in Rust. The pattern is older than LLMs. Ecosystem, governance, and who else is forced to use your language decide what survives.'
publishedAt: 2026-11-14
author: Vishal Shanbhag
tags: [ai, programming-languages, ruby-on-rails, java, ecosystem]
draft: false
featured: false
locale: en
reviewed: true
ai_assisted: true
human_reviewed: true
---

# Every Few Years a Programming Language Gets a Eulogy

The seed of this article is in a conversation a couple of weeks ago, where I was hearing someone go on about how amazing Ruby on Rails is for modern Vibe coders. At the same time, I remembered about there being some news about people at 37Signals rewriting their stuff in Rust and then some people started calling it the death of Ruby.

I think the one quote I found from bloggers was from Olly, who summarised it [best](https://olly.world/its-the-end-of-rails-world-as-we-know-it-and-i-feel-fine):

> "I actually think this might be the last Rails World ever, at least in the traditional conference form"

At [Rails World 2026](https://www.youtube.com/watch?v=vDjW_dRyKXY), David Heinemeier Hansson (DHH) announced he has retired from being a professional programmer. He now calls himself a maker. He wrote 150,000 lines of code in August alone, most of it Rust he never reads. Ruby, the language he spent twenty years championing, makes up 3% of his output this year. And 37signals is rebuilding HEY with a Rust backend and native apps for every platform.

The first time I heard DHH speak was in his Omarchy tutorial video earlier this year. I can say with full confidence that **DHH is an opinionated person. This means he will have people who hate him and those who love him.** The opening keynote of the world's premier Rails conference featured a flagship Rails product leaving Rails.

That should scare most Rails programmers. What the Rails community got instead was reassurance: _you're the best of the best, Top Gun_.

I found one article from Jared Norman, writing at [jardo.dev](https://jardo.dev/what-about-rails). As Norman put it, you could say it word for word to a room of Django, Laravel, or Spring Boot developers.

I am a software professional who has been building and deploying apps in Production for a couple of decades. Granted, there are parts I want to change in every piece of software that I wrote. However, usually that is not something one rushes to do. It's not just about rewriting bits because you want to improve performance.

Such an exercise comes at the cost of some other business priorities which have to take a back seat while the rewrite is happening. Before LLM-assisted coding, this was always a time-consuming and expensive proposition.
That has led to the famous _"If it works, don't touch it."_

Another Ruby shop [Bit Zesty](https://bitzesty.com/blog/rails-rewrite-rust-dhh-hey/) made the same point. HEY's rewrite works because of preconditions most companies cannot meet. The knowledge is in the room. The old system keeps running. They can afford to be wrong. For a normal business running a normal Rails app, the answer to "should we do that?" is mostly **NO**.

All the same, news like this makes you wonder whether Ruby on Rails is dying. Whether many other programming languages are dying.

## This movie has played before

Every few years a language gets a eulogy, and every few years the corpse answers the door. People have called Java the new COBOL for over twenty years. And yet:

**Java's open source didn't grow weak just because Oracle took over.** The stewardship was awkward, the licensing fights were real, and the language kept compounding anyway. I built most of my career around Java, and I know that it still runs a striking fraction of the world's transactional systems, including the ones that clear your card payment this afternoon.

**MySQL is still around, with more production-ready forks despite Oracle owning it and running other flagship databases.** MariaDB came from the very programmers who built MySQL. Postgres ate into its market share, sure. Yet MySQL and its forks still back a huge share of the world's websites. If you doubt me, think WordPress.

And then there is COBOL itself, supposedly dead and buried since roughly the 1990s. **I put it down to the ecosystem: banking and old-world big companies still run it somewhere.** The Y2K scare was supposed to finish it off.

I started my programming career right after that scare, and in [Infosys](https://www.infosys.com/) right around the time I joined, they were teaching COBOL to fresh computer science graduates.

Here we are in 2026, and COBOL is likely still processing the transactions that keep economies running. Nobody announces on LinkedIn now about how excited they are about COBOL. I haven't seen that kind of a post for ages. Nobody needs to. Its users don't choose it; they inherit it, and they can't leave because business critical systems that use it are too expensive to replace.

That is the first law of language survival, and it has nothing to do with elegance or ease of use. Programming languages die when nothing beneath them holds them up. When the systems that use them are replaced for good business reasons, over time the practitioners disappear and the languages die quietly or sometimes become part of history.

## The languages that become History

Programming languages don't really die in the true sense of the term. They just become history.

In my time as a programmer, I have picked Pascal, C, Assembly, Java, HTML and CSS, JavaScript, Python, TypeScript, Dart, Rust in that exact order.

Each language I picked up was for a good reason.

- Pascal, C, Assembly - Because they were taught in the syllabus
- Java, HTML, CSS, JavaScript - I picked them up in a matter of weeks because that's what I needed to use in my job to make Web Applications.
- Python - Because apparently Java didn't have good libraries to do ML.
- TypeScript and Dart - because building modern applications have to be cross-platform and those two allow one to have a single code base serve cross-platform apps.
- Rust - because it's fast.

Of those, I think Pascal is already history. I never worked with it beyond that one semester. I have not met any programmer friend of mine claiming to use it in Production. Maybe there is someone out there who still does use it. Just that I have not met them. Perhaps it has a cult following. Another one I have seen is Haskell. I will not pretend that I know it, but I was playing with it to customise [Xmonad](https://xmonad.org/) to my liking a few years ago.

Syntactically they are two completely different languages. Pascal - verbose, easy to understand, almost English-like. Haskell - it practically hurt my brain to figure out what is going on. I didn't try learning it beyond that one little custom config. Yet, both are hardly used. I think the reason is likely both didn't take off the way some other languages did.

OTOH, Python was around when I started programming. I heard some people talking about it back in 2000. Yet, the need to pick it up didn't happen until more than a decade later and because I needed to work on a project where Machine Learning was required. And, I am not joking - at the time Google decided that someone looking for "Machine Learning, Java" actually wants to learn about "How to use Python for Machine Learning".

The point I am trying to make is that languages get used when someone decides that an Application or a system needs to be written in a certain language and then that said application gets used by a lot of end users.

These days I don't even mention the first 3 languages from the list in my CV, because I have not worked with those languages for 20+ years. Didn't have to touch an Application that was built on one of those.

Of those 3 languages, C is still around hidden in device drivers, high performance libraries. Another language that finds itself underneath everything high performance is C++.

**C and C++ survive because they hide underneath everything, and they are fast.**

I wish I'd picked up C++ a while ago. With AI in the mix, maybe I should revisit C and C++ and try using them again. Watch this space.

## The quiet engine swap

Let's run a thought experiment on the "Rails is dead" argument: **if Shopify sees the advantages, they might quietly start changing the engine (Ruby on Rails) under the hood.** Guess what, they already did. Shopify funds [YJIT, Ruby's JIT compiler, and ported it from C to Rust in three months](https://shopify.engineering/porting-yjit-ruby-compiler-to-rust). The lead on the port, Maxime Chevalier-Boisvert, wrote up the experience with unusual honesty: Rust, flaws and all, is "a huge improvement over C or C++", and the ported codebase is more maintainable than what it replaced. They complained about some of the quirks of Rust, but they kept it anyway.

**Ruby core is written in C, with Rust moving steadily inward. Deep down, it is already focused on performance.** The language at the top barely changed. The engine inside got rebuilt, quietly, over a few quarters.

This is what ecosystem survival actually looks like in the AI era. A sponsorship deal, a compiler port, a merge commit nobody outside the community knows about. Ruby's story repeats everywhere: Python stayed #1 while being slow for thirty years, and then [3.14 shipped a tracing JIT and a free-threaded build](https://www.bolderapps.com/blog-posts/python-3-14-the-speed-without-friction-era-and-the-final-maturation-of-the-worlds-most-popular-language), while a whole generation of tooling gets rewritten in Rust underneath the syntax everyone already knows. Even [Matz is building a native ahead-of-time compiler for Ruby, with Claude's help](https://www.theregister.com/devops/2026/05/06/ruby-inventor-matz-working-on-native-compiler-with-ai-help/5230532). Nobody asks the language's permission. They bolt speed onto it from below and keep the surface stable.

**A language with a strong ecosystem and mature governance will win long term.** It comes down to the deepest bench of maintainers, the largest pile of existing code, and the corporate sponsor who quietly needs it to keep working.

## The top layer is eventually Natural Language (mostly English)

Most programmers today never read or write assembly. Some study it at an academic level. Same as I did 25 years ago. Either way, it is still there, underneath every piece of code that executes on a CPU.

Every generation of programmers has climbed one rung up the same ladder, and every rung followed the same pattern:

**Machine code is the CPU's own language**: ones and zeroes, specific to each processor family, practically too complicated for humans. Looks cool as a Matrix-style screensaver, though.

**Assembly is its readable shadow**: one line per instruction. Close enough to the metal to be fast; too tedious for anything bigger than a device driver. I spent a whole semester of my engineering course writing the driver for an 8051 in a remote control used on heavy engineering equipment.

**C and C++ looked like English** compared to what came before. Express the algorithm, not the registers. Still a language you must learn, and still a language with which you can crash the machine.

**Then came JavaScript, Java, Python, Go, PHP and Ruby**: invented so programmers would stop crashing machines unintentionally and could write code that scales. Bounds checking, garbage collection, type systems: guardrails. Underneath every one of them, C and assembly are still there, doing the actual work.

Between each pair of rungs sits a translator, the compiler or the interpreter, walking the code down one level of abstraction at a time until it reaches the chip. They just become part of the infrastructure and tooling, and stop being where humans spend their time.

The ladder has one more rung now, and it is not a programming language. **The human speaks ideas and instructions in plain English. The AI translates to code. The compiler translates to machine code. The CPU does what it always did.** The whole tool chain still works, and the human has moved to a layer they already know how to speak.

For everyone in between, the ground is moving. Software concepts and discipline, the parts that likely need a different class of models, sit on one side. Business nuance and creativity, which stay stubbornly human, sit on the other. **The translation between those two, turning what a business actually needs into instructions that keep the whole tool chain working, is where future programmers will operate.** The work happens above the code. And the translator in the middle is a model, not a compiler.

## The AI variable flips Paul Graham, gently

Twenty or so years ago Paul Graham wrote [Beating the Averages](https://paulgraham.com/avg.html) and argued that language power was the startup's secret weapon. Lisp was their super power. Lisp never became popular, though; the ideas won instead. Closures, garbage collection, macros: they escaped into the other languages which became popular.

Programming language power still matters, so the arguments about which language is better, which one is dead, will all be around for a while anyway. Models have biases about languages, opinions formed by the corpus they were trained on. The languages with the deepest public code, the most tutorials, the most Stack Overflow archaeology are the ones agents write fluently. A language nobody writes publicly is a language agents don't learn well.

The people shipping at [inference speed](https://steipete.me/posts/2025/shipping-at-inference-speed) already think this way. Peter Steinberger picked Go for CLIs because agents write it well and the type system keeps linting fast. DHH picked Rust for the HEY backend because it's great for [LLMs](https://lexfridman.com/dhh-2-transcript/), even though Rust is famously hard on the humans who write it. He doesn't read the output. He evaluates the result from the outside. Gergely Orosz at [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what) put numbers on the shift: he pushed hundreds of lines to production by prompting, reviewing, and prompting again. Writing code was never the hard part; choosing what to build is what matters more than ever.

**With AI taking over development, what we really need is a language that is fast and yet readable by both humans and AI.** That list is shorter than people pretend. It looks a lot like the incumbent list.

## The four survival rules

In my opinion, we now have four rules for which programming languages outlive the AI era:

1. **Ecosystem Matters.** Package libraries and deployed code beat language features. This is PHP's entire survival strategy.
2. **Governance is a feature.** Matz still stewards Ruby. Java has JSRs. Mature governance means slow, boring, compatible change, yet it is exactly what an ecosystem needs to compound.
3. **Performance gets bought inside the ecosystem.** JITs, native compilers. The winning move is rarely a rewrite in a new language; it's bolting the fast bits underneath the language everyone already uses. The rewrite is the announcement after things were quietly swapped underneath.
4. **Models are now users, and they are biased toward the crowd.** Choosing an obscure but elegant language means betting against your own tooling. Choosing the well-documented incumbent means the models arrive already trained on your stack.

Most of this has been said before, individually. Put it together and DHH's Rust pivot, Shopify's YJIT port, Matz's compiler, and Python's JIT all point to the same conclusion: **the AI era rewards the languages that humans and AI already know. The underlying technical problems, if any, now just have a faster route to solution.**

---

_If you're staring at a stack decision or a build-or-buy call and want a second opinion before the runway commits for you, that's the kind of call I make with founders every week. [Let's talk](https://weshall.build/contact)._

---

## References

- [DHH, opening keynote at Rails World 2026](https://www.youtube.com/watch?v=vDjW_dRyKXY) (Ruby on Rails, Sep 23, 2026)
- [What About Rails? — Jared Norman, jardo.dev](https://jardo.dev/what-about-rails) (Sep 24, 2026)
- [DHH is rewriting HEY in Rust. Should you rewrite your Rails application? — Matthew Ford, Bit Zesty](https://bitzesty.com/blog/rails-rewrite-rust-dhh-hey/) (Sep 25, 2026)
- [When AI writes almost all code, what happens to software engineering? — Gergely Orosz, The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what) (Jan 6, 2026, paywall lifted Sep 2026)
- [Shipping at Inference-Speed — Peter Steinberger](https://steipete.me/posts/2025/shipping-at-inference-speed) (Dec 28, 2025)
- [Our Experience Porting the YJIT Ruby Compiler to Rust — Maxime Chevalier-Boisvert, Shopify Engineering](https://shopify.engineering/porting-yjit-ruby-compiler-to-rust) (May 11, 2022)
- [Ruby inventor Matz working on native compiler with AI help — Tim Anderson, The Register](https://www.theregister.com/devops/2026/05/06/ruby-inventor-matz-working-on-native-compiler-with-ai-help/5230532) (May 6, 2026)
- [Python 3.14: The 'Speed Without Friction' Era — Bolder Apps](https://www.bolderapps.com/blog-posts/python-3-14-the-speed-without-friction-era-and-the-final-maturation-of-the-worlds-most-popular-language) (Feb 2026)
- [DHH: Future of Programming, AI, Agentic Engineering, Vibe Coding & Linux — Lex Fridman Podcast #501 (transcript)](https://lexfridman.com/dhh-2-transcript/) (Aug 26, 2026)
- [Beating the Averages — Paul Graham](https://paulgraham.com/avg.html) (Apr 2001, rev. Apr 2003)

_All reference links validated (HTTP 200) on 2026-10-30._
