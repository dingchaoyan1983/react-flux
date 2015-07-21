/**
 * Created by daneding on 7/14/15.
 */
var path = require('path');

module.exports = {
  entry: {
    fixture: './js/fixtures/main.js',
    app: './js/app'
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};