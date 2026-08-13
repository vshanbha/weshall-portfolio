import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from '@/lib/reading-time';

describe('calculateReadingTime', () => {
  it('returns 1 for short content', () => {
    expect(calculateReadingTime(50)).toBe(1);
    expect(calculateReadingTime(1)).toBe(1);
    expect(calculateReadingTime(0)).toBe(1);
  });

  it('calculates correctly at default 200 wpm', () => {
    expect(calculateReadingTime(200)).toBe(1);
    expect(calculateReadingTime(400)).toBe(2);
    expect(calculateReadingTime(600)).toBe(3);
    expect(calculateReadingTime(1000)).toBe(5);
  });

  it('rounds up fractional minutes', () => {
    expect(calculateReadingTime(201)).toBe(2);
    expect(calculateReadingTime(399)).toBe(2);
    expect(calculateReadingTime(500)).toBe(3);
  });

  it('respects custom wordsPerMinute', () => {
    expect(calculateReadingTime(150, 150)).toBe(1);
    expect(calculateReadingTime(300, 150)).toBe(2);
    expect(calculateReadingTime(100, 250)).toBe(1);
  });
});
