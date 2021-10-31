import hanabi from 'hanabi';
import marked from 'marked';
import { markedMathExtension } from './markedMathExtension';

import type { EmojiMaps, PreviewMath } from '../config';

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
  previewMath: PreviewMath | false
): string => {
  marked.setOptions({
    highlight: highlight ? hanabi : undefined,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  if (previewMath !== false) {
    const extensions = markedMathExtension(previewMath);
    marked.use({ extensions });
  }

  return marked(parseEmoji(content, emojiMap));
};
