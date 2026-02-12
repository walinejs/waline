import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import { markedTeXExtensions } from './markedMathExtension.js';
import type { WalineEmojiMaps, WalineHighlighter, WalineTeXRenderer } from '../typings/index.js';

export const parseEmoji = (text = '', emojiMap: WalineEmojiMaps = {}): string =>
  text.replaceAll(/:(.+?):/g, (placeholder, key: string) =>
    emojiMap[key] ? `<img class="wl-emoji" src="${emojiMap[key]}" alt="${key}">` : placeholder,
  );

export interface ParseMarkdownOptions {
  emojiMap: WalineEmojiMaps;
  highlighter: WalineHighlighter | null;
  texRenderer: WalineTeXRenderer | null;
}

export const parseMarkdown = (
  content: string,
  { emojiMap, highlighter, texRenderer }: ParseMarkdownOptions,
): string => {
  const marked = new Marked();

  marked.setOptions({ breaks: true });

  if (highlighter) marked.use(markedHighlight({ highlight: highlighter }));

  if (texRenderer) {
    const extensions = markedTeXExtensions(texRenderer);

    marked.use({ extensions });
  }

  return marked.parse(parseEmoji(content, emojiMap)) as string;
};
