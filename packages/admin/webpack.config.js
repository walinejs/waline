const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
  entry: {
    admin: path.resolve(__dirname, 'src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ VERSION: JSON.stringify(version) }),
    new htmlWebpackPlugin({
      title: 'Waline Management System',
      publicPath: '/',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9010,
    historyApiFallback: { index: '/' },
  },
};
