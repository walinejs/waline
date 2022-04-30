import { getWords, getChinese, getWordNumber } from '../src/utils/wordCount';

describe('Words test', () => {
  it('Should count emplty content correctly', () => {
    expect(getWordNumber('')).toEqual(0);
  });
  it('Should count english words correctly', () => {
    expect(
      getWordNumber(
        'A simple comment system with backend support fork from Valine'
      )
    ).toEqual(10);
  });

  it('Should pick chinese words correctly', () => {
    const chineseWords = getChinese(
      'Waline - 一款从 Valine 衍生的带后端评论系统。可以将 Waline 等价成 With backend Valine.'
    );

    expect(chineseWords.join('')).toEqual(
      '一款从衍生的带后端评论系统可以将等价成'
    );
  });

  it('Should count word correctly', () => {
    expect(
      getWordNumber(
        'A simple comment system, with backend support fork from Valine.'
      )
    ).toEqual(10);

    expect(
      getWordNumber(
        'Waline - 一款从 Valine 衍生的带后端评论系统。可以将 Waline 等价成 With backend Valine.'
      )
    ).toEqual(25);
  });

  it('Should omit other characters in Markdown', () => {
    expect(getWordNumber('#$%^\t&*% /?=+[\n{|}]\r')).toEqual(0);

    expect(
      getWordNumber(
        '\nA simple comment system,\n\n with _backend support_ fork from **Valine**.\n'
      )
    ).toEqual(10);

    expect(
      getWordNumber(
        'Waline - 一款从 **Valine** 衍生的带后端评论系统。\n\n可以将 Waline 等价成 _With backend Valine_.'
      )
    ).toEqual(25);
  });

  it('Addtional counts with Markdown links and images', () => {
    const linkAddress = '//unpkg.com/@waline/client/dist/Waline.min.js';
    const linkMarkdown = `You can found Waline [here](${linkAddress}).`;
    const imageMarkdown = `Here is a image.\n\n![Alt](https://a/fake/link)`;

    const linkWords = getWords(linkAddress)
      .map((word) => word.trim())
      .filter((word) => word);

    expect(linkWords).toEqual([
      'unpkg',
      'com',
      'waline',
      'client',
      'dist',
      'Waline',
      'min',
      'js',
    ]);

    expect(getWordNumber(linkAddress)).toEqual(8);
    expect(getWordNumber(linkMarkdown)).toEqual(13);
    expect(getWordNumber(imageMarkdown)).toEqual(9);
  });

  it('Can count code block', () => {
    const codeBlock = `
\`\`\`html
<head>
  <!-- ... -->
  <script src="https://unpkg.com/@waline/client"></script>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@waline/client@v2/dist/waline.css"
  />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script>
    Waline.init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
\`\`\`
`;

    const codeBlockwords = getWords(codeBlock)
      .map((word) => word.trim())
      .filter((word) => word);

    expect(codeBlockwords).toEqual([
      'html',
      'head',
      'script src',
      'https',
      'unpkg',
      'com',
      'waline',
      'client',
      'script',
      'link\n    rel',
      'stylesheet',
      'href',
      'https',
      'unpkg',
      'com',
      'waline',
      'client',
      'v2',
      'dist',
      'waline',
      'css',
      'head',
      'body',
      'div id',
      'waline',
      'div',
      'script',
      'Waline',
      'init',
      'el',
      'waline',
      'serverURL',
      'https',
      'your',
      'domain',
      'vercel',
      'app',
      'script',
      'body',
    ]);

    expect(getWordNumber(codeBlock)).toEqual(42);
  });
});
