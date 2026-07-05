---
name: performance
description: Use when optimising Core Web Vitals, images, fonts, bundling, or page load performance. Covers Lighthouse audits, image optimisation with Sharp, font loading strategies, and Astro performance patterns.
---

# Performance

## Overview

This skill covers performance optimisation for the Velocity Astro project. Focus on **Core Web Vitals** (LCP, CLS, FID/INP), **image optimisation**, **font loading**, and **bundle efficiency**. Astro and Velocity provide strong defaults — maintain and extend them rather than adding heavy client-side code.

## Astro Technical Standards (Iron Laws)

These are **mandatory** for performance:

| Law | Rule |
|-----|------|
| **Zero-JS by Default** | Use `.astro` components for static content. Framework components (React, Svelte) only for interactive islands. Shipping framework JS for non-interactive content is prohibited. |
| **Intentional Hydration** | Always specify `client:*` directives explicitly. Never rely on defaults. Prefer `client:visible` or `client:idle` over `client:load`. |
| **Image Optimisation** | Never use raw `<img>` tags. Always use `<Image />` or `getImage()` from `astro:assets` for automatic LCP optimisation and format conversion. |
| **No Untyped Content** | Never use `Astro.glob()`. Always use `getCollection()` / `getEntry()` from `astro:content`. |
| **Typed Environment** | Use `astro:env` for type-safe environment variables. Never use `process.env`. |

## Quick Reference

| Task | Command |
|------|---------|
| Build for production | `pnpm build` |
| Preview production build | `pnpm preview` |
| Run Lighthouse | `npx lighthouse http://localhost:4321 --view` |
| Check bundle size | `npx astro build && du -sh dist/` |

## Core Web Vitals

### Metrics to Track

| Metric | Target | What It Measures |
|--------|--------|------------------|
| LCP (Largest Contentful Paint) | < 2.5s | Loading performance |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| INP (Interaction to Next Paint) | < 200ms | Responsiveness |
| FCP (First Contentful Paint) | < 1.8s | Perceived load speed |
| TTFB (Time to First Byte) | < 800ms | Server response time |

### Astro Performance Defaults (Already Configured)

- **Static generation** — pre-built HTML, no server render overhead
- **Prefetching** — `prefetchAll: true` with `viewport` strategy (in `astro.config.mjs`)
- **Content collections** — type-safe, optimised data loading
- **Shiki syntax highlighting** — pre-rendered, no client-side highlighter

## Image Optimisation

### Using Astro Images

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.png';
---

<Image 
  src={heroImage} 
  alt="Description" 
  widths={[400, 800, 1200]} 
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="eager"
  fetchpriority="high"
/>
```

### Best Practices

- **Always use `astro:assets` Image component** — automatic optimisation
- **Specify `widths` and `sizes`** for responsive images
- **Use `loading="lazy"`** for below-fold images (default)
- **Use `loading="eager"` + `fetchpriority="high"`** for LCP candidates only
- **Prefer WebP/AVIF** — Astro converts automatically via Sharp
- **Set explicit `width` and `height`** to prevent CLS
- **Use `alt` text** — accessibility and SEO

### Image Formats

| Format | Use Case |
|--------|----------|
| WebP | Default for photos (good compression) |
| AVIF | Best compression (modern browsers) |
| SVG | Icons, illustrations, logos |
| PNG | Only when transparency needed and no WebP |

## Font Loading

### Strategy

```css
/* In global.css or component styles */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap; /* Show fallback text immediately */
  unicode-range: U+0000-00FF; /* Load only needed glyphs */
}
```

### Best Practices

- **Use `font-display: swap`** — show fallback text while font loads
- **Preload critical fonts** — `<link rel="preload" as="font">` in `<head>`
- **Subset fonts** — load only the character ranges needed
- **Self-host fonts** — avoid third-party requests (Google Fonts, etc.)
- **Limit font weights** — 2-3 weights maximum per font family

## Bundle Optimisation

### What Velocity Already Does

- **Tree-shaking** — Astro removes unused code automatically
- **Code splitting** — per-page bundles by default
- **Scoped styles** — no global CSS leaks
- **React islands** — client JS only where needed (`client:*` directives)

### Rules for Agents

- **Minimise client-side JavaScript** — prefer Astro components over React
- **Use `client:visible`** over `client:load`** — defer non-critical interactivity
- **Avoid large client-side libraries** — check bundle impact before adding
- **Use dynamic imports** for heavy components: `const Module = await import('./Heavy.tsx')`
- **Never add jQuery, lodash, or other large utilities** — use native JS or small alternatives

### Checking Bundle Size

```bash
# Build and check output
pnpm build
du -sh dist/
ls -lh dist/_astro/  # Check JS/CSS chunk sizes
```

## Static Asset Optimisation

### Fonts, Images, and Media

- **Compress images** before committing (use Squoosh or similar)
- **Use descriptive file names** — `blog-hero.avif` not `image1.png`
- **Place static assets** in `public/` for direct serving
- **Use `src/assets/`** for optimised Astro images

### Caching Headers (Already Configured)

Velocity's deployment configs set:
- `/_astro/*` — immutable, 1 year cache (fingerprinted filenames)
- `/fonts/*` — immutable, 1 year cache
- HTML pages — no-cache (always fresh)

## Auditing Performance

### Lighthouse Checklist

1. Run `pnpm build && pnpm preview`
2. Open Lighthouse in Chrome DevTools (or `npx lighthouse`)
3. Check Performance, Accessibility, Best Practices, SEO scores
4. Target: **90+ on all metrics**

### Common Performance Killers

| Issue | Fix |
|-------|-----|
| Un optimised images | Use `astro:assets` Image component |
| Render-blocking scripts | Move to `client:visible` or remove |
| Large JavaScript bundles | Audit imports, use dynamic imports |
| Missing font-display | Add `font-display: swap` |
| CLS from images | Set explicit `width` and `height` |
| Third-party scripts | Lazy-load or remove |
