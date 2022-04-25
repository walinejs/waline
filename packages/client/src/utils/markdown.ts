import { marked } from 'marked';
import { markedTexExtensions } from './markedMathExtension';

import type {
  WalineEmojiMaps,
  WalineHighlighter,
  WalineTexRenderer,
} from '../typings';

export const parseEmoji = (text = '', emojiMap: WalineEmojiMaps = {}): string =>
  text.replace(/:(.+?):/g, (placeholder, key: string) =>
    emojiMap[key]
      ? `<img class="wl-emoji" src="${emojiMap[key]}" alt="${key}">`
      : placeholder
  );

export interface ParseMarkdownOptions {
  emojiMap: WalineEmojiMaps;
  highlighter: WalineHighlighter | false;
  texRenderer: WalineTexRenderer | false;
}

export const parseMarkdown = (
  content: string,
  { emojiMap, highlighter, texRenderer }: ParseMarkdownOptions
): string => {
  marked.setOptions({
    highlight: highlighter || undefined,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  if (texRenderer) {
    const extensions = markedTexExtensions(texRenderer);

    marked.use({ extensions });
  }

  return marked.parse(parseEmoji(content, emojiMap));
};
