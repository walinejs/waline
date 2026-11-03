import type { WalineLocale } from '../../typings/index.js';
import de from './de.js';
import en from './en.js';
import es from './es.js';
import fr from './fr.js';
import id from './id.js';
import it from './it.js';
import jp from './jp.js';
import koKR from './ko-KR.js';
import ptBR from './pt-BR.js';
import ru from './ru.js';
import viVN from './vi-VN.js';
import zhCN from './zh-CN.js';
import zhTW from './zh-TW.js';

export type Locales = Record<string, WalineLocale>;

export const DEFAULT_LANG = 'en-US';

export const DEFAULT_LOCALES: Locales = {
  zh: zhCN,
  'zh-cn': zhCN,
  'zh-tw': zhTW,
  en,
  'en-us': en,
  fr,
  'fr-fr': fr,
  id,
  'id-id': id,
  it,
  'it-it': it,
  jp,
  'jp-jp': jp,
  ko: koKR,
  'ko-kr': koKR,
  'pt-br': ptBR,
  ru,
  'ru-ru': ru,
  vi: viVN,
  'vi-vn': viVN,
  de,
  es,
  'es-mx': es,
};

const normalizeLang = (lang: string): string => lang.trim().toLowerCase().replaceAll('_', '-');

const LANG_ALIASES: Record<string, string> = {
  ja: 'jp',
  'ja-jp': 'jp',
  pt: 'pt-br',
  'pt-pt': 'pt-br',
  'zh-hans': 'zh-cn',
  'zh-hant': 'zh-tw',
  'zh-hk': 'zh-tw',
};

/**
 * Resolve a browser language tag to a supported locale key.
 *
 * The lookup walks from the most specific to the least specific value: exact key → explicit alias →
 * primary language subtag → default.
 *
 * @param lang - Browser language tag such as `de-DE` or `ja`
 * @returns A supported locale key
 */
const resolveLocaleKey = (lang: string): string => {
  const normalized = normalizeLang(lang);

  if (normalized in DEFAULT_LOCALES) return normalized;

  const alias = LANG_ALIASES[normalized];

  if (alias) return alias;

  const [primary] = normalized.split('-');

  if (primary in DEFAULT_LOCALES) return primary;

  return LANG_ALIASES[primary] ?? DEFAULT_LANG.toLowerCase();
};

export const getLocale = (lang: string): WalineLocale =>
  DEFAULT_LOCALES[resolveLocaleKey(lang)] ?? DEFAULT_LOCALES[DEFAULT_LANG.toLowerCase()];

export const getLang = (lang: string): string => {
  const normalized = normalizeLang(lang);

  // Keep the original tag (and its casing) when it is already supported.
  if (normalized in DEFAULT_LOCALES) return lang.trim();

  const resolved = resolveLocaleKey(normalized);

  return resolved === DEFAULT_LANG.toLowerCase() ? DEFAULT_LANG : resolved;
};
