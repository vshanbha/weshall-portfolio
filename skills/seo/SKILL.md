---
name: seo
description: Use when implementing or auditing SEO features including meta tags, JSON-LD structured data, Open Graph images, sitemaps, robots.txt, semantic HTML, and answer-engine (AI search) visibility. Covers Velocity's built-in SEO toolkit.
---

# SEO

## Overview

This skill covers SEO best practices for the Velocity Astro project. Velocity provides a **complete SEO toolkit** — meta tags, JSON-LD schemas, dynamic OG images, sitemap, and robots.txt. Use these built-in features rather than adding third-party SEO plugins.

It also covers **answer-engine visibility**: what an assistant (ChatGPT, Perplexity, Google AI Overviews) pulls when someone asks a question instead of searching. Same toolkit, plus how content is written and kept fresh.

## Content Collections

This project uses **custom content collections** (not Velocity defaults):

| Collection                         | Route                               | Purpose                                                               |
| ---------------------------------- | ----------------------------------- | --------------------------------------------------------------------- |
| `articles`                         | `/en/blog/` (locale-prefixed)       | Deep-dive technical analysis and operational insights — the live blog |
| `philosophy`                       | `/en/philosophy/` (locale-prefixed) | Ten commandments / brand philosophy                                   |
| `blog`, `pages`, `authors`, `faqs` | —                                   | Defined in `src/content.config.ts`, currently empty                   |

See `src/content.config.ts` for Zod schemas. All content must pass frontmatter validation at build time. The `faqs` collection is the intended JSON source for `createFAQSchema`; no FAQ content exists yet.

## Quick Reference

| Feature          | Location                                                          | Notes                                                                |
| ---------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| SEO component    | `src/components/seo/SEO.astro`                                    | Per-page meta tags                                                   |
| JSON-LD          | `src/components/seo/JsonLd.astro`                                 | Structured data                                                      |
| Breadcrumbs      | `src/components/seo/Breadcrumbs.astro`                            | Blog article pages (rendered via `BlogLayout`)                       |
| hreflang         | `src/components/i18n/Hreflang.astro`                              | Locale alternates + `x-default`, emitted by `BaseLayout`             |
| OG images        | `src/pages/og/[...slug].png.ts`                                   | Dynamic generation (Satori, via `src/lib/og.ts`)                     |
| Sitemap          | `astro.config.mjs` (`@astrojs/sitemap`)                           | Outputs `sitemap-index.xml`; `/sitemap.xml` redirects to it          |
| Robots           | `src/pages/robots.txt.ts`                                         | Blocks `/api/`; points at `sitemap-index.xml`                        |
| RSS              | `src/pages/rss.xml.ts`                                            | Autodiscovery `<link>` in `BaseLayout`                               |
| `llms.txt`       | `public/llms.txt`                                                 | Static machine-readable site summary — keep in sync with positioning |
| Schema helpers   | `src/lib/schema.ts`                                               | `create*` JSON-LD generators                                         |
| GSC verification | `GOOGLE_SITE_VERIFICATION` env → `siteConfig.verification.google` | Rendered as `google-site-verification` meta by `SEO.astro`           |

## Meta Tags

### Using the SEO Component

```astro
---
import SEO from '@/components/seo/SEO.astro';
---

<SEO
  title="Page Title"
  description="Concise description under 160 characters"
  image="/og-images/page-slug.png"
  imageAlt="Description of the image"
/>
```

`SEO.astro` composes the document title as `` `${title} - ${siteConfig.name}` `` and derives the canonical URL from the current path — there is no `title` suffix or `canonical` prop to pass. Available props: `title`, `description`, `image`, `imageAlt`, `article` (published/modified time, authors, tags), `noindex`, `nofollow`.

### Meta Tag Best Practices

| Tag                | Rule                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `<title>`          | 50-60 characters including the site name; format: `Page - Site`                           |
| `meta description` | 150-160 characters; compelling, unique per page                                           |
| `og:title`         | Same as `<title>` or shorter for social                                                   |
| `og:description`   | Same as meta description                                                                  |
| `og:image`         | 1200x630px; include brand elements                                                        |
| `og:url`           | Canonical URL                                                                             |
| `twitter:card`     | `summary_large_image` (emitted for every page)                                            |
| `canonical`        | Self-referencing; trailing slash follows the route table                                  |
| `noindex`          | Use the prop for pages that must not be indexed (404, legal pages, locale-redirect shims) |

## JSON-LD Structured Data

### Available Schema Generators (in `src/lib/schema.ts`)

| Generator                  | `@type`          | Used on                                                                     |
| -------------------------- | ---------------- | --------------------------------------------------------------------------- |
| `createWebsiteSchema`      | `WebSite`        | Every page (`BaseLayout`)                                                   |
| `createOrganizationSchema` | `Organization`   | Available via `includeOrgSchema` layout prop — **no page enables it today** |
| `createBlogPostSchema`     | `BlogPosting`    | Blog article pages                                                          |
| `createWebPageSchema`      | `WebPage`        | Blog article pages (reviewer + publishing principles)                       |
| `createBreadcrumbSchema`   | `BreadcrumbList` | `Breadcrumbs.astro`                                                         |
| `createPersonSchema`       | `Person`         | About page                                                                  |
| `createServiceSchema`      | `Service`        | Services page                                                               |
| `createFAQSchema`          | `FAQPage`        | Ready to use — no FAQ content yet                                           |

### Using JSON-LD

```astro
---
import JsonLd from '@/components/seo/JsonLd.astro';
import { createBlogPostSchema } from '@/lib/schema';
---

<JsonLd
  schema={createBlogPostSchema({
    title: post.data.title,
    description: post.data.description,
    url: canonicalUrl,
    image: ogImageUrl,
    datePublished: post.data.publishedAt,
    dateModified: post.data.updatedAt,
    author: { name: post.data.author },
    publishingPrinciples,
  })}
/>
```

### Schema Types for This Site

| Page                        | Schema                                       |
| --------------------------- | -------------------------------------------- |
| Every page                  | `WebSite`                                    |
| Blog article                | `BlogPosting` + `WebPage` + `BreadcrumbList` |
| About                       | `Person`                                     |
| Services                    | `Service`                                    |
| Home / contact / philosophy | `WebSite` only                               |
| FAQ (future)                | `FAQPage` via `createFAQSchema`              |

## Open Graph Images

### Dynamic OG Generation

Velocity generates OG images dynamically using **Satori**:

- Endpoint: `src/pages/og/[...slug].png.ts`
- Card selection: static pages, philosophy, articles, and every `/en/*` + `/de/*` path (locale drives which card is chosen)
- `generateOGImage` input: `{ title, description, type }`
- Output: 1200x630px PNG at `/og/<pathname>.png`

When no `image` prop is passed, `SEO.astro` derives the OG path from the current URL (base-aware via `stripSiteBase`).

### Customising OG Images

Edit `src/pages/og/[...slug].png.ts` to modify:

- Background colour
- Font (must be bundled or loaded)
- Layout and branding elements

### OG Image Rules

- **Every page** should have an OG image (the dynamic fallback covers pages without one)
- **Articles** — use the frontmatter `image` (hero alongside the article file) or the dynamic generation
- **Use consistent branding** — same colours, logo placement, fonts
- **Text should be readable** at 1200x630 — test at small sizes

## Sitemap, Robots, RSS, hreflang

### Sitemap

- Generated by the `@astrojs/sitemap` integration in `astro.config.mjs` (not a file in `src/pages/`)
- Output: `/sitemap-index.xml`; `/sitemap.xml` redirects to it (base-path aware)
- Filtered to locale paths; hreflang alternates included via the integration's `i18n` config
- Draft articles are excluded in production builds

### Robots.txt

- Auto-generated at `/robots.txt`
- Allows all crawlers; **disallows `/api/`**
- Points at `sitemap-index.xml`

### RSS

- Generated at `/rss.xml`; `<link rel="alternate" type="application/rss+xml">` autodiscovery in `BaseLayout`
- Known gap: the autodiscovery `href` is hardcoded `/rss.xml` (base-path issue, tracked in portfolio #52)

### hreflang

- `Hreflang.astro` emits `en`, `de`, and `x-default` alternates for locale-prefixed routes
- New locale-prefixed pages get this automatically through `BaseLayout` when `routeId` is provided

## AI Search (Answer Engines)

Assistants build answers from the **live web**, not just training data — content can be cited within weeks of publication. They favour content that answers a question plainly and already ranks in traditional search.

### On-page (do once)

1. **Structured data** — the JSON-LD above; keep `Person`/`BlogPosting` accurate so the entity behind the site is unambiguous.
2. **Content clarity** — say plainly what you offer, who it is for, how it works and what it costs (services page).
3. **FAQs** — write the full questions customers actually ask, as whole sentences (not keyword fragments), with the answer on the page. `createFAQSchema` is ready when FAQ content exists.
4. **Answer first** — each article answers **one question**, with the answer in the **first two or three sentences**. That lead is what gets pulled into a citation; the rest supports it.

### Ongoing (the weekly hour)

- **Freshness** — publish on a regular, predictable schedule; update `dateModified` when revising.
- **`llms.txt`** — keep `public/llms.txt` in sync with current positioning (it exists but is stale — factory #22/#23).
- **Entity consistency** — `Person` schema `sameAs` links and backlinks from profiles you control (LinkedIn, Medium author bios) are the cheapest ranking lever (factory #23).

### Check it yourself

Ask ChatGPT and Perplexity the three questions your audience asks most; write down who gets cited; ask again a month later. The Google Search Console query report (factory #24) is the traditional-search baseline for the same check.

## Semantic HTML

### Required Landmarks

```astro
<html lang={locale}>
  <head>...</head>
  <body>
    <a href="#main" class="skip-link">
      Skip to content
    </a>

    <header>
      <nav aria-label="Main navigation">...</nav>
    </header>

    <main id="main">
      <article>...</article>
    </main>

    <footer>...</footer>
  </body>
</html>
```

### Heading Hierarchy

- **One `<h1>` per page** — the page title
- **Logical nesting** — `<h2>` under `<h1>`, `<h3>` under `<h2>`
- **No skipped levels** — don't jump from `<h2>` to `<h4>`
- **Use headings for structure**, not styling

### Link Best Practices

```astro
<!-- Good: descriptive link text -->
<a href="/blog/high-trust-platforms">Read about high-trust platforms</a>

<!-- Bad: generic link text -->
<a href="/blog/high-trust-platforms">Click here</a>
<a href="/blog/high-trust-platforms">Read more</a>
```

## SEO Audit Checklist

### Technical SEO

- [ ] `<title>` present and under 60 characters (including site name)
- [ ] `meta description` present and under 160 characters
- [ ] Canonical URL set and self-referencing
- [ ] `lang` attribute matches the page locale (never hardcoded `en`)
- [ ] hreflang alternates present on locale-prefixed pages
- [ ] Sitemap generated at `/sitemap-index.xml` and reachable via `/sitemap.xml`
- [ ] robots.txt present; `/api/` disallowed
- [ ] RSS autodiscovery present
- [ ] No broken internal links
- [ ] HTTPS enforced

### Content SEO

- [ ] One `<h1>` per page
- [ ] Heading hierarchy logical (no skipped levels)
- [ ] Images have descriptive alt text
- [ ] Article answers its question in the first 2-3 sentences
- [ ] Services/key pages state what, who, how and how much plainly
- [ ] Internal links between related content
- [ ] URL structure is clean and descriptive

### Social/OG

- [ ] OG title set
- [ ] OG description set
- [ ] OG image present (1200x630px)
- [ ] OG URL matches canonical
- [ ] Twitter card type set

### Structured Data

- [ ] JSON-LD schema present on articles (`BlogPosting` + `WebPage`)
- [ ] Schema validates (test at schema.org/validator)
- [ ] Breadcrumbs implemented on article pages

### Answer Engines

- [ ] `public/llms.txt` matches current positioning
- [ ] Key questions checked against ChatGPT/Perplexity (who gets cited)
- [ ] `GOOGLE_SITE_VERIFICATION` set in env; sitemap submitted in Search Console

## Known Tracked Issues

| Issue         | Gap                                                                                                                                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| portfolio #52 | Custom-image OG branch in `SEO.astro` drops `BASE_PATH` (`new URL(image, siteConfig.url)` resolves root-relative paths against the domain root); RSS autodiscovery hardcoded — root/custom-domain deploys unaffected |
| factory #24   | GSC + GA setup; `.env.example` does not yet document `GOOGLE_SITE_VERIFICATION`                                                                                                                                      |
| factory #23   | Name absent from all `<title>`s; `Person` JSON-LD only on About; `llms.txt` stale; backlinks from own profiles unverified                                                                                            |

## Common SEO Issues

| Issue             | Fix                                                         |
| ----------------- | ----------------------------------------------------------- |
| Duplicate titles  | Ensure unique `<title>` per page                            |
| Missing OG image  | Add image to frontmatter or rely on the dynamic `/og/` path |
| Thin content      | Expand pages to 300+ words minimum                          |
| Broken links      | Check with `pnpm build` and link checker                    |
| Slow page speed   | See performance skill                                       |
| Missing canonical | Derived automatically — check `siteConfig.url` instead      |
| Stale `llms.txt`  | Regenerate from current positioning (see factory #22/#23)   |
