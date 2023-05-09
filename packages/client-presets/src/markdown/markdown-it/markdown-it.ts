import MarkdownIt from 'markdown-it';

import { type MarkdownRenderer } from '../../typings.js';

// markdown-it instance
export const markdownIt = MarkdownIt({
  breaks: true,
  // Auto convert URL-like text to links
  linkify: true,
  // Enable some language-neutral replacement + quotes beautification
  typographer: true,
  // should always enable html option due to parsed emoji
  html: true,
});

export const preparation: Promise<void>[] = [];

export const getRenderer = (): Promise<MarkdownRenderer> =>
  Promise.all(preparation).then(
    () =>
      (content: string): string =>
        markdownIt.render(content)
  );
