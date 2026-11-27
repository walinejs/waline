export type TestStatus = 'passed' | 'failed' | 'skipped';

export type TestGroup =
  | 'server'
  | 'comments'
  | 'counters'
  | 'auth'
  | 'users'
  | 'database'
  | 'external';

export interface TestResult {
  id: string;
  group: TestGroup;
  name: string;
  status: TestStatus;
  duration: number;
  reason?: string;
}

export interface TestSummary {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  passRate: number;
  coverage: number;
  fullyCompatible: boolean;
}

export interface TestReport {
  schemaVersion: 1;
  packageVersion: string;
  serverURL: string;
  serverVersion?: string;
  mode: 'basic' | 'full';
  startedAt: string;
  duration: number;
  summary: TestSummary;
  results: TestResult[];
}

export interface Credentials {
  email: string;
  password: string;
}

export interface RunOptions {
  serverURL: string;
  full?: boolean;
  timeout?: number;
  credentials?: Credentials;
  fetch?: typeof globalThis.fetch;
}
