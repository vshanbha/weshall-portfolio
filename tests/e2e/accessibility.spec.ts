import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG 2.2 AA checks (see `skills/accessibility`).
 *
 * axe covers what is mechanically checkable: colour contrast, names/roles/
 * values, landmarks, heading structure, target size. Keyboard focus order and
 * screen-reader behaviour remain manual Gate B checks — a green run here is a
 * technical check, not a full accessibility audit.
 *
 * Both themes are scanned because the tokens differ per theme (the accent pill
 * on the home page, for instance, failed only when checked against each
 * background it is actually rendered on).
 */

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const PAGES = [
  '/en',
  '/en/about',
  '/en/blog',
  '/en/blog/bye-bye-wordpress-part-1/',
  '/en/blog/how-this-site-was-built/',
  '/en/blog/how-to-choose-your-next-tech-stack/',
  '/en/blog/oops-i-deleted-it-again/',
  '/en/blog/run-further-than-a-marathon/',
  '/en/blog/solr-zookeeper-scaling-guidelines/',
  '/en/blog/stackoverflow-eulogy/',
  '/en/blog/to-build-or-not-to-build/',
  '/en/blog/zeroclaw-personal-ai-assistant/',
  '/en/contact',
  '/en/datenschutz',
  '/en/impressum',
  '/en/services',
];

function report(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']): string {
  return violations
    .map(
      (violation) =>
        `${violation.id} [${violation.impact ?? 'unknown'}] ${violation.help}\n` +
        violation.nodes
          .slice(0, 5)
          .map((node) => `    ${node.target.join(' ')} — ${node.html.slice(0, 200)}`)
          .join('\n')
    )
    .join('\n');
}

async function scan(page: import('@playwright/test').Page) {
  return new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
}

for (const path of PAGES) {
  test(`meets WCAG 2.2 AA — ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(report((await scan(page)).violations), 'light theme').toBe('');

    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    expect(report((await scan(page)).violations), 'dark theme').toBe('');
  });
}
