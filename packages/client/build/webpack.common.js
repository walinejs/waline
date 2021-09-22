const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('../package.json');

const pkgName = 'Waline';

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.ts'),
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    library: pkgName,
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },

  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.vue', '.json'],
  },

  devtool: 'source-map',

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
        test: /\.ts?$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: false,
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      VERSION: JSON.stringify(version),
    }),
    ...(process.env.ANALYZE
      ? [
          new BundleAnalyzerPlugin({
            analyzerPort: 0,
            defaultSizes: 'gzip',
          }),
        ]
      : []),
    new htmlWebpackPlugin({
      title: 'Waline Test',
      inject: false,
      scriptLoading: 'blocking',
      templateContent: ({ htmlWebpackPlugin }) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${htmlWebpackPlugin.options.title}</title>
          ${htmlWebpackPlugin.tags.headTags}
        </head>
        <body>
          阅读量: <span id="/" class="waline-visitor-count"></span>
          评论数: <span id="/" class="waline-comment-count"></span>
          <div id="waline" style="max-width: 800px;margin: 0 auto;"></div>
          ${htmlWebpackPlugin.tags.bodyTags}
          <script>
            const waline = Waline({
              el: '#waline',
              path: '/',
              visitor: true,
              serverURL: '${process.env.SERVER_URL || 'http://localhost:9090'}',
              emoji: [
                'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili',
                'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/qq'
              ]
            });
          </script>
        </body>
        </html>
      `,
    }),
  ],

  devServer: {
    compress: true,
    port: 9000,
  },
};
