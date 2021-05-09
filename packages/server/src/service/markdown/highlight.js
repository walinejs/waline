const prism = require('prismjs');
const rawLoadLanguages = require('prismjs/components/index');

// prevent warning messages
rawLoadLanguages.silent = true;

const loadLanguages = (languages = []) => {
  const langsToLoad = languages.filter((item) => !prism.languages[item]);

  if (langsToLoad.length) {
    rawLoadLanguages(langsToLoad);
  }
};

/**
 * Resolve syntax highlighter for corresponding language
 */
const resolveHighlighter = (language) => {
  // try to load languages
  loadLanguages([language]);

  // return null if current language could not be loaded
  if (!prism.languages[language]) {
    return null;
  }

  return (code) => prism.highlight(code, prism.languages[language], language);
};

module.exports = {
  resolveHighlighter,
};
