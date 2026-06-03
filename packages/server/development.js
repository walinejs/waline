import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import watcher from 'think-watcher';
import Application from 'thinkjs';

const dirName = import.meta.dirname;
const require = createRequire(import.meta.url);

require('dotenv').config({
  path: path.join(dirName, '../../.env'),
  quiet: true,
});

const instance = new Application({
  ROOT_PATH: dirName,
  APP_PATH: path.join(dirName, 'src'),
  proxy: false,
  watcher,
  env: 'development',
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
