import { describe, it, expect } from 'vitest';
import { locales, defaultLocale, localeNames, localeFlags, isValidLocale } from '@/i18n/config';
import { routes } from '@/i18n/routes';
import { en } from '@/i18n/translations/en';
import { de } from '@/i18n/translations/de';
import { hi } from '@/i18n/translations/hi';
import { mr } from '@/i18n/translations/mr';

/**
 * Regression tests for issue #20: locale data must match the enabled-locale
 * list exactly — no stale entries for aspirational locales, no missing keys —
 * and every translation file must mirror the English key structure.
 *
 * These invariants are also enforced at compile time (`satisfies` on routes
 * and translation files, `Record<Locale, …>` on the locale maps). These tests
 * are the runtime backstop: they catch drift in the data the types guard
 * (stale or missing entries) even if the `satisfies` clauses or the strict
 * record types are ever removed or loosened again.
 */

/** Flatten a translation object to dotted key paths (leaf values only). */
function keyPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value !== null && typeof value === 'object'
      ? keyPaths(value as Record<string, unknown>, path)
      : [path];
  });
}

const enabled = [...locales];

describe('locale invariants (issue #20)', () => {
  it('defaultLocale is an enabled locale', () => {
    expect(locales).toContain(defaultLocale);
  });

  it('every route defines slugs for exactly the enabled locales', () => {
    for (const [routeId, definition] of Object.entries(routes)) {
      const slugLocales = Object.keys(definition)
        .filter((key) => key !== 'nav')
        .sort();
      expect(slugLocales, `route "${routeId}" slug locales`).toEqual([...enabled].sort());
    }
  });

  it('localeNames covers exactly the enabled locales', () => {
    expect(Object.keys(localeNames).sort()).toEqual([...enabled].sort());
  });

  it('localeFlags covers exactly the enabled locales', () => {
    expect(Object.keys(localeFlags).sort()).toEqual([...enabled].sort());
  });

  it('aspirational locales (hi, mr) are known but not routable', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('de')).toBe(true);
    expect(isValidLocale('hi')).toBe(false);
    expect(isValidLocale('mr')).toBe(false);
  });
});

describe('translation key parity (issue #20)', () => {
  const enKeys = keyPaths(en as unknown as Record<string, unknown>).sort();

  it('English bundle is non-empty (guards the parity check itself)', () => {
    expect(enKeys.length).toBeGreaterThan(0);
  });

  for (const [name, bundle] of [
    ['de', de],
    ['hi', hi],
    ['mr', mr],
  ] as const) {
    it(`${name} has exactly the same keys as en`, () => {
      const keys = keyPaths(bundle as unknown as Record<string, unknown>).sort();
      const missing = enKeys.filter((key) => !keys.includes(key));
      const extra = keys.filter((key) => !enKeys.includes(key));
      expect(missing, 'keys missing from this locale').toEqual([]);
      expect(extra, 'keys not present in en').toEqual([]);
    });
  }
});
