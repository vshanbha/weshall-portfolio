import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

/** Newest mtime (ms) anywhere under a directory tree. */
function newestMtime(dir: string): number {
  let newest = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    newest = Math.max(newest, entry.isDirectory() ? newestMtime(path) : statSync(path).mtimeMs);
  }
  return newest;
}

describe('ArticleHero rendering', () => {
  beforeAll(() => {
    // Rebuild only when dist is missing or older than src. The validate
    // chain builds immediately before running tests, so the unconditional
    // nested build it used to do was redundant — and in CI's cold cache it
    // exceeded vitest's hook timeout (issue #20 follow-up). A standalone
    // `pnpm test` after source edits still gets a fresh build.
    const distMarker = resolve('dist/en/blog/run-further-than-a-marathon/index.html');
    let fresh = false;
    try {
      fresh = statSync(distMarker).mtimeMs >= newestMtime(resolve('src'));
    } catch {
      fresh = false;
    }
    if (!fresh) {
      execSync('pnpm build', { cwd: resolve('.'), stdio: 'pipe' });
    }
  });

  describe('hero caption', () => {
    it('renders caption element when heroCaption is set', () => {
      const html = readFileSync(
        resolve('dist/en/blog/run-further-than-a-marathon/index.html'),
        'utf-8'
      );
      expect(html).toContain('data-testid="hero-caption"');
      expect(html).toContain('Forrest running through Monument Valley');
    });

    it('does not render caption element when heroCaption is absent', () => {
      const html = readFileSync(
        resolve('dist/en/blog/how-this-site-was-built/index.html'),
        'utf-8'
      );
      expect(html).not.toContain('data-testid="hero-caption"');
    });
  });

  describe('reading time', () => {
    it('shows reading time based on actual content length', () => {
      const html = readFileSync(
        resolve('dist/en/blog/run-further-than-a-marathon/index.html'),
        'utf-8'
      );
      // Article is substantial — should show at least 3 min read
      const match = html.match(/(\d+)\s*min read/);
      expect(match).not.toBeNull();
      const minutes = parseInt(match![1]);
      expect(minutes).toBeGreaterThanOrEqual(3);
    });

    it('shows different reading times for different articles', () => {
      const marathon = readFileSync(
        resolve('dist/en/blog/run-further-than-a-marathon/index.html'),
        'utf-8'
      );
      const shortArticle = readFileSync(
        resolve('dist/en/blog/stackoverflow-eulogy/index.html'),
        'utf-8'
      );
      const marathonMatch = marathon.match(/(\d+)\s*min read/);
      const shortMatch = shortArticle.match(/(\d+)\s*min read/);
      expect(marathonMatch).not.toBeNull();
      expect(shortMatch).not.toBeNull();
      // Marathon article is longer than the SO eulogy
      expect(parseInt(marathonMatch![1])).toBeGreaterThan(parseInt(shortMatch![1]));
    });
  });
});
