const style = `{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-text-color:#888;--waline-bgcolor:#1e1e1e;--waline-bgcolor-light:#272727;--waline-bgcolor-hover: #444;--waline-border-color:#333;--waline-disable-bgcolor:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bgcolor:#272727;--waline-info-color:#666}`;

const mathStyle = `
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* See https://github.com/fred-wang/mathml.css */

@namespace "http://www.w3.org/1998/Math/MathML";
body[waline-math] .v math{display:inline;font-size:0;font-family:Cambria Math,Latin Modern Math;text-indent:0}body[waline-math] .v math>*{font-size:14px}body[waline-math] .v math[display=block]{display:block;font-size:0;text-align:center}body[waline-math] .v math[display=block]>*{font-size:16px}body[waline-math] .v mfrac{display:inline-block !important;vertical-align:-50%;border-collapse:collapse;text-align:center}body[waline-math] .v mfrac>*{display:block !important}body[waline-math] .v mfrac>*+*{display:inline-block !important;vertical-align:top}body[waline-math] .v mfrac:not([linethickness="0"])>*:first-child{border-bottom:solid thin}body[waline-math] .v msub>*:nth-child(2),body[waline-math] .v msubsup>*:nth-child(2),body[waline-math] .v mmultiscripts>*:nth-child(2n+2),body[waline-math] .v mmultiscripts>mprescripts~*:nth-child(2n+3){vertical-align:sub;font-size:.8em}body[waline-math] .v msup>*:nth-child(2),body[waline-math] .v msubsup>*:nth-child(3),body[waline-math] .v mmultiscripts>*:nth-child(2n+3),body[waline-math] .v mmultiscripts>mprescripts~*:nth-child(2n+2){vertical-align:super;font-size:.8em}body[waline-math] .v mprescripts::after{content:";"}body[waline-math] .v munder,body[waline-math] .v mover,body[waline-math] .v munderover{display:inline-flex !important;flex-direction:column}body[waline-math] .v munder>*:nth-child(2),body[waline-math] .v munderover>*:nth-child(2){order:1;font-size:.8em}body[waline-math] .v mover>*:nth-child(2),body[waline-math] .v munderover>*:nth-child(3){order:-1;font-size:.8em}body[waline-math] .v munder{vertical-align:text-top}body[waline-math] .v mover{vertical-align:text-bottom}body[waline-math] .v munderover{vertical-align:middle}body[waline-math] .v msqrt,body[waline-math] .v mroot{display:inline-flex !important;vertical-align:middle;margin-left:.5em;border-top:solid thin}body[waline-math] .v msqrt::before,body[waline-math] .v mroot::before{content:"√";margin-left:-0.5em}body[waline-math] .v mroot>*:nth-child(2){order:-1;margin-right:.25em;margin-left:-0.75em;font-size:.8em}body[waline-math] .v menclose{display:inline-table !important;border-spacing:.4ex 0;border-collapse:separate}body[waline-math] .v menclose[notation*=top],body[waline-math] .v menclose[notation*=actuarial]{border-top:solid thin}body[waline-math] .v menclose[notation*=bottom],body[waline-math] .v menclose[notation*=madruwb]{border-bottom:solid thin}body[waline-math] .v menclose[notation*=right],body[waline-math] .v menclose[notation*=actuarial],body[waline-math] .v menclose[notation*=madruwb]{border-right:solid thin}body[waline-math] .v menclose[notation*=left]{border-left:solid thin}body[waline-math] .v menclose[notation*=box],body[waline-math] .v menclose[notation*=roundedbox],body[waline-math] .v menclose[notation*=circle]{border:solid thin}body[waline-math] .v menclose[notation*=roundedbox]{border-radius:15%}body[waline-math] .v menclose[notation*=circle]{border-radius:50%}body[waline-math] .v menclose[notation*=horizontalstrike]{text-decoration:line-through}body[waline-math] .v mtable{display:inline-table !important;vertical-align:middle;text-align:center}body[waline-math] .v mtr{display:table-row !important}body[waline-math] .v mtd{display:table-cell !important;padding:0 .5ex}body[waline-math] .v mspace{margin:.2em}body[waline-math] .v mi{font-style:italic}body[waline-math] .v mo{margin-right:.2em;margin-left:.2em}body[waline-math] .v ms::before,body[waline-math] .v ms::after{content:'"'}body[waline-math] .v ms[lquote]::before{content:attr(lquote)}body[waline-math] .v ms[lquote]::after{content:attr(rquote)}body[waline-math] .v [mathvariant=bold],body[waline-math] .v [mathvariant=bold-italic],body[waline-math] .v [mathvariant=bold-sans-serif],body[waline-math] .v [mathvariant=sans-serif-bold-italic]{font-weight:bold;font-style:normal}body[waline-math] .v [mathvariant=monospace]{font-style:normal;font-family:monospace}body[waline-math] .v [mathvariant=sans-serif],body[waline-math] .v [mathvariant=bold-sans-serif],body[waline-math] .v [mathvariant=sans-serif-italic],body[waline-math] .v [mathvariant=sans-serif-bold-italic]{font-style:normal;font-family:sans-serif}body[waline-math] .v [mathvariant=italic],body[waline-math] .v [mathvariant=bold-italic],body[waline-math] .v [mathvariant=sans-serif-italic],body[waline-math] .v [mathvariant=sans-serif-bold-italic]{font-style:italic}body[waline-math] .v [mathvariant=normal]{font-style:normal}body[waline-math] .v mphantom{visibility:hidden}body[waline-math] .v merror{outline:solid thin red}body[waline-math] .v merror::before{content:"Error: "}body[waline-math] .v semantics>*:first-child{display:inline}body[waline-math] .v annotation,body[waline-math] .v annotation-xml{display:none !important;font-family:monospace}body[waline-math] .v math:active>semantics>*:first-child{display:none !important}body[waline-math] .v math:active annotation:first-of-type{display:inline !important}`;

const injectStyle = (content: string, attr: string): void => {
  if (!document.body.hasAttribute(attr)) {
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
    document.body.setAttribute(attr, '');
  }
};

export const injectDarkStyle = (selector?: string | boolean): void => {
  if (typeof selector === 'string') {
    injectStyle(
      selector === 'auto'
        ? `@media(prefers-color-scheme:dark){body${style}}`
        : `${selector}${style}`,
      'waline-dark'
    );
  }
};

export const registerMathML = (): void => {
  injectStyle(mathStyle, 'waline-math-style');

  // Create a div to test mspace, using Kuma's "offscreen" CSS
  document.body.insertAdjacentHTML(
    'afterbegin',
    "<div style='border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px;'><math xmlns='http://www.w3.org/1998/Math/MathML'><mspace height='23px' width='77px'></mspace></math></div>"
  );
  const div = document.body.firstChild as HTMLElement;
  const box =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (div.firstChild!.firstChild as HTMLElement).getBoundingClientRect();

  document.body.removeChild(div);

  if (Math.abs(box.height - 23) > 1 || Math.abs(box.width - 77) > 1) {
    document.body.setAttribute('waline-math', '');
  }
};
