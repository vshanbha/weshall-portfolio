import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Sitemap build output', () => {
  const sitemapPath = resolve('dist/sitemap-0.xml');

  it('contains only /en/ prefixed URLs', () => {
    const xml = readFileSync(sitemapPath, 'utf-8');
    const urls = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      const loc = url.replace(/<\/?loc>/g, '');
      const pathname = new URL(loc).pathname;
      expect(pathname).toMatch(/^\/en\//);
    }
  });

  it('does not contain bare domain URLs without locale prefix', () => {
    const xml = readFileSync(sitemapPath, 'utf-8');
    const urls = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    for (const url of urls) {
      const loc = url.replace(/<\/?loc>/g, '');
      expect(loc).not.toBe('https://weshall.build/');
      const pathname = new URL(loc).pathname;
      expect(pathname).not.toMatch(/^\/(?!en\/)[a-z]/);
    }
  });
});
