import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

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

  // i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    '/about': '/en/about',
    '/contact': '/en/contact',
    '/services': '/en/services',
    '/blog': '/en/blog',
    '/impressum': '/en/impressum',
    '/datenschutz': '/en/datenschutz',
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return pathname.startsWith('/en/');
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
        },
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
