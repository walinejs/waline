const path = require('path');
const es3ifyPlugin = require('es3ify-webpack-plugin');

const pkgName = 'Waline';
module.exports = {
  mode: 'production',
  entry: {
    [pkgName + '.min']: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: pkgName,
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  // resolve: {
  //   alias: {
  //     'react': 'anujs',
  //     'react-dom': 'anujs',
  //     'prop-types': 'anujs/lib/ReactPropTypes',
  //     'create-react-class': 'anujs/lib/createClass',
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new es3ifyPlugin()
  ]
};
