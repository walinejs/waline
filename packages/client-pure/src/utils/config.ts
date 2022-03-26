import {
  defaultLang,
  defaultUploadImage,
  defaultTexRenderer,
  locales,
} from '../config';

import { decodePath, isLinkHttp, removeEndingSplash } from './path';
import { getEmojis } from '../utils/emoji';

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

let config: Config;

export const getConfig = (): Config => config;

export const setConfig = ({
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
  uploadImage = defaultUploadImage,
  highlight = hanabi,
  tex = defaultTexRenderer,
  copyright = true,
  login = 'enable',
  ...more
}: WalineOptions): void => {
  config = {
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
    meta,
    requiredMeta,
    pageSize,
    uploadImage,
    highlight,
    tex,
    copyright,
    login,
    ...more,
  };
};
