import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const localeEnum = z.enum(['en', 'de', 'hi', 'mr']);

/**
 * Image provenance — source of truth for AI transparency (EU AI Act Art. 50).
 *
 * Only known, truthful values may be written here. Never use placeholders such
 * as `unknown` or `optional`; omit the key instead. Absent optional keys mean
 * "not recorded by the publisher", not "unknown but asserted".
 */
const imageProvenance = z
  .object({
    kind: z.enum(['ai-generated']),
    /** Visible disclosure text rendered under the hero image. */
    disclosure: z.string().min(1).max(200),
    /** Generation system as recorded by the source (manifest or publisher records). */
    system: z.string().min(1).max(120).optional(),
    /** System/model version — only when it can be verified. */
    systemVersion: z.string().min(1).max(60).optional(),
    createdOn: z.coerce.date().optional(),
    sourceUrl: z.url().optional(),
    /** Publish only after confirming the prompt is safe to make public. */
    prompt: z.string().min(1).optional(),
  })
  .optional();

// Articles collection (primary content type)
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(120),
        description: z.string().max(250),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        author: z.string().default('Vishal Shanbhag'),
        image: image().optional(),
        imageAlt: z.string().optional(),
        heroCaption: z.string().max(200).optional(),
        imageProvenance,
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        featured: z.boolean().default(false),
        locale: localeEnum.default('en'),
        /**
         * Editorial review gate (see `agents.md` and `factory/AGENTS.md`).
         * These three values are copied from the factory source article, which
         * records the human review behind the export gate.
         */
        reviewed: z.boolean().default(false),
        ai_assisted: z.boolean().default(false),
        human_reviewed: z.boolean().default(false),
      })
      // Review gate: nothing reaches the site without a recorded human review.
      .refine((data) => data.draft === true || data.reviewed === true, {
        message:
          'Published articles must pass the review gate: set `reviewed: true` once the human review is done (see agents.md).',
        path: ['reviewed'],
      }),
});

// Blog collection with Content Layer API
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100),
      description: z.string().max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string().default('Team'),
      image: image().optional(),
      imageAlt: z.string().optional(),
      heroCaption: z.string().max(200).optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      locale: localeEnum.default('en'),
    }),
});

// Pages collection for static pages
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.coerce.date().optional(),
    locale: localeEnum.default('en'),
  }),
});

// Authors collection
const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image().optional(),
      social: z
        .object({
          twitter: z.string().optional(),
          github: z.string().optional(),
          linkedin: z.string().optional(),
        })
        .optional(),
    }),
});

// FAQs collection (for JSON-LD FAQ schema)
const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
    locale: localeEnum.default('en'),
  }),
});

export const collections = {
  articles,
  blog,
  pages,
  authors,
  faqs,
};
