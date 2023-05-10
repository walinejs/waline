import { type Highlighter as ShikiHighlighter, getHighlighter } from 'shiki';

import { type Highlighter } from '../typings.js';

let shikiHighlighter: ShikiHighlighter;

export const initHighlighter = async (): Promise<void> => {
  shikiHighlighter = await getHighlighter({});
};

export const highlighter: Highlighter = (code, lang) =>
  shikiHighlighter.codeToHtml(code, { lang });
