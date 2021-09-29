import en from './en';
import jp from './jp';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import ptBR from './pt-BR';

import type { Locale } from './typings';

export * from './typings';

export type Locales = Record<string, Locale>;

export const locales: Locales = {
  zh: zhCN,
  'zh-cn': zhCN,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en: en,
  'en-US': en,
  jp: jp,
  'jp-JP': jp,
  'pt-BR': ptBR,
  'pt-br': ptBR,
};
