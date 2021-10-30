import en from './en.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';

export const LANGUAGE_OPTIONS = [
  {
    label: '中文简体',
    value: 'zh-CN',
    alias: ['zh-CN', 'zh-cn'],
  },
  {
    label: '中文繁体',
    value: 'zh-TW',
    alias: ['zh-TW'],
  },
  {
    label: 'English',
    value: 'en-US',
    alias: ['en', 'en-US', 'jp', 'jp-JP'],
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
};
