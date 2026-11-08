import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
// Astro restarts the dev server when astro.config.mjs itself changes, but
// not when its imports change: restart `pnpm dev` after editing
// src/i18n/config.ts so the derived settings below pick it up.
import { defaultLocale, locales } from './src/i18n/config';
import { routes } from './src/i18n/routes';
import { isLocalePath, siteBase } from './src/i18n/url';

/** Base path without its trailing slash ('' on the root domain). */
const base = siteBase();

/** Bare-path redirects derived from the route table: '/about' → '/en/about'. */
const bareLocaleRedirects = Object.fromEntries(
  Object.values(routes)
    .map((definition) => definition[defaultLocale])
    .filter((slug) => slug !== '')
    .map((slug) => [`/${slug}`, `${base}/${defaultLocale}/${slug}`])
);

/**
 * remark-gfm renders a markdown task list (`- [ ] item`) as a bare
 * `<input type="checkbox" disabled>` with no accessible name, which fails
 * WCAG 4.1.2 (axe rule: "label"). Give each checkbox the text of its own list
 * item as its name, so state and meaning survive for assistive technology.
 */
function rehypeTaskListLabels() {
  const toText = (node) =>
    node.type === 'text' ? String(node.value ?? '') : (node.children ?? []).map(toText).join('');

  const walk = (node, listItem) => {
    const current = node.tagName === 'li' ? node : listItem;
    if (node.tagName === 'input' && node.properties?.type === 'checkbox' && current) {
      const label = toText(current).replace(/\s+/g, ' ').trim();
      if (label) node.properties = { ...node.properties, ariaLabel: label };
    }
    for (const child of node.children ?? []) walk(child, current);
  };

  return (tree) => walk(tree, null);
}

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  // siteBase() adapted to Astro's base format ('' on the root → '/').
  base: base === '' ? '/' : base,

  // i18n configuration — derived from the single switch in src/i18n/config.ts
  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  redirects: {
    '/sitemap.xml': `${base}/sitemap-index.xml`,
    // Derived from the route table so a new route or a default-locale change
    // cannot be forgotten; home is handled by src/pages/index.astro, and the
    // two legal pages are not route-table entries. Targets carry the base:
    // Astro writes them verbatim into the meta-refresh.
    ...bareLocaleRedirects,
    '/impressum': `${base}/${defaultLocale}/impressum`,
    '/datenschutz': `${base}/${defaultLocale}/datenschutz`,
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => isLocalePath(new URL(page).pathname),
      i18n: {
        defaultLocale,
        // hreflang language codes — one per enabled locale (identity today)
        locales: Object.fromEntries(locales.map((locale) => [locale, locale])),
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },

  security: {
    checkOrigin: true,
  },

  experimental: {
    contentIntellisense: true,
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    rehypePlugins: [rehypeTaskListLabels],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
