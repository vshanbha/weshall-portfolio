/**
 * i18n Configuration
 * Defines supported locales and default language settings
 */

/**
 * Enabled languages — the single switch for what is live (the Velocity
 * `locales.mjs` pattern). Aspirational locales (hi, mr) keep their
 * translation files, type-checked via `satisfies SiteStrings`; activation
 * is adding the code here — see issue #20.
 */
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
};

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from URL path
 */
export function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}

/**
 * Remove locale prefix from path
 */
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return '/' + segments.slice(1).join('/');
  }

  return path;
}

/**
 * Add locale prefix to path
 */
export function localePath(path: string, locale: Locale): string {
  // Pathname-only normalisation: split off any fragment/query first so the
  // trailing slash lands on the pathname ('/about#x' → '/en/about/#x').
  const cleanPath = removeLocaleFromPath(path);
  const split = cleanPath.search(/[?#]/);
  const pathname = split === -1 ? cleanPath : cleanPath.slice(0, split);
  const suffix = split === -1 ? '' : cleanPath.slice(split);
  return `/${locale}${pathname.replace(/\/+$/, '')}/${suffix}`;
}
