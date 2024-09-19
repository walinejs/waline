import en from './en.json';
import es from './es.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';

export const LANGUAGE_OPTIONS = [
  {
    label: '中文简体',
    value: 'zh-CN',
    alias: ['zh-CN', 'zh-cn'],
  },
  {
    label: '中文繁體',
    value: 'zh-TW',
    alias: ['zh-TW'],
  },
  {
    label: 'English',
    value: 'en-US',
    alias: ['en', 'en-US', 'jp', 'jp-JP'],
  },
  {
    label: 'Español',
    value: 'es-MX',
    alias: ['es', 'es-MX'],
  },
];

export default {
  'zh-cn': { translations: zhCN },
  'zh-CN': { translations: zhCN },
  en: { translations: en },
  'en-US': { translations: en },
  'zh-TW': { translations: zhTW },
  jp: { translations: en },
  'jp-JP': { translations: en },
  es: { translations: es },
  'es-MX': { translations: es },
};
