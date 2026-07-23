import { beforeAll, describe, expect, it } from 'vitest';

import { getMarkdownParser } from '../src/service/markdown/index';

describe('markdown parser', () => {
  let parser;

  // oxlint-disable-next-line vitest/no-hooks
  beforeAll(async () => {
    parser = await getMarkdownParser();
  });
  it('should render basic markdown', () => {
    const result = parser('**bold** and *italic* and `code`');

    expect(result).toContain('<strong>bold</strong>');
    expect(result).toContain('<em>italic</em>');
    expect(result).toContain('<code>code</code>');
  });

  it('should render links with target=_blank', () => {
    const result = parser('[example](https://example.com)');

    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="ugc nofollow noreferrer noopener"');
  });

  it('should auto-linkify URLs', () => {
    const result = parser('https://example.com');

    expect(result).toContain('<a href="https://example.com"');
  });

  it('should render emoji', () => {
    const result = parser(':smile:');

    expect(result).toContain('😄');
  });

  it('should render sub and sup', () => {
    const subResult = parser('H~2~O');

    expect(subResult).toContain('<sub>2</sub>');

    const supResult = parser('X^2^');

    expect(supResult).toContain('<sup>2</sup>');
  });

  it('should render lists', () => {
    const result = parser('- item1\n- item2\n');

    expect(result).toContain('<ul>');
    expect(result).toContain('<li>item1</li>');
    expect(result).toContain('<li>item2</li>');
  });

  describe('html handling', () => {
    it('should preserve safe html', () => {
      const result = parser('<div>hello</div>');

      expect(result).toContain('<div>hello</div>');
    });

    it('should strip form tags', () => {
      const result = parser('<form><input type="text"></form>');

      expect(result).not.toContain('<form');
      expect(result).not.toContain('<input');
    });

    it('should strip style tags', () => {
      const result = parser('<style>body { color: red; }</style>');

      expect(result).not.toContain('<style');
    });

    it('should strip style attribute', () => {
      const result = parser('<span style="color:red">text</span>');

      expect(result).not.toContain('style=');
    });
  });

  describe('code highlighting', () => {
    it('should highlight known languages', () => {
      const result = parser('```js\nconst x = 1;\n```');

      expect(result).toContain('token');
    });

    it('should not highlight unknown languages', () => {
      const result = parser('```unknown\nsome code\n```');

      expect(result).toContain('<code class="language-unknown">some code\n</code>');
    });

    it('should handle fence without language', () => {
      const result = parser('```\nplain text\n```');

      expect(result).toContain('<pre><code>plain text\n</code></pre>');
    });
  });

  describe('tex rendering', () => {
    it('should render inline math', () => {
      const result = parser('$x + y$');

      expect(result).toContain('svg');
    });

    it('should render block math', () => {
      const result = parser('$$\nx + y\n$$');

      expect(result).toContain('svg');
    });
  });
});
