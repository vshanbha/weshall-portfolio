---
title: "ZeroClaw: From Zero to Super Powered assistant."
description: Installing ZeroClaw on Kali Linux, wiring it to Discord, and verifying the whole thing works. No cloud, no subscription leash, no data leaving your machine.
publishedAt: 2026-07-19
author: Vishal Shanbhag
tags: [zeroClaw, self-hosted, AI, agent, Discord, Linux]
draft: false
featured: false
locale: en
# image: ./zeroclaw-personal-ai-assistant-hero.png
# imageAlt: "ZeroClaw chat interface on Kali Linux"
---

# ZeroClaw: From Zero to Super Powered assistant.

## The Promise (and the Fine Print)

In the last 6 months or so, the internet has gone viral with a phenomenon called [OpenClaw](https://openclaw.ai/). 
Programmers, Indie hackers, and DIY enthusiasts are all trying out different configurations with the bot to automate their daily workflows and create solutions. 

I am a little late to the game, but the Electronics engineer inside me says, I want more. More like I want less. Something that consumes less memory, less CPU and so on. 

Tony Stark didn't buy his Iron Man suit off a shelf. He built it in a cave with a box of scraps. Different constraints, same energy.

Somewhere in my internet browsing, I came across [ZeroClaw](https://www.zeroclawlabs.ai/), which is essentially a lightweight, self-hosted agent runtime. The promise (I mean tagline): 

> **You own the agent. You own the data. You own the machine it runs on.**

I also found an [article](https://zeroclaw.net/) that talked about its performance stats. It said 5mb RAM usage and 10 ms startup times. I was immediately like - "Where do I sign up?"

Per the documentation, ZeroClaw is a single Rust binary. It talks to LLM providers, connects to messaging channels you already use, and acts through tools on your machine.  

You can ask it to do all things that OpenClaw can. For builders and technical professionals, the pitch is: a personal AI assistant that runs on hardware you control, stores memory locally, and extends through skills and plugins. If you have been thinking about the private AI appliance path, this is the open-core foundation you build on.

All of that at a lower hardware cost. 
**It's a poor Tony Stark's Jarvis.** 

The fine print, though, as with most open source projects, is that the line "**you own it**" implies that practically means you maintain it. There is no support team to call when the agent does something creative with your filesystem at 3 AM. This is the trade-off, and it is worth understanding before you install anything.
## What You Need

You don't need a Malibu mansion and a reactor in your chest, but you do need a Linux machine and a Discord server. So here is the list:

- A Linux machine. Even a Raspberry Pi will do. (In my case, that is - [Kali Linux 2025.4, x86_64, running on a 12-year-old Mac Mini](https://medium.com/@vvsvish/how-to-dual-boot-mac-and-linux-45055ae6b942))
- A Discord account and a private server (create one at discord.com if you do not have one)
- An **opencode** API key (from your opencode account) or a key from another provider (OpenAI, Google, Claude or whatever else compatible)
- 30 minutes (may be more if we run into troubleshooting issues)

ZeroClaw is a binary. So it does not need Node.js, Python, or any runtime you might already have installed. The installer handles everything, which is either reassuring or terrifying, depending on your relationship with curl-piped-to-bash. Thankfully, their installer also offers "uninstall". So theoretically, one can clean up without too many issues. Time for practice.

## 1. Install ZeroClaw

Open a terminal. Run this:

```sh
curl -fsSL https://zeroclawlabs.ai/install.sh | bash
```

The installer asks whether you want a **prebuilt binary** (fast, recommended) or a **source build** (slower, customisable). Choose prebuilt. You are setting up an assistant, not contributing to the Rust ecosystem today.

Both paths end the same way: `zeroclaw quickstart` launches automatically.

If the wizard timed out or you closed the terminal in a panic, run it manually:

```sh
zeroclaw quickstart
```

This provides for doing either a CLI quickstart (recommended for technical users) OR a browser-based start. I'll choose the latter. 

I see the output:

```sh
🦀 ZeroClaw Gateway listening on http://127.0.0.1:42617

  🌐 Web Dashboard: http://127.0.0.1:42617/
```

I am logged on to this machine through SSH, so the browser is not exactly accessible, but I can solve for that by SSH tunnelling into that port and directing my browser to a localhost port. 

```sh
ssh -L 8888:127.0.0.1:42617 Username@<IP of BoT Server>
```

Then I can launch it on localhost:8888 in my browser, and I am ready to go. The dashboard requires a pairing code, but that is available in the CLI, so that's easy. 
## 2. Quickstart (Few questions, No DevOps Certification Required)

Quickstart walks you through four steps. One prompt per step. This is the part where the project earns its "simple" claim.
### Cost Tracking

A caution before we begin. ZeroClaw has a built-in [cost tracking](https://docs.zeroclawlabs.ai/v0.8.3/en/reference/config.html?highlight=cost#cost) system that monitors token usage and calculates expenditure when models are used through its own provider layer. It seems elaborate, and one can configure rates for each provider and model. This feels interesting, but best left for future exploration. 

A quick tip: Create a separate API key on your Opencode account dedicated to the bot. The [Opencode dashboard](https://opencode.ai/dashboard) then shows exactly how much that specific key spent, giving you clean per-bot cost visibility. For other providers (OpenAI, Anthropic, Google), likely the same approach should work. 

This way, whether ZeroClaw tracks it natively or not, you always have a cost signal from the provider end.
### Model Provider

I am using **opencode** from the provider list. ZeroClaw has a first-class `opencode` slot. I am going for the **opencode Go** setup, so I need a [URL](https://opencode.ai/docs/go/) as well. 

When prompted:
- Provider: **opencode**
- API key: paste your opencode key
- Model: deepseek-v4-flash
- URL: https://opencode.ai/zen/go/v1/chat/completions

### Risk Profile

Choose a preset. For a personal assistant on your own machine or a remote server, the **Balanced** profile works. It has some limits on what it can do with the machine. So the blast radius so to speak, if something goes wrong, is small.

If using a separate device or a Docker instance, then you can afford to reset the device / delete the instance. Then you may have to start over if things go wrong, and there is the risk of losing all data.

### Runtime Profile

Keep it **Tight**. It limits the capabilities of the agent, but that is better since we don't want to be paying huge bills. I would also recommend setting budget limits and a separate API key at the Model Provider end if possible, so one has control when the bot goes crazy.


### Memory

Pick a backend. **Markdown** is the simplest option. Zero configuration, stores everything locally in human-readable files. Other options exist (Postgres, Qdrant, SQLite), but Markdown is fine for a personal assistant. You are not building a data warehouse.

### Agent

Give your agent a name and an alias. This is how you reference it from the CLI and channels. 

### Personality Files

The UI offers several files, such as `IDENTITY.md`, `SOUL.md`. Assuming one does not have them already best to start with the provided templates. 

That's it. We're now ready to play. Let's hit "Create"

The wizard writes your config to `~/.zeroclaw` and takes you straight to the chat screen. 

### Chat

The built in Chat screen should work already. Let's talk to our bot. 

> hello
>
>

> Hey! 👋 Good to see you around. What's on your mind?
>
>

## 3. Create a Discord Bot 

This is the part that takes the most clicks, but each step is straightforward. Think of it as the bouncer checking your ID at the door of your own party.

### Create the Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application**, give it a name (e.g., "ZeroClaw"), and click **Create**.
3. In the left sidebar, click **Bot**.
4. Click **Reset Token**, then **Copy**. This is your bot token. Treat it like a password. You cannot see it again.
### Enable the Two Switches

Still on the **Bot** page, scroll to **Privileged Gateway Intents** and toggle both:

- **Message Content Intent** (so the bot can read what people type)
- **Server Members Intent** (so it can see who is in the server)

Click **Save Changes**. If you skip this, the bot connects but never sees any messages. This is the single most common "my bot does nothing" cause, and it is entirely self-inflicted.

### Set up the Token in ZeroClaw

On the ZeroClaw dashboard, look for the settings gear in the left navigation. This offers a UI for some powerful feature configurations. For today, we care only about Channels.
The detailed instructions are in the documentation for [Discord](https://docs.zeroclawlabs.ai/v0.8.2/en/channels/discord.html)

The documentation contains a lot of detail, and there is no point in just pasting it again here. Therefore, I have listed the minimum tasks required to get it working.
Look up the Channel list, find Discord and get started. 
- Give it a Name
- Control the Behaviour - Approval Timeout Secs, Slash Commands.
- Under "Control" - set the token

Look up our Agent in the Agent list on the left navigation.
- Edit our agent and add the channel that we just created to it. 

Look up "Peer Groups".
- Create a new Peer Group for authorising who can talk to the bot.
- Add allow list users. 
- Associate our Agent with this peer group. 

After all the changes, **reload the daemon** so the changes take effect.
### Invite the Bot

1. Back in the Developer Portal, open **OAuth2, URL Generator**.
2. Under **Scopes**, check **bot**.
3. Under **Bot Permissions**, check at least: **Send Messages**, **Read Message History**, **View Channels, Use Slash Commands, Use External Emojis**.
4. Copy the URL at the bottom, open it in your browser, pick your server, and click **Authorise**.

The bot now appears in your member list (offline until you start ZeroClaw).

## 4. Start and Test

**Test it:**
1. Open Discord.
2. Send a message in a channel the bot can see.
3. The bot should reply.

If it does not reply, check the troubleshooting table below. The answer is almost always the Message Content Intent or the bot token.

## 5: Install as a Service

This step is optional, but what is the point if your humble butler can't listen to you all the time? 
After all, Jarvis doesn't sleep. Neither should this. The difference is, ours runs on hardware you can actually afford.

In other words, if you want ZeroClaw to run always-on in the background:

```sh
zeroclaw service install
zeroclaw service start
```

This registers it as a systemd service on Linux. The agent starts on boot and restarts if it crashes. That's it, we've just created a personal AI assistant that survives reboots. The implications of this are worth sitting with.

To check status:

```sh
zeroclaw service status
```

## Verification Checklist

Before you close the terminal, verify each of these:

- [ ] `zeroclaw agent -a <alias> -m "test"` gets a reply from the CLI
- [ ] The Discord bot appears online in your server
- [ ] Sending a message in Discord gets a reply
- [ ] `zeroclaw service status` shows the daemon running (if you installed the service)

If all four pass, your personal AI assistant is live.

## Troubleshooting 

### Common Issues
The maintainers at ZeroClaw already offer a good [troubleshooting note](https://docs.zeroclawlabs.ai/v0.8.2/en/channels/discord.html#troubleshooting).
However, sometimes that is not enough, and we face our own issues not anticipated by the maintainers. In my case, I was able to troubleshoot this by pointing my ZeroClaw to the GitHub source, asking it questions and giving it relevant information when it asked questions in return. 
### Approval Buttons not showing up in Discord
If your bot sends approval prompts as plain text (e.g. "APPROVAL REQUIRED [abc123] … Reply: 'abc123 yes'") instead of interactive buttons, the cause is almost always one of two things:

1. Missing *Use Slash Commands*  OAuth2 scope: This scope authorises Discord to route interaction events (button clicks, slash commands, select menus) to your bot. Without it, the bot can send buttons in messages, but Discord has no way to deliver the click back. The bot then falls back to a text-based approval flow. 

2. slash_commands not enabled in ZeroClaw config: In the ZeroClaw Discord channel config, buttons only render when the interaction pipe is active. This requires slash_commands = true in the channel config block (e.g. under channels -> discord). Without it, the runtime falls back to the legacy text prompt.

### Browser Tool Not Working

If ZeroClaw fails to open web pages or the browser tool returns an error like `browser.backend='rust_native' requires build feature 'browser-native'`, the issue is compile-time, not config.

**Root cause:** ZeroClaw ships with multiple browser backends, but `rust_native` and `computer_use` are optional features that must be enabled at build time. The prebuilt binary may not include them. The `agent_browser` backend uses a standalone npm package that you install separately.

**Fix (using agent_browser):**

1. Install agent-browser globally via npm:
   ```sh
   npm install -g agent-browser
   ```

2. Symlink it into the system PATH so the daemon can find it (npm's global bin directory is often not in the service user's PATH):
   ```sh
   sudo ln -s "$(which agent-browser)" /usr/local/bin/agent-browser
   ```

3. Tell ZeroClaw which backend to use:
   ```sh
   zeroclaw config set browser.backend agent_browser
   ```

4. Restart the daemon:
   ```sh
   zeroclaw service restart
   ```

Verify with:
```sh
zeroclaw agent -a <alias> -m "open https://example.com and tell me the page title"
```

**Why not use rust_native or computer_use?**
- `rust_native`: only available if you compiled ZeroClaw yourself with `--features browser-native`.
- `computer_use`: requires a display server (X11/Wayland) and is significantly slower -- every action involves a screenshot -> vision model -> click loop. Not suitable for headless servers without Xvfb.

The `agent_browser` backend is the pragmatic choice for most self-hosted setups.

### Discord Typing Indicator Stuck Forever
If the bot shows "is typing..." permanently.  Even after it has responded, and it does not go away even if you restart the entire ZeroClaw service, you are hitting a known bug. The Discord adapter has a 30-second listener timeout. When an agent's turn exceeds 30s (slow Ollama model, heavy tool use), the cleanup signal never fires, and the typing state gets stuck.

**Fix:** Upgrade to ZeroClaw **v0.8.3+** and restart the service. This release removed the typing indicator entirely (it was unreliable on long turns) and replaced it with an instant 👀 reaction as feedback. After upgrading:

```sh
zeroclaw service restart
zeroclaw service status
```

If you are already on v0.8.3 and still see the issue, make sure the service was fully restarted after the upgrade, not just a config reload.

## What to Do Next

**Add more channels.** ZeroClaw supports 30+ channels. Telegram is the easiest to add after Discord. Go through the [Docs](https://docs.zeroclawlabs.ai/v0.8.2/en/channels/overview.html)

**Explore the dashboard.** Visit `http://127.0.0.1:42617/` (or localhost:8888 if SSH tunnelling on another machine in the network) in your browser. You can chat, browse memory, edit config, and manage cron jobs from there.

**Add skills.** The [ZeroClaw Skills registry](https://github.com/zeroclaw-labs/zeroclaw-skills) has community-contributed tools and workflows. 

**Read the philosophy.** ZeroClaw has four opinions that shape every design decision. Understanding them helps you configure the agent in ways that match the project's intent rather than fighting it.

## The Bigger Picture

ZeroClaw is not a chatbot wrapper. It is a runtime for autonomous agents that can execute shell commands, browse the web, control hardware (GPIO, I2C, SPI on Raspberry Pi), run scheduled tasks, and integrate with your editor via Agent Client Protocol.

ZeroClaw is what happens when someone looks at the cloud-AI stack and says, 'I want that, but I want it in my garage.' It's Jarvis without the cloud subscription leash.

For technical professionals considering the private AI appliance path, ZeroClaw is the open-core foundation. The stack is open source. The moat, deployment automation, operational excellence, and support are yours to build on top of it.

This installation is the first experiment. The article series will cover what we learn, what breaks, and what we wish we had known before starting. The goal is not to document a perfect setup. The goal is to document the real one.

> Every Iron Man started in a garage. This is the first step.

---

*This article is part of the [weshall.build](https://weshall.build) local-AI and production readiness content series.*
