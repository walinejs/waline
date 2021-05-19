import hanabi from 'hanabi';
import marked from 'marked';

import type { Config, EmojiMaps } from '../config';

const inlineMathRegExp = /\B\$\b([^\n$]*)\b\$\B/g;
const blockMathRegExp = /(^|\n\n)\$\$\n(.+?)\n\$\$(\n\n|$)/g;

export const parseEmoji = (
  text = '',
  emojiMaps: EmojiMaps = {},
  emojiCDN = ''
): string =>
  text.replace(/:(.+?):/g, (placeholder, key: string) => {
    if (!emojiMaps[key]) {
      return placeholder;
    }

    return `<img class="vemoji" src="${
      /(?:https?:)?\/\//.test(emojiMaps[key])
        ? emojiMaps[key]
        : emojiCDN + emojiMaps[key]
    }" alt="${key}">`;
  });

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
  { highlight = true, emojiCDN, emojiMaps }: Config
): string => {
  marked.setOptions({
    highlight: highlight ? hanabi : undefined,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  return parseMath(marked(parseEmoji(content, emojiMaps, emojiCDN)));
};
