import { describe, it, expect } from 'vitest';
import { getLocalizedPath, switchLocale, getRouteTranslations, getNavRoutes } from '@/i18n/helpers';
import { localePath } from '@/i18n/config';
import type { RouteId } from '@/i18n/routes';

/**
 * Contract tests for the trailing-slash link forms: every internal link the
 * route helpers emit must be slash-terminated so it matches the canonical
 * (directory-index) URLs that dist/ produces — the sitewide link-hygiene
 * pass made canonicals, og:url, sitemap and internal hrefs agree.
 */

const slashless = (routes: RouteId[], locale: Parameters<typeof getLocalizedPath>[1]) =>
  routes.map((routeId) => [routeId, locale, getLocalizedPath(routeId, locale)] as const);

describe('getLocalizedPath', () => {
  it.each(slashless(['about', 'blog', 'services', 'contact', 'philosophy'], 'en'))(
    '%s (en) ends with exactly one trailing slash',
    (_routeId, _locale, path) => {
      expect(path).toMatch(/^\/en\/[a-z-]+\/$/);
    }
  );

  it('home ends with exactly one trailing slash in every locale', () => {
    expect(getLocalizedPath('home', 'en')).toBe('/en/');
    expect(getLocalizedPath('home', 'de')).toBe('/de/');
  });

  it('never double-slashes (regression: slug concatenators dropped their own separator)', () => {
    for (const locale of ['en', 'de'] as const) {
      for (const routeId of ['about', 'blog', 'home', 'services'] as RouteId[]) {
        expect(getLocalizedPath(routeId, locale)).not.toMatch(/\/\//);
      }
    }
  });
});

describe('switchLocale', () => {
  it('switches a static page with the trailing slash', () => {
    expect(switchLocale('/de/about', 'en')).toBe('/en/about/');
    expect(switchLocale('/en/blog/', 'de')).toBe('/de/blog/');
  });

  it('appends the detail slug with the trailing slash', () => {
    expect(switchLocale('/en/blog/my-post/', 'en')).toBe('/en/blog/my-post/');
    expect(switchLocale('/en/blog/my-post/', 'de')).toBe('/de/blog/');
  });

  it('falls back to the target-locale home with the trailing slash', () => {
    expect(switchLocale('/unknown', 'de')).toBe('/de/');
  });
});

describe('localePath', () => {
  it('slash-terminates pathname-only inputs', () => {
    expect(localePath('/impressum', 'en')).toBe('/en/impressum/');
    expect(localePath('/datenschutz/', 'de')).toBe('/de/datenschutz/');
  });

  it('lands the trailing slash before a fragment, not after it', () => {
    expect(localePath('/about#editorial-standards', 'en')).toBe('/en/about/#editorial-standards');
  });
});

describe('getRouteTranslations', () => {
  it('emits slash-terminated index paths for every locale', () => {
    expect(getRouteTranslations('about')).toEqual([
      { locale: 'en', path: '/en/about/' },
      { locale: 'de', path: '/de/about/' },
    ]);
  });

  it('appends detail slugs with a single trailing slash', () => {
    expect(getRouteTranslations('blog', 'my-post')).toEqual([
      { locale: 'en', path: '/en/blog/my-post/' },
    ]);
  });
});

describe('getNavRoutes', () => {
  it('emits slash-terminated nav paths', () => {
    for (const route of getNavRoutes('en')) {
      expect(route.path).toMatch(/^\/en\/[a-z-]+\/$/);
    }
  });
});
