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

export const parseEmoji = (text, emojiMaps, emojiCDN) => {
  if (!text) {
    return '';
  }

  return text.replace(/:(.+?):/g, (placeholder, key) => {
    if (!emojiMaps[key]) {
      return placeholder;
    }

    return `![${key}](${
      /(?:https?:)?\/\//.test(emojiMaps[key])
        ? emojiMaps[key]
        : emojiCDN + emojiMaps[key]
    })`;
  });
};

export const getMarkdownParser = (highlight, ctx) => {
  marked.setOptions({
    highlight: highlight === false ? null : hanabi,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  return (comment) =>
    DOMPurify.sanitize(
      marked(parseEmoji(comment, ctx.emojiMaps, ctx.emojiCDN)),
      {
        FORBID_TAGS: ['form', 'input'],
        FORBID_ATTR: ['autoplay', 'draggable'],
      }
    );
};
