const path = require('node:path');

require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
  quiet: true,
});

const watcher = require('think-watcher');
const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'src'),
  proxy: false,
  watcher: watcher,
  env: 'development',
});

instance.run();

let config = {};

try {
  // oxlint-disable-next-line node/global-require
  config = require('./config.js');
} catch {
  // do nothing
}
for (const k in config) {
  think.config(k, config[k]);
}
