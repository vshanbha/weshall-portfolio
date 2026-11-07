/**
 * Base-aware locale URL helpers shared by astro.config.mjs and the build
 * tests.
 *
 * `@astrojs/sitemap` emits absolute URLs that include the Astro base, and
 * config redirects are written verbatim into meta-refresh targets — so any
 * locale-path logic must account for BASE_PATH. One derivation here instead
 * of a copy per caller (issue #20).
 */
import { locales } from './config';

/** The Astro base path without its trailing slash ('' on the root domain). */
export function siteBase(): string {
  return (process.env.BASE_PATH || '/').replace(/\/$/, '');
}

/** True when a pathname lives under any enabled locale at the current base. */
export function isLocalePath(pathname: string): boolean {
  const base = siteBase();
  return locales.some((locale) => pathname.startsWith(`${base}/${locale}/`));
}

/** Strip the base from an absolute pathname to get the path under dist/. */
export function stripSiteBase(pathname: string): string {
  const base = siteBase();
  return base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
}
