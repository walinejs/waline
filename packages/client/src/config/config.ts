import {
  availableAvatar,
  availableMeta,
  defaultEmojiCDN,
  defaultEmojiMaps,
  defaultGravatarCDN,
  defaultLang,
  defaultUploadImage,
} from './default';
import { locales } from './i18n';

import { decodePath } from '../utils';

import type { WalineOptions } from './options';

export const checkOptions = (options: WalineOptions): boolean => {
  const { el, serverURL } = options;

  if (!el) {
    console.error("Required option 'el' is missing!");

    return false;
  }

  // check root element
  const root = document.querySelector(el);

  if (!root) {
    console.error("Option 'el' is invalid!");

    return false;
  }

  // check serverURL
  if (!serverURL) {
    console.error("Required option 'serverURL' is missing!");

    return false;
  }

  return true;
};

export interface Config
  extends Required<
      Pick<
        WalineOptions,
        | 'el'
        | 'path'
        | 'lang'
        | 'locale'
        | 'emojiCDN'
        | 'emojiMaps'
        | 'meta'
        | 'pageSize'
        | 'requiredMeta'
        | 'avatarCDN'
        | 'uploadImage'
        | 'copyright'
        | 'login'
      >
    >,
    Pick<WalineOptions, 'dark' | 'serverURL' | 'visitor' | 'highlight'> {
  wordLimit: [number, number] | false;

  avatarParam: string;
}

export const getConfig = ({
  el = '#waline',
  path = location.pathname,
  placeholder,
  lang,
  langMode,
  locale = langMode,
  wordLimit,
  serverURL,
  emojiCDN = defaultEmojiCDN,
  emojiMaps = defaultEmojiMaps,
  avatar = 'mp',
  avatarCDN = defaultGravatarCDN,
  avatarForce,
  meta = ['nick', 'mail', 'link'],
  requiredFields = [],
  requiredMeta = requiredFields,
  pageSize = 10,
  uploadImage,
  copyright = true,
  anonymous,
  login = anonymous === true
    ? 'disable'
    : anonymous === false
    ? 'force'
    : 'enable',
  ...more
}: WalineOptions): Config => {
  const $lang = lang || defaultLang;
  const $locale = locales[$lang] || locales[defaultLang];

  if (placeholder) $locale.placeholder = placeholder;

  return {
    el,
    // remove ending slash
    serverURL: serverURL.replace(/\/$/, ''),
    path: decodePath(path),
    lang: $lang,
    locale: {
      ...$locale,
      ...(typeof locale === 'object' ? locale : {}),
    },
    emojiCDN,
    emojiMaps,
    wordLimit: Array.isArray(wordLimit)
      ? wordLimit
      : wordLimit
      ? [0, wordLimit]
      : false,
    meta: meta.filter((item) => availableMeta.includes(item)),
    requiredMeta,
    pageSize,
    avatarCDN,
    avatarParam: `?d=${availableAvatar.includes(avatar) ? avatar : 'mp'}${
      avatarForce ? `&q=${Math.random().toString(32).substring(2)}` : ''
    }`,
    uploadImage:
      typeof uploadImage === 'function' ? uploadImage : defaultUploadImage,
    copyright,
    login,
    ...more,
  };
};
