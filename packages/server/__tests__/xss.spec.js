import MarkdownIt from 'markdown-it';
import { describe, expect, it } from 'vitest';

import { sanitize } from '../src/service/markdown/xss';

const parser = (content) => sanitize(new MarkdownIt({ html: true }).render(content));

describe('avoid XSS', () => {
  it('should render', () => {
    const content = `
Waline is a good framework. :money:

## 特性

- 快速
- 真·安全
- Markdown 语法支持
- 轻量易用
- 免费部署
- 多种部署部署方式和存储服务支持，每列选择一项多达 48 种部署方式任君选择

|                | Waline         |              |
| -------------- | -------------- | ------------ |
| **客户端脚本** | **服务端部署** | **数据存储** |
| @waline/client | Vercel         | LeanCloud    |
| MiniValine     | CloudBase      | CloudBase    |
|                | Docker         | MongoDB      |
|                | 独立部署       | MySQL        |
|                |                | SQLite       |
|                |                | PostgreSQL   |
|                |                | GitHub       |
`;

    expect(parser(content)).toMatchSnapshot();
  });

  it('should protect', () => {
    expect(parser(`<img src="x" onerror="alert('img')">`)).toBe('<img src="x">');
    expect(parser('<script>alert("hello world")</script>')).toBe('');

    expect(parser('<p>Waline is <iframe//src=jaVa&Tab;script:alert(3)></iframe>awesome</p>')).toBe(
      '<p>Waline is awesome</p>',
    );

    expect(parser('<p>Waline is <iframe//src=jaVa&Tab;script:alert(3)>awesome</p>')).toBe(
      '<p>Waline is </p>',
    );
  });

  it('should resolve unmatching html tags', () => {
    expect(parser('<TABLE><tr><td>HELLO</a></TAB>\n<p>Waline</p>')).toBe(
      '<table><tbody><tr><td>HELLO\n<p>Waline</p></td></tr></tbody></table>',
    );
  });

  it('should not autoplay or preload media', () => {
    expect(parser('<audio autoplay preload="auto" src="x">')).toBe(
      '<audio preload="none" src="x"></audio>',
    );
    expect(parser('<audio autoplay src="x"></audio>')).toBe(
      '<p><audio src="x" preload="none"></audio></p>\n',
    );

    expect(parser('<video autoplay preload="auto" src="x">')).toBe(
      '<video preload="none" src="x"></video>',
    );
    expect(parser('<video autoplay src="x"></video>')).toBe(
      '<p><video src="x" preload="none"></video></p>\n',
    );
  });

  it('should resolve links', () => {
    expect(parser('[link](https://example.com)')).toBe(
      '<p><a href="https://example.com" target="_blank" rel="ugc nofollow noreferrer noopener">link</a></p>\n',
    );
    expect(parser('<p><a href="https://example.com" rel="opener prefetch">link</a></p>')).toBe(
      '<p><a href="https://example.com" rel="ugc nofollow noreferrer noopener" target="_blank">link</a></p>',
    );
  });

  it('should forbid forms and inputs', () => {
    expect(parser('<form></form>')).toBe('');
    expect(parser('<input type="password" autocomplete>')).toBe('');
  });

  it('should forbid style', () => {
    expect(
      parser('<div style="position:fixed;top:0;left:0;width:100vh;height:100vh;">广告文字</div>'),
    ).toBe('<div>广告文字</div>');
    expect(
      parser(
        '<div id="ad">广告文字</div><style>#ad{position:fixed;top:0;left:0;width:100vh;height:100vh;}</style>',
      ),
    ).toBe('<div id="ad">广告文字</div>');
  });
});
