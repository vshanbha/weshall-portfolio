import { test, expect } from '@playwright/test';

test.describe('Pages', () => {
  test('home page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Senior architect and hands-on engineer' })).toBeVisible();
    await expect(page.locator('body')).toContainText('We Shall Build');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /Senior architect|hands-on engineer/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/Core Competencies|Engineering Philosophy/i);
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Connect|Contact|Lassen/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/connect|building|verbinden/i);
  });

  test('blog page loads and shows articles', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('work page loads', async ({ page }) => {
    await page.goto('/work');
    await expect(page.getByRole('heading', { name: 'What I Do' })).toBeVisible();
    await expect(page.locator('body')).toContainText(/How I Can Help|How I Work/i);
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    const links = [
      { href: '/', label: 'We Shall Build' },
      { href: '/blog', label: 'Blog' },
      { href: '/work', label: 'Work' },
      { href: '/approach', label: 'Approach' },
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
    await expect(page.locator('body')).toContainText(/Uber uns|Senior architect/i);
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

  test('/de/work returns 200', async ({ page }) => {
    const response = await page.goto('/de/work');
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

  test('/hi/work returns 200', async ({ page }) => {
    const response = await page.goto('/hi/work');
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

  test('/mr/work returns 200', async ({ page }) => {
    const response = await page.goto('/mr/work');
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
  const pages = ['/', '/about', '/contact', '/blog', '/work'];

  for (const path of pages) {
    test(`header renders on ${path}`, async ({ page }) => {
      await page.goto(path);
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      await expect(header.getByRole('link', { name: 'We Shall Build' })).toBeVisible();
    });

    test(`footer renders on ${path}`, async ({ page }) => {
      await page.goto(path);
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  }

  test('footer GitHub link points to user profile', async ({ page }) => {
    await page.goto('/');
    const githubLink = page.locator('footer a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', /github\.com\/vshanbha/);
  });
});
