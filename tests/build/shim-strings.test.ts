import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defaultLocale } from '@/i18n/config';
import { t } from '@/i18n/index';
import { ensureFreshDist } from '../helpers/dist';

/**
 * String Integrity guard (issue #52): the redirect shims and the 404 page
 * must render their visible text from the default-locale bundle — never
 * hardcoded English. A hardcoded string passes only while it happens to
 * match the bundle; any bundle edit or default-locale flip fails here.
 */
describe('Shim and 404 strings come from the default-locale bundle', () => {
  const rootShim = resolve('dist/index.html');
  const notFound = resolve('dist/404.html');
  const blogShim = resolve('dist/blog/zeroclaw-personal-ai-assistant/index.html');
  ensureFreshDist([rootShim, notFound, blogShim]);

  it('root shim fallback link is the bundle string', () => {
    expect(readFileSync(rootShim, 'utf8')).toContain(t('redirect.home', defaultLocale));
  });

  it('blog shim title and sentence are bundle strings', () => {
    const html = readFileSync(blogShim, 'utf8');
    expect(html).toContain(`<title>${t('redirect.title', defaultLocale)}</title>`);
    expect(html).toContain(t('redirect.toArticle', defaultLocale));
    expect(html).toContain(`>${t('redirect.articleName', defaultLocale)}</a>`);
  });

  it('404 page strings are bundle strings', () => {
    // Astro escapes apostrophes in text nodes (couldn't → couldn&#39;t);
    // decode before matching the raw bundle strings.
    const html = readFileSync(notFound, 'utf8').replace(/&#39;/g, "'");
    expect(html).toContain(t('common.notFound'));
    expect(html).toContain(t('common.notFoundDescription'));
    expect(html).toContain(t('common.notFoundMessage'));
    expect(html).toContain(t('common.backHome'));
  });
});
