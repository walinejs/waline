import type { WalineLocale } from '../../typings/index.js';
import en from './en.js';

export type Locales = Record<string, WalineLocale>;

export const DEFAULT_LANG = 'en-US';

const localeLoaders: Record<string, () => Promise<{ default: WalineLocale }>> = {
  zh: () => import('./zh-CN.js'),
  'zh-cn': () => import('./zh-CN.js'),
  'zh-tw': () => import('./zh-TW.js'),
  en: () => import('./en.js'),
  'en-us': () => import('./en.js'),
  fr: () => import('./fr.js'),
  'fr-fr': () => import('./fr.js'),
  id: () => import('./id.js'),
  'id-id': () => import('./id.js'),
  it: () => import('./it.js'),
  'it-it': () => import('./it.js'),
  jp: () => import('./jp.js'),
  'jp-jp': () => import('./jp.js'),
  ko: () => import('./ko-KR.js'),
  'ko-kr': () => import('./ko-KR.js'),
  'pt-br': () => import('./pt-BR.js'),
  ru: () => import('./ru.js'),
  'ru-ru': () => import('./ru.js'),
  vi: () => import('./vi-VN.js'),
  'vi-vn': () => import('./vi-VN.js'),
  de: () => import('./de.js'),
  es: () => import('./es.js'),
  'es-mx': () => import('./es.js'),
};

export const DEFAULT_LOCALES: Locales = {
  en,
  'en-us': en,
};

export const getLocale = (lang: string): WalineLocale =>
  DEFAULT_LOCALES[lang.toLowerCase()] ?? DEFAULT_LOCALES[DEFAULT_LANG.toLowerCase()];

export const getLang = (lang: string): string =>
  lang.toLowerCase() in localeLoaders ? lang : DEFAULT_LANG;

export const loadLocale = (lang: string): Promise<WalineLocale> =>
  (localeLoaders[lang.toLowerCase()]?.() ?? Promise.resolve({ default: en })).then(
    ({ default: locale }) => locale,
  );
