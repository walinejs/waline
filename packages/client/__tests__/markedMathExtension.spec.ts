import * as marked from 'marked';
import { defaultPreviewMath } from '../src/config';
import { markedMathExtension } from '../src/utils/markedMathExtension';

const extensions = markedMathExtension(defaultPreviewMath);

marked.setOptions({
  highlight: undefined,
  breaks: true,
  smartLists: true,
  smartypants: true,
});
marked.use({ extensions });

describe('Should parse inline tex', () => {
  it('Single word', () => {
    expect(marked('$a$')).toEqual(
      '<p><span class="vtex">Tex is not available in preview</span></p>\n'
    );

    expect(marked('$a$ is at beginning')).toEqual(
      '<p><span class="vtex">Tex is not available in preview</span> is at beginning</p>\n'
    );

    expect(marked('Here ends a single tex $a$')).toEqual(
      '<p>Here ends a single tex <span class="vtex">Tex is not available in preview</span></p>\n'
    );

    expect(marked('Here is a single tex $a$ in the sentence')).toEqual(
      '<p>Here is a single tex <span class="vtex">Tex is not available in preview</span> in the sentence</p>\n'
    );

    expect(marked('$-$')).toEqual(
      '<p><span class="vtex">Tex is not available in preview</span></p>\n'
    );
  });

  it('Mutiple words', () => {
    expect(marked('$a = 1$')).toEqual(
      '<p><span class="vtex">Tex is not available in preview</span></p>\n'
    );

    expect(marked('$a = 1$ is at beginning')).toEqual(
      '<p><span class="vtex">Tex is not available in preview</span> is at beginning</p>\n'
    );

    expect(marked('Here ends a single tex $a = 1$')).toEqual(
      '<p>Here ends a single tex <span class="vtex">Tex is not available in preview</span></p>\n'
    );

    expect(marked('Here is a single tex $a = 1$ in the sentence')).toEqual(
      '<p>Here is a single tex <span class="vtex">Tex is not available in preview</span> in the sentence</p>\n'
    );

    expect(marked('$-\\sqrt{x}$')).toEqual(
      '<p><span class="vtex">Tex is not available in preview</span></p>\n'
    );

    expect(marked('$-\\sqrt{x}$ is at beginning')).toEqual(
      '<p><span class="vtex">Tex is not available in preview</span> is at beginning</p>\n'
    );

    expect(marked('Here ends a single tex $-\\sqrt{x}$')).toEqual(
      '<p>Here ends a single tex <span class="vtex">Tex is not available in preview</span></p>\n'
    );
  });

  it('Codespan', () => {
    expect(marked('`$a = 1$`')).toEqual('<p><code>$a = 1$</code></p>\n');
  });
});

describe('Should parse block tex', () => {
  it('Single line', () => {
    expect(marked('$$a$$')).toEqual(
      '<p class="vtex">Tex is not available in preview</p>'
    );
  });

  it('Mutiple lines', () => {
    expect(marked('$$\na\n$$')).toEqual(
      '<p class="vtex">Tex is not available in preview</p>'
    );
  });

  it('Code block', () => {
    expect(marked('    $$a$$')).toEqual('<pre><code>$$a$$\n</code></pre>\n');

    expect(marked('```\n$$\na\n$$\n```')).toEqual(
      '<pre><code>$$\na\n$$\n</code></pre>\n'
    );
  });
});
