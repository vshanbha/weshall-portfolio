import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

/** Pages this suite asserts on — also the build-freshness markers. */
const MARATHON_PAGE = resolve('dist/en/blog/run-further-than-a-marathon/index.html');
const STACKOVERFLOW_PAGE = resolve('dist/en/blog/stackoverflow-eulogy/index.html');
const NO_CAPTION_PAGE = resolve('dist/en/blog/how-this-site-was-built/index.html');

/**
 * Newest mtime (ms) anywhere under a directory tree. Descends into
 * symlinked directories; a broken link throws, which the caller treats as
 * "stale".
 */
function newestMtime(dir: string): number {
  let newest = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    const isDirectory =
      entry.isDirectory() || (entry.isSymbolicLink() && statSync(path).isDirectory());
    newest = Math.max(newest, isDirectory ? newestMtime(path) : statSync(path).mtimeMs);
  }
  return newest;
}

describe('ArticleHero rendering', () => {
  beforeAll(() => {
    // Rebuild only when dist is missing or older than the build inputs
    // (src/, public/, astro.config.mjs), and only when every page this file
    // asserts on exists. The validate chain builds immediately before
    // running tests, so the unconditional nested build this used to do was
    // redundant — and in CI's cold cache it exceeded vitest's hook timeout
    // (issue #20 follow-up). A standalone `pnpm test` after source edits
    // still gets a fresh build.
    try {
      const newestInput = Math.max(
        newestMtime(resolve('src')),
        newestMtime(resolve('public')),
        statSync(resolve('astro.config.mjs')).mtimeMs
      );
      const fresh = [MARATHON_PAGE, STACKOVERFLOW_PAGE, NO_CAPTION_PAGE].every(
        (page) => statSync(page).mtimeMs >= newestInput
      );
      if (fresh) return;
    } catch {
      // Missing dist/public/markers → fall through and rebuild.
    }
    execSync('pnpm build', { cwd: resolve('.'), stdio: 'pipe' });
  });

  describe('hero caption', () => {
    it('renders caption element when heroCaption is set', () => {
      const html = readFileSync(MARATHON_PAGE, 'utf-8');
      expect(html).toContain('data-testid="hero-caption"');
      expect(html).toContain('Forrest running through Monument Valley');
    });

    it('does not render caption element when heroCaption is absent', () => {
      const html = readFileSync(NO_CAPTION_PAGE, 'utf-8');
      expect(html).not.toContain('data-testid="hero-caption"');
    });
  });

  describe('reading time', () => {
    it('shows reading time based on actual content length', () => {
      const html = readFileSync(MARATHON_PAGE, 'utf-8');
      // Article is substantial — should show at least 3 min read
      const match = html.match(/(\d+)\s*min read/);
      expect(match).not.toBeNull();
      const minutes = parseInt(match![1]);
      expect(minutes).toBeGreaterThanOrEqual(3);
    });

    it('shows different reading times for different articles', () => {
      const marathon = readFileSync(MARATHON_PAGE, 'utf-8');
      const shortArticle = readFileSync(STACKOVERFLOW_PAGE, 'utf-8');
      const marathonMatch = marathon.match(/(\d+)\s*min read/);
      const shortMatch = shortArticle.match(/(\d+)\s*min read/);
      expect(marathonMatch).not.toBeNull();
      expect(shortMatch).not.toBeNull();
      // Marathon article is longer than the SO eulogy
      expect(parseInt(marathonMatch![1])).toBeGreaterThan(parseInt(shortMatch![1]));
    });
  });
});
