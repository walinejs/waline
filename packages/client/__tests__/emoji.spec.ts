import { describe, expect, it, vi } from 'vitest';

import type { WalineEmojiInfo } from '../src/typings/index.js';
import { getEmojisInfo } from '../src/utils/emoji.js';
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

const setupLocalStorage = (): void => {
  const store = new Map<string, string>();

  vi.stubGlobal('localStorage', {
    getItem(key: string): string | null {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string): void {
      store.set(key, value);
    },
    removeItem(key: string): void {
      store.delete(key);
    },
    clear(): void {
      store.clear();
    },
  });
};

const mockFetch = (info: Omit<WalineEmojiInfo, 'folder'>): void => {
  vi.stubGlobal('fetch', () =>
    Promise.resolve({
      json: () => Promise.resolve(info),
    }),
  );
};

describe(getEmojisInfo, () => {
  it('should handle null input', async () => {
    await expect(getEmojisInfo(null)).resolves.toStrictEqual({
      tabs: [],
      map: {},
    });
  });

  it('should handle WalineEmojiInfo objects', async () => {
    const result = await getEmojisInfo([
      {
        name: 'Custom',
        icon: 'smile',
        prefix: 'custom_',
        type: 'png',
        folder: 'https://example.com/emoji',
        items: ['laugh', 'sob'],
      },
    ]);

    expect(result.tabs).toHaveLength(1);
    expect(result.tabs[0].name).toBe('Custom');
    expect(result.tabs[0].items).toStrictEqual(['custom_laugh', 'custom_sob']);
    expect(result.map.custom_laugh).toBe('https://example.com/emoji/custom_laugh.png');
  });

  it('should fetch emoji info from string presets', async () => {
    setupLocalStorage();
    mockFetch({
      name: 'Weibo',
      icon: 'weibo_icon',
      prefix: 'weibo_',
      type: 'png',
      items: ['laugh', 'cry'],
    });

    const result = await getEmojisInfo(['https://example.com/weibo']);

    expect(result.tabs).toHaveLength(1);
    expect(result.tabs[0].name).toBe('Weibo');
    expect(result.map.weibo_laugh).toBe('https://example.com/weibo/weibo_laugh.png');
  });

  it('should call factory function returning WalineEmojiInfo', async () => {
    const factory = vi.fn<() => WalineEmojiInfo>(() => ({
      name: 'Factory',
      icon: 'icon',
      items: ['a', 'b'],
      prefix: 'f_',
      type: 'gif',
      folder: 'https://example.com/factory',
    }));

    const result = await getEmojisInfo([factory]);

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.tabs).toHaveLength(1);
    expect(result.tabs[0].name).toBe('Factory');
    expect(result.tabs[0].items).toStrictEqual(['f_a', 'f_b']);
  });

  it('should call factory function returning WalineEmojiInfo[]', async () => {
    const factory = vi.fn<() => WalineEmojiInfo[]>(() => [
      {
        name: 'Tab1',
        icon: 'a',
        items: ['a1', 'a2'],
        folder: 'https://example.com/tab1',
      },
      {
        name: 'Tab2',
        icon: 'b',
        items: ['b1'],
        folder: 'https://example.com/tab2',
      },
    ]);

    const result = await getEmojisInfo([factory]);

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.tabs).toHaveLength(2);
    expect(result.tabs[0].name).toBe('Tab1');
    expect(result.tabs[1].name).toBe('Tab2');
    expect(result.map.a1).toBe('https://example.com/tab1/a1');
    expect(result.map.b1).toBe('https://example.com/tab2/b1');
  });

  it('should call factory function returning Promise<WalineEmojiInfo>', async () => {
    const factory = vi.fn<() => Promise<WalineEmojiInfo>>(() =>
      Promise.resolve({
        name: 'Async',
        icon: 'icon',
        items: ['x', 'y'],
        folder: 'https://example.com/async',
      }),
    );

    const result = await getEmojisInfo([factory]);

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.tabs).toHaveLength(1);
    expect(result.tabs[0].name).toBe('Async');
    expect(result.tabs[0].items).toStrictEqual(['x', 'y']);
  });

  it('should call factory function returning Promise<WalineEmojiInfo[]>', async () => {
    const factory = vi.fn<() => Promise<WalineEmojiInfo[]>>(() =>
      Promise.resolve([
        {
          name: 'AsyncTab1',
          icon: 'a1',
          items: ['aa'],
          folder: 'https://example.com/at1',
        },
        {
          name: 'AsyncTab2',
          icon: 'a2',
          items: ['bb'],
          folder: 'https://example.com/at2',
        },
      ]),
    );

    const result = await getEmojisInfo([factory]);

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.tabs).toHaveLength(2);
    expect(result.tabs[0].name).toBe('AsyncTab1');
    expect(result.tabs[1].name).toBe('AsyncTab2');
  });

  it('should handle mixed array of all types', async () => {
    setupLocalStorage();
    mockFetch({
      name: 'Weibo',
      icon: 'w_icon',
      items: ['w1'],
    });

    const factory = vi.fn<() => WalineEmojiInfo>(() => ({
      name: 'FactoryItem',
      icon: 'f_icon',
      items: ['f1'],
      folder: 'https://example.com/f',
    }));

    const result = await getEmojisInfo([
      'https://example.com/weibo',
      factory,
      {
        name: 'Direct',
        icon: 'd_icon',
        items: ['d1'],
        folder: 'https://example.com/d',
      },
    ]);

    expect(result.tabs).toHaveLength(3);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('should flatten arrays returned by factories', async () => {
    const factory = vi.fn<() => WalineEmojiInfo[]>(() => [
      { name: 'F1', icon: 'a', items: ['x'], folder: 'https://example.com/f1' },
      { name: 'F2', icon: 'b', items: ['y'], folder: 'https://example.com/f2' },
    ]);

    const result = await getEmojisInfo([
      factory,
      { name: 'Direct', icon: 'c', items: ['z'], folder: 'https://example.com/dir' },
    ]);

    expect(result.tabs).toHaveLength(3);
    expect(result.tabs[0].name).toBe('F1');
    expect(result.tabs[1].name).toBe('F2');
    expect(result.tabs[2].name).toBe('Direct');
  });
});
