// oxlint-disable vitest/no-hooks react/no-this-in-sfc
import { createRequire } from 'node:module';

import { afterAll, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const originalThinkConfig = globalThis.think.config;
const originalThinkService = globalThis.think.Service;

globalThis.think.Service = function Service(controller) {
  this.controller = controller;
};
globalThis.think.config = (name) => (name === 'DiscordTemplate' ? 'New comment' : undefined);

process.env.DISCORD_WEBHOOK = 'https://discord.example/webhook';
process.env.SITE_NAME = 'Waline Test';
process.env.SITE_URL = 'https://example.com';

const NotifyService = require('../src/service/notify.js');

describe('discord notification', () => {
  afterAll(() => {
    vi.unstubAllGlobals();
    delete process.env.DISCORD_WEBHOOK;
    delete process.env.SITE_NAME;
    delete process.env.SITE_URL;
    globalThis.think.config = originalThinkConfig;
    globalThis.think.Service = originalThinkService;
  });

  it('sends webhook content as JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      statusText: 'No Content',
    });

    vi.stubGlobal('fetch', fetchMock);

    const service = new NotifyService({
      locale: (template) => template,
    });
    const result = await service.discord(
      {
        title: 'New comment title',
        content: 'Ignored content',
      },
      {
        objectId: 1,
        url: '/posts/test/',
      },
    );

    expect(fetchMock).toHaveBeenCalledWith('https://discord.example/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: 'New comment title\nNew comment',
      }),
    });
    expect(result).toBe('No Content');
  });
});
