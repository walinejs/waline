import {
  defaultLang,
  defaultUploadImage,
  defaultTexRenderer,
  getMeta,
  locales,
} from '../config';

import { decodePath, isLinkHttp, removeEndingSplash } from './path';
import { getEmojis } from './emoji';

import type {
  WalineEmojiInfo,
  WalineEmojiMaps,
  WalineLocale,
  WalineProps,
} from '../typings';
import hanabi from 'hanabi';

export interface EmojiConfig {
  tabs: Pick<WalineEmojiInfo, 'name' | 'icon' | 'items'>[];
  map: WalineEmojiMaps;
}

export interface Config
  extends Required<
      Pick<
        WalineProps,
        | 'path'
        | 'lang'
        | 'meta'
        | 'pageSize'
        | 'requiredMeta'
        | 'imageUploader'
        | 'highlighter'
        | 'texRenderer'
        | 'copyright'
        | 'login'
      >
    >,
    Pick<WalineProps, 'dark' | 'serverURL'> {
  locale: WalineLocale;
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
  serverURL,

  path = location.pathname,
  lang = defaultLang,
  locale,
  emoji = ['https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo'],
  meta = ['nick', 'mail', 'link'],
  requiredMeta = [],
  pageSize = 10,
  wordLimit,
  imageUploader,
  highlighter,
  texRenderer,
  copyright = true,
  login = 'enable',
  ...more
}: WalineProps): Config => ({
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
  login,
  imageUploader: fallback(imageUploader, defaultUploadImage),
  highlighter: fallback(highlighter, hanabi),
  texRenderer: fallback(texRenderer, defaultTexRenderer),
  copyright,
  ...more,
});
