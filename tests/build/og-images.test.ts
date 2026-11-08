import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { locales } from '@/i18n/config';
import { stripSiteBase } from '@/i18n/url';
import { ensureFreshDist } from '../helpers/dist';

/**
 * OG image coverage for the localised pages (SEO audit fix): every og:image
 * URL referenced by an HTML file under an enabled locale's dist/<locale>
 * directory must resolve to a generated file in dist/, or social crawlers
 * get a 404 on the card image.
 */

const OG_IMAGE_PATTERN = /<meta property="og:image" content="([^"]+)"/g;

function collectHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(entryPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }
  return files;
}

/** Absolute or root-relative og:image content → pathname under dist. */
function toPathname(content: string): string {
  const pathname = content.startsWith('http') ? new URL(content).pathname : content.split('?')[0];
  // og:image URLs include the Astro base; dist/ output paths do not.
  return stripSiteBase(pathname);
}

describe('Locale OG image references', () => {
  const dist = resolve('dist');
  // Collection-time guard: the directory walk below runs while this file is
  // being collected, before any beforeAll could run. Locale index pages
  // derive from the switch; og/de.png is this suite's German-homepage
  // assertion, not locale state.
  ensureFreshDist([
    ...locales.map((locale) => join(dist, locale, 'index.html')),
    join(dist, 'og', 'de.png'),
  ]);
  const pages = locales.flatMap((locale) => collectHtmlFiles(join(dist, locale)));

  it('resolves every referenced og:image to a generated file', () => {
    expect(pages.length).toBeGreaterThan(0);

    const missing: string[] = [];
    for (const page of pages) {
      const html = readFileSync(page, 'utf8');
      for (const [, content] of html.matchAll(OG_IMAGE_PATTERN)) {
        const file = join(dist, toPathname(content).replace(/^\//, ''));
        if (!existsSync(file)) {
          missing.push(`${page.slice(dist.length + 1)} -> ${toPathname(content)}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  // The German homepage specifically — the 'de' literals below are the point
  // of this assertion, not locale state to derive.
  it('serves the German homepage a locale-prefixed PNG card over 1KB', () => {
    const html = readFileSync(join(dist, 'de', 'index.html'), 'utf8');
    const [first] = html.matchAll(OG_IMAGE_PATTERN);
    expect(first).toBeDefined();
    const content = first[1];

    // The German home card must be the /de variant, not the English one.
    expect(toPathname(content as string)).toBe('/og/de.png');

    const file = join(dist, 'og', 'de.png');
    expect(existsSync(file)).toBe(true);
    const png = readFileSync(file);
    // PNG magic bytes: the file is a real image, not an error document.
    expect(png.subarray(0, 8)).toEqual(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    );
    expect(png.length).toBeGreaterThan(1024);
  });
});
