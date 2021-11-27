import type { marked } from 'marked';
import type { TexRenderer } from '../config';

const inlineMathStart = /\$.*?\$/;
const inlineMathReg = /^\$(.*?)\$/;
const blockMathReg = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;

export const markedTexExtensions = (
  texRenderer: TexRenderer
): marked.TokenizerExtension[] => {
  const blockMathExt: marked.TokenizerExtension = {
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

  const inlineMathExt: marked.TokenizerExtension = {
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

  return [blockMathExt, inlineMathExt];
};
