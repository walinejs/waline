import { type IGif } from '@giphy/js-types';

import {
  type WalineEmojiPresets,
  type WalineMeta,
  type WalineSearchOptions,
  type WalineSearchResult,
} from '../typings/index.js';

const AVAILABLE_META: WalineMeta[] = ['nick', 'mail', 'link'];

export const getMeta = (meta: WalineMeta[]): WalineMeta[] =>
  meta.filter((item) => AVAILABLE_META.includes(item));

export const DEFAULT_EMOJI: WalineEmojiPresets[] = [
  '//unpkg.com/@waline/emojis@1.1.0/weibo',
];

export const DEFAULT_LANG = 'en-US';

export const DEFAULT_REACTION = [
  '//unpkg.com/@waline/emojis/tieba/tieba_agree.png',
  '//unpkg.com/@waline/emojis/tieba/tieba_look_down.png',
  '//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png',
  '//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png',
  '//unpkg.com/@waline/emojis/tieba/tieba_awkward.png',
  '//unpkg.com/@waline/emojis/tieba/tieba_sleep.png',
];

export const defaultUploadImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (file.size > 128 * 1000)
      return reject(new Error('File too large! File size limit 128KB'));

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });

export const defaultTeXRenderer = (blockMode: boolean): string =>
  blockMode === true
    ? '<p class="wl-tex">TeX is not available in preview</p>'
    : '<span class="wl-tex">TeX is not available in preview</span>';

export const getDefaultSearchOptions = (lang: string): WalineSearchOptions => {
  interface GifResult {
    data: IGif[];
    meta: {
      msg: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      response_id: string;
      status: number;
    };
    pagination: {
      count: number;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      total_count: number;
      offset: number;
    };
  }

  const fetchGiphy = async (
    url: string,
    params: Record<string, string> = {},
  ): Promise<WalineSearchResult> =>
    fetch(
      `https://api.giphy.com/v1/gifs/${url}?${new URLSearchParams({
        lang,
        limit: '20',
        rating: 'g',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        api_key: '6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp',
        ...params,
      }).toString()}`,
    )
      .then((resp) => <Promise<GifResult>>resp.json())
      .then(({ data }) =>
        data.map((gif) => ({
          title: gif.title,
          src: gif.images.downsized_medium.url,
        })),
      );

  return {
    search: (word: string): Promise<WalineSearchResult> =>
      fetchGiphy('search', { q: word, offset: '0' }),
    default: (): Promise<WalineSearchResult> => fetchGiphy('trending', {}),
    more: (word: string, offset = 0): Promise<WalineSearchResult> =>
      fetchGiphy('search', { q: word, offset: offset.toString() }),
  };
};
