import { describe, expect, it } from 'vitest';

import { getConfig } from '../src/utils/config.js';

const baseConfig = {
  serverURL: 'https://waline.example.com',
  path: '/',
  lang: 'en-US',
};

describe(getConfig, () => {
  it('keeps required fields that are rendered', () => {
    const config = getConfig({
      ...baseConfig,
      meta: ['nick', 'mail'],
      requiredMeta: ['nick', 'mail'],
    });

    expect(config.meta).toStrictEqual(['nick', 'mail']);
    expect(config.requiredMeta).toStrictEqual(['nick', 'mail']);
  });

  it('drops required fields that are not rendered', () => {
    const config = getConfig({
      ...baseConfig,
      meta: ['nick'],
      requiredMeta: ['nick', 'mail', 'link'],
    });

    expect(config.meta).toStrictEqual(['nick']);
    expect(config.requiredMeta).toStrictEqual(['nick']);
  });
});
