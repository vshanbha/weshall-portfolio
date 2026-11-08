/**
 * Route Definitions for Translated URLs
 *
 * This file defines the URL slugs for each route in each supported locale.
 * The route ID (key) is used internally to reference routes, while the values
 * define the actual URL segments for each language.
 *
 * Example:
 * - Route 'about' → /en/about (en) and /de/about (de) — slugs currently
 *   mirror English; they may diverge once German URLs are decided
 *
 * Note: Empty string '' represents the root/home page.
 */

import type { Locale } from './config';
import type { TranslationKey } from './translations/en';

/**
 * Navigation configuration for a route
 */
export type NavConfig = {
  /** Whether to show this route in the navbar */
  show: boolean;
  /** Sort order in navigation (lower = first) */
  order: number;
  /** Translation key for the navigation label (e.g., 'nav.about') */
  label: TranslationKey;
};

/**
 * A route definition maps each locale to its URL slug
 * Optionally includes navigation configuration
 */
export type RouteDefinition = Record<Locale, string> & {
  nav?: NavConfig;
};

/**
 * Route definitions for all static pages
 *
 * Keys are internal route IDs (use these in LocalizedLink and getLocalizedPath)
 * Values are the URL slugs for each locale, plus optional nav config
 *
 * Rules:
 * - Use lowercase letters and hyphens only (no underscores, no special chars)
 * - Empty string '' for home/root page
 * - Do not include leading or trailing slashes
 */
export const routes = {
  // Home page (root) - not shown in nav (logo links there)
  home: {
    en: '',
    de: '',
    nav: { show: false, order: 0, label: 'nav.home' },
  },

  // Blog section
  blog: {
    en: 'blog',
    de: 'blog',
    nav: { show: true, order: 2, label: 'nav.blog' },
  },

  // Services page
  services: {
    en: 'services',
    de: 'services',
    nav: { show: true, order: 3, label: 'nav.services' },
  },

  // Static pages
  about: {
    en: 'about',
    de: 'about',
    nav: { show: true, order: 4, label: 'nav.about' },
  },
  contact: {
    en: 'contact',
    de: 'contact',
    nav: { show: true, order: 5, label: 'nav.contact' },
  },

  // Philosophy page — linked from About, deliberately not shown in nav
  // (the nav.label below is never rendered: getNavRoutes filters on show
  // before the label key is ever translated)
  philosophy: {
    en: 'philosophy',
    de: 'philosophy',
    nav: { show: false, order: 6, label: 'nav.philosophy' },
  },
} as const satisfies Record<string, RouteDefinition>;

/**
 * Type-safe route identifier
 */
export type RouteId = keyof typeof routes;

/**
 * Routes whose DETAIL pages (sub-pages under the route, e.g. blog posts)
 * exist in the default (English) locale only.
 *
 * The INDEX of these routes is localised in every active locale: German
 * navigation and the German hero link to /de/blog, which serves German chrome
 * and lists the English posts. The posts themselves stay at /en/blog/<slug>/;
 * detail pages pick up translated content automatically via the content locale
 * (see [lang]/blog/[...slug].astro).
 *
 * Consequences:
 * - getRouteTranslations() emits an en+de hreflang pair for the index, but
 *   default-locale-only alternates for detail pages.
 * - switchLocale() sends a detail-page switch to the target locale's
 *   localised index (e.g. /en/blog/my-post → /de/blog).
 */
export const englishOnlyDetailRoutes: readonly RouteId[] = ['blog'];

/**
 * Get all available route IDs
 */
export const routeIds = Object.keys(routes) as RouteId[];

/**
 * Validate if a string is a valid route ID
 */
export function isValidRouteId(id: string): id is RouteId {
  return id in routes;
}
