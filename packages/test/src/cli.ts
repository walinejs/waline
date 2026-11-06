/* oxlint-disable complexity, import/no-nodejs-modules, no-console, no-plusplus, no-use-before-define, promise/prefer-await-to-callbacks, unicorn/prefer-code-point, unicorn/prefer-top-level-await */

import { writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';
import { pathToFileURL } from 'node:url';

import packageJSON from '../package.json' with { type: 'json' };
import { renderJSON, renderTerminal } from './report.js';
import { runCompatibilityTests } from './runner.js';
import type { Credentials } from './types.js';

interface CLIOptions {
  serverURL?: string;
  full: boolean;
  reporter: 'terminal' | 'json';
  output?: string;
  timeout: number;
  color: boolean;
  help: boolean;
  version: boolean;
}

const HELP = `Usage: waline-test <serverURL> [options]

Test whether a server is compatible with Waline.

Options:
  --full                 Run authenticated read/write tests
  --reporter=<reporter>  terminal (default) or json
  --output=<path>        Write the report to a file
  --timeout=<ms>         Per-request timeout (default: 10000)
  --no-color             Disable terminal colors
  -h, --help             Show this help
  -v, --version          Show the package version

Full mode credentials can be provided with WALINE_TEST_ADMIN_EMAIL and
WALINE_TEST_ADMIN_PASSWORD. In an interactive terminal, missing values are prompted.`;

const questionSecret = (prompt: string): Promise<string> =>
  new Promise((resolve, reject) => {
    let value = '';
    const input = process.stdin;
    const finish = (): void => {
      input.off('data', onData);
      input.setRawMode(false);
      input.pause();
      process.stdout.write('\n');
    };
    const onData = (chunk: Buffer): void => {
      for (const byte of chunk) {
        if (byte === 3) {
          finish();
          reject(new Error('Prompt cancelled'));
          return;
        }
        if (byte === 13 || byte === 10) {
          finish();
          resolve(value);
          return;
        }
        if (byte === 8 || byte === 127) value = value.slice(0, -1);
        else value += String.fromCharCode(byte);
      }
    };

    process.stdout.write(prompt);
    input.setRawMode(true);
    input.resume();
    input.on('data', onData);
  });

export const parseArguments = (arguments_: string[]): CLIOptions => {
  const options: CLIOptions = {
    full: false,
    reporter: 'terminal',
    timeout: 10_000,
    color: true,
    help: false,
    version: false,
  };

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === '--full') options.full = true;
    else if (argument === '--no-color') options.color = false;
    else if (argument === '--help' || argument === '-h') options.help = true;
    else if (argument === '--version' || argument === '-v') options.version = true;
    else if (argument.startsWith('--reporter=')) {
      const reporter = argument.slice('--reporter='.length);
      if (reporter !== 'terminal' && reporter !== 'json') {
        throw new TypeError(`Unknown reporter: ${reporter}`);
      }
      options.reporter = reporter;
    } else if (argument === '--reporter') {
      const reporter = arguments_[++index];
      if (reporter !== 'terminal' && reporter !== 'json') {
        throw new TypeError(`Unknown reporter: ${reporter ?? ''}`);
      }
      options.reporter = reporter;
    } else if (argument.startsWith('--output='))
      {options.output = argument.slice('--output='.length);}
    else if (argument === '--output') options.output = arguments_[++index];
    else if (argument.startsWith('--timeout='))
      {options.timeout = Number(argument.slice('--timeout='.length));}
    else if (argument === '--timeout') options.timeout = Number(arguments_[++index]);
    else if (argument.startsWith('-')) throw new TypeError(`Unknown option: ${argument}`);
    else if (options.serverURL) throw new TypeError(`Unexpected argument: ${argument}`);
    else options.serverURL = argument;
  }

  if (!Number.isSafeInteger(options.timeout) || options.timeout <= 0) {
    throw new TypeError('--timeout must be a positive integer');
  }

  return options;
};

const promptCredentials = async (): Promise<Credentials> => {
  const emailFromEnvironment = process.env.WALINE_TEST_ADMIN_EMAIL;
  const passwordFromEnvironment = process.env.WALINE_TEST_ADMIN_PASSWORD;

  if (emailFromEnvironment && passwordFromEnvironment) {
    return { email: emailFromEnvironment, password: passwordFromEnvironment };
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new TypeError(
      'Full mode requires WALINE_TEST_ADMIN_EMAIL and WALINE_TEST_ADMIN_PASSWORD in non-interactive environments',
    );
  }

  const input = createInterface({ input: process.stdin, output: process.stdout });
  const email = emailFromEnvironment ?? (await input.question('Administrator email: '));
  input.close();
  const password = passwordFromEnvironment ?? (await questionSecret('Administrator password: '));
  return { email, password };
};

const main = async (): Promise<void> => {
  const options = parseArguments(process.argv.slice(2));

  if (options.help) {
    console.log(HELP);
    return;
  }

  if (options.version) {
    console.log(packageJSON.version);
    return;
  }

  if (!options.serverURL) throw new TypeError('Missing serverURL. Run with --help for usage.');

  const credentials = options.full ? await promptCredentials() : undefined;
  const report = await runCompatibilityTests({
    serverURL: options.serverURL,
    full: options.full,
    timeout: options.timeout,
    credentials,
  });
  const output =
    options.reporter === 'json' ? renderJSON(report) : renderTerminal(report, options.color);

  if (options.output) await writeFile(options.output, `${output}\n`, 'utf8');
  else console.log(output);

  if (report.summary.failed > 0) process.exitCode = 1;
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err: unknown) => {
    console.error(`@waline/test: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
  });
}
