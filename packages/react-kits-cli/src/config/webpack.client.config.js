const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { GenerateSW } = require('workbox-webpack-plugin');

const { log } = require('../util/log');
const { generateKitConfig } = require('../util/config');
const { resolveDir } = require('../util/path');
const baseConfig = require('./webpack.base.config');
const project = require('../config/project.config');
const { app_asset_path } = require('../config/project.config');

const kitConfig = generateKitConfig(project);

let vendorManifest;

if (process.env.NODE_ENV === 'development') {
  try {
    vendorManifest = require(project.paths.dist('./vendorDll-manifest.json'));
    log('DLL ready.');
  } catch (e) {
    log('DLL not ready. You can create one by running `react-kits build-dll`.');
  }
}

let sw = kitConfig.sw;

if (sw) {
  log('SW ready.');
  const swDefault = {
    homePath: '/',
  };
  sw = { ...swDefault, ...sw };
} else {
  log('SW not ready. You can add `sw: true` in your `react-kits.config.js`.');
}

const devMode = project.globals.__DEV__;

const config = {
  // devtool: project.globals.__PROD__ ? false : 'cheap-module-eval-source-map',
  entry: {
    app: [
      ...(project.globals.__DEV__ ? ['webpack-hot-middleware/client'] : []),
      project.paths.client('renderer/client'),
    ],
  },
  resolve: {
    fallback: { path: false },
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              url: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: project.globals.__DEV__ ? '[name].js' : `[name].[chunkhash].js`,
    path: project.paths.dist(),
  },
  plugins: [
    ...(project.globals.__DEV__
      ? [
          vendorManifest &&
            new webpack.DllReferencePlugin({
              context: '.',
              manifest: vendorManifest,
            }),
          new webpack.HotModuleReplacementPlugin(),
        ]
      : [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          }),
        ]),
    new WebpackManifestPlugin({
      writeToFileEmit: true,
      fileName: 'build-manifest.json',
    }),
    new CopyWebpackPlugin(['public']),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ].filter((p) => !!p),
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          chunks: 'initial',
          filename: project.globals.__DEV__
            ? 'vendor.js'
            : 'vendor.[chunkhash].js',
        },
      },
    },
  },
};

/**
 * Allow webpack overrides
 */
let custom = {};
if (kitConfig.webpack.client) {
  const webpackConfig = kitConfig.webpack.client(config);
  if (!webpackConfig) {
    log('`webpack.client` field should return config.');
  } else {
    log('`webpack.client` modify is applied.');
    custom = webpackConfig;
  }
}

let finalConfig = merge(baseConfig, config, custom);

module.exports = finalConfig;
// module.exports = config;
