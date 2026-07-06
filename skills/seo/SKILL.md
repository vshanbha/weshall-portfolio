---
name: seo
description: Use when implementing or auditing SEO features including meta tags, JSON-LD structured data, Open Graph images, sitemaps, robots.txt, and semantic HTML. Covers Velocity's built-in SEO toolkit.
---

# SEO

## Overview

This skill covers SEO best practices for the Velocity Astro project. Velocity provides a **complete SEO toolkit** — meta tags, JSON-LD schemas, dynamic OG images, sitemap, and robots.txt. Use these built-in features rather than adding third-party SEO plugins.

## Content Collections

This project uses **custom content collections** (not Velocity defaults):

| Collection | Purpose |
|------------|---------|
| `articles` | Deep-dive technical analysis and operational insights |
| `offers` | Productised entry offers and positioning |
| `philosophy` | Brand philosophy and "Bypass Surgery" manifesto |
| `profile` | Professional profile and background |

See `src/content.config.ts` for Zod schemas. All content must pass frontmatter validation at build time.

## Quick Reference

| Feature | Location | Notes |
|---------|----------|-------|
| SEO component | `src/components/seo/SEO.astro` | Per-page meta tags |
| JSON-LD | `src/components/seo/JsonLd.astro` | Structured data |
| Breadcrumbs | `src/components/seo/Breadcrumbs.astro` | Navigation + schema |
| OG images | `src/pages/og/[...slug].png.ts` | Dynamic generation |
| Sitemap | `src/pages/sitemap.xml.ts` | Auto-generated |
| Robots | `src/pages/robots.txt.ts` | Auto-generated |
| Schema helpers | `src/lib/schema.ts` | JSON-LD generators |

## Meta Tags

### Using the SEO Component

```astro
---
import SEO from '@/components/seo/SEO.astro';
---

<SEO
  title="Page Title — Site Name"
  description="Concise description under 160 characters"
  image="/og-images/page-slug.png"
  canonical="https://weshall.build/page-slug/"
/>
```

### Meta Tag Best Practices

| Tag | Rule |
|-----|------|
| `<title>` | 50-60 characters; include primary keyword; format: `Page — Site` |
| `meta description` | 150-160 characters; compelling, includes CTA; unique per page |
| `og:title` | Same as `<title>` or shorter for social |
| `og:description` | Same as meta description |
| `og:image` | 1200x630px; include brand elements |
| `og:url` | Canonical URL |
| `twitter:card` | `summary_large_image` for blog posts |
| `canonical` | Self-referencing; use trailing slash consistently |

### Per-Page SEO

```astro
---
import SEO from '@/components/seo/SEO.astro';

const meta = {
  title: 'Building High-Trust Technical Platforms — We shall build',
  description: 'Deep-dive analysis of complex technical, operational, and architectural domains.',
  image: '/og-images/blog-building-trust.png',
};
---

<html lang="en">
<head>
  <SEO {...meta} />
</head>
```

## JSON-LD Structured Data

### Available Schema Generators (in `src/lib/schema.ts`)

| Generator | Use Case |
|-----------|----------|
| `WebSite` | Site-wide schema (homepage) |
| `Organization` | Company/brand info |
| `BlogPosting` | Blog articles |
| `BreadcrumbList` | Navigation breadcrumbs |
| `FAQPage` | FAQ sections |

### Using JSON-LD

```astro
---
import JsonLd from '@/components/seo/JsonLd.astro';
import { generateBlogSchema } from '@/lib/schema';
---

<JsonLd schema={generateBlogSchema({
  title: post.data.title,
  description: post.data.description,
  url: `https://weshall.build/blog/${post.id}/`,
  datePublished: post.data.publishedAt,
  dateModified: post.data.updatedAt,
  author: post.data.author,
})} />
```

### Schema Types for This Site

| Page | Schema |
|------|--------|
| Homepage | `WebSite` + `Organization` |
| Article | `ArticlePosting` + `BreadcrumbList` |
| Offer | `Product` + `BreadcrumbList` |
| Philosophy | `ArticlePosting` + `BreadcrumbList` |
| Profile | `Person` + `Organization` |
| Contact | `Organization` |

## Open Graph Images

### Dynamic OG Generation

Velocity generates OG images dynamically using **Satori**:

- Endpoint: `src/pages/og/[...slug].png.ts`
- Input: blog post title, author, site name
- Output: 1200x630px PNG

### Customising OG Images

Edit `src/pages/og/[...slug].png.ts` to modify:
- Background colour
- Font (must be bundled or loaded)
- Layout and branding elements

### OG Image Rules

- **Every page** should have an OG image
- **Articles** — use dynamic generation or create static images
- **Use consistent branding** — same colours, logo placement, fonts
- **Text should be readable** at 1200x630 — test at small sizes

## Sitemap and Robots

### Sitemap

- Auto-generated at `/sitemap.xml`
- Includes all non-drafted pages
- Respects i18n locales

### Robots.txt

- Auto-generated at `/robots.txt`
- Allows all crawlers by default
- Points to sitemap URL

### Configuration

Both are in `src/pages/` and use collection data automatically. No manual updates needed when adding pages.

## Semantic HTML

### Required Landmarks

```astro
<html lang="en">
<head>...</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  
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

- [ ] `<title>` present and under 60 characters
- [ ] `meta description` present and under 160 characters
- [ ] Canonical URL set and self-referencing
- [ ] `lang="en"` on `<html>`
- [ ] Sitemap generated at `/sitemap.xml`
- [ ] robots.txt present at `/robots.txt`
- [ ] No broken internal links
- [ ] HTTPS enforced

### Content SEO

- [ ] One `<h1>` per page
- [ ] Heading hierarchy logical (no skipped levels)
- [ ] Images have descriptive alt text
- [ ] Internal links between related content
- [ ] URL structure is clean and descriptive

### Social/OG

- [ ] OG title set
- [ ] OG description set
- [ ] OG image present (1200x630px)
- [ ] OG URL matches canonical
- [ ] Twitter card type set

### Structured Data

- [ ] JSON-LD schema present on articles
- [ ] Schema validates (test at schema.org/validator)
- [ ] Breadcrumbs implemented

## Common SEO Issues

| Issue | Fix |
|-------|-----|
| Duplicate titles | Ensure unique `<title>` per page |
| Missing OG image | Add image to frontmatter and SEO component |
| Thin content | Expand pages to 300+ words minimum |
| Broken links | Check with `pnpm build` and link checker |
| Slow page speed | See performance skill |
| Missing canonical | Add canonical URL to SEO component |
