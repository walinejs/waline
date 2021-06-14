const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { version } = require('./package.json');

module.exports = {
  entry: {
    admin: path.resolve(__dirname, 'src/index.js'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: false },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: 'url-loader' }],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({ VERSION: JSON.stringify(version) }),
    ...(process.env.ANALYZE
      ? [
          new BundleAnalyzerPlugin({
            analyzerPort: 0,
            defaultSizes: 'gzip',
          }),
        ]
      : []),
    new htmlWebpackPlugin({
      title: 'Waline Management System',
      publicPath: '/',
    }),
  ],

  devServer: {
    compress: true,
    port: 9010,
    historyApiFallback: { index: '/' },
    proxy: {
      '/token': 'http://localhost:9090',
    },
  },
};
