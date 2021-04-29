const os = require('os');
const path = require('path');
const Application = require('thinkjs');
const Loader = require('thinkjs/lib/loader');

module.exports = function (config = {}) {
  const app = new Application({
    ROOT_PATH: __dirname,
    APP_PATH: path.join(__dirname, 'src'),
    VIEW_PATH: path.join(__dirname, 'view'),
    RUNTIME_PATH: path.join(os.tmpdir(), 'runtime'),
    proxy: true, // use proxy
    env: 'vercel',
  });

  const loader = new Loader(app.options);
  loader.loadAll('worker');

  return function (req, res) {
    for (const k in config) {
      think.config(k, config[k]);
    }

    return think
      .beforeStartServer()
      .catch((err) => {
        think.logger.error(err);
      })
      .then(() => {
        const callback = think.app.callback();
        return callback(req, res);
      })
      .then(() => {
        think.app.emit('appReady');
      });
  };
};
