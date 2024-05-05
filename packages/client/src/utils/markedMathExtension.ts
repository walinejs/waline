import type { TokenizerExtension } from 'marked';

import type { WalineTeXRenderer } from '../typings/index.js';

const inlineMathStart = /\$.*?\$/;
const inlineMathReg = /^\$(.*?)\$/;
const blockMathReg = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;

export const markedTeXExtensions = (
  texRenderer: WalineTeXRenderer,
): TokenizerExtension[] => {
  const blockMathExtension: TokenizerExtension = {
    name: 'blockMath',
    level: 'block',
    tokenizer(src: string) {
      const cap = blockMathReg.exec(src);

      if (cap !== null) {
        return {
          type: 'html',
          raw: cap[0],
          text: texRenderer(true, cap[1]),
        };
      }

      return undefined;
    },
  };

  const inlineMathExtension: TokenizerExtension = {
    name: 'inlineMath',
    level: 'inline',
    start(src: string) {
      const idx = src.search(inlineMathStart);

      return idx !== -1 ? idx : src.length;
    },
    tokenizer(src: string) {
      const cap = inlineMathReg.exec(src);

      if (cap !== null) {
        return {
          type: 'html',
          raw: cap[0],
          text: texRenderer(false, cap[1]),
        };
      }

      return undefined;
    },
  };

  return [blockMathExtension, inlineMathExtension];
};
