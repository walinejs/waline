import {
  defaultGravatarCDN,
  defaultLang,
  defaultUploadImage,
  getAvatar,
  getMeta,
  locales,
} from '../config';

import { decodePath, removeEndingSplash } from '.';
import { getEmojis, resolveOldEmojiMap } from './emoji';

import type { EmojiInfo, EmojiMaps, Locale, WalineOptions } from '../config';

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
        | 'copyright'
        | 'login'
      >
    >,
    Pick<WalineOptions, 'dark' | 'serverURL' | 'visitor' | 'highlight'> {
  locale: Locale;
  wordLimit: [number, number] | false;
  emoji: Promise<EmojiConfig>;
  avatar: { cdn: string; param: string } | false;
}

export const getConfig = ({
  el = '#waline',
  serverURL,

  // TODO: remove
  placeholder,
  langMode,
  emojiCDN,
  emojiMaps,
  requiredFields = [],
  anonymous,

  path = location.pathname,
  lang = defaultLang,
  locale = langMode,
  emoji = ['https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo'],
  avatar = 'mp',
  avatarCDN = defaultGravatarCDN,
  avatarForce,
  meta = ['nick', 'mail', 'link'],
  requiredMeta = requiredFields,
  pageSize = 10,
  wordLimit,
  uploadImage,
  copyright = true,
  login = anonymous === true
    ? 'disable'
    : anonymous === false
    ? 'force'
    : 'enable',
  ...more
}: WalineOptions): Config => {
  const $locale = locales[lang] || locales[defaultLang];

  // TODO: remove
  if (placeholder) $locale.placeholder = placeholder;

  // TODO: remove
  const $emoji =
    emojiCDN && typeof emojiMaps === 'object'
      ? Promise.resolve(resolveOldEmojiMap(emojiMaps, emojiCDN))
      : getEmojis(emoji);

  return {
    el,
    // remove ending slash
    serverURL: removeEndingSplash(serverURL),
    path: decodePath(path),
    lang,
    locale: {
      ...$locale,
      ...(typeof locale === 'object' ? locale : {}),
    },
    emoji: $emoji,
    wordLimit: Array.isArray(wordLimit)
      ? wordLimit
      : wordLimit
      ? [0, wordLimit]
      : false,
    meta: getMeta(meta),
    requiredMeta: getMeta(requiredMeta),
    pageSize,
    avatar:
      avatar === 'hide'
        ? false
        : {
            cdn: avatarCDN,
            param: `?d=${getAvatar(avatar)}${
              avatarForce ? `&q=${Math.random().toString(32).substring(2)}` : ''
            }`,
          },
    uploadImage:
      typeof uploadImage === 'function' ? uploadImage : defaultUploadImage,
    copyright,
    login,
    ...more,
  };
};
