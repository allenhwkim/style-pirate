/* global __dirname, require, module*/
const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env || {}; // webpack --env.prod

const config = {
  entry: {
    stylePirate: path.join(__dirname, 'index.js')
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: env.prod ? "[name].umd.min.js" : "[name].umd.js",
    library: ["[name]"],
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins:
    env.prod ? [
      new webpack.optimize.UglifyJsPlugin()
    ] : []
};

module.exports = config;
