const path = require('path');
const Application = require('thinkjs');
const watcher = require('think-watcher');

const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'src'),
  watcher: watcher,
  env: 'development'
});

instance.run();