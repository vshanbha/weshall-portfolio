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
    // Several suites read build output and may rebuild it (tests/build,
    // tests/components). Files must run one at a time so no test reads
    // dist/ while another is rebuilding it.
    fileParallelism: false,
    // A legitimate nested `pnpm build` takes longer than the 10s default
    // (cold caches exceed it in CI — issue #20 follow-up).
    hookTimeout: 60000,
  },
});
