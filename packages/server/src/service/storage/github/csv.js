'use strict';

/**
 * Synchronous CSV codec for shard and manifest files.
 *
 * Diff:   the original implementation used the `csv-parse/sync` and
 *         `csv-stringify/sync` packages — `parse()` for shards and manifests,
 *         `stringify()` for both.
 * Patch:  this module reimplements the option subset the store passes, plus the
 *         conversions and validation the original libraries perform, so that
 *         neither package has to be added. Each section below records its own
 *         delta.
 * Reason: @waline/vercel is published from source with no build step, so two
 *         more runtime packages would ship to every deployment for a single
 *         synchronous codec. fast-csv, already a dependency for the legacy
 *         storage, cannot stand in: its API is stream based while shard reads
 *         and writes are synchronous.
 *
 * Supported options
 *   parse:      columns, delimiter, record_delimiter, skip_empty_lines,
 *               relax_column_count, bom
 *   stringify:  header, columns, record_delimiter, delimiter, quoted,
 *               quoted_empty, quoted_string, quoted_match
 * Deliberately unsupported, because the store never passes them and each would
 * need its own validation: `quote`, `escape`, `cast`, `trim` / `ltrim` /
 * `rtrim`, `comment`, `max_rows`, `group_columns_by_name`.
 */

const QUOTE = '"';
const BOM = 0xfe_ff;

// Same shape csv-parse throws: a CsvError with a machine readable `code`.
class CsvError extends Error {
  constructor(code, message, lines) {
    super(message);
    this.code = code;
    this.lines = lines;
  }
}

/**
 * Resolve the record delimiter.
 *
 * Diff:   csv-parse detects the delimiter from the first line ending when
 *         `record_delimiter` is not given, so a lone CR inside a cell of an LF
 *         file is content rather than a line break.
 * Patch:  the same detection is reproduced here; an explicit
 *         `record_delimiter` still wins.
 * Reason: treating every CR as a line break split rows written by
 *         csv-stringify and would have corrupted them on the next rewrite.
 */
const resolveRecordDelimiter = (text, option) => {
  if (option) {
    return option;
  }

  const index = text.search(/[\r\n]/u);

  if (index === -1 || text[index] === '\n') {
    return '\n';
  }

  return text[index + 1] === '\n' ? '\r\n' : '\r';
};

/**
 * Render one value the way csv-stringify casts it by default.
 *
 * Diff:   csv-stringify casts a Date to its epoch milliseconds, a boolean to
 *         `1` / empty, and an object to JSON; null and undefined become an
 *         empty cell.
 * Patch:  the same conversions, applied before quoting is decided.
 * Reason: shard bytes must stay identical to what the original writer produced.
 *         Rows built by the store arrive as strings through toCell(), so this
 *         only matters for values passed straight to the codec.
 */
const castValue = (value) => {
  if (value === undefined || value === null) {
    return '';
  }
  if (value instanceof Date) {
    return String(value.getTime());
  }
  if (typeof value === 'boolean') {
    return value ? '1' : '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

/**
 * Serialise rows into CSV text.
 *
 * Diff:   on top of "quote only when necessary", csv-stringify supports
 *         `quoted`, `quoted_empty`, `quoted_string` and `quoted_match`
 *         (string, RegExp or an array of either).
 * Patch:  all four are honoured, and header cells go through the same
 *         predicate, exactly as the original writer does.
 * Reason: the store only passes `quoted: false`, but supporting the family
 *         keeps this a drop-in replacement for `csv-stringify/sync`.
 */
function stringify(rows, options = {}) {
  const {
    header = false,
    columns = null,
    record_delimiter: recordDelimiter = '\n',
    delimiter = ',',
    quoted = false,
    quoted_empty: quotedEmpty = false,
    quoted_string: quotedString = false,
    quoted_match: quotedMatch = null,
  } = options;
  const list = [...rows];
  const fields = columns ?? (list.length > 0 ? Object.keys(list[0]) : []);

  const matchesQuotedMatch = (text) => {
    if (!quotedMatch) {
      return false;
    }

    const patterns = Array.isArray(quotedMatch) ? quotedMatch : [quotedMatch];

    return patterns.some((pattern) =>
      pattern instanceof RegExp ? pattern.test(text) : text.includes(String(pattern)),
    );
  };

  const toField = (value) => {
    const text = castValue(value);
    const isStringValue = quotedString === true && typeof value === 'string';
    const needsQuote =
      matchesQuotedMatch(text) ||
      text.includes(recordDelimiter) ||
      text.includes(delimiter) ||
      text.includes(QUOTE) ||
      // csv-stringify leaves an empty cell bare even with `quoted: true`, unless
      // `quoted_empty` or `quoted_string` asks for it
      (text === '' ? quotedEmpty || isStringValue : quoted === true || isStringValue);

    return needsQuote ? `${QUOTE}${text.replaceAll(QUOTE, QUOTE + QUOTE)}${QUOTE}` : text;
  };

  const lines = [];

  if (header && fields.length > 0) {
    lines.push(fields.map(toField).join(delimiter));
  }
  for (const row of list) {
    lines.push(fields.map((field) => toField(row[field])).join(delimiter));
  }

  return lines.length === 0 ? '' : `${lines.join(recordDelimiter)}${recordDelimiter}`;
}

// Text from `from` up to the next cell or record boundary, used in error messages.
const restOfField = (text, from, { delimiter, recordDelimiter }) => {
  let end = from;

  while (end < text.length && text[end] !== delimiter && !text.startsWith(recordDelimiter, end)) {
    end += 1;
  }

  return text.slice(from, end).trim();
};

/**
 * Split raw CSV text into records.
 *
 * Quoted cells may contain the record delimiter, so this cannot be a line-based
 * split: the only way in is a character scan that tracks quote state.
 *
 * Diff:   csv-parse rejects a quote opening mid-field (INVALID_OPENING_QUOTE),
 *         content right after a closing quote (CSV_INVALID_CLOSING_QUOTE) and
 *         an unterminated quoted field at EOF (CSV_QUOTE_NOT_CLOSED).
 * Patch:  the same three checks raise a CsvError carrying the original code and
 *         message wording; `relax_column_count` still leaves cell counts alone.
 * Reason: a malformed shard must fail loudly. A lenient reader would accept the
 *         misparse and the next write would persist it.
 *
 * @returns {{cells: string[], blank: boolean, line: number}[]} `blank` marks a
 *   genuinely empty line (what skip_empty_lines drops); a quoted empty cell is
 *   data. `line` is the 1-based line number used in error messages.
 */
function splitRecords(text, { columns, delimiter, recordDelimiter }) {
  const records = [];
  let row = [];
  let field = '';
  let quoted = false;
  let afterQuote = false;
  let quotedAt = false;
  let names = Array.isArray(columns) ? columns : null;
  let index = 0;

  const lineOf = () => records.length + 1;
  const fieldName = () => names?.[row.length] ?? String(row.length);

  const endRow = () => {
    row.push(field);
    // A line holding only `""` is a row with one empty cell, not a blank line,
    // and skipping it would silently drop data on round trip
    const blank = !quotedAt && row.length === 1 && row[0] === '';

    records.push({ cells: row, blank, line: lineOf() });
    if (!names) {
      names = row;
    }
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
        afterQuote = true;
        index += 1;
      }
      continue;
    }

    if (afterQuote) {
      if (char === delimiter) {
        row.push(field);
        field = '';
        afterQuote = false;
        index += 1;
        continue;
      }
      if (text.startsWith(recordDelimiter, index)) {
        index += recordDelimiter.length;
        afterQuote = false;
        endRow();
        continue;
      }

      const rest = restOfField(text, index, { delimiter, recordDelimiter });

      throw new CsvError(
        'CSV_INVALID_CLOSING_QUOTE',
        `Invalid Closing Quote: got "${rest}" at line ${lineOf()} instead of delimiter, record delimiter, trimable character (if activated) or comment`,
        lineOf(),
      );
    }

    if (char === QUOTE) {
      if (field !== '') {
        throw new CsvError(
          'INVALID_OPENING_QUOTE',
          `Invalid Opening Quote: a quote is found on field "${fieldName()}" at line ${lineOf()}, value is "${field}"`,
          lineOf(),
        );
      }
      quoted = true;
      quotedAt = true;
      index += 1;
      continue;
    }

    if (char === delimiter) {
      row.push(field);
      field = '';
      index += 1;
      continue;
    }
    if (text.startsWith(recordDelimiter, index)) {
      index += recordDelimiter.length;
      endRow();
      continue;
    }

    field += char;
    index += 1;
  }

  if (quoted) {
    throw new CsvError(
      'CSV_QUOTE_NOT_CLOSED',
      `Quote Not Closed: the parsing is finished with an opening quote at line ${lineOf()}`,
      lineOf(),
    );
  }

  if (field !== '' || row.length > 0) {
    endRow();
  }

  return records;
}

/**
 * Parse CSV text into objects keyed by the header row.
 *
 * Diff:   csv-parse validates the cell count of every record unless
 *         `relax_column_count` is set (CSV_RECORD_INCONSISTENT_COLUMNS), and
 *         drops cells that have no column name.
 * Patch:  the same validation and the same lenient projection; with
 *         `columns: true` the first record is the header, with an array the
 *         first record is data.
 * Reason: the store passes `relax_column_count: true` and depends on that, but
 *         omitting it must behave like the original rather than silently
 *         accepting ragged files.
 *
 * @param {string} text
 * @param {object} options
 * @param {boolean|string[]} options.columns Read the header from the first row
 *   (`true`) or use the given column names.
 * @param {boolean} options.skip_empty_lines
 * @param {boolean} options.relax_column_count
 * @param {boolean} options.bom Strip a leading byte order mark.
 * @returns {object[]}
 */
function parse(text, options = {}) {
  const {
    columns = false,
    delimiter = ',',
    record_delimiter: recordDelimiterOption = null,
    skip_empty_lines: skipEmptyLines = false,
    relax_column_count: relaxColumnCount = false,
    bom = false,
  } = options;
  const input = bom && text.charCodeAt(0) === BOM ? text.slice(1) : text;
  const recordDelimiter = resolveRecordDelimiter(input, recordDelimiterOption);
  let records = splitRecords(input, { columns, delimiter, recordDelimiter });

  if (skipEmptyLines) {
    records = records.filter((record) => !record.blank);
  }
  if (!columns) {
    return records.map((record) => record.cells);
  }

  const hasHeaderRow = !Array.isArray(columns);
  const fields = hasHeaderRow ? records[0]?.cells ?? [] : columns;
  const body = hasHeaderRow ? records.slice(1) : records;

  if (!relaxColumnCount) {
    for (const record of body) {
      if (record.cells.length !== fields.length) {
        throw new CsvError(
          'CSV_RECORD_INCONSISTENT_COLUMNS',
          `Invalid Record Length: columns length is ${fields.length}, got ${record.cells.length} on line ${record.line}`,
          record.line,
        );
      }
    }
  }

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

module.exports = { parse, stringify, CsvError };
