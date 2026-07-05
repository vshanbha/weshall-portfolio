---
name: testing
description: Use when writing, running, or debugging unit tests with Vitest or end-to-end tests with Playwright. Covers test patterns, mocking, coverage, and CI integration for Astro projects.
---

# Testing

## Overview

This skill covers testing best practices for the Velocity Astro project using **Vitest** (unit/integration) and **Playwright** (E2E). Tests are already configured — follow these patterns rather than reinventing approaches.

## Quick Reference

| Task | Command |
|------|---------|
| Run unit tests | `pnpm test` |
| Run tests in watch mode | `pnpm test -- --watch` |
| Run tests with coverage | `pnpm test -- --coverage` |
| Run E2E tests | `pnpm test:e2e` |
| Run specific test file | `pnpm test -- path/to/file.test.ts` |
| Run tests matching pattern | `pnpm test -- -t "pattern"` |

## Vitest (Unit/Integration)

### Configuration

- Config: `vitest.config.ts` (extends Astro/Vite config)
- Test files: `**/*.test.ts` or `**/*.spec.ts` colocated with source files
- Coverage: `@vitest/coverage-v8`

### Writing Tests

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('ComponentName', () => {
  it('renders correctly', () => {
    // Arrange
    const props = { title: 'Test' };
    
    // Act
    const result = render(ComponentName, props);
    
    // Assert
    expect(result).toMatchSnapshot();
  });
});
```

### Patterns to Follow

- **Co-locate tests** with the file they test: `Button.astro` → `Button.test.ts`
- **Use descriptive test names** that explain expected behaviour
- **Arrange-Act-Assert** structure for every test
- **Mock external dependencies** (API calls, filesystem) — never hit real services
- **Test edge cases**: empty states, error states, loading states
- **Snapshot tests** for component rendering (update intentionally, never blindly)

### Common Vitest Patterns

```typescript
// Mocking a fetch call
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: 'test' }),
}));

// Mocking a module
vi.mock('@/lib/utils', () => ({
  cn: (...classes: string[]) => classes.join(' '),
}));

// Async tests
it('loads data', async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});
```

## Playwright (E2E)

### Configuration

- Config: `playwright.config.ts`
- Test files: `tests/**/*.spec.ts` or `tests/**/*.test.ts`
- Browsers: Chromium (primary), Firefox, WebKit

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and displays hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigates to blog', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/blog"]');
    await expect(page).toHaveURL('/blog');
  });
});
```

### Patterns to Follow

- **Test user journeys**, not implementation details
- **Use page object models** for repeated page interactions
- **Wait for network idle** before assertions when testing dynamic content
- **Test responsive layouts** with `page.setViewportSize()`
- **Use `expect(page).toHaveScreenshot()`** for visual regression testing
- **Never test third-party services** — mock or stub external APIs

### Best Practices

- **Run full validation before committing:** `pnpm validate`
- **Keep E2E tests focused** — one journey per test
- **Use data-testid attributes** for reliable selectors (not CSS classes)
- **Clean up test data** — tests should be idempotent
- **Parallelise wisely** — E2E tests that share state must run serially

## When to Use Which

| Scenario | Tool |
|----------|------|
| Component rendering | Vitest |
| Utility function logic | Vitest |
| API route behaviour | Vitest |
| Full page navigation | Playwright |
| Form submission flow | Playwright |
| Visual regression | Playwright |
| Cross-browser testing | Playwright |
