import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { locales } from '@/i18n/config';
import { siteBase } from '@/i18n/url';

describe('Sitemap build output', () => {
  const sitemapPath = resolve('dist/sitemap-0.xml');
  // Mirrors astro.config.mjs: @astrojs/sitemap emits the base in every <loc>,
  // so the guards must be BASE_PATH-aware or a subpath build fails them.
  const base = siteBase();
  const escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const localePrefixed = new RegExp(`^${escapedBase}/(${locales.join('|')})(/|$)`);
  const bareLocalePath = new RegExp(
    `^${escapedBase}/(?!${locales.map((locale) => `${locale}/`).join('|')})[a-z]`
  );
  const xml = readFileSync(sitemapPath, 'utf-8');
  const urls = xml.match(/<loc>([^<]+)<\/loc>/g) || [];

  it('contains only enabled-locale-prefixed URLs', () => {
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      const loc = url.replace(/<\/?loc>/g, '');
      const pathname = new URL(loc).pathname;
      expect(pathname).toMatch(localePrefixed);
    }
  });

  it('does not contain bare domain URLs without locale prefix', () => {
    for (const url of urls) {
      const loc = url.replace(/<\/?loc>/g, '');
      expect(loc).not.toBe('https://weshall.build/');
      const pathname = new URL(loc).pathname;
      expect(pathname).not.toMatch(bareLocalePath);
    }
  });
});

describe('Sitemap redirect', () => {
  const base = siteBase();

  it('/sitemap.xml redirects to the base-prefixed sitemap index', () => {
    const html = readFileSync(resolve('dist/sitemap.xml/index.html'), 'utf-8');
    // Assert the actual url= target, not a substring: a bare
    // 'url=/sitemap-index.xml' would also contain '/sitemap-index.xml'.
    expect(html).toContain(`url=${base}/sitemap-index.xml`);
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/sitemap-index\.xml">/);
  });
});
