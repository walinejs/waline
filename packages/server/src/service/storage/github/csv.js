'use strict';

/**
 * Minimal RFC 4180 codec for shard and manifest files.
 *
 * Shards are parsed and serialised synchronously on every read and write, while
 * the CSV dependency of this package (fast-csv) is stream based. This module
 * therefore covers exactly the option subset the store passes, in place of the
 * csv-parse / csv-stringify pair, and reproduces their behaviour for it —
 * including two details that are easy to get wrong:
 *
 *   - a cell is quoted only when it holds the record delimiter, `,` or `"`.
 *     A lone CR therefore stays unquoted, exactly as csv-stringify writes it;
 *   - the record delimiter is detected from the first line ending, exactly as
 *     csv-parse does when `record_delimiter` is not given. In an LF file a lone
 *     CR inside a cell is data, not a line break — treating it as one would
 *     split rows written by csv-stringify and silently corrupt them.
 */

const DELIMITER = ',';
const QUOTE = '"';
const BOM = 0xfe_ff;

/**
 * The delimiter that separates records, detected from the first line ending.
 *
 * Files written by the store always use `\n`; `\r\n` and lone `\r` are accepted
 * so a hand-edited file keeps its own convention instead of mixing the two.
 */
const detectRecordDelimiter = (text) => {
  const index = text.search(/[\r\n]/u);

  if (index === -1 || text[index] === '\n') {
    return '\n';
  }

  return text[index + 1] === '\n' ? '\r\n' : '\r';
};

// Render one cell, quoting only when the value would otherwise be ambiguous.
const toField = (value, recordDelimiter) => {
  const text = value === undefined || value === null ? '' : String(value);
  const mustQuote =
    text.includes(recordDelimiter) || text.includes(DELIMITER) || text.includes(QUOTE);

  return mustQuote ? `${QUOTE}${text.replaceAll(QUOTE, QUOTE + QUOTE)}${QUOTE}` : text;
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
  const field = (value) => toField(value, record_delimiter);

  if (header && fields.length > 0) {
    lines.push(fields.map(field).join(DELIMITER));
  }
  for (const row of list) {
    lines.push(fields.map((column) => field(row[column])).join(DELIMITER));
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
  const recordDelimiter = detectRecordDelimiter(text);
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
    } else if (text.startsWith(recordDelimiter, index)) {
      index += recordDelimiter.length;
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

module.exports = { parse, stringify };
