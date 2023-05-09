import { markedEmoji } from 'marked-emoji';

import { marked } from './marked.js';
import { type EmojiMap } from '../../typings.js';

export const setEmojiParser = (emojiMap: EmojiMap): void => {
  marked.use(markedEmoji({ emojis: emojiMap }));
};
