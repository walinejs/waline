import { katex as katexPlugin } from '@mdit/plugin-katex';
import { createMathjaxInstance, mathjax as mathjaxPlugin } from '@mdit/plugin-mathjax/sync';
import { sub as subPlugin } from '@mdit/plugin-sub';
import { sup as supPlugin } from '@mdit/plugin-sup';
import MarkdownIt from 'markdown-it';
import { full as emojiFull } from 'markdown-it-emoji';

import { resolveHighlighter } from './highlight.js';
import { sanitize } from './xss.js';

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
    markdownIt.use(emojiFull, typeof emoji === 'object' ? emoji : {});
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

export { getMarkdownParser };
