import hanabi from 'hanabi';
import marked from 'marked';
import { markedTexExtensions } from './markedMathExtension';

import type { EmojiMaps, TexRenderer } from '../config';

export const parseEmoji = (text = '', emojiMap: EmojiMaps = {}): string =>
  text.replace(/:(.+?):/g, (placeholder, key: string) =>
    emojiMap[key]
      ? `<img class="vemoji" src="${emojiMap[key]}" alt="${key}">`
      : placeholder
  );

export const parseMarkdown = (
  content: string,
  highlight = true,
  emojiMap: EmojiMaps,
  texRenderer: TexRenderer | false
): string => {
  marked.setOptions({
    highlight: highlight ? hanabi : undefined,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  if (texRenderer) {
    const extensions = markedTexExtensions(texRenderer);

    marked.use({ extensions });
  }

  return marked(parseEmoji(content, emojiMap));
};
