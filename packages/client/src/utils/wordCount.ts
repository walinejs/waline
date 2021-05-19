/**
 * The wordCount module should be lightweight as it's packed into client.
 *
 * So We just make a simple implement here
 *
 * Forked from https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/reading-time/src/node/reading-time.ts
 */

export const getWords = (content: string): string[] =>
  content.match(/[\w\d\s\u00C0-\u024F]+/giu) || [];

export const getChinese = (content: string): string[] =>
  content.match(/[\u4E00-\u9FA5]/gu) || [];

export const getWordNumber = (content: string): number =>
  getWords(content).reduce(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0
  ) + getChinese(content).length;
