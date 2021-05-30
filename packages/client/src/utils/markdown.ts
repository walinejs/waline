import hanabi from 'hanabi';
import marked from 'marked';

import type { EmojiMaps } from '../config';

const inlineMathRegExp = /\B\$\b([^\n$]*)\b\$\B/g;
const blockMathRegExp = /(^|\n\n)\$\$\n(.+?)\n\$\$(\n\n|$)/g;

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
  highlight = true,
  emojiMap: EmojiMaps
): string => {
  marked.setOptions({
    highlight: highlight ? hanabi : undefined,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  return parseMath(marked(parseEmoji(content, emojiMap)));
};
