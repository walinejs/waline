const style = `{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-text-color:#888;--waline-bgcolor:#1e1e1e;--waline-bgcolor-light:#272727;--waline-border-color:#333;--waline-disable-bgcolor:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bgcolor:#272727;--waline-info-color:#666}`;

const injectStyle = (content: string): void => {
  if (!document.body.hasAttribute('waline-dark')) {
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
    document.body.setAttribute('waline-dark', '');
  }
};

export const injectDarkStyle = (selector?: string | boolean): void => {
  if (typeof selector === 'string') {
    injectStyle(
      selector === 'auto'
        ? `@media(prefers-color-scheme:dark){body${style}}`
        : `${selector}${style}`
    );
  }
};

export const registerMathML = (): void => {
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
