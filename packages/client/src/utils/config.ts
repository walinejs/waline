import {
  defaultLang,
  defaultUploadImage,
  defaultHighlighter,
  defaultTexRenderer,
  getMeta,
  defaultLocales,
} from '../config';

import { decodePath, isLinkHttp, removeEndingSplash } from './path';

import type {
  WalineEmojiInfo,
  WalineEmojiMaps,
  WalineLocale,
  WalineProps,
} from '../typings';

export interface WalineEmojiConfig {
  tabs: Pick<WalineEmojiInfo, 'name' | 'icon' | 'items'>[];
  map: WalineEmojiMaps;
}

export interface WalineConfig extends Required<Omit<WalineProps, 'wordLimit'>> {
  locale: WalineLocale;
  wordLimit: [number, number] | false;
  // emoji: Promise<EmojiConfig>;
}

const getServerURL = (serverURL: string): string => {
  const result = removeEndingSplash(serverURL);

  return isLinkHttp(result) ? result : `https://${result}`;
};

const getWordLimit = (
  wordLimit: WalineProps['wordLimit']
): [number, number] | false =>
  Array.isArray(wordLimit) ? wordLimit : wordLimit ? [0, wordLimit] : false;

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
  emoji = ['//unpkg.com/@waline/emojis@1.0.1/weibo'],
  meta = ['nick', 'mail', 'link'],
  requiredMeta = [],
  dark = false,
  pageSize = 10,
  wordLimit,
  imageUploader,
  highlighter,
  texRenderer,
  copyright = true,
  login = 'enable',
  ...more
}: WalineProps): WalineConfig => ({
  serverURL: getServerURL(serverURL),
  path: decodePath(path),
  locale: {
    ...(defaultLocales[lang] || defaultLocales[defaultLang]),
    ...(typeof locale === 'object' ? locale : {}),
  } as WalineLocale,
  wordLimit: getWordLimit(wordLimit),
  meta: getMeta(meta),
  requiredMeta: getMeta(requiredMeta),
  imageUploader: fallback(imageUploader, defaultUploadImage),
  highlighter: fallback(highlighter, defaultHighlighter),
  texRenderer: fallback(texRenderer, defaultTexRenderer),
  lang,
  dark,
  emoji,
  pageSize,
  login,
  copyright,
  ...more,
});
