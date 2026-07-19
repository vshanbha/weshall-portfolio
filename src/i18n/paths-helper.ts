/**
 * Shared helper for generating static paths for locale-prefixed pages
 * Used by all [lang]/ per-page files
 */
import { locales } from './config';

export const getStaticPathsHelper = () =>
  locales.map((lang) => ({ params: { lang } }));
