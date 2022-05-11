import { describe, expect, it } from 'vitest';
import MarkdownIt from 'markdown-it';
import { katexPlugin } from '../src/service/markdown/katex';
import { vi } from 'vitest';

const markdownIt = MarkdownIt({ linkify: true }).use(katexPlugin, {
  output: 'mathml',
});
const markdownItWithError = MarkdownIt({ linkify: true }).use(katexPlugin, {
  output: 'mathml',
  throwOnError: true,
});

describe('inline katex', () => {
  it('Shoud render', () => {
    expect(markdownIt.render(`$a=1$`)).toEqual(
      `<p><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a=1</annotation></semantics></math></span></p>\n`
    );
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
      '<p>Of course $1 = $1</p>\n'
    );
  });

  it('Should render when the first one is after a charater', () => {
    expect(markdownIt.render(`The next$a = 1$ won't work`)).toEqual(
      `<p>The next<span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a = 1</annotation></semantics></math></span> won't work</p>\n`
    );
  });

  it('Should not render error msg when content is wrong', () => {
    expect(markdownIt.render('$\\fra{a}{b}$')).toEqual(
      `<p><span class='katex-error' title='ParseError: KaTeX parse error: Undefined control sequence: \\fra at position 1: \\̲f̲r̲a̲{a}{b}'>\\fra{a}{b}</span></p>\n`
    );
  });

  it('Should render error msg when content is wrong', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalWarn = global.console.warn;
    global.console.warn = vi.fn();

    expect(markdownItWithError.render('$\\fra{a}{b}$')).toEqual(
      "<p><span class='katex-error' title='ParseError: KaTeX parse error: Undefined control sequence: \\fra at position 1: \\̲f̲r̲a̲{a}{b}'>\\fra{a}{b}</span></p>\n"
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.console.warn).toHaveBeenCalledTimes(1);
    global.console.warn = originalWarn;
  });
});

describe('block katex', () => {
  it('Shoud render', () => {
    expect(markdownIt.render(`$$a=1$$`)).toEqual(
      `<p class='katex-block'><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a=1\n</annotation></semantics></math></span></p>\n`
    );

    expect(
      markdownIt.render(`
$$
a = 1
$$
`)
    ).toEqual(
      `<p class='katex-block'><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a = 1\n</annotation></semantics></math></span></p>\n`
    );
  });

  it('Should not render when escape', () => {
    expect(markdownIt.render('\\$\\$a = 1$$')).toEqual('<p>$$a = 1$$</p>\n');
    expect(
      markdownIt.render(`
\\$\\$
a = 1
\\$\\$
`)
    ).toEqual(`<p>$$
a = 1
$$</p>\n`);
  });

  it('Should render when having spaces', () => {
    expect(markdownIt.render(`$$ a = 1 $$`)).toEqual(
      `<p class='katex-block'><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a = 1 \n</annotation></semantics></math></span></p>\n`
    );

    expect(markdownIt.render(`All $$ a = 1 $$ is true.`)).toEqual(
      '<p>All $$ a = 1 $$ is true.</p>\n'
    );
  });

  it('Should not render error msg when content is wrong', () => {
    expect(markdownIt.render('$$\\fra{a}{b}$$')).toEqual(
      `<p class='katex-block katex-error' title='ParseError: KaTeX parse error: Undefined control sequence: \\fra at position 1: \\̲f̲r̲a̲{a}{b}\n'>\\fra{a}{b}\n</p>\n`
    );

    expect(
      markdownIt.render(`
$$
\\fra{a}{b}
$$
`)
    ).toEqual(
      `<p class='katex-block katex-error' title='ParseError: KaTeX parse error: Undefined control sequence: \\fra at position 1: \\̲f̲r̲a̲{a}{b}\n'>\\fra{a}{b}\n</p>\n`
    );
  });

  it('Should render error msg when content is wrong', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalWarn = global.console.warn;
    global.console.warn = vi.fn();
    expect(markdownItWithError.render('$$\\fra{a}{b}$$')).toMatch(
      /<p class='katex-block katex-error' title='[\s\S]*?'>[\s\S]*?<\/p>/
    );

    expect(
      markdownItWithError.render(`
$$
\\fra{a}{b}
$$
`)
    ).toMatch(
      /<p class='katex-block katex-error' title='[\s\S]*?'>[\s\S]*?<\/p>/
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.console.warn).toHaveBeenCalledTimes(2);
    global.console.warn = originalWarn;
  });
});
