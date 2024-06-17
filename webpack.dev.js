const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: './[name]/[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: (pathData) => {
        const folder = pathData.chunk.name + '/styles';
        return `${folder}/[name].css`;
      },
    }),
  ],
  devServer: {
    watchFiles: ['src/**', 'public/**/*'],
    static: {
      directory: path.join(__dirname, 'dist/home'),
    },
    proxy: [
      {
        context: [''],
        target: 'http://localhost:8080/home',
      },
    ],
    compress: true,
    port: 8080,
    hot: true,
    open: true,
  },
});