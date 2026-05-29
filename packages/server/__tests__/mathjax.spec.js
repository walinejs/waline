import MarkdownIt from 'markdown-it';
import { describe, expect, it } from 'vitest';

import { mathjaxPlugin } from '../src/service/markdown/mathjax';

describe('mathjax markdown plugin', () => {
  it('should register and render without handler errors', () => {
    const md = new MarkdownIt({ html: true });

    expect(() => md.use(mathjaxPlugin)).not.toThrow();

    expect(md.render('$$x^2$$')).toContain('<svg');
  });
});
