import { describe, it, expect } from 'vitest';
import { truncateDescription } from '@/lib/og';

/**
 * OG card descriptions are budgeted at 120 chars including the ellipsis.
 * The cut must land on a word boundary or cards render mid-word
 * (e.g. "…twenty years of building and d…").
 */

const LONG_DESCRIPTION =
  'deep-dive technical analysis, operational case studies and engineering philosophy from twenty years of building and deploying software in production.';

describe('truncateDescription', () => {
  it('truncates a long description at a word boundary', () => {
    const out = truncateDescription(LONG_DESCRIPTION);

    expect(out.endsWith('...')).toBe(true);
    expect(out.length).toBeLessThanOrEqual(120);

    // Everything before the ellipsis is an exact prefix of the input that
    // stops at a whitespace — not mid-word.
    const kept = out.slice(0, -3);
    expect(LONG_DESCRIPTION.startsWith(kept)).toBe(true);
    expect(LONG_DESCRIPTION[kept.length]).toBe(' ');
    // The raw 117-char slice it replaced really did cut mid-word.
    expect(kept).not.toBe(LONG_DESCRIPTION.slice(0, 117));
  });

  it('leaves a short description unchanged', () => {
    expect(truncateDescription('Short description')).toBe('Short description');
  });

  it('treats newlines as boundaries', () => {
    const input = 'A'.repeat(50) + '\n' + 'B'.repeat(100);
    expect(truncateDescription(input)).toBe('A'.repeat(50) + '...');
  });

  it('treats tabs as boundaries', () => {
    const input = 'A'.repeat(50) + '\t' + 'B'.repeat(100);
    expect(truncateDescription(input)).toBe('A'.repeat(50) + '...');
  });

  it('trims to within budget for a description one char over the limit', () => {
    const justOver = 'A'.repeat(60) + ' ' + 'B'.repeat(60); // 121 chars
    const out = truncateDescription(justOver);
    expect(out).toBe('A'.repeat(60) + '...');
    expect(out.length).toBeLessThanOrEqual(120);
  });

  it('never splits a surrogate pair in the no-whitespace fallback', () => {
    const emoji = '🚀'.repeat(130);
    const out = truncateDescription(emoji);
    expect(Array.from(out.slice(0, -3))).toHaveLength(117);
    expect(out.endsWith('...')).toBe(true);
  });

  it('keeps the raw cut when the only boundary is at position 0', () => {
    const leading = '   ' + 'X'.repeat(200);
    const out = truncateDescription(leading);
    expect(out).toBe(leading.slice(0, 117) + '...');
    expect(out.length).toBeLessThanOrEqual(120);
  });

  it('falls back to a raw cut when a long description has no whitespace', () => {
    const url = 'https://example.com/' + 'a'.repeat(140);
    const out = truncateDescription(url);
    expect(out).toBe(url.slice(0, 117) + '...');
    expect(out.length).toBeLessThanOrEqual(120);
  });

  it('leaves a description of exactly 120 chars unchanged', () => {
    const atLimit = 'x'.repeat(120);
    expect(truncateDescription(atLimit)).toBe(atLimit);
  });

  it('returns an empty string for empty or undefined input', () => {
    expect(truncateDescription('')).toBe('');
    expect(truncateDescription(undefined)).toBe('');
  });
});
