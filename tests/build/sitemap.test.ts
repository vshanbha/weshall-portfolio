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
  const localePrefixed = new RegExp(`^${base}/(${locales.join('|')})(/|$)`);
  const bareLocalePath = new RegExp(
    `^${base}/(?!${locales.map((locale) => `${locale}/`).join('|')})[a-z]`
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
  it('/sitemap.xml redirects to /sitemap-index.xml', () => {
    const html = readFileSync(resolve('dist/sitemap.xml/index.html'), 'utf-8');
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain('/sitemap-index.xml');
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/sitemap-index\.xml">/);
  });
});
