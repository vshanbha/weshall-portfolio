import { test, expect } from '@playwright/test';

test.describe('Coming Soon Pages', () => {
  test('home page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'We shall build' })).toBeVisible();
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
    await page.goto('/');
    const links = [
      { href: '/', label: 'We shall build' },
      { href: '/components', label: 'Components' },
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ];
    for (const link of links) {
      await page.getByRole('link', { name: link.label }).first().click();
      await expect(page).toHaveURL(link.href);
    }
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.locator('body')).toContainText('404');
  });
});

test.describe('Layout Structure', () => {
  const pages = ['/', '/about', '/contact', '/blog', '/components'];

  for (const path of pages) {
    test(`header renders on ${path}`, async ({ page }) => {
      await page.goto(path);
      const header = page.locator('header');
      await expect(header).toBeVisible();
      await expect(header.getByRole('link', { name: 'We shall build' })).toBeVisible();
    });

    test(`footer renders on ${path}`, async ({ page }) => {
      await page.goto(path);
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  }

  test('footer GitHub link points to project repo', async ({ page }) => {
    await page.goto('/');
    const githubLink = page.locator('footer a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', /vshanbha\/weshall-portfolio/);
  });
});
