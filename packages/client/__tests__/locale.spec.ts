import { describe, expect, it } from 'vitest';

import { DEFAULT_LANG, getLang, getLocale, loadLocale } from '../src/config/i18n/index.js';

describe('locale loading', () => {
  it('loads selected locales on demand', async () => {
    await expect(loadLocale('zh-CN')).resolves.toMatchObject({
      submit: '提交',
    });
  });

  it('uses English for unsupported locales', async () => {
    expect(getLang('unsupported')).toBe(DEFAULT_LANG);
    expect(getLocale('unsupported')).toBe(getLocale(DEFAULT_LANG));
    await expect(loadLocale('unsupported')).resolves.toBe(getLocale(DEFAULT_LANG));
  });
});
