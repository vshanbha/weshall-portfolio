import { test, expect } from '@playwright/test';

test.describe('Pages', () => {
  test('home page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Build what matters.' }).first()).toBeVisible();
    await expect(page.locator('body')).toContainText('We Shall Build');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.getByRole('heading', { name: 'Vishal Shanbhag' })).toBeVisible();
    await expect(page.locator('body')).toContainText(/Mumbai|How I build/i);
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Reach out/i })).toBeVisible();
    await expect(page.locator('body')).toContainText(/Fifteen minutes with a founder-engineer/i);
    await expect(page.locator('body')).toContainText(/LinkedIn|Upwork/i);
  });

  test('blog page loads and shows articles', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('services page loads', async ({ page }) => {
    await page.goto('/services');
    await expect(
      page.getByRole('heading', { name: /Some decisions cost you when you get them wrong/i })
    ).toBeVisible();
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
    { from: '/de/blog', to: '/en/blog' },
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

test.describe('Locale pages', () => {
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

test.describe('German locale', () => {
  test('/de/ returns 200 with German content and lang=de', async ({ page }) => {
    const response = await page.goto('/de/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('body')).toContainText('Bauen Sie, was zählt.');
    await expect(page.getByRole('link', { name: 'Lassen Sie uns sprechen' }).first()).toBeVisible();
  });

  test('/de/about returns 200 with German content', async ({ page }) => {
    const response = await page.goto('/de/about');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('Wie ich baue');
  });

  test('/de/services returns 200 with German nav label', async ({ page }) => {
    const response = await page.goto('/de/services');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('Was ich mache');
  });

  test('/de/contact returns 200', async ({ page }) => {
    const response = await page.goto('/de/contact');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('Kontakt');
  });

  test('blog stays English: German nav links Blog to /en/blog', async ({ page }) => {
    await page.goto('/de/about');
    await expect(page.locator('a[href="/en/blog"]').first()).toBeVisible();
    await expect(page.locator('a[href="/de/blog"]')).toHaveCount(0);
    await page.goto('/de/');
    await expect(page.locator('a[href="/de/blog"]')).toHaveCount(0);
  });

  test('/de/philosophy keeps the imperative one-liners in English', async ({ page }) => {
    const response = await page.goto('/de/philosophy');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('We shall ask WHY before we ask HOW.');
    await expect(page.locator('body')).toContainText('Meister Oogway');
    await expect(page.locator('body')).not.toContainText('Wir fragen WARUM');
  });

  test('/de/about keeps commandment one-liners in English with German detail', async ({ page }) => {
    await page.goto('/de/about');
    await expect(page.locator('body')).toContainText('We shall build for outcomes, not features.');
    await expect(page.locator('body')).toContainText('rückwärts vom Ergebnis');
    await expect(page.locator('body')).not.toContainText('Wir bauen für Ergebnisse');
  });

  test('language switcher on an English blog post sends German to /de/', async ({ page }) => {
    await page.goto('/en/blog/how-this-site-was-built');
    await expect(page.locator('#language-switcher-menu a[href="/de"]')).toHaveCount(1);
  });
});

test.describe('Home Page Features', () => {
  test('shows brand-led hero with bridge sentence and two CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Build what matters.').first()).toBeVisible();
    await expect(page.getByText('For founders and technical leads').first()).toBeVisible();
    await expect(page.getByRole('link', { name: "Let's talk" }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Talk to me' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Read the latest' })).toBeVisible();
    await expect(page.locator('body')).toContainText('Vishal Shanbhag');
    await expect(page.getByText('From circuit board to boardroom.')).toBeVisible();
    await expect(
      page.getByText(
        'Hardware foundations. Enterprise software. AI agents, from demo to production.'
      )
    ).toBeVisible();
    await expect(page.getByText('Fintech · SaaS · Climate Tech')).toBeVisible();
    await expect(page.getByRole('link', { name: /About me/i })).toBeVisible();
  });

  test('renders three engagement story cards', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByText('Talked a team out of building, and it saved the launch')
    ).toBeVisible();
    await expect(
      page.getByText('From 40% to 95% compliance on a system banks actually run')
    ).toBeVisible();
    await expect(
      page.getByText('Led a serverless evaluation years before it went mainstream')
    ).toBeVisible();
    await expect(page.getByText('BlueMoney').first()).toBeVisible();
    await expect(page.getByText('HDFC Life').first()).toBeVisible();
    await expect(page.getByText('Short-term lending, Nigeria')).toBeVisible();
    await expect(page.getByText('Enterprise email processing, global banking')).toBeVisible();
  });

  test('renders testimonials section with 5 clients', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('What clients say')).toBeVisible();
    const companies = ['BlueMoney', 'Ourish', 'PowerMarket', 'Sable International', 'BauAI'];
    for (const company of companies) {
      await expect(page.getByRole('tab', { name: company })).toBeVisible();
    }
  });

  test('testimonials show quote when tab selected', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-vtab-trigger="powermarket"]').click();
    await expect(
      page.locator('.vtabs-content-desktop [data-tab-content="powermarket"]')
    ).toBeVisible();
    await expect(
      page.locator('.vtabs-content-desktop [data-tab-content="powermarket"] blockquote')
    ).toContainText(/phenomenal resource/);
    await expect(
      page.locator('.vtabs-content-desktop [data-tab-content="powermarket"] a[href*="linkedin"]')
    ).toBeVisible();
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
    await expect(page.getByRole('heading', { name: /^How I build$/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /^What I believe$/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /The career arc, briefly/i })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Speaking, writing, mentorship/i })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: /Off the clock/i })).toBeVisible();
  });

  test('displays set A of three commandments with tie lines and full-ten link', async ({
    page,
  }) => {
    await page.goto('/en/about');
    const setA = [
      'We shall ask WHY before we ask HOW.',
      'We shall build for outcomes, not features.',
      'We shall prototype before we commit.',
    ];
    for (const title of setA) {
      await expect(page.getByText(title)).toBeVisible();
    }
    await expect(
      page.getByText(
        'Every engagement opens here, before anyone says how: why build this, why now, who for'
      )
    ).toBeVisible();
    const fullTen = page.getByRole('link', { name: 'The way we build →' });
    await expect(fullTen).toBeVisible();
    await expect(fullTen).toHaveAttribute('href', '/en/philosophy');
    // The other seven are no longer on About — they moved to the philosophy page.
    await expect(page.getByText('We shall deploy what works.')).toHaveCount(0);
  });

  test('career arc mentions Inbotiqa and BauAI', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.locator('body')).toContainText(/Inbotiqa/);
    await expect(page.locator('body')).toContainText(/BauAI/);
  });

  test('philosophy page shows all ten commandments with companion link', async ({ page }) => {
    await page.goto('/en/philosophy');
    const commandments = [
      'We shall ask WHY before we ask HOW.',
      'We shall build for outcomes, not features.',
      'We shall build by principles, not by whim.',
      'We shall keep it simple and stupid.',
      'We shall prototype before we commit.',
      'We shall build with grit, spit, and a whole lot of duct tape.',
      'We shall deploy what works.',
      'We shall learn from failures.',
      'We shall rise after every hit.',
      'We shall run further than a marathon.',
    ];
    for (const title of commandments) {
      await expect(page.getByText(title)).toBeVisible();
    }
    const link = page.locator('a[href*="/blog/run-further-than-a-marathon/"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveText('Read the full analogy');
  });

  test('shows select articles list', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.getByRole('heading', { name: 'Select articles' })).toBeVisible();
    await expect(page.locator('body')).toContainText(/JavaPro/);
  });

  test('has "let\'s talk" closing CTA', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.locator('body')).toContainText(
      "If you have an idea that needs software to give it life, let's talk."
    );
  });
});

test.describe('Services Page Features', () => {
  test('shows hero and how I work section', async ({ page }) => {
    await page.goto('/services');
    await expect(
      page.getByRole('heading', { name: /Some decisions cost you when you get them wrong/i })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: /How I work/i })).toBeVisible();
    await expect(page.getByText(/free fifteen-minute conversation/i).first()).toBeVisible();
    await expect(page.getByText(/figure out together/i)).toBeVisible();
  });

  test('has unified primary CTA', async ({ page }) => {
    await page.goto('/services');
    const ctas = page.getByRole('link', { name: "Let's talk" });
    await expect(ctas.first()).toBeVisible();
    await expect(ctas.last()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Talk to me' })).toHaveCount(0);
    await expect(
      page.getByRole('heading', { name: 'It starts with a conversation.' })
    ).toBeVisible();
    await expect(page.getByText(/And it goes as far as the problem needs/)).toBeVisible();
    await expect(page.getByText(/a short working sprint/)).toBeVisible();
  });
});

test.describe('CTA unification and copy guardrails (issue #21)', () => {
  const pages = ['/', '/en/about', '/en/contact', '/en/services'];
  const banned = ['Talk to me', 'Start a Conversation', 'Book a Session', 'Get in touch'];

  for (const path of pages) {
    test(`no banned CTA labels on ${path}`, async ({ page }) => {
      await page.goto(path);
      for (const label of banned) {
        await expect(page.getByRole('link', { name: label })).toHaveCount(0);
        await expect(page.getByRole('button', { name: label })).toHaveCount(0);
      }
      // Gate B round-1 nit: role assertions only catch CTAs — a ban label
      // reintroduced as prose must fail the suite too. Word boundaries stop
      // benign substrings ("talk to mentors") from false-positiving.
      await expect(page.locator('body')).not.toContainText(
        /\btalk to me\b|\bstart a conversation\b|\bbook a session\b|\bget in touch\b/i
      );
    });
  }

  test('bridge carries the consequence framing, not the banned abstraction', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toContainText(/senior engineering judgement/i);
    await expect(page.locator('body')).toContainText(
      'whose consequences are paid in time and money'
    );
  });

  test('footer carries the wedge, not the title salad', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('facing the decisions that cost time and money');
    await expect(footer).not.toContainText('Senior Java Architect, Startup CTO');
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
    // Case-sensitive: the page's prose link is lowercase; header/mobile CTAs are "Let's talk".
    // "Let's talk" links go directly to Calendly (Gate A rule), not the internal contact page.
    const link = page
      .locator('a[href="https://calendly.com/vshanbhag"]')
      .filter({ hasText: /let's talk/ });
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
        } catch {
          /* ignore parse errors */
        }
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
        } catch {
          /* ignore parse errors */
        }
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
