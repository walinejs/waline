import { describe, expect, it } from 'vitest';
import { marked } from 'marked';
import { defaultTexRenderer } from '../src/config';
import { markedTexExtensions } from '../src/utils/markedMathExtension';

const extensions = markedTexExtensions(defaultTexRenderer);

marked.setOptions({
  highlight: undefined,
  breaks: true,
  smartLists: true,
  smartypants: true,
});
marked.use({ extensions });

describe('Should parse inline tex', () => {
  it('Single word', () => {
    expect(marked.parse('$a$')).toEqual(
      '<p><span class="wl-tex">Tex is not available in preview</span></p>\n'
    );

    expect(marked.parse('$a$ is at beginning')).toEqual(
      '<p><span class="wl-tex">Tex is not available in preview</span> is at beginning</p>\n'
    );

    expect(marked.parse('Here ends a single tex $a$')).toEqual(
      '<p>Here ends a single tex <span class="wl-tex">Tex is not available in preview</span></p>\n'
    );

    expect(marked.parse('Here is a single tex $a$ in the sentence')).toEqual(
      '<p>Here is a single tex <span class="wl-tex">Tex is not available in preview</span> in the sentence</p>\n'
    );

    expect(marked.parse('$-$')).toEqual(
      '<p><span class="wl-tex">Tex is not available in preview</span></p>\n'
    );
  });

  it('Mutiple words', () => {
    expect(marked.parse('$a = 1$')).toEqual(
      '<p><span class="wl-tex">Tex is not available in preview</span></p>\n'
    );

    expect(marked.parse('$a = 1$ is at beginning')).toEqual(
      '<p><span class="wl-tex">Tex is not available in preview</span> is at beginning</p>\n'
    );

    expect(marked.parse('Here ends a single tex $a = 1$')).toEqual(
      '<p>Here ends a single tex <span class="wl-tex">Tex is not available in preview</span></p>\n'
    );

    expect(
      marked.parse('Here is a single tex $a = 1$ in the sentence')
    ).toEqual(
      '<p>Here is a single tex <span class="wl-tex">Tex is not available in preview</span> in the sentence</p>\n'
    );

    expect(marked.parse('$-\\sqrt{x}$')).toEqual(
      '<p><span class="wl-tex">Tex is not available in preview</span></p>\n'
    );

    expect(marked.parse('$-\\sqrt{x}$ is at beginning')).toEqual(
      '<p><span class="wl-tex">Tex is not available in preview</span> is at beginning</p>\n'
    );

    expect(marked.parse('Here ends a single tex $-\\sqrt{x}$')).toEqual(
      '<p>Here ends a single tex <span class="wl-tex">Tex is not available in preview</span></p>\n'
    );
  });

  it('Codespan', () => {
    expect(marked.parse('`$a = 1$`')).toEqual('<p><code>$a = 1$</code></p>\n');
  });
});

describe('Should parse block tex', () => {
  it('Single line', () => {
    expect(marked.parse('$$a$$')).toEqual(
      '<p class="wl-tex">Tex is not available in preview</p>'
    );
  });

  it('Mutiple lines', () => {
    expect(marked.parse('$$\na\n$$')).toEqual(
      '<p class="wl-tex">Tex is not available in preview</p>'
    );
  });

  it('Code block', () => {
    expect(marked.parse('    $$a$$')).toEqual(
      '<pre><code>$$a$$\n</code></pre>\n'
    );

    expect(marked.parse('```\n$$\na\n$$\n```')).toEqual(
      '<pre><code>$$\na\n$$\n</code></pre>\n'
    );
  });
});
