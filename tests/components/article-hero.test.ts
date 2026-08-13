import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

describe('ArticleHero rendering', () => {
  beforeAll(() => {
    // Build the site once before running tests
    execSync('pnpm build', { cwd: resolve('.'), stdio: 'pipe' });
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
