import DOMPurify from 'dompurify';
import hanabi from 'hanabi';
import marked from 'marked';

/**
 * Add a hook to make all links open a new window
 * and force their rel to be 'noreferrer noopener'
 */
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  // set all elements owning target to target=_blank
  if ('target' in node) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noreferrer noopener');
  }

  // set non-HTML/MathML links to xlink:show=new
  if (
    !node.hasAttribute('target') &&
    (node.hasAttribute('xlink:href') || node.hasAttribute('href'))
  ) {
    node.setAttribute('xlink:show', 'new');
  }

  if ('preload' in node) {
    node.setAttribute('preload', 'none');
  }
});

const inlineMathRegExp = /\B\$\b([^\n$]*)\b\$\B/g;
const blockMathRegExp = /(^|[\r\n]+|<p>|<br>)\$\$([^$]+)\$\$([\r\n]+|<\/p>|<br>|$)/g;

export const parseEmoji = (text, emojiMaps, emojiCDN) => {
  if (!text) {
    return '';
  }

  return text.replace(/:(.+?):/g, (placeholder, key) => {
    if (!emojiMaps[key]) {
      return placeholder;
    }

    return `<img class="vemoji" src="${
      /(?:https?:)?\/\//.test(emojiMaps[key])
        ? emojiMaps[key]
        : emojiCDN + emojiMaps[key]
    }" alt="${key}">`;
  });
};

export const parseMath = (content) =>
  content
    .replace(
      inlineMathRegExp,
      '<span class="vtex">Tex is not available in preview</span>'
    )
    .replace(
      blockMathRegExp,
      '<p class="vtex">Tex is not available in preview</p>'
    );
export const getMarkdownParser = (highlight, ctx) => {
  marked.setOptions({
    highlight: highlight === false ? null : hanabi,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  return (comment) =>
    DOMPurify.sanitize(
      parseMath(marked(parseEmoji(comment, ctx.emojiMaps, ctx.emojiCDN))),
      {
        FORBID_TAGS: ['form', 'input', 'style'],
        FORBID_ATTR: ['autoplay', 'draggable', 'style'],
      }
    );
};
