import { describe, expect, it } from 'vitest';

import { getChinese, getWordNumber, getWords } from '../src/utils/wordCount.js';

describe('words test', () => {
  it('should count empty content correctly', () => {
    expect(getWordNumber('')).toBe(0);
  });

  it('should count english words correctly', () => {
    expect(getWordNumber('A simple comment system with backend support fork from Valine')).toBe(10);
  });

  it('should pick chinese words correctly', () => {
    const chineseWords = getChinese(
      'Waline - 一款从 Valine 衍生的带后端评论系统。可以将 Waline 等价成 With backend Valine.',
    )!;

    expect(chineseWords.join('')).toBe('一款从衍生的带后端评论系统可以将等价成');
  });

  it('should count word correctly', () => {
    expect(getWordNumber('A simple comment system, with backend support fork from Valine.')).toBe(
      10,
    );

    expect(
      getWordNumber(
        'Waline - 一款从 Valine 衍生的带后端评论系统。可以将 Waline 等价成 With backend Valine.',
      ),
    ).toBe(25);
  });

  it('should omit other characters in Markdown', () => {
    expect(getWordNumber('#$%^\t&*% /?=+[\n{|}]\r')).toBe(0);

    expect(
      getWordNumber(
        '\nA simple comment system,\n\n with _backend support_ fork from **Valine**.\n',
      ),
    ).toBe(10);

    expect(
      getWordNumber(
        'Waline - 一款从 **Valine** 衍生的带后端评论系统。\n\n可以将 Waline 等价成 _With backend Valine_.',
      ),
    ).toBe(25);
  });

  it('additional counts with Markdown links and images', () => {
    const linkAddress = '//unpkg.com/@waline/client/dist/Waline.min.js';
    const linkMarkdown = `You can found Waline [here](${linkAddress}).`;
    const imageMarkdown = `Here is a image.\n\n![Alt](https://a/fake/link)`;

    const linkWords = getWords(linkAddress)!
      .map((word) => word.trim())
      .filter(Boolean);

    expect(linkWords).toStrictEqual(['unpkg.com', 'waline', 'client', 'dist', 'Waline.min.js']);

    expect(getWordNumber(linkAddress)).toBe(5);
    expect(getWordNumber(linkMarkdown)).toBe(10);
    expect(getWordNumber(imageMarkdown)).toBe(9);
  });

  it('can count code block', () => {
    const codeBlock = `
\`\`\`html
<head>
  <!-- ... -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/@waline/client@v3/dist/waline.css"
  />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
\`\`\`
`;

    const codeBlockWords = getWords(codeBlock)!
      .map((word) => word.trim())
      .filter(Boolean);

    expect(codeBlockWords).toStrictEqual([
      'html',
      'head',
      '...',
      'link\n    rel',
      'stylesheet',
      'href',
      'https',
      'unpkg.com',
      'waline',
      'client',
      'v3',
      'dist',
      'waline.css',
      '...',
      'head',
      'body',
      '...',
      'div id',
      'waline',
      'div',
      'script type',
      'module',
      'import',
      'init',
      'from',
      'https',
      'unpkg.com',
      'waline',
      'client',
      'v3',
      'dist',
      'waline.js',
      'init',
      'el',
      'waline',
      `,
      serverURL`,
      'https',
      'your',
      'domain.vercel.app',
      ',',
      'script',
      'body',
    ]);

    expect(getWordNumber(codeBlock)).toBe(45);
  });
});
