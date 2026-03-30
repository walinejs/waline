const path = require('node:path');

const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'src'),
  proxy: true, // use proxy
  env: 'production',
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
