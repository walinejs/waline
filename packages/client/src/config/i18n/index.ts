/* eslint-disable @typescript-eslint/naming-convention */
import en from './en';
import jp from './jp';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import ptBR from './pt-BR';
import ru from './ru';

import type { WalineLocale } from '../../typings';

export type Locales = Record<string, WalineLocale>;

export const defaultLocales: Locales = {
  zh: zhCN,
  'zh-cn': zhCN,
  'zh-CN': zhCN,
  'zh-tw': zhTW,
  'zh-TW': zhTW,
  en: en,
  'en-US': en,
  'en-us': en,
  jp: jp,
  'jp-jp': jp,
  'jp-JP': jp,
  'pt-br': ptBR,
  'pt-BR': ptBR,
  ru: ru,
  'ru-ru': ru,
  'ru-RU': ru,
};
