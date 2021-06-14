import { parseMath } from '../src/utils/markdown';

describe('Should parse inline tex', () => {
  it('Single word', () => {
    expect(parseMath('$a$')).toEqual(
      '<span class="vtex">Tex is not available in preview</span>'
    );

    expect(parseMath('$a$ is at beginning')).toEqual(
      '<span class="vtex">Tex is not available in preview</span> is at beginning'
    );

    expect(parseMath('Here ends a single tex $a$')).toEqual(
      'Here ends a single tex <span class="vtex">Tex is not available in preview</span>'
    );

    expect(parseMath('Here is a single tex $a$ in the sentence')).toEqual(
      'Here is a single tex <span class="vtex">Tex is not available in preview</span> in the sentence'
    );
  });

  it('Mutiple word', () => {
    expect(parseMath('$a = 1$')).toEqual(
      '<span class="vtex">Tex is not available in preview</span>'
    );

    expect(parseMath('$a = 1$ is at beginning')).toEqual(
      '<span class="vtex">Tex is not available in preview</span> is at beginning'
    );

    expect(parseMath('Here ends a single tex $a = 1$')).toEqual(
      'Here ends a single tex <span class="vtex">Tex is not available in preview</span>'
    );

    expect(parseMath('Here is a single tex $a = 1$ in the sentence')).toEqual(
      'Here is a single tex <span class="vtex">Tex is not available in preview</span> in the sentence'
    );
  });
});

describe('Should parse block tex', () => {
  it('Beginning and ending', () => {
    expect(parseMath('$$\na\n$$')).toEqual(
      '<p class="vtex">Tex is not available in preview</p>'
    );
  });

  it('Only Beginning', () => {
    expect(
      parseMath(
        '$$\na\n$$\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      )
    ).toEqual(
      '<p class="vtex">Tex is not available in preview</p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
    );
  });
});
