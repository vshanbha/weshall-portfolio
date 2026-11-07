import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { locales } from '@/i18n/config';

describe('Sitemap build output', () => {
  const sitemapPath = resolve('dist/sitemap-0.xml');
  const localeAlternation = locales.join('|');
  const localePrefixed = new RegExp(`^/(${localeAlternation})/`);
  const bareLocalePath = new RegExp(
    `^/(?!${locales.map((locale) => `${locale}/`).join('|')})[a-z]`
  );

  it('contains only enabled-locale-prefixed URLs', () => {
    const xml = readFileSync(sitemapPath, 'utf-8');
    const urls = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      const loc = url.replace(/<\/?loc>/g, '');
      const pathname = new URL(loc).pathname;
      expect(pathname).toMatch(localePrefixed);
    }
  });

  it('does not contain bare domain URLs without locale prefix', () => {
    const xml = readFileSync(sitemapPath, 'utf-8');
    const urls = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
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
