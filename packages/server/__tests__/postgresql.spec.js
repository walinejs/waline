import Postgresql from 'think-model-postgresql';
import { describe, expect, it } from 'vitest';

const { Parser: PostgreSQLParser } = Postgresql;

class WalinePostgreSQLParser extends PostgreSQLParser {
  escapeString(str) {
    return str.replaceAll('\\', String.raw`\\`).replaceAll("'", String.raw`\'`);
  }
}

describe('walinePostgreSQLParser', () => {
  const parser = new WalinePostgreSQLParser({});

  it('should not convert LaTeX backslash sequences to control characters', () => {
    // \f in E'...' syntax would normally become form-feed (0x0C) in PostgreSQL.
    // Our fix escapes the backslash so PostgreSQL stores the literal \frac.
    const result = parser.parseValue(String.raw`test $\frac{1}{2}$`);

    expect(result).toBe(String.raw`E'test $\\frac{1}{2}$'`);
    expect(result).not.toContain('\f'); // form-feed (0x0C)
  });

  it('should escape backslashes in common LaTeX commands', () => {
    const cases = [
      [String.raw`\theta`, String.raw`E'\\theta'`],
      [String.raw`\nabla`, String.raw`E'\\nabla'`],
      [String.raw`\right`, String.raw`E'\\right'`],
      [String.raw`\begin{equation}`, String.raw`E'\\begin{equation}'`],
    ];

    for (const [input, expected] of cases) {
      expect(parser.parseValue(input)).toBe(expected);
    }
  });

  it('should still escape single quotes', () => {
    const result = parser.parseValue("it's a test");

    expect(result).toBe(String.raw`E'it\'s a test'`);
  });

  it('should handle backslash followed by single quote', () => {
    const result = parser.parseValue(String.raw`\'`);

    expect(result).toBe(String.raw`E'\\\''`);
  });
});
