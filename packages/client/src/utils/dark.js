const style = `{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-text-color:#888;--waline-bgcolor:#1e1e1e;--waline-bgcolor-light:#272727;--waline-border-color:#333;--waline-disable-bgcolor:#222;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bgcolor:#272727;--waline-info-color:#666}`;

const injectStyle = (content) => {
  if (!document.body.hasAttribute('waline-dark')) {
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
    document.body.setAttribute('waline-dark', '');
  }
};

export const injectDarkStyle = (selector) => {
  if (typeof selector === 'string') {
    injectStyle(
      selector === 'auto'
        ? `@media(prefers-color-scheme:dark){body${style}}`
        : `${selector}${style}`
    );
  }
};
