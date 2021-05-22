const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');

const pkgName = 'Waline';

module.exports = {
  entry: {
    [`${pkgName}.min`]: path.resolve(__dirname, 'src/index.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: pkgName,
    libraryExport: 'default',
    libraryTarget: 'umd',
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
          <span id="/" class="leancloud_visitors">
            <em class="post-meta-item-text">阅读量 </em>
            <i class="leancloud-visitors-count"></i>
          </span>
          <div id="waline" style="max-width: 800px;margin: 0 auto;"></div>
          ${htmlWebpackPlugin.tags.bodyTags}
          <script>
            const waline = new Waline({
              el: '#waline',
              path: '/',
              visitor: true,
              serverURL: '${process.env.SERVERURL || 'http://localhost:9090'}'
            });
          </script>
        </body>
        </html>
      `,
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
