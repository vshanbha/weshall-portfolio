import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  test: {
    exclude: ['tests/e2e/**', 'node_modules/**'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}'],
    // Some tests rebuild the site into dist/ (article-hero). Files must run one
    // at a time so no test reads dist/ while another is rebuilding it.
    fileParallelism: false,
  },
});
