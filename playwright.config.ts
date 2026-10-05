import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Astro 7.2+ backgrounds `astro preview` when it detects an agentic
    // environment, which makes the foreground process exit and fails Playwright's
    // webServer readiness check. ASTRO_PREVIEW_BACKGROUND forces foreground mode.
    command: 'ASTRO_PREVIEW_BACKGROUND=1 pnpm build && ASTRO_PREVIEW_BACKGROUND=1 pnpm preview',
    url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
