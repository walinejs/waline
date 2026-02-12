import type { IGif } from '@giphy/js-types';

import type {
  WalineEmojiPresets,
  WalineMeta,
  WalineSearchOptions,
  WalineSearchResult,
} from '../typings/index.js';

const AVAILABLE_META = new Set<WalineMeta>(['nick', 'mail', 'link']);

export const getMeta = (meta: WalineMeta[]): WalineMeta[] =>
  meta.filter((item) => AVAILABLE_META.has(item));

export const DEFAULT_EMOJI: WalineEmojiPresets[] = ['//unpkg.com/@waline/emojis@1.1.0/weibo'];

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
    if (file.size > 128 * 1000) {
      reject(new Error('File too large! File size limit 128KB'));

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });
    reader.addEventListener('error', reject);
  });

export const defaultTeXRenderer = (blockMode: boolean): string =>
  blockMode
    ? '<p class="wl-tex">TeX is not available in preview</p>'
    : '<span class="wl-tex">TeX is not available in preview</span>';

export const getDefaultSearchOptions = (lang: string): WalineSearchOptions => {
  interface GifResult {
    data: IGif[];
    meta: {
      msg: string;
      response_id: string;
      status: number;
    };
    pagination: {
      count: number;
      total_count: number;
      offset: number;
    };
  }

  const fetchGiphy = (
    url: string,
    params: Record<string, string> = {},
  ): Promise<WalineSearchResult> =>
    fetch(
      `https://api.giphy.com/v1/gifs/${url}?${new URLSearchParams({
        lang,
        limit: '20',
        rating: 'g',
        api_key: '6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp',
        ...params,
      }).toString()}`,
    )
      .then((resp) => resp.json() as Promise<GifResult>)
      .then(({ data }) =>
        data.map((gif) => ({
          title: gif.title,
          src: gif.images.downsized_medium.url,
        })),
      );

  return {
    search: (word: string): Promise<WalineSearchResult> =>
      // oxlint-disable-next-line id-length
      fetchGiphy('search', { q: word, offset: '0' }),
    default: (): Promise<WalineSearchResult> => fetchGiphy('trending', {}),
    more: (word: string, offset = 0): Promise<WalineSearchResult> =>
      // oxlint-disable-next-line id-length
      fetchGiphy('search', { q: word, offset: offset.toString() }),
  };
};
