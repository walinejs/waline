/**
 * The wordCount module should be lightweight as it's packed into client.
 *
 * So We just make a simple implement here
 *
 * Forked from https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/src/node/readingTime.ts
 */

/**
 * Extract Latin words from content
 */
export const getWords = (content: string): RegExpMatchArray | null =>
  // \u00C0-\u024F are Latin Supplement letters, maybe used in language like french
  // \u0400-\u04FF are Cyrillic letters, used in russian
  content.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu);

/**
 * Extract Chinese Characters from content
 */
export const getChinese = (content: string): RegExpMatchArray | null =>
  content.match(/[\u4E00-\u9FD5]/gu);

/**
 * Get word number of given string
 */
export const getWordNumber = (content: string): number =>
  (getWords(content)?.reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0,
  ) || 0) + (getChinese(content)?.length || 0);
