import MarkdownIt from 'markdown-it';
import { describe, expect, it } from 'vitest';

import { mathjaxPlugin } from '../src/service/markdown/mathjax';

const markdownIt = MarkdownIt({ linkify: true }).use(mathjaxPlugin);

describe('inline mathjax', () => {
  it('Should render', () => {
    expect(markdownIt.render(`$a=1$`)).toMatchSnapshot();
  });

  it('Should not render when escape', () => {
    expect(markdownIt.render('$a = 1\\$')).toEqual('<p>$a = 1$</p>\n');
    expect(markdownIt.render('\\$a = 1$')).toEqual('<p>$a = 1$</p>\n');
  });

  it('Should not render when having spaces', () => {
    expect(markdownIt.render(`$ a = 1 $`)).toEqual('<p>$ a = 1 $</p>\n');
  });

  it('Should not render when the ending tag is followed by number', () => {
    expect(markdownIt.render(`Of course $1 = $1`)).toEqual(
      '<p>Of course $1 = $1</p>\n',
    );
  });

  it('Should render when the first one is after a charater', () => {
    expect(markdownIt.render(`The next$a = 1$ won't work`)).toMatchSnapshot();
  });

  it('Should not render error msg when content is wrong', () => {
    expect(markdownIt.render('$\\fra{a}{b}$')).toMatchSnapshot();
  });
});

describe('block mathjax', () => {
  it('Should render', () => {
    const result1 = markdownIt.render(`$$a=1$$`).trim();
    const result2 = markdownIt.render(`
$$
a = 1
$$
`).trim();

    expect(result1).toMatch(/^<svg/);
    expect(result1).toMatch(/<\/svg>$/);
    expect(result1).toMatchSnapshot();
    expect(result2).toMatch(/^<svg/);
    expect(result2).toMatch(/<\/svg>$/);
    expect(result2).toMatchSnapshot();
  });

  it('Should not render when escape', () => {
    expect(markdownIt.render('\\$\\$a = 1$$')).toEqual('<p>$$a = 1$$</p>\n');
    expect(
      markdownIt.render(`
\\$\\$
a = 1
\\$\\$
`),
    ).toEqual(`<p>$$
a = 1
$$</p>\n`);
  });

  it('Should render when having spaces', () => {
    const result1 = markdownIt.render(`$$ a = 1 $$`).trim();

    expect(result1).toMatch(/^<svg/);
    expect(result1).toMatch(/<\/svg>$/);
    expect(result1).toMatchSnapshot();

    expect(markdownIt.render(`All $$ a = 1 $$ is true.`)).toEqual(
      '<p>All $$ a = 1 $$ is true.</p>\n',
    );
  });

  it('Should not render error msg when content is wrong', () => {
    const result1 = markdownIt.render('$$\\fra{a}{b}$$').trim();
    const result2 = markdownIt.render(`
$$
\\fra{a}{b}
$$
`).trim();

    expect(result1).toMatch(/^<svg/);
    expect(result1).toMatch(/<\/svg>$/);
    expect(result1).toMatchSnapshot();
    expect(result2).toMatch(/^<svg/);
    expect(result2).toMatch(/<\/svg>$/);
    expect(result2).toMatchSnapshot();
  });
});
