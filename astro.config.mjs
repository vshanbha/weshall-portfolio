import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

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
      filter: (page) => page.includes('/en/'),
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
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
