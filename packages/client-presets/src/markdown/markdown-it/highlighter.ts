import { markdownIt } from './markdown-it.js';
import { type Highlighter } from '../../typings.js';

export const setHighlighter = (highlighter: Highlighter): void => {
  markdownIt.options.highlight = highlighter;
};
