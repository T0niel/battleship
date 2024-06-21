const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: './[name]/[name]-[contenthash].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: (pathData) => {
        const folder = pathData.chunk.name + '/styles';
        return `${folder}/[name].[contenthash].css`;
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
});
