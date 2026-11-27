/* oxlint-disable prefer-destructuring, typescript/strict-boolean-expressions */

import pc from 'picocolors';

import type { TestReport, TestResult, TestSummary } from './types.js';

export const summarize = (results: TestResult[]): TestSummary => {
  const passed = results.filter(({ status }) => status === 'passed').length;
  const failed = results.filter(({ status }) => status === 'failed').length;
  const skipped = results.filter(({ status }) => status === 'skipped').length;
  const executed = passed + failed;
  const total = results.length;
  const passRate = executed === 0 ? 0 : (passed / executed) * 100;
  const coverage = total === 0 ? 0 : (executed / total) * 100;

  return {
    passed,
    failed,
    skipped,
    total,
    passRate,
    coverage,
    fullyCompatible: total > 0 && passRate === 100 && coverage === 100,
  };
};

const percent = (value: number): string => `${value.toFixed(1)}%`;

export const renderTerminal = (report: TestReport, color = true): string => {
  const paint = color
    ? {
        passed: pc.green,
        failed: pc.red,
        skipped: pc.yellow,
        title: pc.bold,
      }
    : {
        passed: (value: string): string => value,
        failed: (value: string): string => value,
        skipped: (value: string): string => value,
        title: (value: string): string => value,
      };
  const symbols = { passed: '✓', failed: '✗', skipped: '○' } as const;
  const lines = [
    paint.title(`Waline server compatibility report (${report.mode})`),
    `Target: ${report.serverURL}`,
    `@waline/test: ${report.packageVersion}${report.serverVersion ? ` · server: ${report.serverVersion}` : ''}`,
    '',
  ];

  let group = '';
  for (const result of report.results) {
    if (result.group !== group) {
      group = result.group;
      lines.push(paint.title(group));
    }
    const detail = result.reason ? ` — ${result.reason}` : '';
    lines.push(
      paint[result.status](
        `  ${symbols[result.status]} ${result.name}${detail} (${result.duration}ms)`,
      ),
    );
  }

  lines.push(
    '',
    `Passed: ${report.summary.passed} · Failed: ${report.summary.failed} · Skipped: ${report.summary.skipped}`,
    `Pass rate: ${percent(report.summary.passRate)} · Coverage: ${percent(report.summary.coverage)}`,
    report.summary.fullyCompatible
      ? paint.passed('Result: fully compatible')
      : report.summary.failed > 0
        ? paint.failed('Result: compatibility failures found')
        : paint.skipped('Result: all tested features are compatible; untested capabilities remain'),
  );

  return lines.join('\n');
};

const SENSITIVE_KEYS = /password|authorization|token|secret/iu;

export const redact = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map((item) => redact(item));
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      SENSITIVE_KEYS.test(key) ? '[REDACTED]' : redact(item),
    ]),
  );
};

export const renderJSON = (report: TestReport): string =>
  JSON.stringify(redact(report), undefined, 2);
