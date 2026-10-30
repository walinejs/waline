'use strict';

/**
 * Minimal RFC 4180 codec for shard and manifest files.
 *
 * Shards are parsed and serialised on every read and write, and the sharded
 * store does that synchronously, while the CSV dependency of this package
 * (fast-csv) is stream based. This module therefore covers exactly the option
 * subset the store passes, and reproduces csv-parse / csv-stringify output for
 * it:
 *   - LF as record delimiter, quoting only when a cell holds `,` `"` CR or LF;
 *   - a header row on every file, columns taken from the caller or the first row;
 *   - parsing tolerates a BOM, blank lines, and rows whose cell count differs
 *     from the header (extra cells dropped, missing cells left absent).
 */

const DELIMITER = ',';
const QUOTE = '"';
const NEEDS_QUOTE = /[",\r\n]/u;
const BOM = 0xfe_ff;

// Render one cell, quoting only when the value would otherwise be ambiguous.
const toField = (value) => {
  const text = value === undefined || value === null ? '' : String(value);

  return NEEDS_QUOTE.test(text)
    ? `${QUOTE}${text.replaceAll(QUOTE, QUOTE + QUOTE)}${QUOTE}`
    : text;
};

/**
 * Serialise rows into CSV text.
 *
 * @param {Iterable<object>} rows
 * @param {object} options
 * @param {boolean} options.header Emit the header row.
 * @param {string[]} options.columns Column order; defaults to the first row's keys.
 * @param {string} options.record_delimiter
 */
function stringify(rows, { header = false, columns = null, record_delimiter = '\n' } = {}) {
  const list = [...rows];
  const fields = columns ?? (list.length > 0 ? Object.keys(list[0]) : []);
  const lines = [];

  if (header && fields.length > 0) {
    lines.push(fields.map(toField).join(DELIMITER));
  }
  for (const row of list) {
    lines.push(fields.map((field) => toField(row[field])).join(DELIMITER));
  }

  return lines.length === 0 ? '' : `${lines.join(record_delimiter)}${record_delimiter}`;
}

/**
 * Split raw CSV text into records.
 *
 * Quoted cells may contain the record delimiter, so this cannot be a line-based
 * split: the only way in is a character scan that tracks quote state.
 *
 * @returns {{cells: string[], blank: boolean}[]} `blank` marks a genuinely empty
 *   line, which is what skip_empty_lines drops; a quoted empty cell is data.
 */
function splitRecords(text) {
  const records = [];
  let row = [];
  let field = '';
  let quoted = false;
  let quotedAt = false;
  let index = 0;

  const endRow = () => {
    row.push(field);
    // A line holding only `""` is a row with one empty cell, not a blank line,
    // and skipping it would silently drop data on round trip
    records.push({ cells: row, blank: !quotedAt && row.length === 1 && row[0] === '' });
    row = [];
    field = '';
    quotedAt = false;
  };

  while (index < text.length) {
    const char = text[index];

    if (quoted) {
      if (char !== QUOTE) {
        field += char;
        index += 1;
      } else if (text[index + 1] === QUOTE) {
        // A doubled quote inside a quoted cell is one literal quote
        field += QUOTE;
        index += 2;
      } else {
        quoted = false;
        index += 1;
      }
      continue;
    }

    if (char === QUOTE && field === '') {
      quoted = true;
      quotedAt = true;
      index += 1;
    } else if (char === DELIMITER) {
      row.push(field);
      field = '';
      index += 1;
    } else if (char === '\r' || char === '\n') {
      // CRLF counts as one delimiter, which also covers hand-edited files
      index += char === '\r' && text[index + 1] === '\n' ? 2 : 1;
      endRow();
    } else {
      field += char;
      index += 1;
    }
  }

  if (field !== '' || row.length > 0) {
    endRow();
  }

  return records;
}

/**
 * Parse CSV text into objects keyed by the header row.
 *
 * @param {string} text
 * @param {object} options
 * @param {boolean|string[]} options.columns Read the header from the first row
 *   (`true`) or use the given column names.
 * @param {boolean} options.skip_empty_lines
 * @param {boolean} options.bom Strip a leading byte order mark.
 * @returns {object[]}
 */
function parse(text, { columns = false, skip_empty_lines = false, bom = false } = {}) {
  const input = bom && text.charCodeAt(0) === BOM ? text.slice(1) : text;
  let records = splitRecords(input);

  if (skip_empty_lines) {
    records = records.filter((record) => !record.blank);
  }
  if (!columns) {
    return records.map((record) => record.cells);
  }

  const [head = { cells: [] }, ...body] = records;
  const fields = Array.isArray(columns) ? columns : head.cells;

  // Cells without a column name are dropped, and short rows simply lack the
  // trailing keys, which is what csv-parse's relax_column_count produces
  return body.map(({ cells }) => {
    const row = {};

    fields.forEach((field, position) => {
      if (position < cells.length) {
        row[field] = cells[position];
      }
    });

    return row;
  });
}

module.exports = { parse, stringify, splitRecords };
