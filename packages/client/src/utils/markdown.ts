import type { EmojiMaps } from '../config';

const inlineMathRegExp = /\B\$\b([^\n$]*)\b\$\B/g;
const blockMathRegExp = /(^|\n\n)\$\$\n(.+?)\n\$\$(\n\n|$)/g;

export type MarkdownParser = (content: string) => string;

const getParser = (highlight: boolean): Promise<MarkdownParser> =>
  Promise.all([
    import(/** chunkName: markdown */ 'marked'),
    import(/** chunkName: markdown */ 'hanabi'),
  ]).then(([{ default: marked }, { default: hanabi }]) => {
    marked.setOptions({
      highlight: highlight ? hanabi : undefined,
      breaks: true,
      smartLists: true,
      smartypants: true,
    });

    return marked;
  });

export const parseEmoji = (text = '', emojiMap: EmojiMaps = {}): string =>
  text.replace(/:(.+?):/g, (placeholder, key: string) =>
    emojiMap[key]
      ? `<img class="vemoji" src="${emojiMap[key]}" alt="${key}">`
      : placeholder
  );

export const parseMath = (content: string): string =>
  content
    .replace(
      inlineMathRegExp,
      '<span class="vtex">Tex is not available in preview</span>'
    )
    .replace(
      blockMathRegExp,
      '<p class="vtex">Tex is not available in preview</p>'
    );

export const parseMarkdown = (
  content: string,
  emojiMap: EmojiMaps,
  highlight = true
): Promise<string> =>
  getParser(highlight).then((parser) =>
    parseMath(parser(parseEmoji(content, emojiMap)))
  );
