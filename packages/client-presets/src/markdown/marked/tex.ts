import { texRenderer } from '@tex';
import { type marked as Marked } from 'marked';

import { marked } from './marked.js';
import { type TexRenderer } from '../../typings.js';

const INLINE_TEX_START = /\$.*?\$/;
const INLINE_TEX_REG = /^\$(.*?)\$/;
const BLOCK_TEX_REG = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;

interface TexToken extends Marked.Tokens.Generic {
  type: 'block-tex' | 'inline-tex';
  text: string;
  raw: string;
}

export const markedTex = (texRenderer: TexRenderer): Marked.MarkedExtension => {
  const blockMathExtension: Marked.TokenizerAndRendererExtension = {
    name: 'block-tex',
    level: 'block',
    start: (src) => src.indexOf('\n$$'),
    tokenizer: (src) => {
      const match = BLOCK_TEX_REG.exec(src);

      if (match) {
        return {
          type: 'block-tex',
          raw: match[0],
          text: match[1],
        };
      }

      return;
    },
    // eslint-disable-next-line
    renderer: (token) => texRenderer((<TexToken>token).text, true),
  };

  const inlineMathExtension: Marked.TokenizerAndRendererExtension = {
    name: 'inline-tex',
    level: 'inline',
    start: (src) => {
      const index = src.search(INLINE_TEX_START);

      return index !== -1 ? index : src.length;
    },
    tokenizer(src) {
      const match = INLINE_TEX_REG.exec(src);

      if (match) {
        return {
          type: 'inline-tex',
          raw: match[0],
          text: match[1],
        };
      }

      return;
    },
    // eslint-disable-next-line
    renderer: (token) => texRenderer((<TexToken>token).text, false),
  };

  return { extensions: [blockMathExtension, inlineMathExtension] };
};

marked.use(markedTex(texRenderer));
