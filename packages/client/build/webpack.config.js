const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  output: {
    filename: '[name].min.js',
  },

  resolve: {
    alias: {
      '@style': path.resolve(__dirname, '../src/styles/index.scss'),
    },
  },
});
