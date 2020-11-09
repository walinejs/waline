const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    this.type = 'html';
    this.body = 'Welcome to use <a href="https://waline.js.org" target="_blank"><b>Waline</b></a>!';
  }
};
