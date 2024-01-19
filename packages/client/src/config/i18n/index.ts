/* eslint-disable @typescript-eslint/naming-convention */
import en from './en.js';
import jp from './jp.js';
import ptBR from './pt-BR.js';
import ru from './ru.js';
import zhCN from './zh-CN.js';
import zhTW from './zh-TW.js';
import { type WalineLocale } from '../../typings/index.js';

export type Locales = Record<string, WalineLocale>;

export const DEFAULT_LOCALES: Locales = {
  zh: zhCN,
  'zh-cn': zhCN,
  'zh-CN': zhCN,
  'zh-tw': zhTW,
  'zh-TW': zhTW,
  en: en,
  'en-US': en,
  'en-us': en,
  jp: jp,
  ja: jp,
  'jp-jp': jp,
  'jp-JP': jp,
  'pt-br': ptBR,
  'pt-BR': ptBR,
  ru: ru,
  'ru-ru': ru,
  'ru-RU': ru,
};
