import { describe, expect, it } from 'vitest';

import { emojiMaps } from './__fixtures__/emojiMap.js';
import { parseEmoji } from '../src/utils/markdown.js';
import { getEmojisInfo } from '../src/utils/emoji.js';
import { WalineEmojiConfig } from '../src/utils/config.js';

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
    expect(parseEmoji('Waline is a good framework. :bb_doge:', emojiMaps)).toEqual(
      'Waline is a good framework. <img class="wl-emoji" src="https://cdn.jsdelivr.net/gh/walinejs/emojis/bilibili/bb_doge.png" alt="bb_doge">',
    );
  });

  it('Should not throw errors', () => {
    expect(() => parseEmoji()).not.toThrowError();
    expect(() => parseEmoji('')).not.toThrowError();
  });

  it('Should get sync factory info', async () => {
    const expected1: WalineEmojiConfig = {
      tabs: [
        {
          icon: 'http://localhost/emoji/tt_test.png',
          items: ['tt_test-1', 'tt_test-2'],
          name: 'test',
        },
      ],
      map: {
        'tt_test-1': 'http://localhost/emoji/tt_test-1.png',
        'tt_test-2': 'http://localhost/emoji/tt_test-2.png',
      },
    };
    const expected2: WalineEmojiConfig = {
      tabs: [
        {
          icon: 'http://localhost/emoji/t_test.png',
          items: ['t_test-1', 't_test-2'],
          name: 'test',
        },
        {
          icon: 'http://localhost/emoji/tt_test.png',
          items: ['tt_test-1', 'tt_test-2'],
          name: 'test',
        },
      ],
      map: {
        't_test-1': 'http://localhost/emoji/t_test-1.png',
        't_test-2': 'http://localhost/emoji/t_test-2.png',
        'tt_test-1': 'http://localhost/emoji/tt_test-1.png',
        'tt_test-2': 'http://localhost/emoji/tt_test-2.png',
      },
    };

    expect(
      await getEmojisInfo([
        () => ({
          name: 'test',
          folder: 'http://localhost/emoji',
          prefix: 'tt_',
          type: 'png',
          icon: 'test',
          items: ['test-1', 'test-2'],
        }),
      ]),
    ).toEqual(expected1);

    expect(
      await getEmojisInfo([
        {
          name: 'test',
          folder: 'http://localhost/emoji',
          prefix: 't_',
          type: 'png',
          icon: 'test',
          items: ['test-1', 'test-2'],
        },
        () => expected1,
      ]),
    ).toEqual(expected2);
  });

  it('Should get async factory info', async () => {
    const expected1: WalineEmojiConfig = {
      tabs: [
        {
          icon: 'http://localhost/emoji/tt_test.png',
          items: ['tt_test-1', 'tt_test-2'],
          name: 'test',
        },
      ],
      map: {
        'tt_test-1': 'http://localhost/emoji/tt_test-1.png',
        'tt_test-2': 'http://localhost/emoji/tt_test-2.png',
      },
    };
    const expected2: WalineEmojiConfig = {
      tabs: [
        {
          icon: 'http://localhost/emoji/t_test.png',
          items: ['t_test-1', 't_test-2'],
          name: 'test',
        },
        {
          icon: 'http://localhost/emoji/tt_test.png',
          items: ['tt_test-1', 'tt_test-2'],
          name: 'test',
        },
      ],
      map: {
        't_test-1': 'http://localhost/emoji/t_test-1.png',
        't_test-2': 'http://localhost/emoji/t_test-2.png',
        'tt_test-1': 'http://localhost/emoji/tt_test-1.png',
        'tt_test-2': 'http://localhost/emoji/tt_test-2.png',
      },
    };

    expect(
      await getEmojisInfo([
        () =>
          Promise.resolve({
            name: 'test',
            folder: 'http://localhost/emoji',
            prefix: 'tt_',
            type: 'png',
            icon: 'test',
            items: ['test-1', 'test-2'],
          }),
      ]),
    ).toEqual(expected1);
    expect(
      await getEmojisInfo([
        {
          name: 'test',
          folder: 'http://localhost/emoji',
          prefix: 't_',
          type: 'png',
          icon: 'test',
          items: ['test-1', 'test-2'],
        },
        () => Promise.resolve(expected1),
      ]),
    ).toEqual(expected2);
  });
});
