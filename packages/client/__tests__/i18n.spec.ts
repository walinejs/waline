import { describe, expect, it } from 'vitest';

import de from '../src/config/i18n/de.js';
import en from '../src/config/i18n/en.js';
import { getLang, getLocale } from '../src/config/i18n/index.js';
import jp from '../src/config/i18n/jp.js';
import ptBR from '../src/config/i18n/pt-BR.js';
import zhTW from '../src/config/i18n/zh-TW.js';

describe(getLang, () => {
  it('keeps supported tags as-is', () => {
    expect(getLang('en-US')).toBe('en-US');
    expect(getLang('zh-CN')).toBe('zh-CN');
    expect(getLang('vi')).toBe('vi');
  });

  it('resolves regional variants to their primary language', () => {
    expect(getLang('de-DE')).toBe('de');
    expect(getLang('es-ES')).toBe('es');
    expect(getLang('fr-CA')).toBe('fr');
    // Tags that are supported keys (it-it, ru-ru, ko-kr) keep their original casing.
    expect(getLang('it-IT')).toBe('it-IT');
    expect(getLang('ru-RU')).toBe('ru-RU');
    expect(getLang('ko-KR')).toBe('ko-KR');
  });

  it('resolves language aliases', () => {
    expect(getLang('ja')).toBe('jp');
    expect(getLang('ja-JP')).toBe('jp');
    expect(getLang('pt')).toBe('pt-br');
    expect(getLang('pt-PT')).toBe('pt-br');
    expect(getLang('zh-Hant')).toBe('zh-tw');
    expect(getLang('zh-HK')).toBe('zh-tw');
    expect(getLang('de_DE')).toBe('de');
  });

  it('falls back to the default language', () => {
    expect(getLang('xx-YY')).toBe('en-US');
    expect(getLang('')).toBe('en-US');
  });
});

describe(getLocale, () => {
  it('resolves language aliases to the matching locale', () => {
    expect(getLocale('de-DE')).toBe(de);
    expect(getLocale('ja')).toBe(jp);
    expect(getLocale('pt-PT')).toBe(ptBR);
    expect(getLocale('zh-Hant')).toBe(zhTW);
  });

  it('falls back to English', () => {
    expect(getLocale('unknown')).toBe(en);
  });
});
