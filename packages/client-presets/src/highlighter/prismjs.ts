import prismjs from 'prismjs';
import rawLoadLanguages from 'prismjs/components/index';

import { type Highlighter } from '../typings.js';

// prevent warning messages
rawLoadLanguages.silent = true;

const loadLanguages = (languages: string[] = []): void => {
  const langsToLoad = languages.filter((item) => !prismjs.languages[item]);

  if (langsToLoad.length) {
    rawLoadLanguages(langsToLoad);
  }
};

/**
 * Resolve syntax highlighter for corresponding language
 */
export const highlighter: Highlighter = (code: string, language: string) => {
  // try to load languages
  loadLanguages([language]);

  return prismjs.languages[language]
    ? prismjs.highlight(code, prismjs.languages[language], language)
    : // do not highlight if current language could not be loaded
      code;
};
