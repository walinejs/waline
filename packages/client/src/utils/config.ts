import {
  defaultLang,
  defaultUploadImage,
  defaultTexRenderer,
  getMeta,
  locales,
} from '../config';

import { decodePath, isLinkHttp, removeEndingSplash } from './path';
import { getEmojis } from './emoji';

import type { EmojiInfo, EmojiMaps, Locale, WalineOptions } from '../config';
import hanabi from 'hanabi';

export interface EmojiConfig {
  tabs: Pick<EmojiInfo, 'name' | 'icon' | 'items'>[];
  map: EmojiMaps;
}

export interface Config
  extends Required<
      Pick<
        WalineOptions,
        | 'el'
        | 'path'
        | 'lang'
        | 'meta'
        | 'pageSize'
        | 'requiredMeta'
        | 'uploadImage'
        | 'highlight'
        | 'tex'
        | 'copyright'
        | 'login'
      >
    >,
    Pick<WalineOptions, 'dark' | 'serverURL' | 'visitor'> {
  locale: Locale;
  wordLimit: [number, number] | false;
  emoji: Promise<EmojiConfig>;
}

const getServerURL = (serverURL: string): string => {
  const result = removeEndingSplash(serverURL);

  return isLinkHttp(result) ? result : `https://${result}`;
};

const fallback = <T = unknown>(
  value: T | false | undefined,
  fallback: T
): T | false =>
  typeof value === 'function' ? value : value === false ? false : fallback;

export const getConfig = ({
  el = '#waline',
  serverURL,

  path = location.pathname,
  lang = defaultLang,
  locale,
  emoji = ['https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo'],
  meta = ['nick', 'mail', 'link'],
  requiredMeta = [],
  pageSize = 10,
  wordLimit,
  uploadImage,
  highlight,
  tex,
  copyright = true,
  login = 'enable',
  ...more
}: WalineOptions): Config => ({
  el,
  serverURL: getServerURL(serverURL),
  path: decodePath(path),
  lang,
  locale: {
    ...(locales[lang] || locales[defaultLang]),
    ...(typeof locale === 'object' ? locale : {}),
  },
  emoji: getEmojis(emoji),
  wordLimit: Array.isArray(wordLimit)
    ? wordLimit
    : wordLimit
    ? [0, wordLimit]
    : false,
  meta: getMeta(meta),
  requiredMeta: getMeta(requiredMeta),
  pageSize,
  uploadImage: fallback(uploadImage, defaultUploadImage),
  highlight: fallback(highlight, hanabi),
  tex: fallback(tex, defaultTexRenderer),
  copyright,
  login,
  ...more,
});
