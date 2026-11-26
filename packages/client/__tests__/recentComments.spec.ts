// @vitest-environment jsdom
// Mock only widget dependencies; unsafe URLs below are regression fixtures.
// oxlint-disable typescript/explicit-function-return-type, eslint/new-cap, eslint/no-script-url, vitest/prefer-import-in-mock
import type { getRecentComment as GetRecentComment } from '@waline/api';
import { describe, expect, it, vi } from 'vitest';

import { RecentComments } from '../src/widgets/recentComments.js';

const { getRecentComment } = vi.hoisted(() => ({
  getRecentComment: vi.fn<typeof GetRecentComment>(),
}));

vi.mock('@waline/api', () => ({ getRecentComment }));
vi.mock('../src/composables/index.js', () => ({
  useUserInfo: () => ({ value: {} }),
}));
vi.mock('../src/utils/index.js', () => ({ getRoot: (el: HTMLElement) => el }));

const render = async (nick: string, url: string) => {
  const root = document.createElement('div');
  getRecentComment.mockResolvedValueOnce([
    { nick, url, comment: '<p><strong>Hello</strong></p>' },
  ] as Awaited<ReturnType<typeof getRecentComment>>);
  const result = await RecentComments({
    el: root,
    serverURL: 'https://comments.example',
    count: 10,
  });

  return { root, result };
};

describe('recent comments', () => {
  it('renders hostile nicknames as text and retains formatted comment bodies', async () => {
    const nick = '</a><details open ontoggle="alert(1)"><img src=x onerror="alert(1)">';
    const { root, result } = await render(nick, '/post');

    expect(root.querySelector('a')?.textContent).toBe(nick);
    expect(root.querySelector('details, img, [ontoggle], [onerror]')).toBeNull();
    expect(root.querySelector('strong')?.textContent).toBe('Hello');
    expect(root.querySelector('li')?.className).toBe('wl-recent-item');
    result.destroy();
    expect(root.childNodes).toHaveLength(0);
  });

  it('does not parse page identifiers as HTML attributes', async () => {
    const { root } = await render('visitor', '"><img src=x onerror="alert(1)">');

    expect(root.querySelectorAll('a')).toHaveLength(1);
    expect(root.querySelector('img, [onerror]')).toBeNull();
  });

  it.each([
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    '\tjava\nscript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'https://[',
  ])('disables unsafe or invalid links: %s', async (url) => {
    const { root } = await render('visitor', url);

    expect(root.querySelector('a')?.hasAttribute('href')).toBe(false);
  });

  it.each(['/post', './post', '#comment', 'https://blog.example/post', '//blog.example/post'])(
    'preserves safe navigation: %s',
    async (url) => {
      const { root } = await render('visitor', url);

      expect(root.querySelector('a')?.href).toBe(new URL(url, document.baseURI).href);
    },
  );
});
