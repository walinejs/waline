import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const { parse, stringify } = require('../src/service/storage/github/csv.js');

const PARSE_OPTIONS = {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true,
  bom: true,
};

describe('sharded store CSV codec', () => {
  it('quotes only cells that would otherwise be ambiguous', () => {
    expect(
      stringify([{ a: 'plain', b: 'with,comma', c: 'say "hi"', d: 'two\nlines' }], {
        header: true,
        columns: ['a', 'b', 'c', 'd'],
        record_delimiter: '\n',
        quoted: false,
      }),
    ).toBe('a,b,c,d\nplain,"with,comma","say ""hi""","two\nlines"\n');

    expect(stringify([{ a: '  padded  ', b: 'tab\there' }], {
      header: true,
      columns: ['a', 'b'],
      record_delimiter: '\n',
      quoted: false,
    })).toBe('a,b\n  padded  ,tab\there\n');
  });

  it('writes a header even when there are no rows', () => {
    expect(stringify([], { header: true, columns: ['a', 'b'], record_delimiter: '\n' })).toBe(
      'a,b\n',
    );
  });

  it('round-trips a shard with quotes, commas and newlines', () => {
    const rows = [
      {
        objectId: 'abc',
        comment: '第一行，带"引号"\n和换行',
        insertedAt: '2026-09-25T10:00:00.000Z',
        nick: 'Alice',
      },
    ];
    const columns = Object.keys(rows[0]);
    const text = stringify(rows, { header: true, columns, record_delimiter: '\n', quoted: false });

    expect(parse(text, PARSE_OPTIONS)).toStrictEqual(rows);
  });

  it('tolerates a BOM, blank lines and rows with a different cell count', () => {
    expect(parse('\uFEFFa,b\n\n1,2\n\n3\n4,5,6\n', PARSE_OPTIONS)).toStrictEqual([
      { a: '1', b: '2' },
      { a: '3' },
      // Cells without a column name are dropped, like relax_column_count does
      { a: '4', b: '5' },
    ]);
  });

  it('keeps a row whose single cell is an explicitly quoted empty string', () => {
    expect(parse('a,b\n""\n', PARSE_OPTIONS)).toStrictEqual([{ a: '' }]);
  });

  it('treats a lone CR inside a cell as data, not as a line break', () => {
    const rows = [{ objectId: 'a1', comment: 'has\rcr' }];
    const text = stringify(rows, {
      header: true,
      columns: ['objectId', 'comment'],
      record_delimiter: '\n',
      quoted: false,
    });

    // Same bytes csv-stringify produces: a lone CR is not quoted in an LF file
    expect(text).toBe('objectId,comment\na1,has\rcr\n');
    expect(parse(text, PARSE_OPTIONS)).toStrictEqual(rows);

    // A trailing CR in the last column survives, and genuinely CR-delimited
    // files still parse
    expect(parse('a,b\nx,y\r\n', PARSE_OPTIONS)).toStrictEqual([{ a: 'x', b: 'y\r' }]);
    expect(parse('a,b\r1,2\r', PARSE_OPTIONS)).toStrictEqual([{ a: '1', b: '2' }]);
  });

  it('casts values the way csv-stringify does', () => {
    const write = (row) =>
      stringify([row], { header: true, columns: ['a'], record_delimiter: '\n' });

    // Date to epoch milliseconds, boolean to 1 / empty, object to JSON
    expect(write({ a: new Date('2026-09-25T10:00:00.000Z') })).toBe('a\n1790330400000\n');
    expect(write({ a: true })).toBe('a\n1\n');
    expect(write({ a: false })).toBe('a\n\n');
    expect(write({ a: { n: 1 } })).toBe('a\n"{""n"":1}"\n');
    expect(write({ a: null })).toBe('a\n\n');
    expect(write({ a: 1.5 })).toBe('a\n1.5\n');
  });

  it('honours the quoted, quoted_empty, quoted_string and quoted_match options', () => {
    const write = (row, options) =>
      stringify([row], {
        header: true,
        columns: ['a', 'b'],
        record_delimiter: '\n',
        ...options,
      });

    expect(write({ a: 'x', b: '' }, { quoted: true })).toBe('"a","b"\n"x",\n');
    expect(write({ a: 'x', b: '' }, { quoted_empty: true })).toBe('a,b\nx,""\n');
    expect(write({ a: 'x', b: 42 }, { quoted_string: true })).toBe('"a","b"\n"x",42\n');
    expect(write({ a: 'ab', b: 'cd' }, { quoted_match: 'a' })).toBe('"a",b\n"ab",cd\n');
    expect(write({ a: 'ab', b: 'cd' }, { quoted_match: /b/u })).toBe('a,"b"\n"ab",cd\n');
  });

  it('rejects malformed CSV with the csv-parse error codes', () => {
    const codeOf = (input, options = PARSE_OPTIONS) => {
      try {
        parse(input, options);

        return null;
      } catch (err) {
        return err.code;
      }
    };

    expect(codeOf('a,b\nx"y,z\n')).toBe('INVALID_OPENING_QUOTE');
    expect(codeOf('a,b\n"x"y,z\n')).toBe('CSV_INVALID_CLOSING_QUOTE');
    expect(codeOf('a,b\n"oops\n')).toBe('CSV_QUOTE_NOT_CLOSED');
    // Cell count is only validated when the caller asks for it
    expect(codeOf('a,b\n1,2,3\n', { columns: true })).toBe('CSV_RECORD_INCONSISTENT_COLUMNS');
    expect(codeOf('a,b\n1,2,3\n')).toBe(null);
  });
});
