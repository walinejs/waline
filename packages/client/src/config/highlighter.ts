/**
 * The MIT License (MIT)
 *
 * Copyright (c) egoist <0x142857@gmail.com> (https://egoistian.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

const WORD_REGEXP =
  /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/;
const LEFT_ANGLE_REGEXP = /</;
const LINE_COMMENT_REGEXP = /(?:^|\s)\/\/(.+?)$/gm;
const BLOCK_COMMENT_REGEXP = /\/\*([\S\s]*?)\*\//gm;
const REGEXP = new RegExp(
  `(${WORD_REGEXP.source}|${LEFT_ANGLE_REGEXP.source})|((?:${LINE_COMMENT_REGEXP.source})|(?:${BLOCK_COMMENT_REGEXP.source}))`,
  'gmi'
);

const COLORS = [
  '23AC69',
  '91C132',
  'F19726',
  'E8552D',
  '1AAB8E',
  'E1147F',
  '2980C1',
  '1BA1E6',
  '9FA0A0',
  'F19726',
  'E30B20',
  'E30B20',
  'A3338B',
];
const cache: Record<string, string> = {};

export const defaultHighlighter = (input: string): string => {
  let index = 0;

  return input.replace(REGEXP, (_match, word: string, comment: string) => {
    if (comment) return `<span style="color: slategray">${comment}</span>`;
    if (word === '<') return '&lt;';

    let color: string;

    if (cache[word]) color = cache[word];
    else {
      color = COLORS[index];
      cache[word] = color;
    }

    const out = `<span style="color: #${color}">${word}</span>`;

    index = ++index % COLORS.length;

    return out;
  });
};
