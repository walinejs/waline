import { describe, expect, it } from 'vitest';

import de from '../src/config/i18n/de.js';
import en from '../src/config/i18n/en.js';
import es from '../src/config/i18n/es.js';
import fr from '../src/config/i18n/fr.js';
import id from '../src/config/i18n/id.js';
import itLocale from '../src/config/i18n/it.js';
import jp from '../src/config/i18n/jp.js';
import koKR from '../src/config/i18n/ko-KR.js';
import ptBR from '../src/config/i18n/pt-BR.js';
import ru from '../src/config/i18n/ru.js';
import viVN from '../src/config/i18n/vi-VN.js';
import zhCN from '../src/config/i18n/zh-CN.js';
import zhTW from '../src/config/i18n/zh-TW.js';

const locales = {
  de,
  en,
  es,
  fr,
  id,
  it: itLocale,
  jp,
  'ko-KR': koKR,
  'pt-BR': ptBR,
  ru,
  'vi-VN': viVN,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
};

const reactionKeys = [
  'reaction0',
  'reaction1',
  'reaction2',
  'reaction3',
  'reaction4',
  'reaction5',
  'reaction6',
  'reaction7',
  'reaction8',
] as const;

describe('locale strings', () => {
  it.each(Object.entries(locales))('%s provides a delete confirmation', (_name, locale) => {
    expect(locale.deleteConfirm?.trim()).toBeTruthy();
  });

  it.each(Object.entries(locales))('%s provides reaction labels', (_name, locale) => {
    for (const key of reactionKeys) {
      expect(locale[key]?.trim()).toBeTruthy();
    }
  });
});
