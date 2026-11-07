import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
// Vite only watches astro.config.mjs itself for config reload: restart
// `pnpm dev` after changing src/i18n/config.ts, or the derived i18n and
// sitemap settings below stay stale until the server restarts.
import { defaultLocale, locales } from './src/i18n/config';

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
  base: process.env.BASE_PATH || '/',

  // i18n configuration — derived from the single switch in src/i18n/config.ts
  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    '/about': `/${defaultLocale}/about`,
    '/contact': `/${defaultLocale}/contact`,
    '/services': `/${defaultLocale}/services`,
    '/blog': `/${defaultLocale}/blog`,
    '/impressum': `/${defaultLocale}/impressum`,
    '/datenschutz': `/${defaultLocale}/datenschutz`,
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        // @astrojs/sitemap emits absolute URLs including the Astro base, so
        // the prefix must account for BASE_PATH (empty on the root domain).
        const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
        return locales.some((locale) => pathname.startsWith(`${base}/${locale}/`));
      },
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
