import { decodePath, isLinkHttp, removeEndingSplash } from './path.js';
import {
  DEFAULT_EMOJI,
  DEFAULT_REACTION,
  defaultHighlighter,
  defaultTeXRenderer,
  defaultUploadImage,
  getDefaultSearchOptions,
  getLang,
  getLocale,
  getMeta,
} from '../config/index.js';
import type {
  WalineEmojiInfo,
  WalineEmojiMaps,
  WalineLocale,
  WalineProps,
} from '../typings/index.js';

export interface WalineEmojiConfig {
  tabs: Pick<WalineEmojiInfo, 'name' | 'icon' | 'items'>[];
  map: WalineEmojiMaps;
}

export interface WalineConfig
  extends Required<
    Omit<
      WalineProps,
      | 'emoji'
      | 'imageUploader'
      | 'highlighter'
      | 'texRenderer'
      | 'wordLimit'
      | 'reaction'
      | 'search'
    >
  > {
  locale: WalineLocale;
  wordLimit: [number, number] | false;
  reaction: string[];
  emoji: Exclude<WalineProps['emoji'], boolean | undefined>;
  highlighter: Exclude<WalineProps['highlighter'], true | undefined>;
  imageUploader: Exclude<WalineProps['imageUploader'], true | undefined>;
  texRenderer: Exclude<WalineProps['texRenderer'], true | undefined>;
  search: Exclude<WalineProps['search'], true | undefined>;
}

export const getServerURL = (serverURL: string): string => {
  const result = removeEndingSplash(serverURL);

  return isLinkHttp(result) ? result : `https://${result}`;
};

const getWordLimit = (
  wordLimit: WalineProps['wordLimit'],
): [number, number] | false =>
  Array.isArray(wordLimit) ? wordLimit : wordLimit ? [0, wordLimit] : false;

const fallback = <T = unknown>(
  value: T | boolean | undefined,
  fallback: T,
): T | false =>
  typeof value === 'function' ? value : value === false ? false : fallback;

export const getConfig = ({
  serverURL,

  path = location.pathname,
  lang = typeof navigator === 'undefined' ? 'en-US' : navigator.language,
  locale,
  emoji = DEFAULT_EMOJI,
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
  search,
  reaction,
  recaptchaV3Key = '',
  turnstileKey = '',
  commentSorting = 'latest',
  ...more
}: WalineProps): WalineConfig => ({
  serverURL: getServerURL(serverURL),
  path: decodePath(path),
  lang: getLang(lang),
  locale: {
    ...getLocale(getLang(lang)),
    ...(typeof locale === 'object' ? locale : {}),
  } as WalineLocale,
  wordLimit: getWordLimit(wordLimit),
  meta: getMeta(meta),
  requiredMeta: getMeta(requiredMeta),
  imageUploader: fallback(imageUploader, defaultUploadImage),
  highlighter: fallback(highlighter, defaultHighlighter),
  texRenderer: fallback(texRenderer, defaultTeXRenderer),
  dark,
  emoji: typeof emoji === 'boolean' ? (emoji ? DEFAULT_EMOJI : []) : emoji,
  pageSize,
  login,
  copyright,
  search:
    search === false
      ? false
      : typeof search === 'object'
        ? search
        : getDefaultSearchOptions(lang),
  recaptchaV3Key,
  turnstileKey,
  reaction: Array.isArray(reaction)
    ? reaction
    : reaction === true
      ? DEFAULT_REACTION
      : [],
  commentSorting,
  ...more,
});
