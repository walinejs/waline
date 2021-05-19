import { defaultEmojiCDN, defaultEmojiMaps } from '../src/config';
import { parseEmoji } from '../src/utils';

describe('Emoji test', () => {
  it('Should not parse', () => {
    const content = 'Waline is a good framework. Note: It works with backend';

    expect(parseEmoji(content, defaultEmojiMaps, defaultEmojiCDN)).toEqual(
      content
    );
  });

  it("Should not parse emoji it don't know", () => {
    const content = 'Waline is a good framework. :heart:';

    expect(parseEmoji(content, defaultEmojiMaps, defaultEmojiCDN)).toEqual(
      content
    );
  });

  it('Should parse emoji', () => {
    expect(
      parseEmoji(
        'Waline is a good framework. :money:',
        defaultEmojiMaps,
        defaultEmojiCDN
      )
    ).toEqual(
      'Waline is a good framework. <img class="vemoji" src="https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a2/2018new_qian_thumb.png" alt="money">'
    );
  });

  it('Should not throw errows', () => {
    expect(parseEmoji());
    expect(parseEmoji(''));
  });
});
