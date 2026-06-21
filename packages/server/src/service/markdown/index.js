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

  // markdown-it instance
  const markdownIt = new MarkdownIt({
    breaks: true,
    linkify: true, // Auto convert URL-like text to links
    typographer: true, // Enable some language-neutral replacement + quotes beautification

    // default highlight
    highlight: (code, lang) => {
      const highlighter = resolveHighlighter(lang);

      return highlighter ? highlighter(code) : '';
    },

    ...config,

    // should always enable html option due to parsed emoji
    html: true,
  });

  const { emoji, tex, mathjax, katex, sub, sup } = plugin;

  // parse emoji
  if (emoji !== false) {
    markdownIt.use(emojiPlugin.full, typeof emoji === 'object' ? emoji : {});
  }

  // parse sub
  if (sub !== false) {
    markdownIt.use(subPlugin);
  }

  // parse sup
  if (sup !== false) {
    markdownIt.use(supPlugin);
  }

  // parse tex
  if (tex === 'katex') {
    markdownIt.use(katexPlugin, {
      ...katex,
      output: 'mathml',
    });
  } else if (tex !== false) {
    const mathjaxInstance = createMathjaxInstance({ output: 'svg', mathjax });
    markdownIt.use(mathjaxPlugin, mathjaxInstance);
  }

  return (content) => sanitize(markdownIt.render(content));
};

module.exports = { getMarkdownParser };
