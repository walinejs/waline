export type GifFormat =
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
export interface MediaObject {
  preview: string;
  url: string;
  dims: number[];
  size: number;
}

export interface FetchGifRequest {
  key?: string;
  keyword: string;
  pos?: string;
  limit?: number;
}

export interface GifObject {
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

export interface FetchGifResponse {
  next: string;
  results: GifObject[];
}

export const fetchGif = ({
  key,
  keyword,
  pos,
  limit,
}: FetchGifRequest): Promise<FetchGifResponse> => {
  const baseUrl = `https://g.tenor.com/v1/search`;
  const query = new URLSearchParams('media_filter=minimal');
  query.set('key', key || 'PAY5JLFIH6V6');
  query.set('limit', (limit || 20).toString());
  query.set('pos', pos || '');
  query.set('q', keyword);

  return fetch(`${baseUrl}?${query.toString()}`, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json() as Promise<FetchGifResponse>);
};
