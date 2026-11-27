import DOMPurify from 'dompurify';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import type { WalineEmojiMaps, WalineHighlighter, WalineTeXRenderer } from '../typings/index.js';
import { markedTeXExtensions } from './markedMathExtension.js';

export const parseEmoji = (text = '', emojiMap: WalineEmojiMaps = {}): string =>
  text.replaceAll(/:(.+?):/gu, (placeholder, key: string) =>
    emojiMap[key] ? `<img class="wl-emoji" src="${emojiMap[key]}" alt="${key}">` : placeholder,
  );

export interface ParseMarkdownOptions {
  emojiMap: WalineEmojiMaps;
  highlighter: WalineHighlighter | null;
  texRenderer: WalineTeXRenderer | null;
}

let cachedHighlighter: WalineHighlighter | null | undefined,
  cachedMarked: Marked | undefined,
  cachedTeXRenderer: WalineTeXRenderer | null | undefined;

const getMarked = (
  highlighter: WalineHighlighter | null,
  texRenderer: WalineTeXRenderer | null,
): Marked => {
  if (cachedMarked && cachedHighlighter === highlighter && cachedTeXRenderer === texRenderer) {
    return cachedMarked;
  }

  const marked = new Marked();

  marked.setOptions({ breaks: true });

  if (highlighter) {
    marked.use(markedHighlight({ highlight: highlighter }));
  }

  if (texRenderer) {
    const extensions = markedTeXExtensions(texRenderer);

    marked.use({ extensions });
  }

  cachedMarked = marked;
  cachedHighlighter = highlighter;
  cachedTeXRenderer = texRenderer;

  return marked;
};

export const parseMarkdown = (
  content: string,
  { emojiMap, highlighter, texRenderer }: ParseMarkdownOptions,
): string =>
  DOMPurify.sanitize(
    getMarked(highlighter, texRenderer).parse(parseEmoji(content, emojiMap)) as string,
    {
      FORBID_TAGS: ['form', 'input', 'style'],
      FORBID_ATTR: ['autoplay', 'style'],
    },
  );
