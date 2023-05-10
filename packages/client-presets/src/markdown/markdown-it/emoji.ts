import emoji from 'markdown-it-emoji';

import { markdownIt } from './markdown-it.js';
import { type EmojiMap } from '../../typings.js';

export const setEmojiParser = (emojiMap: EmojiMap): void => {
  markdownIt.use(emoji, { defs: emojiMap, shortcuts: {} });
};
