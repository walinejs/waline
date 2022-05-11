import { describe, expect, it } from 'vitest';
import { parseEmoji } from '../src/utils/markdown';
import { emojiMaps } from './__fixtures__/emojiMap';

describe('Emoji test', () => {
  it('Should not parse', () => {
    const content = 'Waline is a good framework. Note: It works with backend';

    expect(parseEmoji(content, emojiMaps)).toEqual(content);
  });

  it("Should not parse emoji it don't know", () => {
    const content = 'Waline is a good framework. :heart:';

    expect(parseEmoji(content, emojiMaps)).toEqual(content);
  });

  it('Should parse emoji', () => {
    expect(
      parseEmoji('Waline is a good framework. :bb_doge:', emojiMaps)
    ).toEqual(
      'Waline is a good framework. <img class="wl-emoji" src="https://cdn.jsdelivr.net/gh/walinejs/emojis/bilibili/bb_doge.png" alt="bb_doge">'
    );
  });

  it('Should not throw errors', () => {
    expect(parseEmoji());
    expect(parseEmoji(''));
  });
});
