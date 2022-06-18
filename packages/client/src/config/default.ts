import type { WalineMeta, WalineSearchOptions } from '../typings';

const availableMeta: WalineMeta[] = ['nick', 'mail', 'link'];

export const getMeta = (meta: WalineMeta[]): WalineMeta[] =>
  meta.filter((item) => availableMeta.includes(item));

export const defaultLang = 'zh-CN';

export const defaultUploadImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });

export const defaultTexRenderer = (blockMode: boolean): string =>
  blockMode === true
    ? '<p class="wl-tex">Tex is not available in preview</p>'
    : '<span class="wl-tex">Tex is not available in preview</span>';

export const getDefaultSearchOptions = (): WalineSearchOptions => {
  interface FetchGifRequest {
    keyword: string;
    pos?: string;
  }

  type GifFormat =
    | 'gif'
    | 'mediumgif'
    | 'tinygif'
    | 'nanogif'
    | 'mp4'
    | 'loopedmp4'
    | 'tinymp4'
    | 'nanomp4'
    | 'webm'
    | 'tinywebm'
    | 'nanowebm';

  interface MediaObject {
    preview: string;
    url: string;
    dims: number[];
    size: number;
  }

  interface GifObject {
    created: number;
    hasaudio: boolean;
    id: string;
    media: Record<GifFormat, MediaObject>[];
    tags: string[];
    title: string;
    itemurl: string;
    hascaption: boolean;
    url: string;
  }

  interface FetchGifResponse {
    next: string;
    results: GifObject[];
  }

  const state = {
    next: '',
  };

  const fetchGif = ({
    keyword,
    pos,
  }: FetchGifRequest): Promise<FetchGifResponse> => {
    const baseUrl = `https://g.tenor.com/v1/search`;
    const query = new URLSearchParams('media_filter=minimal');
    query.set('key', 'PAY5JLFIH6V6');
    query.set('limit', '20');
    query.set('pos', pos || '');
    query.set('q', keyword);

    return fetch(`${baseUrl}?${query.toString()}`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json() as Promise<FetchGifResponse>)
      .catch(() => ({ next: pos || '', results: [] }));
  };

  return {
    search: (word = '') =>
      fetchGif({ keyword: word }).then((resp) => {
        state.next = resp.next;

        return resp.results.map((item) => ({
          title: item.title,
          src: item.media[0].tinygif.url,
        }));
      }),
    more: (word) =>
      fetchGif({ keyword: word, pos: state.next }).then((resp) => {
        state.next = resp.next;

        return resp.results.map((item) => ({
          title: item.title,
          src: item.media[0].tinygif.url,
        }));
      }),
  };
};
