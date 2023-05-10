import { setEmojiParser } from '@markdown/emoji';
import { getRenderer as _getRenderer } from '@markdown/main';
import '@markdown/tex';

import { type EmojiMap, type MarkdownRenderer } from '../typings.js';

export interface RendererOptions {
  emojiMap: EmojiMap;
}

export const getRenderer = ({
  emojiMap,
}: RendererOptions): Promise<MarkdownRenderer> => {
  setEmojiParser(emojiMap);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return _getRenderer();
};
