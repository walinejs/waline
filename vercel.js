const os = require('os');
const path = require('path');
const Application = require('thinkjs');

const Loader = require('thinkjs/lib/loader');

const app = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'src'),
  VIEW_PATH: path.join(__dirname, 'view'),
  RUNTIME_PATH: path.join(os.tmpdir(), 'runtime'),
  proxy: true, // use proxy
  env: 'vercel',
  external: {
    static: {
      www: path.join(__dirname, 'www'),
      release: [
        path.join(__dirname, 'www/release/.latest'),
        path.join(__dirname, 'www/release/v1/.latest')
      ]
    }
  }
});

const loader = new Loader(app.options);
loader.loadAll('worker');

module.exports = function (req, res) {
  return think.beforeStartServer().catch(err => {
    think.logger.error(err);
  }).then(() => {
    const callback = think.app.callback();
    return callback(req, res);
  }).then(() => {
    think.app.emit('appReady');
  });
};