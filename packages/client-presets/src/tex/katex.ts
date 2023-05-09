import katex from 'katex';

import { type TexRenderer } from '../typings.js';

export const texRenderer: TexRenderer = (tex, displayMode) =>
  katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
  });
