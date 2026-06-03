import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Application from 'thinkjs';

const dirName = import.meta.dirname;
const require = createRequire(import.meta.url);

const instance = new Application({
  ROOT_PATH: dirName,
  APP_PATH: path.join(dirName, 'src'),
  proxy: true, // use proxy
  env: 'production',
});

instance.run();

let config = {};

try {
  config = require('./config.js');
} catch {
  // do nothing
}
for (const k in config) {
  think.config(k, config[k]);
}
