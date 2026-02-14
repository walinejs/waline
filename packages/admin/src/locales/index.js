import en from './en.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import jp from './jp.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import ru from './ru.json';
import viVN from './vi-VN.json';
import ptBR from './pt-BR.json';
import it from './it.json';

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
    alias: ['en', 'en-US'],
  },
  {
    label: 'Deutsch',
    value: 'de',
    alias: ['de'],
  },
  {
    label: 'Español (México)',
    value: 'es-MX',
    alias: ['es', 'es-MX'],
  },
  {
    label: 'Français',
    value: 'fr',
    alias: ['fr', 'fr-FR'],
  },
  {
    label: 'Italiano',
    value: 'it',
    alias: ['it', 'it-IT'],
  },
  {
    label: 'Japanese',
    value: 'jp',
    alias: ['jp', 'jp-JP'],
  },
  {
    label: 'Português (Brasil)',
    value: 'pt-BR',
    alias: ['pt-BR'],
  },
  {
    label: 'Русский',
    value: 'ru',
    alias: ['ru', 'ru-RU'],
  },
  {
    label: 'Tiếng Việt',
    value: 'vi',
    alias: ['vi', 'vi-VN'],
  },
];

export default {
  'zh-cn': { translations: zhCN },
  'zh-CN': { translations: zhCN },
  en: { translations: en },
  'en-US': { translations: en },
  'zh-TW': { translations: zhTW },
  fr: { translations: fr },
  'fr-FR': { translations: fr },
  it: { translations: it },
  'it-IT': { translations: it },
  jp: { translations: jp },
  'jp-JP': { translations: jp },
  'pt-BR': { translations: ptBR },
  ru: { translations: ru },
  'ru-RU': { translations: ru },
  vi: { translations: viVN },
  'vi-VN': { translations: viVN },
  de: { translations: de },
  es: { translations: es },
  'es-MX': { translations: es },
};
