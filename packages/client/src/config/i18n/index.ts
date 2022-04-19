import en from './en';
import jp from './jp';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import ptBR from './pt-BR';
import ru from './ru';

import type { Locale } from './typings';

export * from './typings';

export type Locales = Record<string, Locale>;

export const locales: Locales = {
  zh: zhCN,
  'zh-cn': zhCN,
  'zh-CN': zhCN,
  'zh-tw': zhTW,
  'zh-TW': zhTW,
  en: en,
  'en-US': en,
  jp: jp,
  'jp-jp': jp,
  'jp-JP': jp,
  'pt-br': ptBR,
  'pt-BR': ptBR,
  ru: ru,
  'ru-ru': ru,
  'ru-RU': ru,
};
