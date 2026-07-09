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
      '<p><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math></p>\n',
    );

    expect(marked.parse('$a$ is at beginning')).toBe(
      '<p><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math> is at beginning</p>\n',
    );

    expect(marked.parse('Here ends a single tex $a$')).toBe(
      '<p>Here ends a single tex <math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math></p>\n',
    );

    expect(marked.parse('Here is a single tex $a$ in the sentence')).toBe(
      '<p>Here is a single tex <math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math> in the sentence</p>\n',
    );

    expect(marked.parse('$-$')).toBe(
      '<p><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>−</mo></mrow><annotation encoding="application/x-tex">-</annotation></semantics></math></p>\n',
    );
  });

  it('mutiple words', () => {
    expect(marked.parse('$a = 1$')).toBe(
      '<p><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a = 1</annotation></semantics></math></p>\n',
    );

    expect(marked.parse('$a = 1$ is at beginning')).toBe(
      '<p><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a = 1</annotation></semantics></math> is at beginning</p>\n',
    );

    expect(marked.parse('Here ends a single tex $a = 1$')).toBe(
      '<p>Here ends a single tex <math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a = 1</annotation></semantics></math></p>\n',
    );

    expect(marked.parse('Here is a single tex $a = 1$ in the sentence')).toBe(
      '<p>Here is a single tex <math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">a = 1</annotation></semantics></math> in the sentence</p>\n',
    );

    expect(marked.parse(String.raw`$-\sqrt{x}$`)).toBe(
      '<p><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow><annotation encoding="application/x-tex">-\\sqrt{x}</annotation></semantics></math></p>\n',
    );

    expect(marked.parse(String.raw`$-\sqrt{x}$ is at beginning`)).toBe(
      '<p><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow><annotation encoding="application/x-tex">-\\sqrt{x}</annotation></semantics></math> is at beginning</p>\n',
    );

    expect(marked.parse(String.raw`Here ends a single tex $-\sqrt{x}$`)).toBe(
      '<p>Here ends a single tex <math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow><annotation encoding="application/x-tex">-\\sqrt{x}</annotation></semantics></math></p>\n',
    );
  });

  it('codespan', () => {
    expect(marked.parse('`$a = 1$`')).toBe('<p><code>$a = 1$</code></p>\n');
  });
});

describe('should parse block tex', () => {
  it('single line', () => {
    expect(marked.parse('$$a$$')).toBe(
      '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math>',
    );
  });

  it('mutiple lines', () => {
    expect(marked.parse('$$\na\n$$')).toBe(
      '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex"> a</annotation></semantics></math>',
    );
  });

  it('code block', () => {
    expect(marked.parse('    $$a$$')).toBe(`<pre><code>$$a$$
</code></pre>
`);

    expect(marked.parse('```\n$$\na\n$$\n```')).toBe('<pre><code>$$\na\n$$\n</code></pre>\n');
  });
});
