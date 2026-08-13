/**
 * Calculate estimated reading time from word count.
 * @param wordCount - Number of words in the content
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function calculateReadingTime(wordCount: number, wordsPerMinute = 200): number {
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
