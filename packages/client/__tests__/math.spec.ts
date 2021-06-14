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

    expect(parseMath('$-$')).toEqual(
      '<span class="vtex">Tex is not available in preview</span>'
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

    expect(parseMath('$-\\sqrt{x}$')).toEqual(
      '<span class="vtex">Tex is not available in preview</span>'
    );

    expect(parseMath('$-\\sqrt{x}$ is at beginning')).toEqual(
      '<span class="vtex">Tex is not available in preview</span> is at beginning'
    );

    expect(parseMath('Here ends a single tex $-\\sqrt{x}$')).toEqual(
      'Here ends a single tex <span class="vtex">Tex is not available in preview</span>'
    );
  });
});

describe('Should parse block tex', () => {
  it('Beginning and ending', () => {
    expect(parseMath('$$\na\n$$')).toEqual(
      '<p class="vtex">Tex is not available in preview</p>'
    );

    expect(parseMath('\n$$\na\n$$')).toEqual(
      '<p class="vtex">Tex is not available in preview</p>'
    );

    expect(parseMath('$$\na\n$$\n')).toEqual(
      '<p class="vtex">Tex is not available in preview</p>'
    );

    expect(parseMath('\n$$\na\n$$\n')).toEqual(
      '<p class="vtex">Tex is not available in preview</p>'
    );
  });

  it('Only Beginning', () => {
    expect(
      parseMath(
        '$$\na\n$$\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      )
    ).toEqual(
      '<p class="vtex">Tex is not available in preview</p>\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );
  });

  it('Only Ending', () => {
    expect(parseMath('Lorem ipsum dolor sit amet.\n\n$$\na\n$$')).toEqual(
      'Lorem ipsum dolor sit amet.\n<p class="vtex">Tex is not available in preview</p>'
    );
  });

  it('Inside', () => {
    expect(
      parseMath(
        'Lorem ipsum dolor sit amet\n\n$$\na\n$$\n\nconsectetur adipiscing elit'
      )
    ).toEqual(
      'Lorem ipsum dolor sit amet\n<p class="vtex">Tex is not available in preview</p>\nconsectetur adipiscing elit'
    );

    expect(
      parseMath(
        'Lorem ipsum dolor sit amet\n\n$$\na\n$$\n\n$$-\\sqrt{x}$$\n\nconsectetur adipiscing elit'
      )
    ).toEqual(
      'Lorem ipsum dolor sit amet\n<p class="vtex">Tex is not available in preview</p><p class="vtex">Tex is not available in preview</p>\nconsectetur adipiscing elit'
    );
  });
});
