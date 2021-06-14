const MarkdownIt = require('markdown-it');
const emojiPlugin = require('markdown-it-emoji');
const subPlugin = require('markdown-it-sub');
const supPlugin = require('markdown-it-sup');
const { katexPlugin } = require('./katex');
const { mathjaxPlugin } = require('./mathjax');
const { resolveHighlighter } = require('./highlight');
const { sanitize } = require('./xss');

const getMarkdownParser = () => {
  const { markdown = {} } = think.config();
  const { config = {}, plugin = {} } = markdown;

  // markdown-it instance
  const markdownIt = MarkdownIt({
    breaks: true,
    linkify: true, // Autoconvert URL-like text to links
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
    markdownIt.use(emojiPlugin, typeof emoji === 'object' ? emoji : {});
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
    markdownIt.use(mathjaxPlugin, mathjax);
  }

  return (content) => sanitize(markdownIt.render(content));
};

module.exports = { getMarkdownParser };
