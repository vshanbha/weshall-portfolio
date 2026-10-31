/**
 * i18n Utilities
 * Translation functions and helpers
 */

import { type Locale, defaultLocale } from './config';
import { en, type TranslationKey } from './translations/en';
import { de } from './translations/de';
import { hi } from './translations/hi';
import { mr } from './translations/mr';

// Translation map
const translations = {
  en,
  de,
  hi,
  mr,
} as const;

// TranslationKey is defined next to the English source (see
// ./translations/en) so route/config modules can import it without a
// circular dependency through this index.
export type { TranslationKey } from './translations/en';

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if not found
    }
  }

  return typeof result === 'string' ? result : path;
}

/**
 * Get translation for a key
 */
export function t(
  key: TranslationKey,
  locale: Locale = defaultLocale,
  params?: Record<string, string | number>
): string {
  const translation = translations[locale] || translations[defaultLocale];
  let text = getNestedValue(translation as unknown as Record<string, unknown>, key);

  // Replace parameters like {year}, {name}
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(value));
    });
  }

  return text;
}

/**
 * Create a translation function bound to a specific locale
 */
export function useTranslations(locale: Locale) {
  return (key: TranslationKey, params?: Record<string, string | number>) => t(key, locale, params);
}

/**
 * Get all translations for a locale
 */
export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

// Re-export config
export { locales, defaultLocale, type Locale } from './config';

// Re-export routes and helpers for translated URLs
export { routes, type RouteId, routeIds, isValidRouteId, type NavConfig } from './routes';
export {
  getLocalizedPath,
  resolveRouteFromPath,
  switchLocale,
  routeHasLocale,
  getRouteTranslations,
  getRouteSlug,
  isRoute,
  getNavRoutes,
  type NavRoute,
  type ResolvedRoute,
} from './helpers';
