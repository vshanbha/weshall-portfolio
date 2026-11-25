import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { locales } from '@/i18n/config';
import { ensureFreshDist } from '../helpers/dist';

/**
 * Title-length guard for the seoTitle mechanism: SEO.astro composes
 * `${title} - ${siteConfig.name}`, and search engines display ~60 chars.
 * Every article page's emitted <title> must stay within that — either
 * because the frontmatter title is short enough, or because the article
 * carries a short seoTitle (used only for the <title>/og:title tag).
 */

const TITLE_PATTERN = /<title>([^<]*)<\/title>/;
const MAX_TITLE_LENGTH = 60;

/** Decode the handful of entities HTML escaping produces — crawlers display
 * the decoded text, so the ~60-char display budget applies to it. */
function decodeTitle(encoded: string): string {
  return encoded
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&amp;', '&');
}

describe('Article title lengths', () => {
  const dist = resolve('dist');
  ensureFreshDist([join(dist, 'index.html')]);

  it('every article <title> stays within ~60 chars (composed with the site name)', () => {
    let checked = 0;
    for (const locale of locales) {
      const blogDir = join(dist, locale, 'blog');
      // Locales without articles have no blog output directory.
      if (!existsSync(blogDir)) continue;
      for (const entry of readdirSync(blogDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const html = readFileSync(join(blogDir, entry.name, 'index.html'), 'utf-8');
        const match = html.match(TITLE_PATTERN);
        expect(match, `${locale}/blog/${entry.name} has no <title>`).toBeTruthy();
        const decoded = decodeTitle(match![1]);
        expect(
          decoded.length,
          `${locale}/blog/${entry.name} <title> is ${decoded.length} chars: "${decoded}"`
        ).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});
