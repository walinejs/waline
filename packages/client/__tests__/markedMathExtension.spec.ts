// oxlint-disable vitest/require-hook
import { marked } from 'marked';
import { describe, expect, it } from 'vitest';

import { defaultTeXRenderer } from '../src/config/index.js';
import { markedTeXExtensions } from '../src/utils/markedMathExtension.js';

const extensions = markedTeXExtensions(defaultTeXRenderer);

marked.setOptions({ breaks: true });
marked.use({ extensions });

describe('should parse inline tex', () => {
  it('single word', () => {
    expect(marked.parse('$a$')).toBe(
      '<p><span class="wl-tex">TeX is not available in preview</span></p>\n',
    );

    expect(marked.parse('$a$ is at beginning')).toBe(
      '<p><span class="wl-tex">TeX is not available in preview</span> is at beginning</p>\n',
    );

    expect(marked.parse('Here ends a single tex $a$')).toBe(
      '<p>Here ends a single tex <span class="wl-tex">TeX is not available in preview</span></p>\n',
    );

    expect(marked.parse('Here is a single tex $a$ in the sentence')).toBe(
      '<p>Here is a single tex <span class="wl-tex">TeX is not available in preview</span> in the sentence</p>\n',
    );

    expect(marked.parse('$-$')).toBe(
      '<p><span class="wl-tex">TeX is not available in preview</span></p>\n',
    );
  });

  it('mutiple words', () => {
    expect(marked.parse('$a = 1$')).toBe(
      '<p><span class="wl-tex">TeX is not available in preview</span></p>\n',
    );

    expect(marked.parse('$a = 1$ is at beginning')).toBe(
      '<p><span class="wl-tex">TeX is not available in preview</span> is at beginning</p>\n',
    );

    expect(marked.parse('Here ends a single tex $a = 1$')).toBe(
      '<p>Here ends a single tex <span class="wl-tex">TeX is not available in preview</span></p>\n',
    );

    expect(marked.parse('Here is a single tex $a = 1$ in the sentence')).toBe(
      '<p>Here is a single tex <span class="wl-tex">TeX is not available in preview</span> in the sentence</p>\n',
    );

    expect(marked.parse(String.raw`$-\sqrt{x}$`)).toBe(
      '<p><span class="wl-tex">TeX is not available in preview</span></p>\n',
    );

    expect(marked.parse(String.raw`$-\sqrt{x}$ is at beginning`)).toBe(
      '<p><span class="wl-tex">TeX is not available in preview</span> is at beginning</p>\n',
    );

    expect(marked.parse(String.raw`Here ends a single tex $-\sqrt{x}$`)).toBe(
      '<p>Here ends a single tex <span class="wl-tex">TeX is not available in preview</span></p>\n',
    );
  });

  it('codespan', () => {
    expect(marked.parse('`$a = 1$`')).toBe('<p><code>$a = 1$</code></p>\n');
  });
});

describe('should parse block tex', () => {
  it('single line', () => {
    expect(marked.parse('$$a$$')).toBe('<p class="wl-tex">TeX is not available in preview</p>');
  });

  it('mutiple lines', () => {
    expect(marked.parse('$$\na\n$$')).toBe('<p class="wl-tex">TeX is not available in preview</p>');
  });

  it('code block', () => {
    expect(marked.parse('    $$a$$')).toBe('<pre><code>$$a$$\n</code></pre>\n');

    expect(marked.parse('```\n$$\na\n$$\n```')).toBe('<pre><code>$$\na\n$$\n</code></pre>\n');
  });
});
