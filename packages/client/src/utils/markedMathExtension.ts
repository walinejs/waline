import type { TokenizerExtension } from 'marked';

import type { WalineTeXRenderer } from '../typings/index.js';

const inlineMathStart = /\$.*?\$/;
const inlineMathReg = /^\$(.*?)\$/;
const blockMathReg = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;

export const markedTeXExtensions = (texRenderer: WalineTeXRenderer): TokenizerExtension[] => {
  const blockMathExtension: TokenizerExtension = {
    name: 'blockMath',
    level: 'block',
    tokenizer(src: string) {
      const cap = blockMathReg.exec(src);

      if (cap != null) {
        return {
          type: 'html',
          raw: cap[0],
          text: texRenderer(true, cap[1]),
        };
      }
    },
  };

  const inlineMathExtension: TokenizerExtension = {
    name: 'inlineMath',
    level: 'inline',
    start(src: string) {
      const index = src.search(inlineMathStart);

      return index === -1 ? src.length : index;
    },
    tokenizer(src: string) {
      const cap = inlineMathReg.exec(src);

      if (cap != null) {
        return {
          type: 'html',
          raw: cap[0],
          text: texRenderer(false, cap[1]),
        };
      }
    },
  };

  return [blockMathExtension, inlineMathExtension];
};
