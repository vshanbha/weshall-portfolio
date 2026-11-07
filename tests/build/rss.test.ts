import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defaultLocale } from '@/i18n/config';
import { ensureFreshDist } from '../helpers/dist';

/**
 * Guards the RSS changes from issue #20: item links must point at the
 * default-locale blog directly (not the locale-less URL that needs the
 * JS redirect shim), and the channel language must derive from the switch.
 */
describe('RSS feed', () => {
  const feedPath = resolve('dist/rss.xml');
  ensureFreshDist([feedPath]);

  const xml = readFileSync(feedPath, 'utf-8');
  const itemLinks = [...xml.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>/g)].map((m) => m[1]);

  it('exists with at least one item', () => {
    expect(itemLinks.length).toBeGreaterThan(0);
  });

  it('links every item to the default-locale blog post', () => {
    for (const link of itemLinks) {
      expect(link).toMatch(new RegExp(`/${defaultLocale}/blog/[^/]+/$`));
    }
  });

  it('tags the channel with the default locale', () => {
    expect(xml).toContain(`<language>${defaultLocale}</language>`);
  });
});
