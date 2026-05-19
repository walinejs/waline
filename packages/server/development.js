const path = require('node:path');

require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
  quiet: true,
});

const hasStorageEnv = [
  'LEAN_KEY',
  'MONGO_DB',
  'PG_DB',
  'POSTGRES_DATABASE',
  'SQLITE_PATH',
  'MYSQL_DB',
  'TIDB_DB',
  'GITHUB_TOKEN',
  'TCB_ENV',
].some((envName) => Boolean(process.env[envName]));

if (!hasStorageEnv) {
  process.env.SQLITE_PATH = path.join(__dirname, '../../data');
  process.env.JWT_TOKEN ||= 'waline-dev-jwt-token';
}

const watcher = require('think-watcher');
const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'src'),
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
