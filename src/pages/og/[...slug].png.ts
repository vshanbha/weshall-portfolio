import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOGImage } from '@/lib/og';
import siteConfig from '@/config/site.config';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { en } from '@/i18n/translations/en';
import { de } from '@/i18n/translations/de';

// Define static pages that need OG images (locale-less outputs, kept for
// surfaces that still reference them).
const STATIC_PAGES = [
  { slug: 'index', title: siteConfig.name, description: siteConfig.description },
  { slug: 'about', title: 'About', description: `Learn more about ${siteConfig.name}` },
  {
    slug: 'contact',
    title: 'Contact',
    description: 'Reach out.',
  },
  {
    slug: 'blog',
    title: 'Blog',
    description: `Latest articles and updates from ${siteConfig.name}`,
  },
];

// Impressum/Datenschutz meta are locale-independent (see [lang]/*.astro).
const IMPRESSUM_CARD = {
  title: 'Impressum',
  description: 'Impressum: Angaben gemäß § 5 DDG',
};
const DATENSCHUTZ_CARD = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung: Informationen gemäß DSGVO',
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all articles
  const blogPosts = await getCollection('articles', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  // Philosophy meta mirrors the page's content selection (see [lang]/philosophy.astro).
  const philosophyEntries = await getCollection('philosophy');
  const philosophyCard = (locale: Locale) => {
    const entry =
      philosophyEntries.find((e) => e.data.locale === locale) ??
      philosophyEntries.find((e) => e.data.locale === defaultLocale);
    if (!entry) {
      throw new Error('Philosophy collection is empty: expected the ten commandments entry.');
    }
    return {
      title: entry.data.title,
      description: entry.data.description ?? siteConfig.description,
    };
  };

  // Card text for the locale-prefixed variants that SEO.astro emits as
  // /og/<pathname>.png for every page under /en and /de (home is
  // /og/<locale>.png, not /og/<locale>/index.png). English reuses the
  // locale-less constants above so both variants render identically; German
  // pulls from the translation bundles.
  const localizedCards: Record<Locale, Record<string, { title: string; description: string }>> = {
    en: {
      '': { title: siteConfig.name, description: siteConfig.description },
      about: { title: 'About', description: `Learn more about ${siteConfig.name}` },
      contact: { title: 'Contact', description: 'Reach out.' },
      blog: { title: 'Blog', description: `Latest articles and updates from ${siteConfig.name}` },
      services: { title: en.services.meta.title, description: en.services.meta.description },
      philosophy: philosophyCard('en'),
      impressum: IMPRESSUM_CARD,
      datenschutz: DATENSCHUTZ_CARD,
    },
    de: {
      '': { title: siteConfig.name, description: de.site.description },
      about: { title: de.about.meta.title, description: de.about.meta.description },
      contact: { title: de.contact.meta.title, description: de.contact.meta.description },
      blog: { title: de.blog.title, description: de.blog.description },
      services: { title: de.services.meta.title, description: de.services.meta.description },
      philosophy: philosophyCard('de'),
      impressum: IMPRESSUM_CARD,
      datenschutz: DATENSCHUTZ_CARD,
    },
  };

  // Generate paths for articles
  const blogPaths = blogPosts.map((post) => ({
    params: { slug: `blog/${post.id}` },
    props: {
      title: post.data.title,
      description: post.data.description,
      type: 'article' as const,
    },
  }));

  // Locale-prefixed post cards, referenced by the no-frontmatter-image
  // fallback in [lang]/blog/[...slug].astro (e.g. /og/en/blog/<id>.png).
  const localizedBlogPaths = blogPosts.map((post) => ({
    params: { slug: `${post.data.locale || defaultLocale}/blog/${post.id}` },
    props: {
      title: post.data.title,
      description: post.data.description,
      type: 'article' as const,
    },
  }));

  // Generate paths for static pages (locale-less …)
  const staticPaths = STATIC_PAGES.map((page) => ({
    params: { slug: page.slug },
    props: {
      title: page.title,
      description: page.description,
      type: 'website' as const,
    },
  }));

  // … and their locale-prefixed variants (/og/en.png, /og/de/about.png, …).
  const localizedStaticPaths = locales.flatMap((locale) =>
    Object.entries(localizedCards[locale]).map(([page, card]) => ({
      params: { slug: page ? `${locale}/${page}` : locale },
      props: {
        title: card.title,
        description: card.description,
        type: 'website' as const,
      },
    }))
  );

  return [...staticPaths, ...localizedStaticPaths, ...blogPaths, ...localizedBlogPaths];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, type } = props as {
    title: string;
    description?: string;
    type: 'website' | 'article';
  };

  const png = await generateOGImage({
    title,
    description,
    type,
  });

  // Convert Buffer to Uint8Array for Response compatibility
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
