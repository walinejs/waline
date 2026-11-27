// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';

import { parseMarkdown } from '../src/utils/markdown.js';

const options = { emojiMap: {}, highlighter: null, texRenderer: null };

describe('comment Markdown preview', () => {
  it('removes disallowed markup before rendering comment HTML', () => {
    const html = parseMarkdown(
      '<form><input></form>\n\n<span onclick="" style="color:red">Comment</span>',
      options,
    );

    expect(html).not.toContain('<form');
    expect(html).not.toContain('<input');
    expect(html).not.toContain('style=');
    expect(html).not.toContain('onclick=');
    expect(html).toContain('<span>Comment</span>');
  });

  it('preserves ordinary Markdown formatting and links', () => {
    const html = parseMarkdown('**Comment** [link](https://example.com/)', options);

    expect(html).toContain('<strong>Comment</strong>');
    expect(html).toContain('<a href="https://example.com/">link</a>');
  });
});
