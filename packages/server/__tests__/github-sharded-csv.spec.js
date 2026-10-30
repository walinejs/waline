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
});
