const webpack = require('webpack');
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const { log } = require('../util/log');
const { generateKitConfig } = require('../util/config');
const { resolveDir, pcwd } = require('../util/path');
const project = require('../config/project.config');

const kitConfig = generateKitConfig(project);

const devMode = project.globals.__DEV__;
let config = {
  context: pcwd,
  mode: devMode ? 'development' : 'production',
  stats: {
    hash: false,
    modules: false,
    entrypoints: false,
    colors: true,
    children: false,
  },
  resolveLoader: {
    modules: [resolveDir('../../node_modules'), 'node_modules'],
  },
  output: {
    publicPath: project.app_asset_path,
  },
  module: {
    rules: [
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff2',
        },
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'font/opentype',
        },
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'image/svg+xml',
        },
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  performance: {
    hints: false,
  },
  plugins: [new webpack.DefinePlugin(project.globals)],
};

/**
 * Allow webpack overrides
 */
let custom = {};
if (kitConfig.webpack.base) {
  const webpackConfig = kitConfig.webpack.base(config);
  if (!webpackConfig) {
    log('`webpack.base` field should return config.');
  } else {
    log('`webpack.base` modify is applied.');
    custom = webpackConfig;
  }
}

module.exports = merge(config, custom);
