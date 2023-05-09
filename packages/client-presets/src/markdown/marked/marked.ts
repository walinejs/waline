import { marked } from 'marked';

import { type MarkdownRenderer } from '../../typings.js';

marked.setOptions({
  breaks: true,
  smartLists: true,
  smartypants: true,
});

export { marked };

export const preparation: Promise<void>[] = [];

export const parseMarkdown = (content: string): string => {
  return marked.parse(content);
};

export const getRenderer = (): Promise<MarkdownRenderer> =>
  Promise.all(preparation).then(
    () =>
      (content: string): string =>
        marked.parse(content)
  );
