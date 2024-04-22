import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packages = readdirSync(
  join(dirname(fileURLToPath(import.meta.url)), './packages/'),
);

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['example', 'release', ...packages]],
  },
};
