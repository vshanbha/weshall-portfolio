/**
 * Shared dist-freshness guard for tests that read build output — the
 * Regression Guard Rule from issue #20: these suites must never pass
 * against a stale `dist/`.
 *
 * Skips the rebuild when every marker is newer than the build inputs
 * (src/, public/, astro.config.mjs, package.json, pnpm-lock.yaml). The
 * validate chain builds immediately before running tests, so the guard is
 * a cheap no-op there; a standalone `pnpm test` after source edits still
 * gets a fresh build. Anything unstat-able falls through to a rebuild.
 */
import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

/** Newest mtime (ms) anywhere under a directory tree (follows symlinked dirs). */
function newestMtime(dir: string): number {
  let newest = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    const linkStat = entry.isSymbolicLink() ? statSync(path) : null;
    const isDirectory = linkStat ? linkStat.isDirectory() : entry.isDirectory();
    newest = Math.max(
      newest,
      isDirectory ? newestMtime(path) : (linkStat ?? statSync(path)).mtimeMs
    );
  }
  return newest;
}

/** Rebuild `dist/` unless every absolute marker path is newer than the build inputs. */
export function ensureFreshDist(markers: string[]): void {
  try {
    const newestInput = Math.max(
      newestMtime(resolve('src')),
      newestMtime(resolve('public')),
      statSync(resolve('astro.config.mjs')).mtimeMs,
      statSync(resolve('package.json')).mtimeMs,
      statSync(resolve('pnpm-lock.yaml')).mtimeMs
    );
    if (markers.every((marker) => statSync(marker).mtimeMs >= newestInput)) return;
  } catch {
    // Missing or unstat-able inputs/markers → fall through and rebuild.
  }
  execSync('pnpm build', { cwd: resolve('.'), stdio: 'pipe' });
}
