import { type PluginWithOptions } from 'markdown-it';

import { markdownIt } from './markdown-it.js';
import { type Highlighter } from '../../typings.js';

export const highlight: PluginWithOptions<Highlighter> = (
  markdownIt,
  highlighter
) => {
  markdownIt.options.highlight = highlighter;
};

export const setHighlighter = (highlighter: Highlighter): void => {
  markdownIt.use(highlight, highlighter);
};
