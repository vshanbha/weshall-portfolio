import { test, expect } from '@playwright/test';

test.describe('Pages', () => {
  test('home page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Build what matters.' }).first()).toBeVisible();
    await expect(page.locator('body')).toContainText('We Shall Build');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/en/about');
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
      await expect(page).toHaveURL(new RegExp(link.href.replace(/\/$/, '(/)?$')));
    }
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.locator('body')).toContainText('404');
  });
});

test.describe('Root-Level Redirects', () => {
  test('/ serves a transparent redirect: JS-first with meta refresh fallback', async ({ page }) => {
    const response = await page.request.get('/');
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).not.toContain('<title>Redirecting');
    expect(html).toContain('<script');
    expect(html).toMatch(/http-equiv="refresh"\s+content="[12];url=\/en\//);
  });

  const redirects = [
    { from: '/about', to: '/en/about' },
    { from: '/contact', to: '/en/contact' },
    { from: '/services', to: '/en/services' },
    { from: '/blog', to: '/en/blog' },
    { from: '/impressum', to: '/en/impressum' },
    { from: '/datenschutz', to: '/en/datenschutz' },
  ];

  for (const { from, to } of redirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      const response = await page.goto(from);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(to.replace(/\/$/, '') + '/?$'));
      await expect(page.locator('body')).toContainText('We Shall Build');
    });
  }
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
    await expect(page.getByText('From circuit board to boardroom.')).toBeVisible();
    await expect(page.getByText('Hardware foundations. Enterprise software. Climate focus.')).toBeVisible();
    await expect(page.getByText('20+ years of engineering judgement in production.')).toBeVisible();
    await expect(page.getByText('Banking · Fintech · SaaS · AI · Climate Tech')).toBeVisible();
    await expect(page.getByRole('link', { name: /About me/i })).toBeVisible();
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
    await page.goto('/en/about');
    const portrait = page.locator('img[alt="Vishal Shanbhag"]');
    await expect(portrait).toBeVisible();
  });

  test('shows all five narrative sections', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.getByRole('heading', { name: /^What I do$/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /The career arc, briefly/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Speaking, writing, mentorship/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Off the clock/i })).toBeVisible();
  });

  test('career arc mentions Inbotiqa and BauAI', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.locator('body')).toContainText(/Inbotiqa/);
    await expect(page.locator('body')).toContainText(/BauAI/);
  });

  test('shows select articles list', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.getByRole('heading', { name: 'Select articles' })).toBeVisible();
    await expect(page.locator('body')).toContainText(/JavaPro/);
  });

  test('has "talk to me" closing CTA', async ({ page }) => {
    await page.goto('/en/about');
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

test.describe('Blog Article SEO', () => {
  const articlePath = '/en/blog/how-this-site-was-built';

  test('article page has standard CTA with software architect', async ({ page }) => {
    await page.goto(articlePath);
    const cta = page.locator('text=senior software architect');
    await expect(cta).toBeVisible();
    const link = page.locator('a[href="/en/contact"]', { hasText: "let's talk" });
    await expect(link).toBeVisible();
  });

  test('hero image renders without caption when heroCaption not set', async ({ page }) => {
    await page.goto(articlePath);
    const heroImage = page.locator('header img[alt*="PageSpeed"]');
    await expect(heroImage).toBeVisible();
    const caption = page.locator('header p.italic.text-center');
    await expect(caption).toHaveCount(0);
  });

  test('hero image renders caption when heroCaption is set', async ({ page }) => {
    await page.goto('/en/blog/run-further-than-a-marathon');
    const heroImage = page.locator('header img[alt*="Forrest"]');
    await expect(heroImage).toBeVisible();
    const caption = page.locator('[data-testid="hero-caption"]');
    await expect(caption).toBeVisible();
    await expect(caption).toContainText('Forrest running through Monument Valley');
  });

  test('article page shows reading time based on content length', async ({ page }) => {
    await page.goto(articlePath);
    const readingTime = page.locator('header span', { hasText: 'min read' });
    await expect(readingTime).toBeVisible();
    const text = await readingTime.textContent();
    const minutes = parseInt(text);
    expect(minutes).toBeGreaterThanOrEqual(1);
  });

  test('BlogPosting JSON-LD has correct URL and @type', async ({ page }) => {
    await page.goto(articlePath);
    await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
    const blogPosting = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const script of scripts) {
        try {
          const parsed = JSON.parse(script.textContent || '');
          if (parsed['@type'] === 'BlogPosting') return parsed;
        } catch { /* ignore parse errors */ }
      }
      return null;
    });
    expect(blogPosting).not.toBeNull();
    expect(blogPosting!['url']).toContain('/en/blog/how-this-site-was-built/');
    expect(blogPosting!['url']).not.toContain('undefined');
    expect(blogPosting!['mainEntityOfPage']['@id']).toContain('/en/blog/how-this-site-was-built/');
  });

  test('hreflang tags point to article URL, not blog index', async ({ page }) => {
    await page.goto(articlePath);
    const hreflang = page.locator('link[rel="alternate"][hreflang="en"]');
    await expect(hreflang).toHaveAttribute('href', /\/en\/blog\/how-this-site-was-built\//);
    const href = await hreflang.getAttribute('href');
    expect(href).not.toBe('http://localhost:4321/en/blog');
  });

  test('exactly one canonical tag per page', async ({ page }) => {
    await page.goto(articlePath);
    const canonicals = page.locator('link[rel="canonical"]');
    await expect(canonicals).toHaveCount(1);
    const href = await canonicals.first().getAttribute('href');
    expect(href).toMatch(/\/en\/blog\/how-this-site-was-built\/?$/);
  });

  test('og:locale is en_GB', async ({ page }) => {
    await page.goto(articlePath);
    const ogLocale = page.locator('meta[property="og:locale"]');
    await expect(ogLocale).toHaveAttribute('content', 'en_GB');
  });

  test('breadcrumb JSON-LD terminal item has article URL', async ({ page }) => {
    await page.goto(articlePath);
    await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
    const breadcrumb = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const script of scripts) {
        try {
          const parsed = JSON.parse(script.textContent || '');
          if (parsed['@type'] === 'BreadcrumbList') return parsed;
        } catch { /* ignore parse errors */ }
      }
      return null;
    });
    expect(breadcrumb).not.toBeNull();
    const items = breadcrumb!['itemListElement'] as Array<{ name: string; item: string }>;
    const lastItem = items[items.length - 1];
    expect(lastItem['item']).toMatch(/\/en\/blog\/how-this-site-was-built\/?$/);
  });
});

test.describe('Legal Pages', () => {
  test('impressum page loads with required information', async ({ page }) => {
    await page.goto('/en/impressum');
    await expect(page.locator('body')).toContainText('Impressum');
    await expect(page.locator('body')).toContainText(/Vishal Shanbhag|Ortshofstraße/);
    await expect(page.locator('body')).toContainText(/contact@weshall\.build/);
  });

  test('datenschutz page loads with privacy information', async ({ page }) => {
    await page.goto('/en/datenschutz');
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
  const pages = ['/', '/en/about', '/en/contact', '/en/blog', '/en/services'];

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
