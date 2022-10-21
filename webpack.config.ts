const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  target: 'web',
  entry: './src/app.ts',
  devtool: 'source-map',
  mode: 'development',
  stats: 'errors-only',
  devServer: {
    hot: true,
    port: 5000
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    },
  },
  plugins: [
    new DuplicatePackageCheckerPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/game', to: 'assets/game' },
      ]
    }),
    // this is primarly needed for pixi dev tools
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
    }),
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(m|j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },

    ]
  },
  resolve: {
    alias: {
      'pixi.js': path.join(__dirname, './node_modules/pixi.js'),
      "pixi-filters": path.join(__dirname, './node_modules/pixi-filters')
    },
    // modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { "https": false, "util": false, "http": false, "net": false }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
};
