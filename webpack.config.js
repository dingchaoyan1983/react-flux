/**
 * Created by daneding on 7/14/15.
 */
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
      }
    ]
  }
};