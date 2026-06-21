const { katex: katexPlugin } = require('@mdit/plugin-katex');
const { sub: subPlugin } = require('@mdit/plugin-sub');
const { createMathjaxInstance, mathjax: mathjaxPlugin } = require('@mdit/plugin-mathjax/sync');
const { sup: supPlugin } = require('@mdit/plugin-sup');

const MarkdownIt = require('markdown-it');
const emojiPlugin = require('markdown-it-emoji');

const { resolveHighlighter } = require('./highlight.js');
const { sanitize } = require('./xss.js');

const getMarkdownParser = (markdown = {}) => {
  const { config = {}, plugin = {} } = markdown;

  const markdownIt = new MarkdownIt({
    breaks: true,
    linkify: true,
    typographer: true,
    highlight: (code, lang) => {
      const highlighter = resolveHighlighter(lang);

      return highlighter ? highlighter(code) : '';
    },
    ...config,
    html: true,
  });

  const { emoji, tex, mathjax, katex, sub, sup } = plugin;

  if (emoji !== false) {
    markdownIt.use(emojiPlugin.full, typeof emoji === 'object' ? emoji : {});
  }

  if (sub !== false) {
    markdownIt.use(subPlugin);
  }

  if (sup !== false) {
    markdownIt.use(supPlugin);
  }

  if (tex === 'katex') {
    markdownIt.use(katexPlugin, {
      ...katex,
      output: 'mathml',
    });
  } else if (tex !== false) {
    const mathjaxInstance = createMathjaxInstance({
      output: 'svg',
      mathjax,
    });

    markdownIt.use(mathjaxPlugin, mathjaxInstance);
  }

  return (content) => sanitize(markdownIt.render(content));
};

module.exports = { getMarkdownParser };
