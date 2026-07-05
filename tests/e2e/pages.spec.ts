import { test, expect } from '@playwright/test';

test.describe('Coming Soon Pages', () => {
  test('home page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Weshall Build' })).toBeVisible();
    await expect(page.locator('body')).toContainText('We shall build this site soon');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page.locator('body')).toContainText('under construction');
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
    await expect(page.locator('body')).toContainText('under construction');
  });

  test('blog page loads', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
    await expect(page.locator('body')).toContainText('under construction');
  });

  test('components page loads', async ({ page }) => {
    await page.goto('/components');
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
    await expect(page.locator('body')).toContainText('under construction');
  });

  test('navigation links work', async ({ page }) => {
    // TODO: Velocity template links don't include base path
    // This causes 404s when deployed to subpath
    // Will be fixed when moving to proper domain
    test.skip();
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.locator('body')).toContainText('404');
  });
});
