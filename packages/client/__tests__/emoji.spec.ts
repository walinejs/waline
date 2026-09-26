import { describe, expect, it } from 'vitest';

import { parseEmoji } from '../src/utils/markdown.js';
import { emojiMaps } from './__fixtures__/emojiMap.js';

describe(parseEmoji, () => {
  it('should not parse', () => {
    const content = 'Waline is a good framework. Note: It works with backend';

    expect(parseEmoji(content, emojiMaps)).toStrictEqual(content);
  });

  it("should not parse emoji it don't know", () => {
    const content = 'Waline is a good framework. :heart:';

    expect(parseEmoji(content, emojiMaps)).toStrictEqual(content);
  });

  it('should parse emoji', () => {
    expect(parseEmoji('Waline is a good framework. :bb_doge:', emojiMaps)).toBe(
      'Waline is a good framework. <img class="wl-emoji" src="https://cdn.jsdelivr.net/gh/walinejs/emojis/bilibili/bb_doge.png" alt="bb_doge">',
    );
  });

  it('should not throw errors', () => {
    expect(() => parseEmoji()).not.toThrow();
    expect(() => parseEmoji('')).not.toThrow();
  });
});
