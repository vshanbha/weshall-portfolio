/**
 * Base-aware locale URL helpers shared by astro.config.mjs, the build tests
 * and the redirect shims.
 *
 * `@astrojs/sitemap` emits absolute URLs that include the Astro base, and
 * config redirects are written verbatim into meta-refresh targets — so any
 * locale-path logic must account for BASE_PATH. One derivation here instead
 * of a copy per caller (issue #20).
 *
 * Iron Law exception (never `process.env`): this module reads
 * `process.env.BASE_PATH` because `astro.config.mjs` runs before — and
 * outside — the `astro:env` pipeline, and every consumer here (config,
 * build tests, redirect shims) executes at build time only, never in the
 * browser.
 */
import { locales } from './config';

/** The Astro base path normalised to '/…' without a trailing slash ('' on the root domain). */
export function siteBase(): string {
  const raw = process.env.BASE_PATH || '/';
  const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeadingSlash.replace(/\/$/, '');
}

/** True when a pathname lives under any enabled locale at the current base. */
export function isLocalePath(pathname: string): boolean {
  const base = siteBase();
  return locales.some((locale) => pathname.startsWith(`${base}/${locale}/`));
}

/** Strip the base from an absolute pathname to get the path under dist/. */
export function stripSiteBase(pathname: string): string {
  const base = siteBase();
  if (!base) return pathname;
  if (pathname === base) return '/';
  // Require the '/' boundary so a sibling like '/base-staging/…' is untouched.
  return pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
}
