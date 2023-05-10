/**
 * Forked from https://github.com/tani/markdown-it-mathjax3/blob/master/index.ts
 */

import { type LiteElement } from 'mathjax-full/js/adaptors/lite/Element.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { mathjax as MathJax } from 'mathjax-full/js/mathjax.js';
import { SVG } from 'mathjax-full/js/output/svg.js';

import { type TexRenderer } from '../typings.js';

const adaptor = liteAdaptor();

const InputJax = new TeX<LiteElement, string, HTMLElement>({
  packages: AllPackages,
});

const OutputJax = new SVG<LiteElement, string, HTMLElement>({
  fontCache: 'none',
});

export const texRenderer: TexRenderer = (tex, displayMode) => {
  InputJax.reset();

  /* eslint-disable */
  const mathDocument = MathJax.document(tex, { InputJax, OutputJax }).convert(
    tex,
    { display: displayMode }
  );
  const html = adaptor.outerHTML(mathDocument);

  return html;
};
