import { marked } from 'marked';

import { markedTeXExtensions } from './markedMathExtension.js';
import {
  type WalineEmojiMaps,
  type WalineHighlighter,
  type WalineTeXRenderer,
} from '../typings/index.js';

export const parseEmoji = (text = '', emojiMap: WalineEmojiMaps = {}): string =>
  text.replace(/:(.+?):/g, (placeholder, key: string) =>
    emojiMap[key]
      ? `<img class="wl-emoji" src="${emojiMap[key]}" alt="${key}">`
      : placeholder,
  );

export interface ParseMarkdownOptions {
  emojiMap: WalineEmojiMaps;
  highlighter: WalineHighlighter | false;
  texRenderer: WalineTeXRenderer | false;
}

export const parseMarkdown = (
  content: string,
  { emojiMap, highlighter, texRenderer }: ParseMarkdownOptions,
): string => {
  marked.setOptions({
    highlight: highlighter || undefined,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  if (texRenderer) {
    const extensions = markedTeXExtensions(texRenderer);

    marked.use({ extensions });
  }

  return marked.parse(parseEmoji(content, emojiMap));
};
