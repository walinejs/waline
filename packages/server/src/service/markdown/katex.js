const katex = require('katex');
const { escapeHtml } = require('./utils');
const { inlineTex, blockTex } = require('./mathCommon');

// set KaTeX as the renderer for markdown-it-simplemath
const katexInline = (tex, options) => {
  options.displayMode = false;
  try {
    return katex.renderToString(tex, options);
  } catch (error) {
    if (options.throwOnError) console.warn(error);
    return `<span class='katex-error' title='${escapeHtml(
      error.toString()
    )}'>${escapeHtml(tex)}</span>`;
  }
};

const katexBlock = (tex, options) => {
  options.displayMode = true;
  try {
    return `<p class='katex-block'>${katex.renderToString(tex, options)}</p>`;
  } catch (error) {
    if (options.throwOnError) console.warn(error);
    return `<p class='katex-block katex-error' title='${escapeHtml(
      error.toString()
    )}'>${escapeHtml(tex)}</p>`;
  }
};

const katexPlugin = (md, options = { throwOnError: false }) => {
  md.inline.ruler.after('escape', 'inlineTex', inlineTex);

  // It’s a workaround here because types issue
  md.block.ruler.after('blockquote', 'blockTex', blockTex, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });

  md.renderer.rules.inlineTex = (tokens, idx) =>
    katexInline(tokens[idx].content, options);

  md.renderer.rules.blockTex = (tokens, idx) =>
    `${katexBlock(tokens[idx].content, options)}\n`;
};

module.exports = {
  katexPlugin,
};
