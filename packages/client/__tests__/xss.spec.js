import { emojiCDN, emojiMaps, getMarkdownParser } from '../src/utils';

const ctx = { emojiCDN, emojiMaps };
const parser = getMarkdownParser(false, ctx);

describe('XSS test', () => {
  it('Should render', () => {
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

  it('Should protect', () => {
    expect(parser(`<img src="x" onerror="alert('img')">`)).toEqual(
      '<img src="x">'
    );
    expect(parser('<script>alert("hello world")</script>')).toEqual('');

    expect(
      parser(
        '<p>Waline is <iframe//src=jaVa&Tab;script:alert(3)></iframe>awesome</p>'
      )
    ).toEqual('<p>Waline is awesome</p>');

    expect(
      parser('<p>Waline is <iframe//src=jaVa&Tab;script:alert(3)>awesome</p>')
    ).toEqual('<p>Waline is </p>');
  });

  it('Should resolve unmatching html tags', () => {
    expect(parser('<TABLE><tr><td>HELLO</a></TAB>\n<p>Waline</p>')).toEqual(
      '<table><tbody><tr><td>HELLO\n<p>Waline</p></td></tr></tbody></table>'
    );
  });

  it('Should not autoplay or preload media', () => {
    expect(parser('<audio autoplay preload="auto" src="x">')).toEqual(
      '<audio src="x" preload="none"></audio>'
    );
    expect(parser('<audio autoplay src="x"></audio>')).toEqual(
      '<p><audio src="x" preload="none"></audio></p>\n'
    );

    expect(parser('<video autoplay preload="auto" src="x">')).toEqual(
      '<video src="x" preload="none"></video>'
    );
    expect(parser('<video autoplay src="x"></video>')).toEqual(
      '<p><video src="x" preload="none"></video></p>\n'
    );
  });

  it('Should resolve links', () => {
    expect(parser('[link](https://example.com)')).toEqual(
      '<p><a href="https://example.com" target="_blank" rel="noreferrer noopener">link</a></p>\n'
    );
    expect(
      parser(
        '<p><a href="https://example.com" rel="opener prefetch">link</a></p>'
      )
    ).toEqual(
      '<p><a rel="noreferrer noopener" href="https://example.com" target="_blank">link</a></p>'
    );
  });

  it('Should forbid forms and inputs', () => {
    expect(parser('<form></form>')).toEqual('');
    expect(parser('<input type="password" autocomplete>')).toEqual('');
  });

  it('Should forbid style', () => {
    expect(
      parser(
        '<div style="position:fixed;top:0;left:0;width:100vh;height:100vh;">广告文字</div>'
      )
    ).toEqual('<div>广告文字</div>');
    expect(
      parser(
        '<div id="ad">广告文字</div><style>#ad{position:fixed;top:0;left:0;width:100vh;height:100vh;}</style>'
      )
    ).toEqual('<div id="ad">广告文字</div>');
  });
});
