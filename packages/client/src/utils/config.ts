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
  WalineEmojiPresets,
  WalineHighlighter,
  WalineImageUploader,
  WalineLocale,
  WalineProps,
  WalineSearchOptions,
  WalineTeXRenderer,
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
  emoji: (WalineEmojiInfo | WalineEmojiPresets)[] | null;
  highlighter: WalineHighlighter | null;
  imageUploader: WalineImageUploader | null;
  texRenderer: WalineTeXRenderer | null;
  search: WalineSearchOptions | null;
  reaction: string[] | null;
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
): T | null =>
  value == undefined || value === true
    ? fallback
    : value === false
      ? null
      : value;

export const getConfig = ({
  serverURL,

  path = location.pathname,
  lang = typeof navigator === 'undefined' ? 'en-US' : navigator.language,
  locale,
  meta = ['nick', 'mail', 'link'],
  requiredMeta = [],
  dark = false,
  pageSize = 10,
  wordLimit,
  noCopyright = false,
  login = 'enable',
  recaptchaV3Key = '',
  turnstileKey = '',
  commentSorting = 'latest',
  emoji = DEFAULT_EMOJI,
  imageUploader,
  highlighter,
  texRenderer,
  search,
  reaction,
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
  dark,
  pageSize,
  commentSorting,
  login,
  noCopyright,
  recaptchaV3Key,
  turnstileKey,
  ...more,
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  reaction: reaction === true ? DEFAULT_REACTION : reaction || null,
  imageUploader: fallback(imageUploader, defaultUploadImage),
  highlighter: fallback(highlighter, defaultHighlighter),
  texRenderer: fallback(texRenderer, defaultTeXRenderer),
  emoji: fallback(emoji, DEFAULT_EMOJI),
  search: fallback(search, getDefaultSearchOptions(lang)),
});
