import { markedHighlight } from 'marked-highlight';

import { marked } from './marked.js';
import { type Highlighter } from '../../typings.js';

export const setHighlighter = (highlighter: Highlighter): void => {
  marked.use(markedHighlight({ highlight: highlighter }));
};
