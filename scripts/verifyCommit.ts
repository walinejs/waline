import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import picocolors from 'picocolors';

const __dirname = import.meta.dirname;

const packages = readdirSync(path.join(__dirname, '../packages/'));

const msgPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve('.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

const types = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'workflow',
  'build',
  'ci',
  'chore',
  'types',
  'release',
];
const scopes = [...packages, 'example', 'release', 'deps'];

const commitRE = /^(revert: )?(?<type>[^(]*?)(?:\((?<scope>[^)]*?)\))?: .{1,50}$/;

const match = commitRE.exec(msg);

if (!match) {
  console.error(
    `${picocolors.white(picocolors.bgRed(' ERROR '))} ${picocolors.red(
      `invalid commit message format.`,
    )}`,
  );
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

if (!types.includes(match.groups?.type ?? '')) {
  console.error(
    `${picocolors.white(picocolors.bgRed(' ERROR '))} ${picocolors.red(
      `invalid commit message type: "${match.groups?.type}".`,
    )}`,
  );
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

if (match.groups?.scope && !scopes.includes(match.groups.scope)) {
  console.error(
    `${picocolors.white(picocolors.bgRed(' ERROR '))} ${picocolors.red(
      `invalid commit message scope: "${match.groups.scope}".`,
    )}`,
  );
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}
