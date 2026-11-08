/**
 * Route Helper Functions for Translated URLs
 *
 * These utilities help with:
 * - Generating localized paths from route IDs
 * - Resolving route info from URL paths
 * - Switching locale while maintaining the current page
 * - Getting all translations for a route (for hreflang tags)
 */

import { type Locale, locales, defaultLocale, isValidLocale } from './config';
import { routes, englishOnlyDetailRoutes, type RouteId } from './routes';
import type { TranslationKey } from './translations/en';

/**
 * Get the localized URL path for a route
 *
 * @param routeId - The internal route identifier (e.g., 'about', 'blog')
 * @param locale - The target locale
 * @returns The full path with locale prefix. Index routes exist in every
 *   active locale, so no fallback to the default locale is needed.
 *
 * @example
 * getLocalizedPath('about', 'en') // → '/en/about'
 * getLocalizedPath('about', 'de') // → '/de/about'
 * getLocalizedPath('home', 'de')  // → '/de'
 * getLocalizedPath('blog', 'de')  // → '/de/blog' (the index is localised)
 */
export function getLocalizedPath(routeId: RouteId, locale: Locale): string {
  const slug = routes[routeId][locale];

  // Always prefix with locale
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

/**
 * Build a reverse lookup map: { 'en/about': { routeId: 'about', locale: 'en' } }
 * This is computed once and cached for performance
 */
function buildPathLookup(): Map<string, { routeId: RouteId; locale: Locale }> {
  const lookup = new Map<string, { routeId: RouteId; locale: Locale }>();

  for (const [routeId, slugs] of Object.entries(routes)) {
    for (const locale of locales) {
      const slug = slugs[locale as Locale];
      // Create lookup key: locale/slug or just locale for home
      const key = slug ? `${locale}/${slug}` : locale;
      lookup.set(key, { routeId: routeId as RouteId, locale: locale as Locale });
    }
  }

  return lookup;
}

const pathLookup = buildPathLookup();

/**
 * Result from resolving a route from a path
 */
export type ResolvedRoute = {
  routeId: RouteId;
  locale: Locale;
  /** Extra path segments after the route (e.g., blog post slug) */
  extra?: string;
};

/**
 * Resolve route information from a URL path
 *
 * @param pathname - The URL pathname (e.g., '/de/about')
 * @returns The route ID, locale, and any extra path segments, or null if not a known route
 *
 * @example
 * resolveRouteFromPath('/about')           // → { routeId: 'about', locale: 'en' }
 * resolveRouteFromPath('/de/about')        // → { routeId: 'about', locale: 'de' }
 * resolveRouteFromPath('/blog/my-post')    // → { routeId: 'blog', locale: 'en', extra: 'my-post' }
 * resolveRouteFromPath('/de/blog/my-post') // → { routeId: 'blog', locale: 'de', extra: 'my-post' }
 * resolveRouteFromPath('/unknown')         // → null
 */
export function resolveRouteFromPath(pathname: string): ResolvedRoute | null {
  // Clean the path
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/').filter(Boolean);

  // Determine locale from first segment
  let locale: Locale = defaultLocale;
  let slugSegments = segments;

  if (segments.length > 0 && isValidLocale(segments[0])) {
    locale = segments[0] as Locale;
    slugSegments = segments.slice(1);
  }

  // Build lookup key
  const slug = slugSegments.join('/');
  const lookupKey = slug ? `${locale}/${slug}` : locale;

  // Try exact match first
  const match = pathLookup.get(lookupKey);
  if (match) {
    return match;
  }

  // For root path without locale, it's home in default locale
  if (cleanPath === '' || cleanPath === '/') {
    return { routeId: 'home', locale: defaultLocale };
  }

  // Check if it's just a locale (home page for that locale)
  if (segments.length === 1 && isValidLocale(segments[0])) {
    return { routeId: 'home', locale: segments[0] as Locale };
  }

  // Handle nested routes like blog posts: /blog/my-post or /de/blog/my-post
  // Check if the first slug segment matches a known route
  if (slugSegments.length > 1) {
    const firstSlug = slugSegments[0];
    const firstSlugLookupKey = `${locale}/${firstSlug}`;
    const parentMatch = pathLookup.get(firstSlugLookupKey);

    if (parentMatch) {
      // Found a parent route, the rest is extra path info
      const extra = slugSegments.slice(1).join('/');
      return {
        routeId: parentMatch.routeId,
        locale,
        extra,
      };
    }

    // Fallback for a locale whose slug differs from the lookup above —
    // currently unreachable, since pathLookup is built from the same table.
    // We need to find which route this slug belongs to.
    // TODO: verify and remove (collision semantics: pathLookup keeps the
    // last route for a shared slug, this loop the first). Flagged in #52.
    for (const [routeId, routeSlugs] of Object.entries(routes)) {
      if (routeSlugs[locale] === firstSlug) {
        const extra = slugSegments.slice(1).join('/');
        return {
          routeId: routeId as RouteId,
          locale,
          extra,
        };
      }
    }
  }

  return null;
}

/**
 * Switch to a different locale while staying on the same page
 *
 * @param currentPath - The current URL pathname
 * @param targetLocale - The locale to switch to
 * @returns The new path in the target locale, or the home page if route unknown
 *
 * @example
 * switchLocale('/about', 'de')           // → '/de/about'
 * switchLocale('/de/about', 'en')        // → '/en/about'
 * switchLocale('/en/blog', 'de')         // → '/de/blog'
 * switchLocale('/en/blog/my-post', 'de') // → '/de/blog' (no German post; the index lists it)
 * switchLocale('/de/blog', 'en')         // → '/en/blog'
 * switchLocale('/unknown', 'de')         // → '/de' (fallback to home)
 */
export function switchLocale(currentPath: string, targetLocale: Locale): string {
  const resolved = resolveRouteFromPath(currentPath);

  if (resolved) {
    // A detail page of an English-only route (e.g. a blog post) has no
    // counterpart in the target locale: send the reader to that locale's
    // localised index rather than the home page or a page that 404s.
    if (
      resolved.extra &&
      englishOnlyDetailRoutes.includes(resolved.routeId) &&
      targetLocale !== defaultLocale
    ) {
      return getLocalizedPath(resolved.routeId, targetLocale);
    }

    const basePath = getLocalizedPath(resolved.routeId, targetLocale);

    // If there's extra path info (like blog post slug), append it
    if (resolved.extra) {
      // Ensure we don't double-slash
      const separator = basePath.endsWith('/') ? '' : '/';
      return `${basePath}${separator}${resolved.extra}`;
    }

    return basePath;
  }

  // Fallback: if we can't resolve the route, go to home page for target locale
  return getLocalizedPath('home', targetLocale);
}

/**
 * Get all localized URLs for a route (for hreflang tags)
 *
 * Index pages are listed for every active locale. Detail pages (with an
 * `extra` slug) of English-only routes are listed for the default locale
 * only, so hreflang never advertises a page that would 404.
 *
 * @param routeId - The route identifier
 * @param extra - Optional detail slug after the route (e.g. a blog post)
 * @returns An array of { locale, path } for the relevant locales
 *
 * @example
 * getRouteTranslations('about')
 * // → [
 * //   { locale: 'en', path: '/en/about/' },
 * //   { locale: 'de', path: '/de/about/' }
 * // ]
 * getRouteTranslations('blog')
 * // → [
 * //   { locale: 'en', path: '/en/blog/' },
 * //   { locale: 'de', path: '/de/blog/' }
 * // ]
 * getRouteTranslations('blog', 'my-post')
 * // → [{ locale: 'en', path: '/en/blog/my-post/' }]
 */
export function getRouteTranslations(
  routeId: RouteId,
  extra?: string
): Array<{ locale: Locale; path: string }> {
  const targets: readonly Locale[] =
    extra && englishOnlyDetailRoutes.includes(routeId) ? [defaultLocale] : locales;

  return targets.map((locale) => {
    const basePath = getLocalizedPath(routeId, locale);
    const path = extra ? `${basePath}/${extra}/` : `${basePath}/`;
    return { locale, path };
  });
}

/**
 * Get the slug for a route in a specific locale
 *
 * @param routeId - The route identifier
 * @param locale - The locale
 * @returns The URL slug (without locale prefix)
 *
 * @example
 * getRouteSlug('about', 'de') // → 'about' (slugs are currently identical to English)
 */
export function getRouteSlug(routeId: RouteId, locale: Locale): string {
  return routes[routeId][locale];
}

/**
 * Check if a path matches a specific route
 *
 * @param pathname - The URL pathname to check
 * @param routeId - The route to match against
 * @returns True if the path matches the route in any locale
 */
export function isRoute(pathname: string, routeId: RouteId): boolean {
  const resolved = resolveRouteFromPath(pathname);
  return resolved?.routeId === routeId;
}

/**
 * Navigation route information
 */
export type NavRoute = {
  routeId: RouteId;
  label: TranslationKey;
  order: number;
  path: string;
};

/**
 * Get routes that should appear in navigation, sorted by order
 *
 * @param locale - The locale to get paths for (defaults to defaultLocale)
 * @returns Array of navigation routes with their translation keys and localized paths
 *
 * @example
 * const navRoutes = getNavRoutes('en');
 * // → [
 * //   { routeId: 'blog', label: 'nav.blog', order: 2, path: '/en/blog' },
 * //   { routeId: 'services', label: 'nav.services', order: 3, path: '/en/services' },
 * //   { routeId: 'about', label: 'nav.about', order: 4, path: '/en/about' },
 * //   { routeId: 'contact', label: 'nav.contact', order: 5, path: '/en/contact' },
 * // ]
 */
export function getNavRoutes(locale: Locale = defaultLocale): NavRoute[] {
  return Object.entries(routes)
    .filter(([_, route]) => route.nav?.show === true)
    .map(([routeId, route]) => ({
      routeId: routeId as RouteId,
      label: route.nav!.label,
      order: route.nav!.order,
      path: getLocalizedPath(routeId as RouteId, locale),
    }))
    .sort((a, b) => a.order - b.order);
}

// Re-export route types for convenience
export { type RouteId } from './routes';
