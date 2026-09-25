#!/usr/bin/env node
/* eslint-disable no-console -- build step: console output is the interface */
/**
 * Image provenance build step (EU AI Act Article 50 transparency).
 *
 * Stamps IPTC Photo Metadata (in XMP) onto the assets that are actually
 * delivered from `dist/` for articles marked `imageProvenance.kind` as
 * `ai-generated`. It runs after `astro build` because Astro/Sharp re-encodes
 * images during the build: the WebP renditions browsers load through `srcset`
 * carry no metadata unless it is written here.
 *
 * Rules enforced:
 *  - only articles whose frontmatter declares `imageProvenance.kind: ai-generated`
 *    are touched;
 *  - only known values from frontmatter are written — never placeholders;
 *  - files that already carry a C2PA manifest are never modified. Adding a
 *    chunk invalidates the manifest's asset hash and would weaken existing
 *    provenance; their provenance lives in the manifest itself.
 *
 * Blocking: exits non-zero if ExifTool is unavailable, if a marked article's
 * source image or its delivered assets are missing, or if a written value
 * cannot be read back.
 *
 * Not covered here (see docs/IMAGE_PROVENANCE.md): C2PA signing — this site
 * holds no signing key, by decision — and the prompt fields, which are written
 * only once a prompt is approved for publication.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parse } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES_DIR = join(ROOT, 'src', 'content', 'articles');
const DIST_ASSETS_DIR = join(ROOT, 'dist', '_astro');

const DIGITAL_SOURCE_TYPE =
  'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';

/** Marker for an embedded C2PA manifest (PNG `caBX` chunk, JUMBF boxes). */
const C2PA_MARKER = /caBX|c2pa\.(actions|assertions|claim|hash|signature)|jumbf/i;

const errors = [];

function fail(message) {
  errors.push(message);
  console.error(`  ✗ ${message}`);
}

function readFrontmatter(file) {
  const raw = readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) return null;
  return parse(match[1]) ?? null;
}

function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`createdOn is not a date: ${value}`);
  }
  return date.toISOString().slice(0, 10).replace(/-/g, ':');
}

/** IPTC Photo Metadata fields to write, keyed by ExifTool group-qualified name. */
function metadataTags(entry) {
  const { imageProvenance: provenance, ...rest } = entry;
  const tags = {
    'XMP-dc:Title': rest.title,
    'XMP-dc:Description': rest.description,
    'XMP-iptcCore:AltTextAccessibility': rest.imageAlt,
    'XMP-dc:Creator': rest.author,
    'XMP-photoshop:Credit': rest.author,
    'XMP-iptcExt:DigitalSourceType': DIGITAL_SOURCE_TYPE,
  };
  if (provenance.createdOn) tags['XMP-photoshop:DateCreated'] = formatDate(provenance.createdOn);
  if (provenance.system) tags['XMP-iptcExt:AISystemUsed'] = provenance.system;
  if (provenance.systemVersion) {
    tags['XMP-iptcExt:AISystemVersionUsed'] = provenance.systemVersion;
  }
  if (provenance.prompt) tags['XMP-iptcExt:AIPromptInformation'] = provenance.prompt;
  // AIPromptWriterName is written together with an approved prompt, once the
  // writer is recorded in frontmatter. TODO: add when a prompt is published.
  return tags;
}

function runExiftool(args) {
  return spawnSync('exiftool', args, { encoding: 'utf8' });
}

function readTags(file, tagNames) {
  const args = tagNames.map((name) => (name.startsWith('-') ? name : `-${name}`));
  const result = spawnSync('exiftool', ['-j', ...args, file], { encoding: 'utf8' });
  if (result.error || result.status !== 0) {
    throw new Error(
      `exiftool could not read ${file}: ${result.error?.message ?? result.stderr.trim()}`
    );
  }
  return JSON.parse(result.stdout)[0];
}

function writeTags(file, tags) {
  const args = ['-overwrite_original', ...Object.entries(tags).map(([k, v]) => `-${k}=${v}`), file];
  const result = runExiftool(args);
  if (result.error || result.status !== 0) {
    throw new Error(
      `exiftool could not write ${file}: ${result.error?.message ?? result.stderr.trim()}`
    );
  }
}

/**
 * ExifTool reports numerically-shaped XMP text (e.g. `2.0`) as a number in
 * JSON output, so compare numerically as well as by string.
 */
function valuesMatch(actual, expected) {
  if (actual === expected) return true;
  const actualNumber = Number(actual);
  const expectedNumber = Number(expected);
  return (
    Number.isFinite(actualNumber) &&
    Number.isFinite(expectedNumber) &&
    actualNumber === expectedNumber
  );
}

function verifyTags(file, tags) {
  const written = readTags(file, Object.keys(tags));
  for (const [tag, expected] of Object.entries(tags)) {
    const key = tag.split(':').pop();
    const actual = written[key];
    if (!valuesMatch(actual, expected)) {
      return `${key}: expected ${JSON.stringify(expected)}, read ${JSON.stringify(actual)}`;
    }
  }
  return null;
}

function deliveredAssets(stem) {
  if (!existsSync(DIST_ASSETS_DIR)) return [];
  return readdirSync(DIST_ASSETS_DIR)
    .filter((name) => name.startsWith(`${stem}.`))
    .map((name) => join(DIST_ASSETS_DIR, name))
    .sort();
}

function hasC2paManifest(file) {
  return C2PA_MARKER.test(readFileSync(file).toString('latin1'));
}

function main() {
  const exiftoolVersion = spawnSync('exiftool', ['-ver'], { encoding: 'utf8' });
  if (exiftoolVersion.error || exiftoolVersion.status !== 0) {
    console.error(
      'Image provenance: ExifTool is required but was not found on PATH.\n' +
        'Install it (macOS: `brew install exiftool`, Debian/Ubuntu: `apt-get install libimage-exiftool-perl`).'
    );
    process.exit(1);
  }

  const articles = readdirSync(ARTICLES_DIR).filter((name) => /\.(md|mdx)$/.test(name));
  const marked = [];

  for (const name of articles) {
    const file = join(ARTICLES_DIR, name);
    const frontmatter = readFrontmatter(file);
    if (!frontmatter?.imageProvenance || frontmatter.imageProvenance.kind !== 'ai-generated') {
      continue;
    }
    if (typeof frontmatter.image !== 'string') {
      fail(`${name}: imageProvenance declared but no image to stamp`);
      continue;
    }
    marked.push({ name, frontmatter });
  }

  console.log(
    `Image provenance: ${marked.length} article(s) marked ai-generated ` +
      `(ExifTool ${exiftoolVersion.stdout.trim()})`
  );

  if (marked.length === 0) {
    fail('no articles declare imageProvenance.kind: ai-generated — nothing was written');
  }

  for (const { name, frontmatter } of marked) {
    const stem = frontmatter.image.replace(/^\.?\//, '').replace(/\.[^.]+$/, '');
    const source = join(ARTICLES_DIR, frontmatter.image);
    if (!existsSync(source)) {
      fail(`${name}: source image not found at ${source}`);
      continue;
    }

    const targets = deliveredAssets(stem);
    if (targets.length === 0) {
      fail(`${name}: no delivered assets for ${stem} in dist/_astro (run \`pnpm build\` first)`);
      continue;
    }

    const tags = metadataTags(frontmatter);
    for (const target of targets) {
      const rel = target.slice(ROOT.length + 1);
      if (hasC2paManifest(target)) {
        // Existing manifest takes precedence: writing would invalidate its
        // asset hash. Verified separately by the C2PA check.
        console.log(`  - ${rel}  [kept C2PA manifest, no metadata written]`);
        continue;
      }
      try {
        writeTags(target, tags);
        const problem = verifyTags(target, tags);
        if (problem) fail(`${rel}: verification failed — ${problem}`);
        else console.log(`  - ${rel}  [IPTC/XMP written]`);
      } catch (error) {
        fail(`${rel}: ${error.message}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`\nImage provenance failed with ${errors.length} error(s).`);
    process.exit(1);
  }
  console.log('Image provenance: delivered assets verified.');
}

main();
