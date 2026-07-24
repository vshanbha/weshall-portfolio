import { test, expect } from '@playwright/test';

test.describe('Pages', () => {
  test('home page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Build what matters.' }).first()).toBeVisible();
    await expect(page.locator('body')).toContainText('We Shall Build');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /Origin/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/Mumbai|What I do/i);
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Let.s talk|Kontakt/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/LinkedIn|Upwork/i);
  });

  test('blog page loads and shows articles', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('services page loads', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('heading', { name: /Senior engineering judgement/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/How I work|What I have learned/i);
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/en/');
    const links = [
      { href: '/en/', label: 'We Shall Build' },
      { href: '/en/blog/', label: 'Blog' },
      { href: '/en/services/', label: 'What I do' },
      { href: '/en/about/', label: 'About' },
      { href: '/en/contact/', label: 'Contact' },
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

test.describe('English-only locale', () => {
  test('/en/about returns 200', async ({ page }) => {
    const response = await page.goto('/en/about');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText(/Origin|Mumbai/i);
  });

  test('/en/contact returns 200', async ({ page }) => {
    const response = await page.goto('/en/contact');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText(/LinkedIn|Upwork/i);
  });

  test('/en/blog returns 200', async ({ page }) => {
    const response = await page.goto('/en/blog');
    expect(response?.status()).toBe(200);
  });

  test('/en/services returns 200', async ({ page }) => {
    const response = await page.goto('/en/services');
    expect(response?.status()).toBe(200);
  });
});

test.describe('Home Page Features', () => {
  test('shows brand-led hero with bridge sentence and two CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Build what matters.').first()).toBeVisible();
    await expect(page.getByText('For founders and technical leads')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Talk to me' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Read the latest' })).toBeVisible();
  });

  test('renders three engagement story cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('BlueMoney').first()).toBeVisible();
    await expect(page.getByText('Inbotiqa').first()).toBeVisible();
    await expect(page.getByText('HDFC Life Insurance').first()).toBeVisible();
    await expect(page.getByText('Short-term lending, Nigeria')).toBeVisible();
    await expect(page.getByText('Enterprise email processing, global banking')).toBeVisible();
  });
});

test.describe('About Page Features', () => {
  test('displays portrait image', async ({ page }) => {
    await page.goto('/about');
    const portrait = page.locator('img[alt="Vishal Shanbhag"]');
    await expect(portrait).toBeVisible();
  });

  test('shows all five narrative sections', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /^What I do$/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /The career arc, briefly/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Speaking, writing, mentorship/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Off the clock/i })).toBeVisible();
  });

  test('career arc mentions Inbotiqa and BauAI', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('body')).toContainText(/Inbotiqa/);
    await expect(page.locator('body')).toContainText(/BauAI/);
  });

  test('shows select articles list', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: 'Select articles' })).toBeVisible();
    await expect(page.locator('body')).toContainText(/JavaPro/);
  });

  test('has "talk to me" closing CTA', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('body')).toContainText(/talk to me/);
  });
});

test.describe('Services Page Features', () => {
  test('shows hero and how I work section', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('heading', { name: /Senior engineering judgement/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /How I work/i })).toBeVisible();
    await expect(page.getByText(/sounding board session/i).first()).toBeVisible();
    await expect(page.getByText(/figure out together/i)).toBeVisible();
  });

  test('has sounding board CTA', async ({ page }) => {
    await page.goto('/services');
    const cta = page.getByRole('link', { name: 'Talk to me' });
    await expect(cta).toBeVisible();
  });
});

test.describe('Blog Detail', () => {
  test('blog article detail page returns 404 for unknown slug', async ({ page }) => {
    await page.goto('/blog/nonexistent-article');
    await expect(page.locator('body')).toContainText('404');
  });
});

test.describe('Legal Pages', () => {
  test('impressum page loads with required information', async ({ page }) => {
    await page.goto('/impressum');
    await expect(page.locator('body')).toContainText('Impressum');
    await expect(page.locator('body')).toContainText(/Vishal Shanbhag|Ortshofstraße/);
    await expect(page.locator('body')).toContainText(/contact@weshall\.build/);
  });

  test('datenschutz page loads with privacy information', async ({ page }) => {
    await page.goto('/datenschutz');
    await expect(page.locator('body')).toContainText('Datenschutzerklärung');
    await expect(page.locator('body')).toContainText(/GitHub\.Inc|DSGVO/);
  });

  test('footer shows impressum and datenschutz links', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'Impressum' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Datenschutz' })).toBeVisible();
  });
});

test.describe('Layout Structure', () => {
  const pages = ['/', '/about', '/contact', '/blog', '/services'];

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
