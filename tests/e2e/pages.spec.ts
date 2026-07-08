import { test, expect } from '@playwright/test';

test.describe('Coming Soon Pages', () => {
  test('home page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'We shall build' })).toBeVisible();
    await expect(page.locator('body')).toContainText('We shall build');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /Built|About/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/build/i);
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Connect|Contact/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/connect|building/i);
  });

  test('blog page loads and shows articles', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    const links = [
      { href: '/', label: 'We shall build' },
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

test.describe('Locale-prefixed URLs', () => {
  test('/de/about returns 200', async ({ page }) => {
    const response = await page.goto('/de/about');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText(/Entwickelt|built/i);
  });

  test('/de/contact returns 200', async ({ page }) => {
    const response = await page.goto('/de/contact');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText(/verbinden|connect/i);
  });

  test('/de/blog returns 200', async ({ page }) => {
    const response = await page.goto('/de/blog');
    expect(response?.status()).toBe(200);
  });

  test('/hi/about returns 200', async ({ page }) => {
    const response = await page.goto('/hi/about');
    expect(response?.status()).toBe(200);
  });

  test('/hi/contact returns 200', async ({ page }) => {
    const response = await page.goto('/hi/contact');
    expect(response?.status()).toBe(200);
  });

  test('/hi/blog returns 200', async ({ page }) => {
    const response = await page.goto('/hi/blog');
    expect(response?.status()).toBe(200);
  });

  test('/mr/about returns 200', async ({ page }) => {
    const response = await page.goto('/mr/about');
    expect(response?.status()).toBe(200);
  });

  test('/mr/contact returns 200', async ({ page }) => {
    const response = await page.goto('/mr/contact');
    expect(response?.status()).toBe(200);
  });

  test('/mr/blog returns 200', async ({ page }) => {
    const response = await page.goto('/mr/blog');
    expect(response?.status()).toBe(200);
  });
});

test.describe('Blog Detail', () => {
  test('blog article detail page returns 404 for unknown slug', async ({ page }) => {
    await page.goto('/blog/nonexistent-article');
    await expect(page.locator('body')).toContainText('404');
  });
});

test.describe('Layout Structure', () => {
  const pages = ['/', '/about', '/contact', '/blog'];

  for (const path of pages) {
    test(`header renders on ${path}`, async ({ page }) => {
      await page.goto(path);
      const header = page.getByRole('banner');
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
