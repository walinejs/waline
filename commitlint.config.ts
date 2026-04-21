import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const packages = readdirSync(join(import.meta.dirname, './packages/'));

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['example', 'release', ...packages]],
  },
};
