import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { parse } from 'yaml';

/**
 * Built-output checks for AI transparency (EU AI Act Article 50).
 *
 * These are technical checks over `dist/`. A pass means the disclosure,
 * metadata and structured data are present and consistent — it is not a legal
 * audit.
 *
 * Requires ExifTool and `c2patool` on PATH (CI pins both).
 */

const ROOT = resolve('.');
const ARTICLES_DIR = join(ROOT, 'src', 'content', 'articles');
const DIST = join(ROOT, 'dist');
const DIST_ASSETS = join(DIST, '_astro');

const DIGITAL_SOURCE_TYPE =
  'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';
const PUBLISHING_PRINCIPLES = 'https://weshall.build/en/about#editorial-standards';
const FOOTER_LINK_HREF = '/en/about#editorial-standards';
const EDITORIAL_STANDARDS_STATEMENT =
  'AI may assist with research, drafting, sense-checking, and review. Every article passes a human review gate. Writing, opinions, and observations remain the author’s own.';

interface ImageProvenance {
  kind: 'ai-generated';
  disclosure: string;
  system?: string;
  systemVersion?: string;
  createdOn?: string;
  sourceUrl?: string;
  prompt?: string;
}

interface MarkedArticle {
  slug: string;
  image: string;
  title: string;
  description: string;
  imageAlt?: string;
  author: string;
  imageProvenance: ImageProvenance;
}

function frontmatter(file: string): Record<string, unknown> | null {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(file, 'utf8'));
  return match ? ((parse(match[1]) as Record<string, unknown>) ?? null) : null;
}

/** Every published article whose frontmatter marks the hero image as AI-generated. */
function markedArticles(): MarkedArticle[] {
  return readdirSync(ARTICLES_DIR)
    .filter((name) => /\.(md|mdx)$/.test(name))
    .map((name) => ({ name, data: frontmatter(join(ARTICLES_DIR, name)) }))
    .filter(
      (entry) =>
        entry.data?.imageProvenance !== undefined &&
        (entry.data.imageProvenance as ImageProvenance).kind === 'ai-generated'
    )
    .map((entry) => {
      const data = entry.data as Record<string, unknown>;
      return {
        slug: entry.name.replace(/\.(md|mdx)$/, ''),
        image: data.image as string,
        title: data.title as string,
        description: data.description as string,
        imageAlt: data.imageAlt as string | undefined,
        author: data.author as string,
        imageProvenance: data.imageProvenance as ImageProvenance,
      };
    });
}

const articles = markedArticles();

function readHtml(path: string): string {
  return readFileSync(join(DIST, path), 'utf8');
}

/** Hero images are delivered as `<stem>.<hash>.<ext>` plus responsive renditions. */
function deliveredAssets(imagePath: string): string[] {
  const stem = imagePath.replace(/^\.?\//, '').replace(/\.[^.]+$/, '');
  if (!existsSync(DIST_ASSETS)) return [];
  return readdirSync(DIST_ASSETS)
    .filter((name) => name.startsWith(`${stem}.`))
    .map((name) => join(DIST_ASSETS, name))
    .sort();
}

function tool(args: string[], command: string, installHint: string) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.error) {
    throw new Error(`${command} is required for provenance checks. ${installHint}`);
  }
  return result;
}

const EXIFTOOL_HINT =
  'Install ExifTool (macOS: `brew install exiftool`, Debian/Ubuntu: `apt-get install libimage-exiftool-perl`).';
const C2PATOOL_HINT = 'Install the pinned c2patool release listed in .github/workflows/ci.yml.';

function readImageTags(file: string, tags: string[]): Record<string, string | number> {
  const result = tool(['-j', ...tags.map((tag) => `-${tag}`), file], 'exiftool', EXIFTOOL_HINT);
  expect(result.stderr?.trim() ?? '').not.toContain('File not found');
  return JSON.parse(result.stdout)[0] as Record<string, string | number>;
}

/**
 * ExifTool reports numerically-shaped XMP text (e.g. `2.0`) as a number in
 * JSON output, so compare numerically as well as by string.
 */
function matchValue(actual: string | number | undefined, expected: string): boolean {
  if (actual === expected) return true;
  const actualNumber = Number(actual);
  const expectedNumber = Number(expected);
  return (
    Number.isFinite(actualNumber) &&
    Number.isFinite(expectedNumber) &&
    actualNumber === expectedNumber
  );
}

function c2paReport(file: string): {
  found: boolean;
  statusCodes: string[];
  successCodes: string[];
} {
  const result = tool([file], 'c2patool', C2PATOOL_HINT);
  if (result.status !== 0 || !result.stdout.trim()) {
    return { found: false, statusCodes: [], successCodes: [] };
  }
  const report = JSON.parse(result.stdout) as {
    validation_status?: Array<{ code: string }>;
    validation_results?: { activeManifest?: { success?: Array<{ code: string }> } };
  };
  return {
    found: true,
    statusCodes: (report.validation_status ?? []).map((entry) => entry.code),
    successCodes: (report.validation_results?.activeManifest?.success ?? []).map(
      (entry) => entry.code
    ),
  };
}

describe('Visible AI disclosure', () => {
  it('finds articles with AI-generated images', () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it.each(articles.map((article) => [article.slug, article] as const))(
    'renders the disclosure caption on /en/blog/%s',
    (_slug, article) => {
      const html = readHtml(join('en', 'blog', article.slug, 'index.html'));
      expect(html).toContain('data-testid="hero-caption"');
      expect(html).toContain(article.imageProvenance.disclosure);
    }
  );

  it('keeps the existing marathon caption', () => {
    const html = readHtml(join('en', 'blog', 'run-further-than-a-marathon', 'index.html'));
    expect(html).toContain('Forrest running through Monument Valley — AI-generated reimagining');
  });
});

describe('Editorial standards statement', () => {
  const about = readHtml(join('en', 'about', 'index.html'));

  it('exposes the id the publishing-principles anchor targets', () => {
    expect(about).toContain('id="editorial-standards"');
  });

  it('contains the approved statement verbatim', () => {
    expect(about).toContain(EDITORIAL_STANDARDS_STATEMENT);
  });
});

describe('Footer AI use in publishing link', () => {
  const pages = [
    join('en', 'about', 'index.html'), // PageLayout
    join('en', 'services', 'index.html'), // MarketingLayout
    join('en', 'blog', 'oops-i-deleted-it-again', 'index.html'), // BlogLayout
  ];

  it.each(pages)('links to the editorial-standards anchor on %s', (page) => {
    const html = readHtml(page);
    expect(html).toContain('AI use in publishing');
    expect(html).toContain(`href="${FOOTER_LINK_HREF}"`);
  });
});

describe('JSON-LD transparency fields', () => {
  function jsonLd(page: string): Array<Record<string, unknown>> {
    const html = readHtml(page);
    const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    expect(blocks).not.toBeNull();
    return (blocks ?? []).map((block) =>
      JSON.parse(block.replace(/<\/?script[^>]*>/g, ''))
    ) as Array<Record<string, unknown>>;
  }

  it.each(articles.map((article) => [article.slug, article] as const))(
    'publishes principles and reviewer on /en/blog/%s',
    (_slug, article) => {
      const page = join('en', 'blog', article.slug, 'index.html');
      const schemas = jsonLd(page);

      expect(schemas.some((schema) => '@graph' in schema)).toBe(false);

      const blogPosting = schemas.find((schema) => schema['@type'] === 'BlogPosting');
      expect(blogPosting).toBeDefined();
      expect(blogPosting?.publishingPrinciples).toBe(PUBLISHING_PRINCIPLES);

      const image = blogPosting?.image as Record<string, unknown> | undefined;
      expect(image?.['@type']).toBe('ImageObject');
      expect(String(image?.caption)).toContain('AI-generated');
      expect(image?.creditText).toBe(article.author);

      const webPage = schemas.find((schema) => schema['@type'] === 'WebPage');
      expect(webPage).toBeDefined();
      expect(webPage?.url).toBe(`https://weshall.build/en/blog/${article.slug}/`);
      expect(webPage?.publishingPrinciples).toBe(PUBLISHING_PRINCIPLES);

      const reviewer = webPage?.reviewedBy as Record<string, unknown> | undefined;
      expect(reviewer?.['@type']).toBe('Person');
      expect(reviewer?.name).toBe(article.author);
      expect(reviewer?.['@id']).toBeUndefined(); // inline Person, no identity node
    }
  );
});

describe('Delivered image metadata', () => {
  it.each(articles.map((article) => [article.slug, article] as const))(
    'stamps IPTC/XMP on every delivered asset of %s',
    (_slug, article) => {
      const assets = deliveredAssets(article.image);
      expect(assets.length).toBeGreaterThan(0);

      for (const asset of assets) {
        const report = c2paReport(asset);
        // An asset either carries a C2PA manifest (which records provenance) or
        // the IPTC/XMP set written by scripts/image-provenance.mjs.
        if (report.found) continue;

        const tags = readImageTags(asset, [
          'XMP-dc:Title',
          'XMP-dc:Description',
          'XMP-iptcCore:AltTextAccessibility',
          'XMP-dc:Creator',
          'XMP-photoshop:Credit',
          'XMP-photoshop:DateCreated',
          'XMP-iptcExt:DigitalSourceType',
          'XMP-iptcExt:AISystemUsed',
        ]);

        expect(tags.Title).toBe(article.title);
        expect(tags.Description).toBe(article.description);
        expect(tags.AltTextAccessibility).toBe(article.imageAlt);
        expect(tags.Creator).toBe(article.author);
        expect(tags.Credit).toBe(article.author);
        expect(tags.DigitalSourceType).toBe(DIGITAL_SOURCE_TYPE);
        expect(matchValue(tags.AISystemUsed, article.imageProvenance.system)).toBe(true);
        if (article.imageProvenance.createdOn) {
          expect(
            matchValue(tags.DateCreated, article.imageProvenance.createdOn.replace(/-/g, ':'))
          ).toBe(true);
        }
        if (article.imageProvenance.systemVersion) {
          const version = readImageTags(asset, ['XMP-iptcExt:AISystemVersionUsed']);
          expect(
            matchValue(version.AISystemVersionUsed, article.imageProvenance.systemVersion)
          ).toBe(true);
        }
      }
    }
  );
});

describe('C2PA integrity', () => {
  it('preserves and validates the existing manifest on the marathon hero', () => {
    const assets = deliveredAssets('./forrest_monument_valley.png');
    const withManifest = assets.find((asset) => c2paReport(asset).found);
    expect(withManifest).toBeDefined();

    const report = c2paReport(withManifest as string);
    expect(report.successCodes).toContain('claimSignature.validated');
    // The asset hash must still match: adding metadata would invalidate it.
    expect(report.statusCodes).not.toContain('assertion.dataHash.mismatch');
  });

  it('has no C2PA manifest on the Oops hero — publisher signing is deferred', () => {
    // Tripwire: when a publisher-signed manifest is added, replace this with a
    // validation check for the new manifest.
    const assets = deliveredAssets('./oops-i-deleted-it-again-hero.png');
    expect(assets.length).toBeGreaterThan(0);
    expect(assets.some((asset) => c2paReport(asset).found)).toBe(false);
  });
});

describe('Provenance frontmatter hygiene', () => {
  it.each(articles.map((article) => [article.slug, article] as const))(
    'records only known values for %s',
    (_slug, article) => {
      const provenance = JSON.stringify(article.imageProvenance);
      expect(provenance).not.toMatch(/\b(unknown|optional|n\/a|tbd)\b/i);
      expect(article.imageProvenance.system).toBeTruthy();
      expect(article.imageProvenance.createdOn).toBeTruthy();
      if (article.imageProvenance.sourceUrl) {
        expect(article.imageProvenance.sourceUrl).toMatch(/^https:\/\//);
      }
    }
  );
});
