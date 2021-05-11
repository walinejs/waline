import hanabi from 'hanabi';
import marked from 'marked';

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
    parseMath(marked(parseEmoji(comment, ctx.emojiMaps, ctx.emojiCDN)));
};
